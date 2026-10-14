"""
file: hfa/bc.py
importable: load_bc

Business Central'dan SSMS ile script-out edilmiş tabloları okuyup SQLite'a
raw_bc_* adıyla yazar. Her .sql dosyası bir tablo demektir, tablo adındaki
şirket öneki ve extension GUID'i atılır, kolon adları snake_case'e çevrilir.

description: BC script-out dosyalarını SQLite staging tablolarına yükleyen modül.
"""

# NOTE: script-out içinde aynı INSERT satırları birden fazla kez geçebiliyor,
# SSMS ile scriptlerken iki kere çalıştırılmış gibi duruyor. Bu yüzden her
# tablo yüklenirken tam satır kopyaları atılır ve kaç kopya atıldığı loga
# yazılır. Script'teki PRIMARY KEY tanımlarına güvenilmez, örneğin Production
# Order'da sadece Status kolonu anahtar görünüyor ki bu imkansız.
#
# NOTE: BC'de boş tarih 1753-01-01 olarak saklanır, burada None'a çevrilir.

import re
import sqlite3
from pathlib import Path

# N'..' içinde tek tırnak '' olarak kaçırılır, o yüzden string kısmı (?:[^']|'')* ile yakalanır
_TOKEN = re.compile(
    r"CAST\(N'(?P<dt>[^']*)' AS DateTime\)"
    r"|CAST\((?P<dec>-?[\d.]+) AS Decimal\(\d+, \d+\)\)"
    r"|N'(?P<s>(?:[^']|'')*)'"
    r"|(?P<num>-?\d+(?:\.\d+)?)"
    r"|(?P<null>NULL)"
)
_INSERT = re.compile(r"^INSERT \[dbo\]\.\[(?P<tbl>[^\]]+)\] \((?P<cols>.*?)\) VALUES \((?P<vals>.*)\)\s*$")


# Kolon adını SQLite'ta tırnaksız kullanılabilecek hale getirir. BC alt çizgiyi
# nokta yerine kullandığı için No_ gibi isimler no olur.
def _col(name: str) -> str:
    n = re.sub(r"[^0-9a-zA-Z]+", "_", name).strip("_").lower()
    return n


# Tablo adından şirket önekini ve sondaki extension GUID'ini atar.
# Örnek: Hartwell & Finch Ltd$Sales Invoice Line$437dbf0e-... -> sales_invoice_line
def _table(name: str) -> str:
    parts = name.split("$")
    return _col(parts[1])


# Tek bir VALUES (...) içeriğini Python değerlerine çevirir. Virgülle bölmek
# işe yaramaz çünkü hem string'lerin içinde hem Decimal(38, 20) içinde virgül var.
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
    """Klasördeki tüm .sql script-out dosyalarını raw_bc_<tablo> olarak yükler.

    Args:
        src: bc_script_out klasörü.
        con: Yazılacak SQLite bağlantısı.
        log: dq_log(source, issue, count, detail) imzalı bir çağrılabilir, veri kalitesi notları için.

    Returns:
        Tablo adı ile yüklenen tekil satır sayısı eşlemesi.
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
