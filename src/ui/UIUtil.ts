/**
 * Created by Gordon on 24/April/15.
 * @class UIUtil
 * @constructor
 **/
class UIUtil
{
    public static stageRect:egret.Rectangle = new egret.Rectangle(0, 0, Lyrs.SW, Lyrs.SH);

    private static bound:egret.Rectangle = new egret.Rectangle(0, 0, 0, 0);
    private static point:egret.Point = new egret.Point();
    public static getBounds( item:egret.DisplayObject ):egret.Rectangle
    {
        var bound:egret.Rectangle = UIUtil.bound;
        var point:egret.Point = UIUtil.point;
        point.x = point.y = bound.x = bound.y = bound.width = bound.height = 0;

        item.getBounds(bound);
        item.localToGlobal(bound.x, bound.y, point);
        bound.x = point.x;
        bound.y = point.y;
        bound.width = bound.width * ZoomLogic.scale;
        bound.height = bound.height * ZoomLogic.scale;

        return bound;
    }
    public static intersectStage( item:egret.DisplayObject ):boolean
    {
        return UIUtil.getBounds( item ).intersects( UIUtil.stageRect);
    }

    public static getShadow( width:number, height:number ):egret.Shape
    {
        var shape:egret.Shape = new egret.Shape();
        var g:egret.Graphics = shape.graphics;
        //g.beginFill( 0x000000, 0.3 );
        g.beginFill( 0x000000, 1 );
        g.drawEllipse( 0, 0, width, height );
        g.endFill();
        //g.beginFill( 0x000000, 0.5 );
        g.beginFill( 0xFF0000, 1 );
        g.drawEllipse( 0, 0, width * 0.66, height * 0.66 );
        g.endFill();

        return shape;
    }
}