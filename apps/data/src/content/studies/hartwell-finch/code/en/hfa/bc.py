"""
file: hfa/bc.py
importable: load_bc

Reads the tables scripted out of Business Central with SSMS and writes them to
SQLite as raw_bc_*. Each .sql file is one table. The company prefix and the
extension GUID are dropped from the table name, column names become snake_case.

description: Module that loads BC script-out files into SQLite staging tables.
"""

# NOTE: the same INSERT lines can appear more than once in the script-out, it
# looks as if it was run twice while scripting in SSMS. So exact duplicate rows
# are dropped as each table loads, and the number dropped goes to the log.
# The PRIMARY KEY definitions in the script are not trusted, for example in
# Production Order only the Status column shows as the key, which is impossible.
#
# NOTE: BC stores an empty date as 1753-01-01, here it becomes None.

import re
import sqlite3
from pathlib import Path

# Inside N'..' a single quote is escaped as '', so the string part is caught with (?:[^']|'')*
_TOKEN = re.compile(
    r"CAST\(N'(?P<dt>[^']*)' AS DateTime\)"
    r"|CAST\((?P<dec>-?[\d.]+) AS Decimal\(\d+, \d+\)\)"
    r"|N'(?P<s>(?:[^']|'')*)'"
    r"|(?P<num>-?\d+(?:\.\d+)?)"
    r"|(?P<null>NULL)"
)
_INSERT = re.compile(r"^INSERT \[dbo\]\.\[(?P<tbl>[^\]]+)\] \((?P<cols>.*?)\) VALUES \((?P<vals>.*)\)\s*$")


# Makes a column name usable in SQLite without quotes. BC uses an underscore
# in place of a dot, so names like No_ become no.
def _col(name: str) -> str:
    n = re.sub(r"[^0-9a-zA-Z]+", "_", name).strip("_").lower()
    return n


# Drops the company prefix and the trailing extension GUID from a table name.
# Example: Hartwell & Finch Ltd$Sales Invoice Line$437dbf0e-... -> sales_invoice_line
def _table(name: str) -> str:
    parts = name.split("$")
    return _col(parts[1])


# Turns the content of a single VALUES (...) into Python values. Splitting on
# commas does not work, there are commas inside strings and inside Decimal(38, 20).
def _values(raw: str) -> list:
    out = []
    for m in _TOKEN.finditer(raw):
        if m.group("dt") is not None:
            d = m.group("dt")[:10]
            out.append(None if d == "1753-01-01" else d)
        elif m.group("dec") is not None:
            out.append(float(m.group("dec")))
        elif m.group("s") is not None:
            out.append(m.group("s").replace("''", "'"))
        elif m.group("num") is not None:
            out.append(float(m.group("num")) if "." in m.group("num") else int(m.group("num")))
        else:
            out.append(None)
    return out


def load_bc(src: Path, con: sqlite3.Connection, log) -> dict[str, int]:
    """Loads every .sql script-out file in the folder as raw_bc_<table>.

    Args:
        src: The bc_script_out folder.
        con: SQLite connection to write to.
        log: A callable with the signature dq_log(source, issue, count, detail), for data quality notes.

    Returns:
        Mapping of table name to the number of unique rows loaded.
    """
    counts = {}
    for f in sorted(src.glob("*.sql")):
        rows, cols, tbl = [], None, None
        with open(f, encoding="utf-8-sig") as fh:
            for line in fh:
                if not line.startswith("INSERT"):
                    continue
                m = _INSERT.match(line.rstrip("\r\n"))
                if not m:
                    log(f.name, "line could not be parsed", 1, line[:120])
                    continue
                if cols is None:
                    tbl = _table(m.group("tbl"))
                    cols = [_col(c.strip(" []")) for c in m.group("cols").split("], [")]
                vals = _values(m.group("vals"))
                if len(vals) != len(cols):
                    log(f.name, "column count mismatch", 1, line[:120])
                    continue
                rows.append(tuple(vals))
        if cols is None:
            continue
        uniq = list(dict.fromkeys(rows))
        if len(uniq) < len(rows):
            log(f"BC {tbl}", "Exact duplicate rows in the script-out removed", len(rows) - len(uniq), "")
        name = f"raw_bc_{tbl}"
        con.execute(f"DROP TABLE IF EXISTS {name}")
        con.execute(f"CREATE TABLE {name} ({', '.join(cols)})")
        con.executemany(f"INSERT INTO {name} VALUES ({','.join('?' * len(cols))})", uniq)
        counts[name] = len(uniq)
    con.commit()
    return counts
