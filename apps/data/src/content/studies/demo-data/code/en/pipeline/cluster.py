"""
file: pipeline/cluster.py
importable: CONFLICT_FIELDS, has_conflict, build_clusters

Treats matched pairs as the edges of a graph and gathers connected records into product
clusters. If conflicting records remain inside a cluster, the cluster is split at its
weakest edges.

description: Step that builds product clusters from matched record pairs and splits conflicting ones.
"""

# TODO: Clusters larger than eight records are sent to review for now. Most of them are
# different pack sizes of the same product, adding the pack to the conflict fields would
# cut this work down.

import networkx as nx
import pandas as pd

# Finish was added later. The first version had only dimensions and brand, and the colour
# variants of the same series fell into one cluster.
CONFLICT_FIELDS = ["d1", "d2", "brand", "finish"]
MAX_AUTO_SIZE = 8

# --- Conflict ---

# A cluster conflicts if a field holds more than one different non empty value. An empty
# value is not a conflict, something unknown does not contradict the other.
def has_conflict(nodes, records: pd.DataFrame) -> bool:
    sub = records.loc[list(nodes), CONFLICT_FIELDS]
    return bool((sub.nunique(dropna=True) > 1).any())


# --- Clusters ---

# In a conflicting cluster the lowest scoring edge is cut. When the cluster splits in two,
# each part goes back on the stack and is tested again on its own.
def build_clusters(edges: pd.DataFrame, records: pd.DataFrame) -> tuple[list[set], list[set]]:
    """Builds product clusters from matched pairs.

    Args:
        edges: Matched pairs with the a, b and score columns.
        records: Records indexed by record_id, with the CONFLICT_FIELDS columns.

    Returns:
        Accepted clusters and the clusters sent to review because of their size.
    """
    g = nx.Graph()
    g.add_weighted_edges_from(edges[["a", "b", "score"]].itertuples(index=False), weight="score")
    accepted, review = [], []
    stack = [g.subgraph(c).copy() for c in nx.connected_components(g)]
    while stack:
        sub = stack.pop()
        if has_conflict(sub.nodes, records):
            a, b, _ = min(sub.edges(data="score"), key=lambda e: e[2])
            sub.remove_edge(a, b)
            stack.extend(sub.subgraph(c).copy() for c in nx.connected_components(sub))
        elif len(sub) > MAX_AUTO_SIZE:
            review.append(set(sub.nodes))
        else:
            accepted.append(set(sub.nodes))
    return accepted, review
