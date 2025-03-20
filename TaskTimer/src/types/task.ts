export class Task {
    taskName: string;
    durationNow: number;
    durationTotal: number;
    lastTime: any;
    running: boolean;

    constructor(taskName: string) {
        this.taskName = taskName;
        this.durationNow = 0;
        this.durationTotal = 0;
        this.lastTime = null;
        this.running = false;
    }
}


