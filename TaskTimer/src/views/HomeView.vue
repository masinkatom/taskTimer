<template>

    <div>
        <Navbar @add-task="addTask" />
        <div class="container">
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

let tasks = ref<Task[]>([
    {
        taskName: 'DummyTask1',
        durationNow: 0,
        durationTotal: 86300000,
        lastTime: null,
        running: false
    }
]);

onMounted(() => {
    loadTasksFromStorage();
})

function updateTask(task: Task, start: boolean) {
    if (start) {
        task.running = start;
        task.lastTime = Date.now();
        updateTasksInStorage();
    }
    else {
        task.running = start;
        console.log("lastTime: " + task.lastTime);
        saveTime(task, Date.now() - task.lastTime);
        updateTasksInStorage();
    }
}

function saveTime(task: Task, duration: number) {
    //duration = Math.floor(duration / 1000 / 60);
    duration = Math.round(duration * 100) / 100;
    task.durationTotal = Math.round((task.durationTotal + duration)* 100) / 100;
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
    if (tasksJson && tasksJson !== undefined) {
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