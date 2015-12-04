/**
 * on 2015-01-06
 * by leo
 */

class TweenParam
{
    public time:number;
    public ease:any;
    public srcAlpha:number;
    public desAlpha:number;

    public srcX:number;
    public srcY:number;
    public desX:number;
    public desY:number;

    public constructor()
    {
        this.time = Global.PANLE_TWEEN_TIME;
        this.ease = egret.Ease.cubicInOut;
        this.desAlpha = 1;
        this.srcAlpha = 0;
    }
}