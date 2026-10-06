<template>
    <div class="app-container">
        <header class="app-header">
            <h1>Pokedex</h1>
            <p>
                Клиент-серверное взаимодействие:<br />
                <code>Vue 3</code> → <code>FastAPI</code> →
                <code>PokeAPI</code>
            </p>
        </header>

        <form class="search-form" @submit.prevent="searchPokemon">
            <input
                v-model="query"
                type="text"
                class="search-input"
                placeholder="Введите имя покемона (например, pika)..."
            />
            <div class="search-actions">
                <button type="submit" class="search-btn" :disabled="loading">
                    {{ loading ? "Поиск..." : "Найти" }}
                </button>
                <button
                    type="button"
                    class="test-btn"
                    @click="testEndpoint"
                    :disabled="loading"
                >
                    Проверить /test
                </button>
            </div>
        </form>

        <div v-if="loading" class="status-message loading">Загрузка...</div>
        <div v-else-if="error" class="status-message error">{{ error }}</div>

        <div
            v-if="testResult !== null"
            class="status-message"
            :class="testResult ? 'success' : 'error'"
        >
            {{ testResult ? "Эндпоинт /test отвечает" : "Эндпоинт /test не отвечает" }}
        </div>

        <RequestLog :logs="logs" />

        <div v-if="pokemons.length" class="results-info">
            Найдено: <strong>{{ total }}</strong>
            <span v-if="total > pokemons.length">
                (показаны первые {{ pokemons.length }})
            </span>
        </div>
        <div v-else-if="searched && !loading && !error" class="no-results">
            Ничего не найдено. Попробуйте другой запрос.
        </div>

        <div class="pokemon-list">
            <PokemonCard v-for="p in pokemons" :key="p.id" :pokemon="p" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { api } from "./api.js";
import RequestLog from "./components/RequestLog.vue";
import PokemonCard from "./components/PokemonCard.vue";

const query = ref("");
const pokemons = ref([]);
const total = ref(0);
const loading = ref(false);
const error = ref("");
const logs = ref([]);
const testResult = ref(null);
const searched = ref(false);

const addLog = (log) => {
    logs.value.unshift(log);
    if (logs.value.length > 20) logs.value.pop();
};

const searchPokemon = async () => {
    if (!query.value.trim()) return;
    loading.value = true;
    error.value = "";
    searched.value = true;
    try {
        const { data, log } = await api.searchPokemon(query.value);
        pokemons.value = data.results || [];
        total.value = data.count || 0;
        if (data.error) error.value = data.error;
        addLog(log);
    } catch (e) {
        error.value = "Ошибка сети или сервера";
        pokemons.value = [];
        addLog({ method: "GET", url: `/search/${query.value}`, status: "ERR", time: 0 });
    } finally {
        loading.value = false;
    }
};

const testEndpoint = async () => {
    try {
        const { ok, log } = await api.checkTest();
        testResult.value = ok;
        addLog(log);
    } catch (e) {
        testResult.value = false;
        addLog({ method: "GET", url: "/test", status: "ERR", time: 0 });
    }
};
</script>
