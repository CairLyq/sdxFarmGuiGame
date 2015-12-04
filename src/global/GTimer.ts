/**
 * on 2014-12-15
 * by leo
 */
class GTimer
{

    private observers:IGTimer[];

    private timer:egret.Timer;
    /**
     * 前后端时间差
     */
    private timeGap:number;
    private loginTS:number;//s

    public constructor()
    {
        this.observers = [];
        this.timer = new egret.Timer(Global.SECOND);
    }

    /**
     * 服务器时间，单位：秒（second)
     * @returns {number}
     */
    public get serverTime():number
    {
        return this.serverMiniTime / 1000;
    }
    /**
     * 服务器时间，单位：毫秒（minisecond)
     * @returns {number}
     */
    public get serverMiniTime():number
    {
        return ( new Date().getTime() + this.timeGap );
    }

    /**
     * 登录时间，单位：秒（second)
     * @returns {number}
     */
    public get loginTime():number
    {
        return this.loginTS;
    }

    public setTime(param:number):void
    {
        this.timeGap = param - ( new Date() ).getTime();
        this.loginTS = param / 1000;
    }

    public register(observer:IGTimer):void
    {
        this.observers.push(observer);

        if(1 == this.observers.length)
        {
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.notify, this);
            this.timer.start();
        }
    }


    public unRegister(observer:IGTimer):void
    {
        var idx:number = this.observers.indexOf(observer);
        if(Global.NOT_FOUND != idx)
        {
            this.observers.splice(idx, 1);
        }
        if(0 == this.observers.length)
        {
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.notify, this);
            this.timer.stop();
        }
    }

    public notify():void
    {
        var i:number;
        var len:number = this.observers.length;
        var lenNow:number = 0;

        for(i = 0; i < len; i++)
        {
            this.observers[i].second();

            lenNow = this.observers.length;
            if(lenNow < len)
            {
                i--;
                len = lenNow;
            }
        }
    }

    //=====================================================
    private static _instance:GTimer;

    public static getInstance():GTimer
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new GTimer();
        }
        return this._instance;
    }
}