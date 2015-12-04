/**
 * on 2015-01-07
 * by leo
 */

class Camera
{
    public constructor()
    {
    }

    /*public focus(building:ItemIso, callback:Function = null):void
     {
     var tar:egret.DisplayObjectContainer = Lyrs.LYRS_SCENE;

     var p:egret.Point = Lyrs.LYRS_ITEM_IN_SCENE.localToGlobal(building.x, building.y);
     var dx:number = Lyrs.SW * .5 - p.x;
     var dy:number = Lyrs.SH * .5 - 50 - p.y;
     var tryX:number = Math.floor(tar.x + dx);
     var tryY:number = Math.floor(tar.y + dy);

     var endP:egret.Point = ScenePosCheck.check(tryX, tryY);

     callback = callback || new Function();
     egret.Tween.get(tar).to({x:endP.x, y:endP.y}, 200).call(callback, building);

     }*/

    public focus(building:ItemIso, callback:Function = new Function()):void
    {
        var tar:egret.DisplayObjectContainer = Lyrs.LYRS_SCENE;

        var p:egret.Point = Lyrs.LYRS_ITEM_IN_SCENE.localToGlobal(building.x, building.y);
        var dx:number = Lyrs.SW * .5 - p.x;
        var dy:number = Lyrs.SH * .5 - 50 - p.y;
        var tryX:number = Math.floor(tar.x + dx);
        var tryY:number = Math.floor(tar.y + dy);

        var endP:egret.Point = ScenePosCheck.check(tryX, tryY);

        egret.Tween.get(tar).to({x:endP.x, y:endP.y}, 200).call(DragLogic.getInstance().cut).call(callback);
    }

    public focusToPoint(point:egret.Point, callback:Function = null):void
    {

        var tar:egret.DisplayObjectContainer = Lyrs.LYRS_SCENE;
        callback = callback || new Function();
        egret.Tween.get(tar).to({x:point.x, y:point.y}, 200).call(callback);

    }

    //===============================================================
    private static _instance:Camera;

    public static getInstance():Camera
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new Camera();
        }
        return this._instance;
    }
}