<template>
    <div class="in-column">
        <h2>{{ task.taskName }}</h2>
        <div class="in-row space-between">
            <div class="in-column center-vertical" >
                <p>Naposledy:<br> {{ msToTime(task.durationNow) }}</p>
                <p>Celkovo:<br> {{ msToTime(task.durationTotal) }}</p>
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

function msToTime (miliseconds: any) {
  const pad = (n: any, z = 2) => ('00' + n).slice(-z);
  const hh = pad(miliseconds / 3.6e6 | 0);
  const mm = pad((miliseconds % 3.6e6) / 6e4 | 0);
  const ss = pad((miliseconds % 6e4) / 1000 | 0);
  const mmm = pad(miliseconds % 1000, 3);
 
  return `${hh}h${mm}m${ss}s`
}

</script>


<style scoped>

h2 {
    margin: 0;
    margin-bottom: 1rem;
    padding: 1.5rem 1rem;
    border-radius: 5px;
    border: 1px solid;
}

@media (max-width: 600px) {
    button {
        width: 10rem;
    }
    #btn-delete {
        width: 10rem;
    }
}

</style>
