<template>

    <div>
        <Navbar @add-task="addTask" />
        <div class="container" v-if="showTasks">
            <TaskList 
                :tasks="tasks" 
                @update-task="updateTask"
                @delete-task="deleteTask" />
        </div>
    </div>

</template>

<script lang="ts" setup>

import TaskList from '@/components/TaskList.vue';
import Navbar from '@/components/Navbar.vue';

import { Task } from '@/types/task';
import { reactive, ref, computed, onMounted } from 'vue';

let showTasks: boolean = true;

let tasks = ref<Task[]>([
    {
        taskName: 'DummyTask1',
        durationNow: 0,
        durationTotal: 30,
        lastTime: null,
        running: false
    }
]);

onMounted(() => {
    loadTasksFromStorage();
})

function toggleShowTasks() {
    showTasks = !showTasks;
}

function updateTask(task: Task, start: boolean) {
    if (start) {
        task.running = start;
        task.lastTime = performance.now();
    }
    else {
        task.running = start;
        saveTime(task, performance.now() - task.lastTime);
        updateTasksInStorage();
    }
}

function saveTime(task: Task, duration: number) {
    duration = Math.floor(duration / 1000);
    duration = Math.round(duration / 60 * 100) / 100;
    task.durationTotal += duration;
    task.durationNow = duration;
}

function addTask(taskName: string) {
    tasks.value.push(new Task(taskName));
    updateTasksInStorage();
}

function deleteTask(task: Task) {
    let index = tasks.value.indexOf(task);
    tasks.value.splice(index, 1);
    updateTasksInStorage();
}

function loadTasksFromStorage() {
    const tasksJson: string | null = localStorage.getItem("UserTasks");
    if (tasksJson) {
        tasks.value = JSON.parse(tasksJson);
        console.log(tasks);
    }

}

async function updateTasksInStorage() {
    localStorage.removeItem("UserTasks");
    // tasks.value.forEach(task => {
    //     task.running = false;
    // });
    localStorage.setItem("UserTasks", JSON.stringify(tasks.value));

}

</script>