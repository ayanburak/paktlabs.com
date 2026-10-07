/*
file: techStack.ts
importable: techStack, Tech

Veri sayfasindaki teknoloji seridinde akan araclarin listesi. Sira serideki
siradir. Urun adlari iki dilde de ayni kaldigi icin sozlukte degil burada
durur.

description: Teknoloji seridinde gosterilen araclarin adini ve logosunu tutan liste.
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

export interface Tech {
  name: string
  logo: string
}

export const techStack: Tech[] = [
  { name: 'Python', logo: pythonLogo },
  { name: 'PostgreSQL', logo: postgresqlLogo },
  { name: 'React', logo: reactLogo },
  { name: 'Pandas', logo: pandasLogo },
  { name: 'Docker', logo: dockerLogo },
  { name: 'Excel', logo: excelLogo },
  { name: 'Node.js', logo: nodejsLogo },
  { name: 'SQL Server', logo: sqlServerLogo },
  { name: 'FastAPI', logo: fastapiLogo },
  { name: 'Jupyter', logo: jupyterLogo },
  { name: 'TypeScript', logo: typescriptLogo },
  { name: 'SQLite', logo: sqliteLogo },
  { name: 'Git', logo: gitLogo },
  { name: 'Matplotlib', logo: matplotlibLogo },
  { name: 'Ubuntu', logo: ubuntuLogo },
  { name: 'MySQL', logo: mysqlLogo },
  { name: 'Pytest', logo: pytestLogo },
  { name: 'scikit-learn', logo: scikitLearnLogo },
]
