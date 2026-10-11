/*
file: css.spec.ts

Derlenmis CSS in eski tarayicilarda calisacak bicimde kaldigini kontrol eder.
Eski Safari range syntax i ve container sorgularini gecersiz sayip kuralin
tamamini sessizce yok sayar, mobil yerlesim bu yuzden hicbir hata vermeden
kaybolur. Denetimin kendisi iki sitenin ortak yardimcisindadir.

description: Sayfanin yukledigi CSS lerde range syntax ve container sorgusu olmadigini olcen test.
*/

import { test } from '@playwright/test'
import { expectClassicMediaQueries } from '@paktlabs/config/testing/support'

test('the built stylesheets use only classic media queries', async ({ page }) => {
  await expectClassicMediaQueries(page)
})
