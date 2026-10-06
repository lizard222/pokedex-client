# pokedex-client

Клиент на Vue 3 + Vite для [pokedex-server](../pokedex-server).

## Запуск

Нужен Node.js 18 или новее. Сервер должен быть уже запущен.

```bash
npm install
npm run dev
```

Откройте адрес, который выведет Vite (обычно http://localhost:5173).

Адрес сервера задаётся в `.env`:

```
VITE_API_BASE_URL=http://localhost:8000
```

Сборка для публикации: `npm run build` (результат в `dist/`).
