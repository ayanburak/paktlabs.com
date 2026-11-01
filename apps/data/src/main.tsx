/*
file: main.tsx

index.html'in girisi. Diger sitelerden farkli olarak brand'deki mount
kullanilmaz, cunku dil saglayicisini router'la birlikte App kurar. Bilinmeyen
her adres de bu girise duser, sayfayi router secer.

description: data sitesini acan giris dosyasi.
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'
import '@paktlabs/brand/styles/global.css'
import './styles/tokens.css'

// Root elemani yoksa sessizce bos sayfa yerine neyin eksik oldugunu soyler.
const root = document.getElementById('root')
if (!root) throw new Error('main: #root elemani bulunamadi')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
