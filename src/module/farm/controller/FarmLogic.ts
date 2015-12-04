/**
 * on 2014-12-23
 * by leo
 */

class FarmLogic implements IGTimer
{
    public model:FarmModel;
    private building:FarmBuilding;

    private passCnt:number;

    public isPlanted:boolean = false;
    public isRipe:boolean = false;


    public constructor(paramItem:FarmBuilding)
    {
        this.building = paramItem;


        this.passCnt = 0;

    }

    public second():void
    {
        this.passCnt++;

        this.updateTimeIM();

        var t1:number = Number(this.model.stateTime[0]);
        var t2:number = Number(this.model.stateTime[1]);
        var t3:number = Number(this.model.stateTime[2]);
        var res:string;
        if(t1 == this.passCnt)
        {
            res = this.model.imgArr[1];
            this.addCrop(res);
        }
        else if(t2 == this.passCnt)
        {
            res = this.model.imgArr[2];
            this.addCrop(res);
        }
        else if(t3 == this.passCnt)
        {
            res = this.model.imgArr[3];
            this.addCrop(res);
            this.isRipe = true;

            this.stopCnt();
        }
        else if(this.passCnt > t3)
        {
            console.log("==========================农作物超过生产时间");
            return;
        }
    }

    public updateTimeIM():void
    {
        if(this.building.hashCode == Global.useTimeBarV2Obj)
        {
            TimeBarContainerV2.getInstance().updateTime(this.getLeftTime());
        }
    }

    //=======================================
    public updateState(paramData:any):void
    {
        if(paramData)
        {
            this.model = FarmModel.getModelByProductId(paramData.itemId);

            if(MapConst.FARM_RIPE == paramData.status)
            {
                res = this.model.imgArr[3];
                this.isRipe = true;
            }
            else if(MapConst.FARM_NO_RIPE == paramData.status)
            {
                var cnt:number = Math.floor(GTimer.getInstance().serverTime - paramData.startDate * .001);

                var res:string;
                var t1:number = Number(this.model.stateTime[0]);
                var t2:number = Number(this.model.stateTime[1]);
                var t3:number = Number(this.model.stateTime[2]);

                if(cnt < t1)
                {
                    res = this.model.imgArr[0];
                    this.startCnt(cnt);
                }
                else if(cnt >= t1 && cnt < t2)
                {
                    res = this.model.imgArr[1];
                    this.startCnt(cnt);
                }
                else if(cnt >= t2 && cnt < t3)
                {
                    res = this.model.imgArr[2];
                    this.startCnt(cnt);
                }
            }

            this.addCrop(res);

            this.isPlanted = true;
        }
    }

    public addCrop(res:string):void
    {
        //this.removeState();
        //var bmp:egret.Bitmap = new egret.Bitmap();
        //bmp.texture = RES.getRes(res);
        //this.building.stateLyr.addChild(bmp);
        //bmp.x = -MapConst.CONST_TILE_W * .5;//-ZoomLogic.TILE_W * .5;
        //bmp.y = MapConst.CONST_TILE_H * .5 - this.building.cropState.height;//ZoomLogic.TILE_H * .5 - bmp.height;
        //
        //RES.getResAsync( res, ()=>{
        //    this.building.cropState.texture = RES.getRes( res );
        //    this.building.cropState.x = -MapConst.CONST_TILE_W * .5;
        //    this.building.cropState.y = MapConst.CONST_TILE_H * .5 - this.building.cropState.height;
        //}, this );


        RES.getResAsync( res, ()=>{
            this.removeState();
            var bmp:egret.Bitmap = new egret.Bitmap();
            bmp.texture = RES.getRes(res);
            this.building.stateLyr.addChild(bmp);
            bmp.x = -MapConst.CONST_TILE_W * .5;//-ZoomLogic.TILE_W * .5;
            bmp.y = MapConst.CONST_TILE_H * .5 - bmp.height;//ZoomLogic.TILE_H * .5 - bmp.height;
        }, this );
    }



    //=============================================
    public plant(itemId:number):void
    {
        this.model = FarmModel.getModelByProductId(itemId);

        this.addCrop(this.model.imgArr[0]);

        //this.plant_cb();
        this.isPlanted = true;
    }

    public plant_cb():void
    {
        this.startCnt(0);

        //this.isPlanted = true;


        //var obj:Object = {};
        //obj["itemId"] = itemId;
        //obj["itemNum"] = this.assistModel.num;
        //obj["startDate"] = GTimer.getInstance().serverTime;
        //obj["endDate"] = (GTimer.getInstance().serverTime + this.assistModel.time)*1000;
        //obj["status"] = 0;
        //obj["status"] = 0;
        //obj["userBuildingId"] = this.building.data.userBuildingId;
        //this.building.data["product"] = obj;
    }

    public removeState():void
    {
        this.building.stateLyr.removeChildren();
    }

    public harvest():void
    {
        this.removeState();

        this.harvest_cb();

        FarmGuideController.getInstance().nextStep();
    }

    public harvest_cb():void
    {
        this.stopCnt();

        this.isRipe = false;

        this.isPlanted = false;

        this.building.data.product = null;
    }

    public speed_cb():void
    {
        this.isRipe = true;

        this.stopCnt();

        this.addCrop(this.model.imgArr[3])
    }

    //=============================================
    public show():void
    {
        if(this.isPlanted)
        {
            if(this.isRipe)
            {
                UIMgr.instance.show(PanelName.TOOLS_PANEL, {direction:Direction.NONE, alpha:0}, ToolConst.HARVEST_FARM, this.building);
            }
            else
            {
                TimeBarContainerV2.getInstance().onShow(MapConst.WHERE_FARM, this.building);
            }
        }
        else
        {
            UIMgr.instance.show(PanelName.SEED_PANEL, {direction:Direction.NONE, alpha:0}, this.building);
        }
    }

    //=============================================
    public startCnt(cnt:number):void
    {
        this.stopCnt();
        GTimer.getInstance().register(this);
        this.passCnt = cnt;
    }

    public stopCnt():void
    {
        GTimer.getInstance().unRegister(this);
        this.passCnt = 0;
    }

    public getLeftTime():number
    {
        return this.model.time - this.passCnt;
    }
}