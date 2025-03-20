<template>
    <nav class="container">
        <h1>TaskTimah</h1>
        <button id="addTask" @click="handleAddTask"><img src="/material-plus.svg" alt="Add"></button>
    </nav>
</template>

<script setup lang="ts">

const emit = defineEmits(['add-task']);

function handleAddTask() {
    const newTaskName = prompt("Enter task name:");
    if (newTaskName) {
        emit('add-task', newTaskName);
    }
}

</script>

<style scoped>
nav {
    display: flex;
    justify-content: space-between;
}

button {
    border-style: hidden;
}

img {
    height: 80%;
    width: 80%;
}
</style>