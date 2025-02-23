console.log("caw vuecko");

document.addEventListener("mouseout", warningUserIsLeaving);

function warningUserIsLeaving(){
    if (!event.relatedTarget && !event.toElement) {
        console.log("Hej, vráť sa!"); // Message when the user is about to leave the window
    }
}

const vueApp = Vue.createApp({
    // template: '<h2>som Template</h2>'
    data() {
        return {
            tasks: [
                {
                    taskName: 'DummyTask1',
                    durationToday: 0,
                    durationTotal: 30,
                    running: false
                },
                {
                    taskName: 'DummyTask2',
                    durationToday: 0,
                    durationTotal: 15,
                    running: true
                },
                {
                    taskName: 'DummyTask3',
                    durationToday: 0,
                    durationTotal: 64,
                    running: false
                }
            ],
            showTasks: true,
            
        }
    },
    methods: {
        addTime(e, task, time) {
            task.durationToday += time;
            console.log(e);
        },

        toggleShowTasks() {
            this.showTasks = !this.showTasks;
        },
        toggleRunning(task, setter) {
            task.running = setter;
        }
    },
    computed: {}
});

vueApp.mount('#app');
