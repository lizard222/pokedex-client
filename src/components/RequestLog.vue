<template>
    <div class="log-container">
        <button class="log-toggle" @click="isOpen = !isOpen">
            <span>Журнал запросов ({{ logs.length }})</span>
            <span class="arrow" :class="{ rotated: isOpen }">▼</span>
        </button>
        <table v-if="isOpen" class="log-table">
            <thead>
                <tr>
                    <th>Метод</th>
                    <th>URL</th>
                    <th>Статус</th>
                    <th>Время</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(log, index) in logs" :key="index">
                    <td>{{ log.method }}</td>
                    <td class="url-cell">{{ log.url }}</td>
                    <td :class="log.status === 200 ? 'ok' : 'fail'">{{ log.status }}</td>
                    <td>{{ log.time }} мс</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    logs: { type: Array, default: () => [] },
});

const isOpen = ref(props.logs.length > 0);

// Разворачиваем журнал при появлении новых записей
watch(
    () => props.logs.length,
    (newLen) => {
        if (newLen > 0) isOpen.value = true;
    },
);
</script>
