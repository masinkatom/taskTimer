<template>
    <nav class="container">
        <a :href="link"><h1>TaskTimah</h1></a>
        <button id="addTask" @click="handleAddTask"><img src="/material-plus.svg" alt="Add"></button>
    </nav>
</template>

<script setup lang="ts">
import HomeView from '@/views/HomeView.vue';

const link = "/";
const emit = defineEmits(['add-task']);

function handleAddTask() {
    const newTaskName = prompt("Enter task name:");
    if (newTaskName) {
        emit('add-task', newTaskName);
    }
}

</script>

<style scoped>
a {
    color: var(--color-white);
    text-decoration: none;
}

nav {
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
}

button {
    width: 100%;
    max-width: 12rem;
    border-style: hidden;
}

img {
    height: 80%;
    width: 80%;
}

@media (max-width: 500px) {
    h1 {
        font-size: 3.5rem;
    }
}
</style>