<template>
    <div class="pokemon-card">
        <div class="pokemon-image">
            <img v-if="pokemon.image" :src="pokemon.image" :alt="pokemon.name" />
            <div v-else class="no-image">Нет<br />картинки</div>
        </div>
        <div class="pokemon-info">
            <div class="pokemon-title">
                <span class="pokemon-id">#{{ String(pokemon.id).padStart(4, "0") }}</span>
                <h3>{{ pokemon.name }}</h3>
            </div>
            <div class="types">
                <span
                    v-for="t in pokemon.types"
                    :key="t"
                    class="type-badge"
                    :style="{ background: typeColors[t] || '#777' }"
                >
                    {{ t }}
                </span>
            </div>
            <p class="meta">
                Рост: {{ pokemon.height }} м · Вес: {{ pokemon.weight }} кг
            </p>
            <p class="meta">Способности: {{ pokemon.abilities.join(", ") }}</p>
            <div class="stats">
                <div v-for="s in shownStats" :key="s.key" class="stat-row">
                    <span class="stat-name">{{ s.label }}</span>
                    <div class="stat-bar">
                        <div
                            class="stat-fill"
                            :style="{ width: Math.min(pokemon.stats[s.key], 150) / 1.5 + '%' }"
                        ></div>
                    </div>
                    <span class="stat-value">{{ pokemon.stats[s.key] }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    pokemon: { type: Object, required: true },
});

const shownStats = [
    { key: "hp", label: "HP" },
    { key: "attack", label: "Атака" },
    { key: "defense", label: "Защита" },
    { key: "speed", label: "Скорость" },
];

const typeColors = {
    normal: "#a8a77a", fire: "#ee8130", water: "#6390f0", electric: "#d4b000",
    grass: "#5fa83a", ice: "#5bbfbb", fighting: "#c22e28", poison: "#a33ea1",
    ground: "#c9a64b", flying: "#8f7fd6", psychic: "#f95587", bug: "#92a119",
    rock: "#b6a136", ghost: "#735797", dragon: "#6f35fc", dark: "#705746",
    steel: "#8f8fa8", fairy: "#d685ad",
};
</script>
