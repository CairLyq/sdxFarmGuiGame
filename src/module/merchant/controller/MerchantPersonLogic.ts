/**
 * Created by rodey on 15/3/2.
 */

class MerchantPersonLogic extends egret.EventDispatcher implements IGTimer{


    public cnt: number;
    public totalCnt: number;
    public building: MerchantPersonBuilding;
    public controller: MerchantPersonController;
    public view: game.ProductionPanel;
    private static num:number = 0;

    constructor(building: MerchantPersonBuilding){
        super();
        this.building = building;
        this.controller = this.building.controller;
        //this.view = UIMgr.instance.getPanel(PanelName.PRODUCTION_PANEL);
    }

    public second(): void{
        this.cnt--;

        if(this.view)
        {
            //this.view.updateTime2(this.building);
        }

        //console.log(this.building.model.name + " ==================", this.cnt)
        if(this.cnt <= 0){
            var self = this;
            this.stopCnt();
            //这里处理生产完成

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


}
