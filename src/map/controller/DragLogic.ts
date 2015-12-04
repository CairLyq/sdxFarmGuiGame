/**
 * on 2014-12-09
 * by leo
 * 地图拖动逻辑
 */
class DragLogic
{

    private point:egret.Point;

    private isLock:boolean;

    public constructor()
    {

        this.isLock = false;

        Lyrs.LYRS_SCENE.touchEnabled = true;
        Lyrs.LYRS_SCENE.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    }

    public setLock(v:boolean):void
    {
        this.isLock = v;
    }

    private onTouchBegin(e:egret.TouchEvent):void
    {
        //GameEvent.BubbEvent(e);

        if(this.isLock)
        {
            return;
        }

        this.point = TransUtils.globalToLocal(Lyrs.LYRS_SCENE, new egret.Point(e.stageX, e.stageY));

        this.addListeners();
    }


    private onMove(e:egret.TouchEvent):void
    {

        //GameEvent.BubbEvent(e)

        var tryX:number = Math.round(e.stageX - this.point.x);
        var tryY:number = Math.round(e.stageY - this.point.y);

        var pos:egret.Point = DragPosCheck.check(tryX, tryY);

        if(MapConst.DEBUG_MAP)
        {
            Lyrs.LYRS_SCENE.x = tryX;
            Lyrs.LYRS_SCENE.y = tryY;
        }
        else
        {
            Lyrs.LYRS_SCENE.x = pos.x;
            Lyrs.LYRS_SCENE.y = pos.y;
        }

        Background.instance.onMove();

        this.cut();
    }

    public cut():void
    {
        var buildingList:ItemIso[] = DepthManager.getInstance().getBuildings();

        var i:number;
        var len:number;
        var item:ItemIso;

        len = buildingList.length;
        for(i = 0; i < len; i++)
        {
            item = buildingList[i];
            (<BuildingIso>item).playOrStopAnimation( UIUtil.intersectStage( item ) );
        }

        var rubbishList:ItemIso[] = DepthManager.getInstance().getRubbish();

        len = rubbishList.length;
        for(i = 0; i < len; i++)
        {
            item = rubbishList[i];
            item.visible = UIUtil.intersectStage( item );
        }
    }

    private onTouchEnd(e:egret.TouchEvent):void
    {
        this.dispose();
    }

    public dispose():void
    {
        this.point = null;
        this.removeListeners();
    }

    //===================================================
    private addListeners():void
    {
        this.removeListeners();

        Lyrs.LYRS_SCENE.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        Lyrs.LYRS_SCENE.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }

    private removeListeners():void
    {
        Lyrs.LYRS_SCENE.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        Lyrs.LYRS_SCENE.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }

    //===============================================================
    private static _instance:DragLogic;

    public static getInstance():DragLogic
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new DragLogic();
        }
        return this._instance;
    }
}