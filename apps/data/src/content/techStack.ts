/*
file: techStack.ts
importable: techLogos

Her aracin logo dosyasi. Adlar ve sira techNames.ts'ten gelir, bu dosya
yalnizca her ada logosunu baglar. Logolar ekrana dogrudan degil TechLogo ile
cizilir, dosya yalnizca seklin kalibidir.

Yeni bir logo tek renkli bir sekil olmali ve zemini bos olmali. Hangi renkte
cizildigi onemli degil, gorunen rengi site verir. Cok renkli bir logo bu
yolla boyanamaz, tek renge cevrilip eklenir.

description: Her araci logo dosyasina baglayan sozluk.
*/

import dockerLogo from '@/assets/stack/docker.svg'
import excelLogo from '@/assets/stack/excel.svg'
import fastapiLogo from '@/assets/stack/fastapi.svg'
import gitLogo from '@/assets/stack/git.svg'
import jupyterLogo from '@/assets/stack/jupyter.svg'
import matplotlibLogo from '@/assets/stack/matplotlib.svg'
import mysqlLogo from '@/assets/stack/mysql.svg'
import nodejsLogo from '@/assets/stack/nodejs.svg'
import pandasLogo from '@/assets/stack/pandas.svg'
import postgresqlLogo from '@/assets/stack/postgresql.svg'
import pytestLogo from '@/assets/stack/pytest.svg'
import pythonLogo from '@/assets/stack/python.svg'
import reactLogo from '@/assets/stack/react.svg'
import scikitLearnLogo from '@/assets/stack/scikit-learn.svg'
import sqlServerLogo from '@/assets/stack/sql-server.svg'
import sqliteLogo from '@/assets/stack/sqlite.svg'
import typescriptLogo from '@/assets/stack/typescript.svg'
import ubuntuLogo from '@/assets/stack/ubuntu.svg'

import type { TechName } from './techNames'

// Record her adin bir logosu olmasini zorunlu tutar, listeye yeni bir ad
// eklenip logosu unutulursa derleme hata verir.
export const techLogos: Record<TechName, string> = {
  Python: pythonLogo,
  PostgreSQL: postgresqlLogo,
  React: reactLogo,
  Pandas: pandasLogo,
  Docker: dockerLogo,
  Excel: excelLogo,
  'Node.js': nodejsLogo,
  'SQL Server': sqlServerLogo,
  FastAPI: fastapiLogo,
  Jupyter: jupyterLogo,
  TypeScript: typescriptLogo,
  SQLite: sqliteLogo,
  Git: gitLogo,
  Matplotlib: matplotlibLogo,
  Ubuntu: ubuntuLogo,
  MySQL: mysqlLogo,
  Pytest: pytestLogo,
  'scikit-learn': scikitLearnLogo,
}
