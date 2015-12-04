/**
 * on 2015-01-07
 * by leo
 * 各种组合缓动
 */
class TweenIt
{


    public static tweenBigThenNormal(obj:egret.DisplayObject, callback:Function = null, targetObj?: any):void
    {
        callback = callback || new Function();
        egret.Tween.get(obj).to({scaleX:1.2, scaleY:1.2}, 100).to({scaleX:1, scaleY:1}, 100).call(callback, targetObj);
    }

    public static tweenBubble(obj:egret.DisplayObject, callback:Function = null):void
    {
        callback = callback || new Function();
        egret.Tween.removeTweens(obj);
        egret.Tween.get(obj).to({scaleX:1.2, scaleY:1.2}, 100).to({scaleX:1, scaleY:1}, 100).call(callback);
    }

    public static tweenBigThenTimeout(obj:egret.DisplayObject, callback:Function = null):void{

        callback = callback || new Function();

        egret.Tween.get(obj).to({scaleX:1.2, scaleY:1.2}, 100).call(function()
        {
            egret.Tween.get(obj).to({scaleX:1, scaleY:1}, 100).call(function(){
                var stim: any = window.setTimeout(function(){
                    window.clearTimeout(stim);
                    callback.call(this);
                    delete stim;
                }, 200);
            });
        });

    }

    //public tweenNormal(obj:egret.DisplayObject, callback:Function):void
    //{
    //    callback = callback || new Function();
    //
    //    egret.Tween.get(obj).to({scaleX:1, scaleY:1}, 100).call(callback);
    //
    //}
    /**
     * @param displayObject
     * @param state1
     * @param state2
     * @param time
     * @param num   循环次数；只能传入 >= 0; 默认0，循环无限次；
     * @param callback  num 循环次数结束后，执行回调方法
     */
    public static loopTween(displayObject:egret.DisplayObject, state1:Object, state2:Object,
                            time:number = 400, num:number = 0, callback:Function = null, thisObject:any = null ):void
    {
        onComplete();

        function onComplete()
        {
            if( 0 == num )
            {
                tween();
                return;
            }

            if( 1 == num )
            {
                num = -1;
                tween();
                return;
            }

            if( num < 0 )
            {
                if( null != callback )
                {
                    callback.apply( thisObject );
                }
                return;
            }

            num--;
            tween();
        }

        function tween()
        {
            egret.Tween.get(displayObject).to(state1, time).to(state2, time).call(onComplete);
        }
    }
}