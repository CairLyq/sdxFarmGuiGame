/**
 * on 2014-12-08
 * by leo
 */

class TransUtils
{
    //straggered trans
    //public static screen2Iso(pos:egret.Point):egret.Point
    //{
    //    var re:egret.Point = new egret.Point();
    //
    //    //re.y = 2 * pos.y / Constant.TILE_H;
    //    //re.y = Math.floor(re.y);
    //    //re.x = pos.x / Constant.TILE_W - (re.y & 1) * .5;
    //    //re.x = Math.floor(re.x);
    //
    //
    //
    //    var isoX:number = 0;
    //    var isoY:number = 0;
    //    var cx:number, cy:number, rx:number, ry:number;
    //    cx = Math.floor(pos.x / Constant.TILE_W) * Constant.TILE_W + Constant.TILE_W / 2;
    //    cy = Math.floor(pos.y / Constant.TILE_H) * Constant.TILE_H + Constant.TILE_H / 2;
    //    rx = (pos.x - cx) * Constant.TILE_H / 2;
    //    ry = (pos.y - cy) * Constant.TILE_W / 2;
    //    if(Math.abs(rx) + Math.abs(ry) <= Constant.TILE_W * Constant.TILE_H / 4)
    //    {
    //        isoX = Math.floor(pos.x / Constant.TILE_W);
    //        isoY = Math.floor(pos.y / Constant.TILE_H) * 2;
    //    }
    //    else
    //    {
    //        pos.x = pos.x - Constant.TILE_W / 2;
    //        isoX = Math.floor(pos.x / Constant.TILE_W) + 1;
    //        pos.y = pos.y - Constant.TILE_H / 2;
    //        isoY = Math.floor(pos.y / Constant.TILE_H) * 2 + 1;
    //    }
    //
    //    re.x = isoX - (isoY & 1);
    //    re.y = isoY;
    //
    //    return re;
    //}
    //
    //public static iso2Screen(pos:egret.Point):egret.Point
    //{
    //
    //    var re:egret.Point = new egret.Point();
    //
    //    re.x = pos.x * Constant.TILE_W + (pos.y & 1) * Constant.TILE_W * .5;
    //    re.y = pos.y * Constant.TILE_H * .5;
    //
    //    re.x = Math.floor(re.x);
    //    re.y = Math.floor(re.y);
    //
    //    return re;
    //}

    //====================================

    //public static getZBuff(mx:number, my:number):number
    //{
    //var TILE_SIZE:number = 50；
    //var re:number = (mx * TILE_SIZE + my * TILE_SIZE - (_size.x + _size.y) * TILE_SIZE / 2) * .866 - my * .707;
    //var re:number = (mx + my) * .866 - 0 * .707;
    //// _position 是object在等角地图的node节点下标。
    //// TILE_SIZE是地图图块最小单位的尺寸，
    //// _size是这个object在等角地图中的尺寸，
    //// 0.866和0.707则是两个修正系数
    //return re;
    //}


    //ratio
    public static Y_CORRECT:number = 1.2247448713915892;

    //把等角空间中的一个3D坐标点转换成屏幕上的2D坐标点
    //public static isoToScreen(pos:Point3D):egret.Point
    //{
    //    var screenX:number = Math.round(pos.x - pos.z) / ZoomLogic.scale;
    //    var screenY:number = Math.round(pos.y * this.Y_CORRECT + (pos.x + pos.z) * 0.5) / ZoomLogic.scale;
    //    return new egret.Point(screenX, screenY);
    //}

    public static isoToScreen(isoP:Point3D):egret.Point
    {
        var isoP2:Point3D = new Point3D(isoP.x * ZoomLogic.TILE_SIZE, 0, isoP.z * ZoomLogic.TILE_SIZE);
        //===================================================
        var sx:number = Math.round(isoP2.x - isoP2.z) / ZoomLogic.scale;
        var sy:number = Math.round(isoP2.y * this.Y_CORRECT + (isoP2.x + isoP2.z) * 0.5) / ZoomLogic.scale;
        //===================================================
        return new egret.Point(sx, sy);
    }

    //把屏幕上的2D坐标点转换成等角空间中的一个3D坐标点
    //public static screenToIso(point:egret.Point):Point3D
    //{
    //    //point.x *= Variable.scale;
    //    //point.y *= Variable.scale;
    //    var posX:number = point.y + point.x * .5;
    //    var posY:number = 0;
    //    var posZ:number = point.y - point.x * .5;
    //    return new Point3D(posX, posY, posZ);
    //}

    public static screenToIso(sP:egret.Point):Point3D
    {
        var tmp:egret.Point = new egret.Point();
        tmp.x = sP.x * ZoomLogic.scale;
        tmp.y = sP.y * ZoomLogic.scale;

        //===================================================
        var posX:number = Math.round((tmp.y + tmp.x * .5) / ZoomLogic.TILE_SIZE);
        var posY:number = 0;
        var posZ:number = Math.round((tmp.y - tmp.x * .5) / ZoomLogic.TILE_SIZE);
        //===================================================

        return new Point3D(posX, posY, posZ);
    }

    //===================================================
    public static globalToLocal(localObj:egret.DisplayObject, globalPos:egret.Point):egret.Point
    {
        var re:egret.Point = localObj.globalToLocal(globalPos.x, globalPos.y);
        re.x *= ZoomLogic.scale;
        re.y *= ZoomLogic.scale;

        return re;
    }
}
