import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import { bookings, createApp, eventTypes } from '../src/app.js'

beforeEach(() => {
  bookings.splice(0)
})

async function firstAvailableStart(app: ReturnType<typeof createApp>) {
  const response = await request(app).get('/event-types/planning/slots')
  expect(response.status).toBe(200)
  expect(response.body.length).toBeGreaterThan(0)
  return response.body[0].start as string
}

function bookingRequest(start: string, eventTypeId = 'planning') {
  return {
    eventTypeId,
    guestName: 'Алия',
    guestEmail: 'aliya@example.com',
    start,
    timezone: 'Asia/Almaty',
  }
}

describe('booking API', () => {
  it('returns Event Types', async () => {
    const response = await request(createApp()).get('/event-types')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(eventTypes)
  })

  it('creates a booking and rejects partial overlap across Event Types', async () => {
    const app = createApp()
    const start = await firstAvailableStart(app)
    const first = await request(app).post('/bookings').send(bookingRequest(start))
    expect(first.status).toBe(201)

    const partialOverlap = new Date(Date.parse(start) + 30 * 60_000).toISOString()
    const conflict = await request(app)
      .post('/bookings')
      .send(bookingRequest(partialOverlap, 'intro'))
    expect(conflict.status).toBe(409)
    expect(conflict.body.message).toContain('overlaps')
  })

  it('allows a booking that starts at an existing booking end', async () => {
    const app = createApp()
    const start = await firstAvailableStart(app)
    await request(app).post('/bookings').send(bookingRequest(start))
    const adjacentStart = new Date(Date.parse(start) + 60 * 60_000).toISOString()
    const adjacent = await request(app).post('/bookings').send({
      ...bookingRequest(adjacentStart, 'intro'),
      guestName: 'Дамир',
      guestEmail: 'damir@example.com',
    })
    expect(adjacent.status).toBe(201)
  })

  it('accepts a start returned by the slots API', async () => {
    const app = createApp()
    const start = await firstAvailableStart(app)
    const response = await request(app).post('/bookings').send(bookingRequest(start))

    expect(response.status).toBe(201)
    expect(response.body.start).toBe(start)
  })

  it('rejects starts outside the 14-day window and working hours', async () => {
    const app = createApp()
    const firstStart = await firstAvailableStart(app)
    const firstStartDate = new Date(firstStart)
    const outsideWindow = new Date(firstStartDate.getTime() + 14 * 24 * 60 * 60_000).toISOString()
    const dateParts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Almaty',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(firstStartDate)
    const day = Object.fromEntries(
      dateParts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]),
    )
    const beforeWorkingHours = `${day.year}-${day.month}-${day.day}T08:30:00+05:00`
    const afterWorkingHours = `${day.year}-${day.month}-${day.day}T17:30:00+05:00`

    for (const start of [outsideWindow, beforeWorkingHours, afterWorkingHours]) {
      const response = await request(app).post('/bookings').send(bookingRequest(start))
      expect(response.status).toBe(400)
      expect(response.body.errors).toContain('start')
    }
  })

  it('returns validation details for invalid data', async () => {
    const response = await request(createApp()).post('/bookings').send({})
    expect(response.status).toBe(400)
    expect(response.body.errors).toEqual(
      expect.arrayContaining(['eventTypeId', 'guestName', 'guestEmail', 'start', 'timezone']),
    )
  })
})
