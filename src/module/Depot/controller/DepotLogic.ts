/**
 * Created by rodey on 15/3/3.
 */

class DepotLogic extends egret.EventDispatcher implements IGTimer{

    public cnt: number;
    public totalCnt: number;
    public building: DepotBuilding;
    public controller: DepotController;

    constructor(building: DepotBuilding){
        super();
        this.building = building;
        this.controller = this.building.controller;
    }

    public second(): void{
        this.cnt--;

        /*if(this.building.restoreBuildTimeBar){
            this.building.restoreBuildTimeBar.updateTime(this.cnt);
        }*/

        if(RestoreBuildTimeBarContainer.instance.isOpen){
            RestoreBuildTimeBarContainer.instance.updateTimeBar(this.cnt);
        }

        //console.log(this.building.model.name + " ==================", this.cnt)
        if(this.cnt <= 0){

            this.stopCnt();
            //这里处理完成

            return;
        }

    }

    public startCnt(cnt:number, totalCnt?: number):void
    {
        this.stopCnt();

        GTimer.getInstance().register(this);
        this.cnt = cnt;
        this.totalCnt = totalCnt;
    }

    public stopCnt():void
    {
        this.cnt = 0;
        GTimer.getInstance().unRegister(this);
    }

    //处理时间完成
    private timeOver(): void{


    }


}

