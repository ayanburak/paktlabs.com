"""
file: pipeline/cluster.py
importable: CONFLICT_FIELDS, has_conflict, build_clusters

Eşleşen çiftleri bir grafın kenarları sayar ve birbirine bağlı kayıtları ürün
kümelerine toplar. Kümenin içinde çelişen kayıt kalırsa küme en zayıf kenarlarından
bölünür.

description: Eşleşen kayıt çiftlerinden ürün kümeleri kuran ve çelişkili kümeleri bölen adım.
"""

# TODO: Sekiz kayıttan büyük kümeler şu an incelemeye gönderiliyor. Bunların çoğu aynı
# ürünün farklı paket boylarından oluşuyor, paket bilgisi çelişki alanlarına eklenirse
# bu iş azalır.

import networkx as nx
import pandas as pd

# Kaplama sonradan eklendi. İlk sürümde yalnızca ölçü ve marka vardı ve aynı serinin
# renk varyantları tek kümeye düşüyordu.
CONFLICT_FIELDS = ["d1", "d2", "brand", "finish"]
MAX_AUTO_SIZE = 8

# --- Çelişki ---

# Bir alanda boş olmayan birden fazla farklı değer varsa küme çelişkilidir. Boş değer
# çelişki sayılmaz, bilinmeyen bir şey diğerini yalanlamaz.
def has_conflict(nodes, records: pd.DataFrame) -> bool:
    sub = records.loc[list(nodes), CONFLICT_FIELDS]
    return bool((sub.nunique(dropna=True) > 1).any())


# --- Kümeler ---

# Çelişkili kümede en düşük skorlu kenar kesilir. Küme ikiye ayrılınca her parça
# yığına geri konur ve kendi başına tekrar sınanır.
def build_clusters(edges: pd.DataFrame, records: pd.DataFrame) -> tuple[list[set], list[set]]:
    """Eşleşen çiftlerden ürün kümelerini kurar.

    Args:
        edges: a, b ve score sütunlarını taşıyan eşleşmiş çiftler.
        records: record_id ile indekslenmiş, CONFLICT_FIELDS sütunlarını taşıyan kayıtlar.

    Returns:
        Kabul edilen kümeler ve büyüklüğü yüzünden incelemeye giden kümeler.
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
