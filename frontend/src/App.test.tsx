import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'

vi.mock('./api/generated', () => ({
  health: vi.fn().mockResolvedValue({
    data: { status: 'ok' },
    error: undefined,
  }),
}))

vi.mock('./api/generated/client', () => ({
  createClient: vi.fn(() => ({})),
}))

afterEach(cleanup)

describe('главная страница', () => {
  it('показывает заголовок и ведёт в Каталог типов встреч', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Записывайте встречи и управляйте временем' }),
    ).toBeInTheDocument()

    await userEvent.click(screen.getByRole('link', { name: 'Записаться' }))

    expect(
      screen.getByRole('heading', { name: 'Запись на встречу' }),
    ).toBeInTheDocument()
  })

  it('открывает заглушку Каталога типов встреч по прямому адресу', () => {
    render(
      <MemoryRouter initialEntries={['/booking']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByText('Каталог типов встреч')).toBeInTheDocument()
  })
})
