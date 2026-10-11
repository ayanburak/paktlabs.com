import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App.tsx'
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
