const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// Запрос к серверу с замером времени для журнала
async function request(path) {
  const url = `${BASE_URL}${path}`;
  const startTime = performance.now();
  const response = await fetch(url);
  const data = await response.json();
  const time = Math.round(performance.now() - startTime);
  return {
    ok: response.ok,
    data,
    log: { method: "GET", url: path, status: response.status, time },
  };
}

export const api = {
  // Поиск покемонов по части имени
  searchPokemon(query) {
    return request(`/search/${encodeURIComponent(query)}`);
  },

  // Проверка эндпоинта /test
  checkTest() {
    return request("/test");
  },
};
