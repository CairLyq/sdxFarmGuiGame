/**
 * Created by rodey on 14/12/30.
 */

class ProcessFactoryLogic extends egret.EventDispatcher implements IGTimer{

    public cnt: number;
    public totalCnt: number;
    public building: ProcessFactoryBuilding;
    public controller: ProcessFactoryController;
    public view: game.ProductionPanel;
    private static num:number = 0;

    constructor(building: ProcessFactoryBuilding){
        super();
        this.building = building;
        this.controller = this.building.processFactoryController;
        this.view = UIMgr.instance.getPanel(PanelName.PRODUCTION_PANEL);

        //新手引导 (面包机)
        if(BuildingID.BREAD_PRODUCT == this.building.model.buildingId)
        {
            ProcessFactoryLogic.num++;
        }
        //新手引导 (饲料机)
        else if(BuildingID.PLASTIC_PRODUCT == this.building.model.buildingId){

        }

    }

    public second(): void{
        this.cnt--;

        if(this.view)
        {
            this.view.updateTime2(this.building);
        }

        //console.log(this.building.model.name + " ==================", this.cnt)
        if(this.cnt <= 0){
            var self = this;
            this.stopCnt();

            //是否打开面板状态
            if(this.view && this.view.isOpended && this.building == this.view.getBuilding()){

                //生产完成移动 动画
                var doingData: any = this.building.doingProduct || this.view.doingProduct;

                this.controller.updateProductStatus(doingData.userProductId);

                this.controller.upDoingToComplateGroup(doingData, this.building);

            }else{
                //这里处理生产完成
                this.productTimeOver();
                //继续生产下一个
                this.building.startData(this.building.data);
                //更新面板
                //this.controller.setData(this.building);

                /*if(201 === this.building.model.buildingId){
                    ProductGuideController.getInstance().autoComplate();
                }*/
            }

            return;

        }

    }

    public startCnt(cnt:number, totalCnt?: number):void
    {

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
    private productTimeOver(): void{
        for(var i: number = 0; i < this.building.data.products.length; ++i){
            if(this.building.data.products[i].status <= 0 || this.building.data.products[i].endDate <= Date.now()){
                this.building.data.products[i].status = 1;
                this.building.data.products[i].endDate = Date.now() - 1000;
                break;
            }
        }

        //TipText.instace.play('有一个物品已经生产完成了！', null, 2000);
        TipText.instace.play(Language.getString( 3, 17 ), null, 2000);
        console.log('有一个物品已经生产完成了！', this.cnt);

        //停止动画
        if(this.building.haveProducting() == false){
            this.building.stopAnimate();
        }

        //显示可收获标识
        console.log('是否有可以收获的: ', this.building.haveComplateProduct())
        if(this.building.haveComplateProduct() == true){
            this.building.createHarvestAsset();
        }

    }


}
