import { siteConfig } from '@paktlabs/config/vite'

// landing 5173'te calisir, iki site ayni anda acik gelistirilebilsin diye
// data bir sonraki portu kullanir
export default siteConfig({ root: import.meta.dirname, port: 5174 })
