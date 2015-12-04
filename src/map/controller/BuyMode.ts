/**
 * on 2015-01-13
 * by leo
 */

class BuyMode extends Mode
{
    private buyUI:BuyUI;
    private isCanBePlaced:boolean;
    private last:egret.Point;
    private now:egret.Point;

    public constructor()
    {
        super();

        this.buyUI = new BuyUI();
    }

    public toBegin(evt:egret.TouchEvent, building:BuildingIso):void
    {
        GameEvent.BubbEvent(evt);

        if(this.building)
        {
            if(this.building == building?0:1)
                return;
        }
        else
        {
            this.building = building;
        }

        //this.last = TransUtils.globalToLocal(Lyrs.LYRS_ITEM_IN_SCENE, new egret.Point(evt.stageX, evt.stageY));
        this.last = Lyrs.LYRS_ITEM_IN_SCENE.globalToLocal(evt.stageX, evt.stageY);

        this.addListeners();
    }

    public toMove(evt:egret.TouchEvent):void
    {
        var mc:MoveCheck = new MoveCheck();
        //this.now = TransUtils.globalToLocal(Lyrs.LYRS_ITEM_IN_SCENE, new egret.Point(evt.stageX, evt.stageY));
        this.now = Lyrs.LYRS_ITEM_IN_SCENE.globalToLocal(evt.stageX, evt.stageY);

        if(mc.check(this.last, this.now))
        {
            var pos:Point3D = TransUtils.screenToIso(this.now);
            this.building.setPosByIso(pos);
            this.isCanBePlaced = CollisionCheck.getInstance().check(this.building);
            this.building.updateBottom(this.isCanBePlaced);
            //DepthManager.getInstance().moveItem(this.building);

            //this.updateUI();
            //this.buyUI.updateUI(this.isCanBePlaced);
            this.buyUI.setBuyBtnVisible(this.isCanBePlaced);

            this.last = this.now;
        }
    }

    public toEnd(evt:egret.TouchEvent):void
    {
        this.last = null;
        this.now = null;
        this.removeListeners();
    }


    //========================================================
    //ui op
    public onCancel(evt:GameEvent):void
    {
        GameEvent.BubbEvent(evt);


        this.removeItem();

        ModeLogic.getInstance().enterNormalMode(this.building);
    }

    public onBuy(evt:GameEvent):void
    {
        GameEvent.BubbEvent(evt);

        if(this.isCanBePlaced)
        {
            BuildingController.getInstance().buy(this.building);
        }
    }

    //public onFlip(evt:GameEvent):void
    //{
    //    GameEvent.BubbEvent(evt);
    //}
    //=======================================================
    public removeItem():void
    {
        this.building.dispose();

        if(this.building && Lyrs.LYRS_ITEM_IN_SCENE.contains(this.building))
        {
            Lyrs.LYRS_ITEM_IN_SCENE.removeChild(this.building);

            DepthManager.getInstance().popItem();
        }
    }

    public removeBuyUI():void
    {
        //this.buyUI.dispose();

        if(this.buyUI.parent)
        {
            this.buyUI.dispose();
            this.buyUI.parent.removeChild(this.buyUI);
        }
        //this.buyUI.removeEventListener(GameEvent.CANCEL_BUY_ITEM, this.onCancel, this);
        //this.buyUI.removeEventListener(GameEvent.BUY_ITEM, this.onBuy, this);
        ////this.buyUI.removeEventListener(GameEvent.BUY_ITEM, this.onFlip, this);
        //this.buyUI = null;
    }

    //public updateUI():void
    //{
    //    this.buyUI.x = this.building.x - Math.floor(247 * .5);
    //    this.buyUI.y = this.building.y + Math.floor(117 * .5);
    //
    //    this.buyUI.updateUI(this.isCanBePlaced);
    //}

    public addListeners():void
    {
        this.removeListeners();

        Lyrs.LYRS_SCENE.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMove, this);
        Lyrs.LYRS_SCENE.addEventListener(egret.TouchEvent.TOUCH_END, this.toEnd, this);
    }

    public removeListeners():void
    {
        Lyrs.LYRS_SCENE.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMove, this);
        Lyrs.LYRS_SCENE.removeEventListener(egret.TouchEvent.TOUCH_END, this.toEnd, this);
    }

    public dispose():void
    {

        this.last = null;
        this.now = null;
        this.removeListeners();

        this.building = null;
        this.isCanBePlaced = false;
        this.removeBuyUI();
    }

    //===================================================
    public enterNormalMode():void
    {
        if(this.building)
        {
            //this.removeItem();

            this.building.setBottomVisible(false);
            this.building.setEdgeVisible(false);

            egret.Tween.removeTweens(this.building);

            this.building.alpha = 1;

            VillagerManager.getInstance().reShowVillagers();
            AnimalManager.getInstance().reShowAnimals();
        }
        this.dispose();
    }

    //X
    public enterEditMode():void
    {
        this.dispose();
    }

    public enterBuyMode(building?:BuildingIso):void
    {
        console.log("==========================haha, enter buy mode");

        this.building = building;

        Lyrs.LYRS_ITEM_IN_SCENE.addChild(building);
        building.setPosByIso();
        building.setBottomVisible(true);
        building.setEdgeVisible(true);
        this.isCanBePlaced = CollisionCheck.getInstance().check(building);
        building.updateBottom(this.isCanBePlaced);
        DepthManager.getInstance().pushItem(building);
        if(BuildingID.BUILDING_ID_FARM == building.model.buildingId)
        {
            Camera.getInstance().focus(building, ()=>{TweenIt.loopTween(building, {"alpha":MapConst.ALPHA_START}, {"alpha":MapConst.ALPHA_END}, MapConst.ALPHA_TIME);});
        }
        else
        {
            TweenIt.loopTween(building, {"alpha":MapConst.ALPHA_START}, {"alpha":MapConst.ALPHA_END}, MapConst.ALPHA_TIME);
        }

        //ui
        this.buyUI.addEventListener(GameEvent.CANCEL_BUY_ITEM, this.onCancel, this);
        this.buyUI.addEventListener(GameEvent.BUY_ITEM, this.onBuy, this);
        //this.buyUI.addEventListener(GameEvent.FLIP_ITEM, this.onFlip, this);
        Lyrs.LYRS_UI_2.addChild(this.buyUI);
        this.buyUI.x = Math.floor((Lyrs.SW - 327) * .5);
        this.buyUI.y = Lyrs.SH - 107;
        //this.buyUI.updateUI(this.isCanBePlaced);
        this.buyUI.setBuyBtnVisible(this.isCanBePlaced);

        //设置价格
        var current:number = GetBuildingUtils.getInstance().getBuildingNumByBuildingId(building.model.buildingId);
        current = (current - 1 < 0) ? 0 : (current - 1);
        var bType: string = '';
        var gold: number = 0;
        if(BuildingModel.isGold(building.model.buildingId)){
            bType = 'gold';
            gold = BuildingModel.getGold(building.model.buildingId, current);
        }else if(BuildingModel.isDiamond(building.model.buildingId)){
            bType = 'diamond';
            gold = BuildingModel.getDiamond(building.model.buildingId, current);
        }
        this.buyUI.setGold(gold, bType);


        VillagerManager.getInstance().hideVillagers();
        AnimalManager.getInstance().hideAnimals();
    }
}