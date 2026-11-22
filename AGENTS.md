# Правила проекта

- Установка: `mise run install`.
- Запуск бекенда: `mise run dev`; фронтенда: `mise run dev-frontend`.
- Проверки: `mise run check` (контракт, SDK, линтер, типы и тесты).
- Коммиты оформлять по Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`.
- Код лежит в `backend/`, `frontend/` и `contract/`; сгенерированный SDK не редактировать вручную.

## Agent skills

### Issue tracker

GitHub Issues в `Zhumadil9/ai-for-developers-project-386`. See `docs/agents/issue-tracker.md`.

### Triage labels

Используется стандартный набор `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Одноконтекстная структура: `GLOSSARY.md` и `docs/adr/` в корне. See `docs/agents/domain.md`.
