/*
file: vite.config.ts

data'nin Vite ayari. Site tek sayfali bir uygulama oldugu icin ortak
siteConfig'e yalnizca port eklenir.

description: data sitesini ortak ayarla ve kendi portuyla derleyen Vite ayari.
*/

import { siteConfig } from '@paktlabs/config/vite'

// landing 5173'te calisir, iki site ayni anda acik gelistirilebilsin diye
// data bir sonraki portu kullanir
export default siteConfig({ root: import.meta.dirname, port: 5174 })
