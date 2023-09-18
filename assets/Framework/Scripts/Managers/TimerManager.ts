import { Component, Node } from 'cc';

class TimerNode {
    public timerId: number = 0; // timerId

    public OnTimerHanlder: Function = null; // Timer触发时候的回调
    public self: any = null; // 进入到timer触发以后，这个函数里面的this是谁
    public udata: any = null; // 用户自定义的参数

    public repeat: number = 0;   // timer的重复次数
    public interval: number = 0; // 每次触发的时间间隔

    public isRemoved: boolean = false; // 做一个标记，标记个是否要移除;

    public nextTriggerTime: number = 0; // 触发时间
    public passedTime: number = 0; // 过去的时间;
}

export class TimerManager extends Component {
    public static Instance: TimerManager = null;

    private autoIncId: number = 1; // 从1开始，但是不为0;
    private timerNodes: Array<TimerNode> = null;

    protected onLoad(): void {
        if(TimerManager.Instance !== null) {
            this.destroy();
            return;
        }

        TimerManager.Instance = this;
    }

    public Init(): void {
        this.autoIncId = 1;
        this.timerNodes = new Array<TimerNode>();
    }

    public ScheduleWithParam(OnTimer: Function, caller: any, 
                             udata: any, repeat: number, 
                             interval: number, delay: number): number {
        var timerNode = new TimerNode();
        timerNode.timerId = this.autoIncId ++;
        if(this.autoIncId === 0) {
            this.autoIncId = 1;
        }

        timerNode.OnTimerHanlder = OnTimer;
        timerNode.self = caller;
        timerNode.udata = udata;
        timerNode.repeat = (repeat <= 0)? -1 : repeat;
        timerNode.interval = interval;

        timerNode.nextTriggerTime = delay;
        timerNode.passedTime = 0;

        this.timerNodes.push(timerNode);

        return timerNode.timerId;
    }

    public Schedule(OnTimer: Function, caller: any, 
                    repeat: number, interval: number, 
                    delay: number): number {
        return this.ScheduleWithParam(OnTimer, caller, null, repeat, interval, delay);
    }

    public ScheduleOnce(OnTimer: Function, caller: any, delay: number): number {
        return this.Schedule(OnTimer, caller, 1, 0, delay);
    }

    public ScheduleOnceWithParam(OnTimer: Function, caller: any, udata: any, delay: number): number {
        return this.ScheduleWithParam(OnTimer, caller, udata, 1, 0, delay);
    }

    public UnSchedule(timerId): void {
        for(var i = 0; i < this.timerNodes.length; i ++) {
            if(this.timerNodes[i].timerId === timerId) {
                this.timerNodes[i].isRemoved = true;
                return;
            }
        }
    }

    protected update(dt: number): void {
        if(this.timerNodes === null || this.timerNodes.length === 0) {
            return;
        }

        for(var i = 0; i < this.timerNodes.length; i ++) {
            var timerNode: TimerNode = this.timerNodes[i]; 
            if(timerNode.isRemoved === true) {
                continue;
            }

            timerNode.passedTime += dt;
            if(timerNode.passedTime >= timerNode.nextTriggerTime) {
                timerNode.OnTimerHanlder.call(timerNode.self, timerNode.udata);

                if(timerNode.repeat !== -1) {
                    timerNode.repeat --;
                }
                
                if(timerNode.repeat === 0) {
                    // this.UnSchedule(timerNode.timerId);
                    timerNode.isRemoved = true;
                    return;
                }

                timerNode.nextTriggerTime = timerNode.interval;
                timerNode.passedTime = 0;
            }
        }

        // 删除掉isRemove为True的TimerNode;
        for(var i = 0; i < this.timerNodes.length; i ++) {
            if(this.timerNodes[i].isRemoved === true) {
                this.timerNodes.splice(i, 1);
                i --;
            }
        }
        // end
    }
}


