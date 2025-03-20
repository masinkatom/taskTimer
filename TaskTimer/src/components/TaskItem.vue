<template>
    <div class="in-column">
        <h2>{{ task.taskName }}</h2>
        <div class="in-row space-between">
            <div class="in-column" >
                <p>Naposledy: {{ task.durationNow }} minút</p>
                <p>Celkovo: {{ task.durationTotal }} minút</p>
            </div>
            <div class="in-column center-vertical center-horizontal">
                <div class="in-column">
                    <button v-if="!task.running" @click="$emit('update-task', task, true);">Štart</button>
                    <button v-if="task.running" @click="$emit('update-task', task, false);">Stop</button>
                </div>
                    <button id="btn-delete" @click="handleDeleteTask(task)"><img src="/material-delete.svg" alt="Del"></button>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types/task';

defineProps<{
    task: Task
}>();

const emits = defineEmits(['update-task', 'delete-task']);

function handleDeleteTask(task: Task) {
    const confirmed = confirm("Delejte?");
    if (confirmed) {
        emits('delete-task', task);
    }
}

</script>


<style scoped>
#btn-delete {
    width: 8rem;
    border-style: none;
}
</style>
