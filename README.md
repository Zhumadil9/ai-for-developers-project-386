# Календарь звонков


[![hexlet-check](https://github.com/Zhumadil9/ai-for-developers-project-386/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Zhumadil9/ai-for-developers-project-386/actions)

Разработайте совместно с ИИ сервис для бронирования календаря

Учебный проект Хекслета: https://ru.hexlet.io/programs/ai-for-developers
Как это должно работать: https://files.hexlet.app/a/2ipc5m

## Стек

- React + TypeScript + Vite
- Express + TypeScript
- TypeSpec + OpenAPI
- Vitest + Supertest
- mise + GitHub Actions

## Установка

<!-- Опишите установку: клонирование, зависимости, переменные окружения -->

```bash
git clone https://github.com/Zhumadil9/ai-for-developers-project-386.git
cd ai-for-developers-project-386
mise run install
```

## Использование

Запустить бекенд:

```bash
mise run dev
```

Запустить фронтенд:

```bash
mise run dev-frontend
```

Запустить все проверки:

```bash
mise run check
```

Собрать Docker-образ:

```bash
mise run docker
```

Запустить образ на произвольном порту:

```bash
docker run --rm --env PORT=4321 --publish 4321:4321 calendar-booking:test
```

Приложение доступно на `http://localhost:4321/`.

## Деплой

Production-сервис разворачивается из корневого `Dockerfile` и слушает переменную
`PORT`, которую задаёт хостинг-платформа.

Проектная конфигурация MCP для GitHub Copilot находится в
[`.vscode/mcp.json`](./.vscode/mcp.json). Она подключает hosted Render MCP OAuth,
не содержит ключей. При первом вызове MCP откройте OAuth-вход Render в браузере.
Для API-key авторизации задавайте секреты только через переменные окружения
хостинга или локальный секретный storage, а не в файлы репозитория.

Public URL сервиса должен быть указан здесь после выкатa:

> Публичная ссылка Render пока не настроена: требуется OAuth-вход MCP хостинга.

Данные бронирований хранятся только в памяти процесса Express. При перезапуске
или redeploy контейнера все записи сбрасываются. Свободные слоты вновь образуются
из настроенных рабочих часов без сохранённого состояния.

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.
