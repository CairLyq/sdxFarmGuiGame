/**
 * on 2014-12-15
 * by leo
 */

class BuildingLogic
{
    private building:BuildingIso;

    private cnt:number;

    public constructor(param:BuildingIso)
    {
        this.building = param;

        this.stopCnt();
    }

    public tick():void
    {
        if(ModeLogic.getInstance().isEditMode())
        {
            return;
        }
        this.cnt++;


        if(MapConst.SHOW_PICKUP_PROGRESS_TIME == this.cnt)
        {
            PickupProgress.getInstance().show(this.building);
        }
        if(MapConst.ENTER_EDIT_MODE_TIME == this.cnt)
        {
            ModeLogic.getInstance().enterEditMode(this.building);
        }

    }

    //===================================================================
    public stopCnt():void
    {
        this.cnt = 0;
        egret.Ticker.getInstance().unregister(this.tick, this);
    }

    public startCnt():void
    {
        if(this.isMoveable())
        {
            this.stopCnt();
            egret.Ticker.getInstance().register(this.tick, this);
        }
    }

    //===================================================

    public isMoveable():boolean
    {
        return ( 0 != this.building.model.movable );
    }

    public dispose():void
    {
        this.building = null;
    }
}