/**
 * Created by rodey on 14/12/29.
 */

class ProcessFactoryBuilding extends BuildingIso{

    public processFactoryController: ProcessFactoryController;
    public logic: ProcessFactoryLogic;
    public totalTime: number;
    public animationId: string;
    public stim: any;
    public productAudio: string;
    public harvestAsset: egret.gui.Button;
    public harvestSTIM: any;
    public audioSTIM: any;
    private _doingProduct: any;

    constructor(pos:Point3D, paramModel:any){
        super(pos, paramModel);

        this.processFactoryController = ProcessFactoryController.getInstance();
        this.logic = new ProcessFactoryLogic(this);

        //维修
        this.restoreLogic = new RestoreBuildLogic(this);

        //获取动画对应的配置图 (首次)
        this.animationId = (BuildingModel.getModelById(this.model.buildingId)).animationId;
        //建筑正在生产对应的音效
        this.productAudio = this.animationId; // + '_active';

        this.setImageVisible(false);

        //创建动画
        this.setImageMC();

    }

    public playOrStopAnimation(isPlayAnimation:boolean):void
    {
        super.playOrStopAnimation( isPlayAnimation );

        if(isPlayAnimation && this.haveProducting() == true)
        {
            this.playAnimate();
        }
        else
        {
            this.stopAnimate();
        }
    }
    public show(posX:number = 0, posY:number = 0, isFocus:boolean = true): void{
        super.show(posX, posY, isFocus);

        //新手引导
        GuideManager.getInstance().addForbiden();

        if(this.getIsLock()){
            return;
        }

        var self = this;

        //判断是否正在建筑或维修中...............
        if(self.restoreLogic.cnt > 0){
            //BuildingController.getInstance().showRestoreBuild(self);
            self.restoreLogic.showRestoreBuild(self);
            return;
        }

        self.processFactoryController.setData(self);
        self.processFactoryController.init(self.model.buildingId);

        //this.startProduct();

        self.playAudio();

    }

    public updateData(data:any):void{
        super.updateData(data);

        this.setImageVisible(false);

        //是否正在建造中...
        //this.startRestoreBuild();
        /*if(BuildingController.instance.startRestoreBuild(this)){
            return;
        }*/
        if(this.restoreLogic.startRestoreBuild(this)){
            return;
        }

        //播放正在生产的动画
        this.productingAnimate();

        if(this.data && this.haveComplateProduct() == true){
            //标识是否又可收获物品的状态
            this.createHarvestAsset();
        }

        //开始生产 计时
        this.startProduct();

        //this.setBottomVisible(true)

    }

    public productingAnimate(): void{

        if(this.data && this.haveProducting() == true){
            this.playAnimate();

        }else{
            this.stopAnimate();
        }

    }

    public startProduct(): void{
        var data: any = this.data;
        //获取当前建筑的 正在生产列表
        if(data.products && data.products.length && data.products.length > 0){

            if(this.processFactoryController.getComplateProduct(data.products).length >= 6){
                return;
            }

            var i: number = 0,
                len: number = data.products.length;
            for( ; i < len; ++i){
                //if(data.products[i]['status'] <= 0 || data.products[i]['endDate'] > Date.now()){
                if(data.products[i]['status'] <= 0){
                    var time: number = Math.floor(GTimer.getInstance().serverTime - data.products[i]['endDate'] * .001);
                    var totalTime: number = Math.floor((data.products[i]['endDate'] - data.products[i]['startDate']) * .001);
                    if(time < 0)
                    {
                        this.logic.startCnt(Math.abs(time), totalTime);
                        this.doingProduct = data.products[i];
                    }
                    break;
                }
            }

        }
    }

    public startData(data:any):void{
        //获取当前建筑的 正在生产列表
        if(data.products && data.products.length && data.products.length > 0){

            if(this.processFactoryController.getComplateProduct(data.products).length >= 6){
                //TipText.instace.play('收获队列已满，请先收获物品吧！', null, 2000);
                TipText.instace.play( Language.getString( 3, 15), null, 2000 );
                return;
            }

            var i: number = 0,
                len: number = data.products.length;
            for( ; i < len; ++i){
                //if(data.products[i]['status'] <= 0 || data.products[i]['endDate'] > Date.now()){
                if(data.products[i]['status'] <= 0){
                    var time: number = Math.floor((data.products[i]['endDate'] - data.products[i]['startDate']) * .001);
                    if(time > 0)
                    {
                        this.doingProduct = data.products[i];
                        this.logic.startCnt(time, time);
                    }
                    break;
                }
            }

        }
    }

