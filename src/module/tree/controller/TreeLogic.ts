/**
 * on 2014-12-23
 * by leo
 */

class TreeLogic implements IGTimer
{
    public model:TreeModel;
    public isRipe:boolean;
    private passCnt:number;
    public isDead:boolean;
    private building:TreeBuilding;


    private HARVEST_TIMES:number = 3;
    private deadState:number = 10;

    public constructor(paramItem:TreeBuilding)
    {
        this.building = paramItem;
        this.model = TreeModel.getModelByBuildingId(this.building.model.buildingId);
        this.isRipe = false;
        this.isDead = false;
        this.passCnt = 0;
    }

    public second():void
    {
        if(this.isRipe)
        {
            return;
        }
        this.passCnt++;

        this.updateTimeIM();

        if(this.model.time == this.passCnt)
        {
            this.isRipe = true;
            this.stopCnt();
            this.changeState();
        }
    }

    public updateTimeIM():void
    {
        if(this.building.hashCode == Global.useTimeBarV2Obj)
        {
            TimeBarContainerV2.getInstance().updateTime(this.getLeftTime());
        }
    }

    public changeState():void
    {
        var scale:number = 1;
        if(this.isDead)
        {
            this.building.setImage(this.model.imgArr[2])
        }
        else
        {
            var harvestCnt:number = this.building.data.level;
            if(0 == harvestCnt)
            {
                scale = .6;
            }
            else if(1 == harvestCnt)
            {
                scale = .8;

            }else if(2 == harvestCnt)
            {
                scale = 1;
            }

            if(this.isRipe)
            {
                this.building.setImage(this.model.imgArr[1]);
            }
            else
            {
                this.building.setImage(this.model.imgArr[0]);
            }
        }
        this.building.setImageScale(scale);
    }

    public harvest():void
    {
        this.harvest_cb();
    }

    public harvest_cb():void
    {
        if(this.isDead)
        {
            return;
        }

        if(2 == this.building.data.level)
        {
            this.building.data.status = this.deadState;
        }
        else
        {
            this.building.data.level++;
        }
        this.isDead = (this.deadState == this.building.data.status)?true:false;
        this.isRipe = false;
        this.changeState();

        this.startCnt(0);
    }


    public speed_cb():void
    {
        this.isRipe = true;

        this.stopCnt();

        this.changeState();
    }

    public updateState(paramData:any):void
    {
        if(paramData)
        {
            this.isDead = (this.deadState == paramData.status)?true:false;

            if(this.isDead)
            {
                this.isRipe = false;
            }
            else
            {
                var leftCnt:number = Math.round(paramData.updateDate * .001 - GTimer.getInstance().serverTime);

                if(leftCnt > 0)
                {
                    this.isRipe = false;
                    this.startCnt(this.model.time - leftCnt);
                }
                else
                {
                    this.isRipe = true;
                }
            }

            this.changeState();
        }
    }

    //=============================================

    public show():void
    {
        if(this.isDead)
        {
            UIMgr.instance.show(PanelName.TOOLS_PANEL, {direction:Direction.NONE}, ToolConst.FELL_TREE, this.building);
        }
        else
        {
            if(this.isRipe)
            {
                UIMgr.instance.show(PanelName.TOOLS_PANEL, {direction:Direction.NONE}, ToolConst.HARVEST_TREE, this.building);
            }
            else
            {
                TimeBarContainerV2.getInstance().onShow(MapConst.WHERE_TREE, this.building);
            }
        }
    }


    //=============================================
    public startCnt(passCnt:number):void
    {
        this.stopCnt();
        GTimer.getInstance().register(this);
        this.passCnt = passCnt;
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