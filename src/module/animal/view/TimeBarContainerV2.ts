/**
 * on 2015-01-24
 * by leo
 */

class TimeBarContainerV2 extends egret.DisplayObjectContainer
{
    private timeBar:TimeBarV2;
    private bg:egret.Shape;

    private building:BuildingIso;
    private leftTime:number;
    private where:number;

    public constructor()
    {
        super();


        this.init();
    }

    private init():void
    {
        this.bg = new egret.Shape();
        this.bg.width = Lyrs.SW;
        this.bg.height = Lyrs.SH;
        this.bg.touchEnabled = true;

        this.timeBar = new TimeBarV2();

        this.addChild(this.bg);

        this.addChild(this.timeBar);

        this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.timeBar.addEventListener(GameEvent.SPEED, this.onSpeed, this)
    }

    public onSpeed(e:GameEvent):void
    {
        GameEvent.BubbEvent(e);

        if(UserController.instance.isDiamondEnough(SpeedModel.getSpeed(this.leftTime)))
        {

            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_OK);


            if(MapConst.WHERE_FARM == this.where)
            {
                FarmController.getInstance().speed(<FarmBuilding>this.building);
            }
            else if(MapConst.WHERE_TREE == this.where)
            {
                TreeController.getInstance().speed(<TreeBuilding>this.building);
            }
            //else if(MapConst.WHERE_ANIMAL == this.where)
            //{
            //    BreedingPlantController.getInstance().speed(<BreedingPlantBuilding>this.building, this.animal, this.animalCopy);
            //
            //    BreedGuideController.getInstance().nextStep();
            //}
        }
        else
        {
            //弹出购买钻石包含在判断中
        }

        this.onClose(null);
    }

    public updateTime(leftTime:number):void
    {
        if(0 == leftTime)
        {
            this.onClose(null);
            return;
        }

        this.leftTime = leftTime;
        this.timeBar.updateTime(this.leftTime);
    }

    public setPosition(pos:egret.Point):void
    {
        this.timeBar.x = pos.x;
        this.timeBar.y = pos.y;
    }

    public onClose(e:egret.TouchEvent):void
    {
        GameEvent.BubbEvent(e);

        if(TimeBarContainerV2.getInstance().parent)
        {
            TimeBarContainerV2.getInstance().parent.removeChild(TimeBarContainerV2.getInstance());
        }
        Global.useTimeBarV2Obj = 0;
        this.where = 0;
        this.building = null;
        this.leftTime = 0;
    }

    public onShow(where:number, ...args):void
    {
        this.onClose(null);

        Lyrs.LYRS_UI_2.addChild(TimeBarContainerV2.getInstance());


        this.where = where;
        this.building = args[0];



        var pos:egret.Point = this.getPosByBuilding(this.building);
        this.setPosition(pos);

        var dm:DepotModel;
        var leftTime:number;

        if(MapConst.WHERE_FARM == this.where)
        {
            Global.useTimeBarV2Obj = this.building.hashCode;

            dm = DepotModel.getModelById((<FarmBuilding>this.building).data.product.itemId);

            leftTime = (<FarmBuilding>this.building).assistLogic.getLeftTime();

        }
        else if(MapConst.WHERE_TREE == this.where)
        {
            Global.useTimeBarV2Obj = this.building.hashCode;

            dm = DepotModel.getModelById((<TreeBuilding>this.building).assistLogic.model.harvestItemId);

            leftTime = (<TreeBuilding>this.building).assistLogic.getLeftTime();
        }

        this.updateTime(leftTime);
        this.timeBar.product_img.source = RES.getRes(dm.imgId);

    }

    private getPosByBuilding(building:BuildingIso):egret.Point
    {
        var pos:egret.Point;

        var endX:number = building.x;
        var endY:number = building.y + ZoomLogic.TILE_H;

        pos = building.parent.localToGlobal(endX, endY);

        return pos;
    }

    //===================================================
    public getSpeedBtn():egret.DisplayObject
    {
        return this.timeBar.speed_btn;
    }

    //===================================================
    private static _instance:TimeBarContainerV2;

    public static getInstance():TimeBarContainerV2
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new TimeBarContainerV2();
        }
        return this._instance;
    }
}