    public setImageMC(): void{
        super.setImageMC();
        var self = this;

        //替换生产建筑图，改成动画
        var sourceData: any;

        if(this.model.buildingId >= 201 && this.model.buildingId < 209)
        {
            sourceData = ProductionAnimateModel.productionAnimation[0];
        }
        else if(this.model.buildingId >= 209 && this.model.buildingId <=216)
        {
            sourceData = ProductionAnimateModel.productionAnimation[1];
        }else{
            return;
        }

        if(!this.imgMC){
            this.imgMC = new ProductMC( sourceData, this.animationId );
        }

        this.imgMC.stop();
        this.imgMC.alpha = 0;
        this.addChild(this.imgMC);
        this.imgMC.x = this.model.offsetX;
        this.imgMC.y = this.model.offsetY;

        egret.Tween.removeTweens(this.imgMC);
        egret.Tween.get(this.imgMC).to( {alpha: 1}, 300 );

    }

    public setImgMC_BG(imgId: string = null): void{
        super.setImgMC_BG(imgId);
        this.imgMC && this.imgMC.setBackground(imgId || this.animationId + '_bg');
    }

    public delImgMC_BG(): void{
        super.delImgMC_BG();
        this.imgMC && this.imgMC.removeBackground();
    }

    public delImgMC(): void{
        super.delImgMC();
        if(this.getChildIndex(this.imgMC) !== -1){
            this.removeChild(this.imgMC);
            this.imgMC = null;
        }
    }

    public playAnimate(): void{
        var self = this;

        if(!this.imgMC) return;
        this.imgMC.stop();

        if(this.stim){
            window.clearTimeout(this.stim);
        }
        var animateTimeout: number = Math.random() * 3000;
        this.stim = window.setTimeout(function(){

            window.clearTimeout(self.stim);

            if(self.model.ifSmoke == 1){
                //self.imgMC.initSmoke(77, -85); //210
                //添加烟雾动画
                self.imgMC.initSmoke(self.model.smokeOffsetX, self.model.smokeOffsetY);
            }
            self.imgMC.mcDisplay.gotoAndPlay('start', -1);

        }, animateTimeout);

    }

    public stopAnimate(): void{
        if(this.stim){
            window.clearTimeout(this.stim);
        }
        if( null == this.imgMC )
        {
            return;
        }

        if(!this.imgMC) return;

        this.imgMC.stop();
        if(this.model.ifSmoke == 1 && this.imgMC.mcSmoke){
            this.imgMC.removeSmoke();
        }

    }

    public haveProducting(): boolean{
        if(!this.data || !this.data.products || !this.data.products.length){
            return;
        }
        for(var i = 0; i < this.data.products.length; ++i){
            if(this.data.products[i]['status'] == 0){
                return true;
            }
        }
        return false;
    }

    public haveComplateProduct(): boolean{
        for(var i = 0; i < this.data.products.length; ++i){
            if(this.data.products[i]['status'] == 1){
                return true;
            }
        }
        return false;
    }

    public getComplateProducts(): any[]{
        return this.processFactoryController.getComplateProduct(this.data.products);
    }

    //-----标记有收获
    public createHarvestAsset(): void{
        var self = this;

        //之前工作
        this.removeHarvestAsset();

        var product: any = this.processFactoryController.getComplateProduct(this.data.products)[0];

        this.harvestAsset = new egret.gui.Button();
        this.harvestAsset.skinName = skins.uicompenet.Production.HarvestProductSkin;
        this.harvestAsset.icon = product['imgId'];
        this.harvestAsset.anchorX = .5;
        this.harvestAsset.anchorY = 1;
        this.harvestAsset.scaleX = this.harvestAsset.scaleY = .8;
        this.harvestAsset.x = (this.width - this.harvestAsset.width) * .2;
        this.addChild(this.harvestAsset);

        //加入动画
        this.harvestSTIM = window.setInterval(function(){
            TweenIt.loopTween(self.harvestAsset, { scaleX: .6, scaleY: .6, alpha: 1 }, { scaleX: 1, scaleY: 1, alpha: 1 }, 300, 2);
        }, Math.random() * 10000 + 5000);

    }

    public removeHarvestAsset(): void{

        window.clearInterval(this.harvestSTIM);
        if(this.harvestAsset){
            if(this.getChildIndex(this.harvestAsset) !== -1){
                try{
                    this.removeChild(this.harvestAsset);
                }catch (e){}
            }
            this.harvestAsset = null;
        }

    }



    public playAudio(): void{
        var self = this;

        if(this.audioSTIM){
            window.clearTimeout(this.audioSTIM);
        }
        if(this.data && this.haveProducting() == true){

            //播放音效
            window.setTimeout(function(){
                window.clearTimeout(self.audioSTIM);
                SoundMgr.instance.playAudio(self.productAudio);
            }, 1000);

        }

    }

    public stopAudio(): void{
        if(this.audioSTIM){
            window.clearTimeout(this.audioSTIM);
            SoundMgr.instance.stopAudio(this.productAudio);
        }
    }

    //-----设置当前正在生产的
    public get doingProduct(): any{
        return this._doingProduct;
    }
    public set doingProduct(value: any){
        if(this._doingProduct == value){
            return;
        }
        this._doingProduct = value;
    }

}