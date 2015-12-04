/**
 * Created by rodey on 14/12/10.
 *
 * 生成时间进度条
 *
 */

class TimeProgressBar extends egret.DisplayObjectContainer{

    //总时间
    private time: number;
    private current: number;
    //总次数、间隔
    private count: number = 100;
    private delay: number = 1000;
    //进度条
    private thumb: BitmapEx;
    private masker: egret.Rectangle;
    //时间显示
    private timeLabel: egret.gui.Label;
    private data: any;
    private timer: egret.Timer;
    public clockUI: BitmapEx;

    public labelFunction: Function;
    public timerFunction: Function;



    constructor(time: number, delay?: number, count?: number, clock?: boolean){
        super();

        this.time = time;
        this.current = time;
        count && (this.count = count);
        delay && (this.delay = delay);

        this.width = 100;
        this.height = 34;
        this.data = {
            time: time,
            year:0,
            month: 0,
            day: 0,
            hours: 0,
            minute: 0,
            second: 0
        };

        //渲染
        this.render(clock);
        //开始执行进度
        this.start();

    }

    /**
     * 创建元素
     */
    private render(clock?: boolean): void{

        //进度条底
        var barBack: BitmapEx = new BitmapEx('SCJZ-jindutiaohui');
        this.addChild(barBack);
        barBack.x = 20;
        barBack.y = (this.height - barBack.height) * .5;

        //创建进度条
        this.thumb = new BitmapEx('SCJZ-jingdutiao');
        this.addChild(this.thumb);
        this.thumb.x = 21;
        this.thumb.y = (this.height - this.thumb.height) * .5;
        //this.thumb.scaleX = 0;

        //创建一个遮罩
        this.masker = new egret.Rectangle(0, 0, 0, 24);
        this.thumb.mask = this.masker;

        //创建显示文本
        this.timeLabel = new egret.gui.Label();
        this.addChild(this.timeLabel);
        this.timeLabel.x = 32;
        this.timeLabel.y = 6;
        this.timeLabel.stroke = 2;
        this.timeLabel.strokeColor = 0x5E3700;
        this.timeLabel.size = 22;
        this.timeLabel.textAlign = 'center';
        this.timeLabel.text = "0\"0'";

        //时钟
        var clock: boolean = clock;
        this.clockUI = new BitmapEx('SCJZ-shizhong');
        this.addChild(this.clockUI);
        this.clockUI.x = 0;
        this.clockUI.y = 0;

    }

    /**
     * 开始进度
     */
    private start(): void{
        this.timer = new egret.Timer(this.delay);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComplateHandler, this);
        this.timer.start();
    }

    private timerHandler(evt: egret.TimerEvent): void{
        //console.log(this.getLabel());
        if(!this.timerFunction){
            var value = this.getLabel();
            this.timeLabel.text = (isNaN(parseInt(value)) || parseInt(value) == 0) ? "0" : value;
            var pre = this.time / this.current;
            var w = 78 - pre * 78;
            this.masker = new egret.Rectangle(0, 0, w, 24);
            this.thumb.mask = this.masker;
        }else{
            this.timerFunction.call(this, evt);
        }
        if(this.time <= 0){
            this.timeLabel.text = '0';
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
            this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComplateHandler, this);
        }
        this.time--;

    }

    public removeHandler(): void{
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComplateHandler, this);
    }

    private timerComplateHandler(evt: egret.TimerEvent): void{
        console.log('complate......')
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComplateHandler, this);
        //this.timer.dispatchEvent(new egret.Event);
    }

    /**
     * 更新时间
     * @param value
     */
    public updateTime(value: number): void{
        this.removeHandler();
        if(value == this.time)
            return;
        this.time = value;
        this.start();
    }

    /**
     * 时间显示格式
     * @returns {string}
     */
    public getLabel(time?: number): string{
        if(!this.labelFunction){
            var m: number = Math.floor((this.time / 60) % 60);
            var s: number = Math.floor(this.time  % 60);
            this.data.m = m;
            this.data.s = s;
            return m + '"' + s + "'";
        }else{
            return this.labelFunction.call(this, this.data);
        }
    }

}
