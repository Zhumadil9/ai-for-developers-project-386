import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { createClient } from './api/generated/client'
import { health } from './api/generated'
import './App.css'

function HomePage() {
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')

  useEffect(() => {
    health({ client: createClient({ baseUrl: '' }) })
      .then(({ data, error }) => setStatus(data && !error ? 'ok' : 'error'))
      .catch(() => setStatus('error'))
  }, [])

  return (
    <main className="home-page">
      <section className="hero-panel">
        <p className="eyebrow">Простое планирование встреч</p>
        <h1>Записывайте встречи и управляйте временем</h1>
        <p className="hero-description">
          Выберите удобное время и организуйте встречу без лишних сообщений.
        </p>
        <Link className="primary-action" to="/booking">
          Записаться
        </Link>
        <p className="service-status" aria-live="polite">
          Сервис: {status === 'ok' ? 'доступен' : status === 'loading' ? 'проверяется' : 'недоступен'}
        </p>
      </section>
    </main>
  )
}

function BookingPlaceholder() {
  return (
    <main className="booking-page">
      <p className="eyebrow">Каталог типов встреч</p>
      <h1>Запись на встречу</h1>
      <p>Каталог типов встреч скоро появится.</p>
      <Link className="back-link" to="/">
        Вернуться на главную
      </Link>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<BookingPlaceholder />} />
      <Route path="*" element={<BookingPlaceholder />} />
    </Routes>
  )
}

export default App
