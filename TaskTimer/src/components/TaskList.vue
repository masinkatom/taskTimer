<template>
    <div>
        <TaskItem class="task-item" 
            v-for="task in tasks" 
            :class="{ running: task.running }" 
            :task=task
            @update-task="(task, start) => $emit('update-task', task, start)"
            @delete-task="(task) => $emit('delete-task', task)">
        </TaskItem>
    </div>

</template>

<script setup lang="ts">
import type { Task } from '@/types/task';
import TaskItem from './TaskItem.vue';

defineProps<{
    tasks: Task[]
}>();

const emits = defineEmits(['update-task', 'delete-task']);

</script>


<style>
.task-item {
    width: 100%;
    display: flex;
    margin: 1rem 0;
    padding: 1rem 1rem;
    background-color: var(--color-lt-grey);
    transition: box-shadow 300ms;
}

.running {
    background-color: var(--color-dk-purple);
}

.task-item:hover {
    box-shadow: 0px 0px 50px 10px var(--color-secondary);
}
</style>