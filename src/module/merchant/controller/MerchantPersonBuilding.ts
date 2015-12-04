/**
 * Created by rodey on 15/3/2.
 */

class MerchantPersonBuilding extends BuildingIso{

    public controller: MerchantPersonController;
    public logic: MerchantPersonLogic;

    private travelOrders: any;

    constructor(pos:Point3D, paramModel:any){
        super(pos, paramModel);

        this.controller = MerchantPersonController.getInstance();
        this.logic = new MerchantPersonLogic(this);

        //建筑初始化 获取数据
        //this.sendTravelOrders();

        this.setImage(null);
        this.setImageVisible(false);
        this.setImageMC();

    }

    public show(posX:number = 0, posY:number = 0, isFocus:boolean = true): void{

        super.show(posX, posY, isFocus);

        if(this.getIsLock()){
            return;
        }

        if(this.haveTravelOrders()){
            this.controller.sendTravelOrders();
            return;
        }

        if(this.data && this.data.refreshDate){
            var time: number = Math.floor(GTimer.getInstance().serverTime - this.data.refreshDate * .001);
            if(time > Global.MERCHANT_REFRESTDATE){
                this.data.refreshDate = Math.floor(GTimer.getInstance().serverTime);
                this.controller.sendTravelOrders();
                console.log('超过刷新事件，进行刷新...');
                return;
            }
        }

        this.controller.init(this);

    }

    public haveTravelOrders(): boolean{
        return (!this.travelOrders || !this.travelOrders.length || this.travelOrders.length === 0);
    }

    public updateData(data:any): void{
        super.updateData(data);

    }



    public setTravelOrders(data: any): void{
        this.travelOrders = data;
    }

    public getTravelOrders(): any{
        return this.travelOrders;
    }


    public mcFactory: egret.MovieClipDataFactory;
    public mcDisplay: egret.MovieClip;
    public mcName: string;
    private config: string;
    private texture: string;
    //获取动画对应的配置图 (首次)
    private animationId: string;

    public setImageMC(): void{
        super.setImageMC();

        this.config = Global.RESTORE_BUILD_JSON;
        this.texture = Global.RESTORE_BUILD_PNG;
        this.animationId = (BuildingModel.getModelById(this.model.buildingId)).animationId;
        this.initFactory();
        this.initMC(this.animationId);
        this.playAnimate();
    }

    private initFactory(): void{

        this.mcFactory = new egret.MovieClipDataFactory( RES.getRes(this.config), RES.getRes(this.texture) );

    }

    public initMC(mcName?: string): void{

        this.mcDisplay = new egret.MovieClip( this.mcFactory.generateMovieClipData(mcName) );
        this.addChild(this.mcDisplay);
        this.mcDisplay.x = this.model.offsetX;
        this.mcDisplay.y = this.model.offsetY;

    }

    public playAnimate(): void{
        this.mcDisplay && this.mcDisplay.play(-1);
    }

    public stopAnimate(): void{
        this.mcDisplay && this.mcDisplay.stop();
    }

    public playOrStopAnimation(isPlayAnimation:boolean):void
    {
        super.playOrStopAnimation( isPlayAnimation );

        if(isPlayAnimation)
        {
            this.playAnimate();
        }
        else
        {
            this.stopAnimate();
        }
    }


}
