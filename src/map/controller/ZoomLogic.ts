/**
 * Created by leo on 15/1/28.
 */

class ZoomLogic extends egret.EventDispatcher
{
    public static TILE_SIZE:number = 32;

    public static TILE_W:number = 64;//100;
    public static TILE_H:number = 32;//50;

    public static BG_WIDTH:number = 2000;
    public static BG_HEIGHT:number = 2000;

    public static scale:number = 1;
    //===================================================
    public scaleArr:number[];
    public curIdx:number;
    public maxIdx:number;
    public minIdx:number;

    public constructor()
    {
        super();

        this.scaleArr = [.6, 1, 1.4];
        this.curIdx = 1;
        this.minIdx = 0;
        this.maxIdx = this.scaleArr.length - 1;
    }

    public zoomBig():void
    {
        if(this.curIdx == this.maxIdx)
        {
            return;
        }
        var preScale:number = this.scaleArr[this.curIdx];
        this.curIdx++;
        this.exe(preScale);
    }

    public zoomSmall():void
    {
        if(this.curIdx == this.minIdx)
        {
            return;
        }
        var preScale:number = this.scaleArr[this.curIdx];
        this.curIdx--;
        this.exe(preScale);
    }

    public exe(preScale:number):void
    {
        var newScale:number = this.scaleArr[this.curIdx];
        this.resetVars(newScale);

        var ratio:number = NumberUtils.decimal_K(newScale / preScale, 2);

        console.log("==========================ratio: ", ratio);
        var offsetX:number = Math.round((Math.abs(Lyrs.LYRS_SCENE.x) + Lyrs.SW * .5) * (1 - ratio));
        var offsetY:number = Math.round((Math.abs(Lyrs.LYRS_SCENE.y) + Lyrs.SH * .5) * (1 - ratio));

        console.log("==========================SCENE 1: ", Lyrs.LYRS_SCENE.x, Lyrs.LYRS_SCENE.y);
        console.log("==========================offset: ", offsetX, offsetY);
        var tryX:number;
        var tryY:number;

        tryX = Lyrs.LYRS_SCENE.x + offsetX;
        tryY = Lyrs.LYRS_SCENE.y + offsetY;


        var pos:egret.Point = DragPosCheck.check(tryX, tryY);

        egret.Tween.get(Lyrs.LYRS_SCENE).to({scaleX:newScale, scaleY:newScale, x:pos.x, y:pos.y}, 200).call(()=>
        {
            console.log("==========================SCENE 2: ", Lyrs.LYRS_SCENE.x, Lyrs.LYRS_SCENE.y);
        });

        GameUI.instance.hideZoomGray();
        if( this.curIdx == this.maxIdx )
        {
            GameUI.instance.disableBig();
            return;
        }
        if( this.curIdx == this.minIdx )
        {
            GameUI.instance.disableSmall();
        }
    }

    private resetVars(newScale:number):void
    {
        ZoomLogic.scale = newScale;

        ZoomLogic.TILE_SIZE = 32 * ZoomLogic.scale;

        ZoomLogic.TILE_W = 64 * ZoomLogic.scale;
        ZoomLogic.TILE_H = 32 * ZoomLogic.scale;

        ZoomLogic.BG_WIDTH = 2000 * ZoomLogic.scale;
        ZoomLogic.BG_HEIGHT = 2000 * ZoomLogic.scale;

        var itemList:ItemIso[] = DepthManager.getInstance().itemList;
        var i:number;
        var len:number = itemList.length;
        var one:ItemIso;

        for(i = 0; i < len; i++)
        {
            one = itemList[i];
            one.setPosByScreen(new egret.Point(one.x, one.y));
        }
    }

    //================================================================================
    private static _instance:ZoomLogic;

    public static getInstance():ZoomLogic
    {
        if(ZoomLogic._instance)
        {
            return ZoomLogic._instance;
        }
        else
        {
            ZoomLogic._instance = new ZoomLogic();
        }
        return ZoomLogic._instance;
    }
}