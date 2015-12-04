/**
 * Created by Gordon on 07/01/15.
 */
module Icon
{
    /**
     * @param begin 必需已经被addChild了
     * @param target 必需已经被addChild了
     * @param x target.x的偏移量
     * @param y target.y的偏移量
     */
    export function moveTo( begin:egret.DisplayObject, target:egret.DisplayObject, callback?:Function, x:number = 0, y:number = 0, params?:any ):void
    {
        var beginPoint:egret.Point = begin.parent.localToGlobal( begin.x, begin.y );
        Lyrs.LYRS_ICON_PARENT.addChild( begin );
        begin.x = beginPoint.x;
        begin.y = beginPoint.y;

        var targetPoint = target.parent.localToGlobal( target.x, target.y );

        var ease = egret.Ease.sineIn;
        var time:number = getDistance( begin, target ) * 1.5;
        var waitTime:number = 100;

        var to:any = { x:targetPoint.x + x, y:targetPoint.y + y };
        if( params && String(params['alpha']).length > 0 )
        {
            to['alpha'] = params['alpha'];
        }
        if( params && String(params['time']).length > 0 )
        {
            time = params['time'];
        }
        if( params && String(params['waitTime']).length > 0 ){
            waitTime = params['waitTime'];
        }

        egret.Tween.get( begin ).wait( waitTime ).to( { x: beginPoint.x + 10, y: beginPoint.y + 60 }, 600 ).call( ()=>{
            egret.Tween.get( begin ).wait( waitTime ).to( to, time, ease ).call( ()=>{
                egret.Tween.removeTweens(begin);
                Lyrs.LYRS_ICON_PARENT.removeChild( begin );
                if(callback && typeof callback === 'function')
                {
                    callback.call(this, begin, target);
                }
            });
        });

    }

    export function moveToRemove( begin:egret.DisplayObject, target:egret.DisplayObject, callback?:Function, x:number = 0, y:number = 0, params?:any ):void
    {
        var beginPoint:egret.Point = begin.parent.localToGlobal( begin.x, begin.y );
        Lyrs.LYRS_ICON_PARENT.addChild( begin );
        begin.x = beginPoint.x;
        begin.y = beginPoint.y;

        var targetPoint = target.parent.localToGlobal( target.x, target.y );

        var ease = egret.Ease.sineIn;
        var time:number = getDistance( begin, target ) * 1.5;
        var waitTime: number = 200;

        var to:any = { x:targetPoint.x + x, y:targetPoint.y + y };
        if( params && String(params['alpha']).length > 0 )
        {
            to['alpha'] = params['alpha'];
        }
        if( params && String(params['time']).length > 0 )
        {
            time = params['time'];
        }
        if( params && String(params['waitTime']).length > 0 ){
            waitTime = params['waitTime'];
        }

        egret.Tween.get( begin ).wait( waitTime ).to( to, time, ease ).call( ()=>{
            egret.Tween.removeTweens(begin);
            Lyrs.LYRS_ICON_PARENT.removeChild( begin );
            if(callback && typeof callback === 'function')
            {
                callback.call(this, begin, target);
            }
        });

    }

    /**
     * 获取两个显示对象的距离
     * @param begin
     * @param target
     * @returns {number}
     */
    export function getDistance( begin:egret.DisplayObject, target:egret.DisplayObject ):number
    {
        return Math.sqrt( Math.pow( begin.x - target.x, 2 ) + Math.pow( begin.y - target.y, 2 ) );
    }
    /**
     * 设置显示对象锚点为0.5，并且保持坐标位置
     */
    export function setAnchor( target:egret.DisplayObject ):void
    {
        target.anchorX = target.anchorY = 0.5;
        target.x += ( target.width * 0.5 );
        target.y += ( target.height * 0.5 );
    }

    /**
     * 根据道具id获取图片
     * @param itemId
     * @returns {number}
     */
    export function getItemBitmap( itemId:number ):egret.Bitmap
    {
        var model:DepotModel = DepotModel.getModelById( itemId );
        if( null == model )
        {
            return null;
        }
        var texture:egret.Texture = RES.getRes( model.imgId );
        if( null == texture )
        {
            return null;
        }
        return new egret.Bitmap( texture );
    }
    /**
     * 获取经验图片
     * @param type 类型：0：小图标；1：中图标；2：大图标
     * @returns {egret.Bitmap}
     */
    export function getExpBitmap( type:number = 0 ):egret.Bitmap
    {
        var imgURL:Array<string> = [ 'TT-jinyanzhi', 'jinyanzhi', 'jinyanzhi' ];
        var texture:egret.Texture = RES.getRes( imgURL[ type ] );
        if( null == texture )
        {
            return null;
        }
        return new egret.Bitmap( texture );
    }
    /**
     * 获取金币图片
     * @param type 类型：0：小图标；1：中图标；2：大图标
     * @returns {egret.Bitmap}
     */
    export function getGoldBitmap( type:number = 0 ):egret.Bitmap
    {
        var imgURL:Array<string> = [ 'jinbi', 'jinbi', 'jinbi' ];
        var texture:egret.Texture = RES.getRes( imgURL[ type ] );
        if( null == texture )
        {
            return null;
        }
        return new egret.Bitmap( texture );
    }
}