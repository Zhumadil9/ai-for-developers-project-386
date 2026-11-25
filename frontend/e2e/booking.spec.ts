import { expect, test } from '@playwright/test'

test('guest books a slot, repeat booking is rejected, and Owner sees the meeting', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Записаться' }).click()
  await expect(page.getByRole('heading', { name: 'Выберите встречу' })).toBeVisible()

  const slotsResponse = page.waitForResponse(
    (response) => response.url().includes('/event-types/intro/slots') && response.status() === 200,
  )
  await page.getByRole('link', { name: /Знакомство/ }).click()
  await expect(page.getByRole('heading', { name: 'Выберите слот' })).toBeVisible()
  const slots = await (await slotsResponse).json() as Array<{ start: string }>
  expect(slots.length).toBeGreaterThan(0)

  const slot = page.locator('.slots button').first()
  await slot.click()
  await page.getByLabel('Имя').fill('Алия')
  await page.getByLabel('Email').fill('aliya@example.com')
  await page.getByRole('button', { name: 'Записаться' }).click()
  await expect(page.getByRole('heading', { name: 'Встреча подтверждена' })).toBeVisible()

  const repeatedBooking = await page.request.post(new URL('/bookings', page.url()).toString(), {
    data: {
      eventTypeId: 'intro',
      guestName: 'Дамир',
      guestEmail: 'damir@example.com',
      start: slots[0].start,
      timezone: 'Asia/Almaty',
    },
  })
  expect(repeatedBooking.status()).toBe(409)

  await page.goto('/owner/bookings')
  await expect(page.getByRole('heading', { name: 'Предстоящие встречи' })).toBeVisible()
  await expect(page.getByText('Алия')).toBeVisible()
})
