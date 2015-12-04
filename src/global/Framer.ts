/**
 * on 2014-12-15
 * by leo
 */
class Framer
{
    private observers:IFrame[];
    private timer:egret.Timer;

    public constructor()
    {
        this.observers = [];

        this.timer = new egret.Timer(Global.ANIMATION_INTERVAL);
    }

    public register(observer:IFrame):void
    {
        this.observers.push(observer);
        if(1 == this.observers.length)
        {
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.notify, this);
            this.timer.start();
        }
    }


    public unRegister(observer:IFrame):void
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

    public notify(e:egret.Event):void
    {
        var i:number;
        var len:number = this.observers.length;
        var lenNow:number = 0;

        for(i = 0; i < len; i++)
        {
            this.observers[i].frame();

            lenNow = this.observers.length;
            if(lenNow < len)
            {
                i--;
                len = lenNow;
            }
        }
    }
    //=====================================================
    private static _instance:Framer;

    public static getInstance():Framer
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new Framer();
        }
        return this._instance;
    }
}