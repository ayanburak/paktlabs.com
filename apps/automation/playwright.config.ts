/*
file: playwright.config.ts

automation testlerinin Playwright ayari. Ortak ayar packages/config altindaki
siteTestConfig'tedir, burada yalnizca uretim derlemesinin acilacagi port
verilir. Port her sitede farkli, dort sitenin testleri ayni anda kosabilir.

description: automation sitesinin testlerini ortak ayarla ve kendi portuyla calistiran Playwright ayari.
*/

import { siteTestConfig } from '@paktlabs/config/playwright'

export default siteTestConfig({ port: 4176 })
