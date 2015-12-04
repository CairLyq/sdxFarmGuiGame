/**
 * Created by Gordon on 23/12/14.
 */
module TipMgr
{
    export function showTip( tip:egret.DisplayObject, position?:number, params?: any ):void
    {
        position = position || Direction.TOP;
        var offsetY: number = (params && null != params['offsetY']) ? Number(params['offsetY']) : 0;
        console.log(offsetY);
        switch( position )
        {
            case Direction.TIP_TEXT:
                tip.x = ( Lyrs.SW - tip.width ) / 2;
                tip.y = 130 + offsetY;
                break;
            case Direction.TOP:
                tip.x = ( Lyrs.SW - tip.width ) / 2;
                tip.y = Lyrs.SH * 0.3 + offsetY;
                break;
            case Direction.BOTTOM:
                tip.x = ( Lyrs.SW - tip.width ) / 2;
                tip.y = Lyrs.SH * 0.6 + offsetY;
                break;
            case Direction.CENTER:
                tip.x = ( Lyrs.SW - tip.width ) / 2;
                tip.y = ( Lyrs.SH - tip.height ) / 2 + offsetY;
                break;
            case Direction.NONE:
                if( null != tip.parent )
                {
                    var point:egret.Point = tip.parent.localToGlobal( tip.x, tip.y );
                    tip.x = point.x;
                    tip.y = point.y + offsetY;
                }
                break;
        }
        hide();
        Lyrs.LYRS_TIP.addChild( tip );
        //if( tip instanceof game.ITip )
        if( null != tip['show'] )
        {
            tip['show']();
        }
    }
    export function hide():void
    {
        while( Lyrs.LYRS_TIP.numChildren > 0 )
        {
            var tip:any = Lyrs.LYRS_TIP.getChildAt( 0 );
            if( null != tip['hide'] )
            {
                tip['hide']();
            }
            Lyrs.LYRS_TIP.removeChildAt( 0 );
        }
    }
}