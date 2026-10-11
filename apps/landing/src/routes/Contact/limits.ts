/*
file: limits.ts
importable: limits

Formdaki metin alanlarinin en fazla uzunlugu. Birim Unicode kod noktasidir,
UTF-16 birimi degil, servis de Python len ile boyle sayar. Degerler servisteki
services/contact-api/app/schema.py ile ayni kalmali, servisin tests/test_contract.py
dosyasi bu dosyayi okuyup ikisini karsilastirir.

description: Iletisim formundaki dort metin alaninin en fazla uzunluklarini tutan modul.
*/

export const limits = {
  name: 100,
  email: 254,
  company: 120,
  message: 4000,
} as const
