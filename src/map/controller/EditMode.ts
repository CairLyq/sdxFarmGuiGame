/**
 * on 2015-01-13
 * by leo
 */

class EditMode extends Mode
{
    private last:egret.Point;
    private now:egret.Point;
    private original:egret.Point;
    private isCanBePlaced:boolean;
    private editUI:EditUI;


    public constructor()
    {
        super();

        this.editUI = new EditUI();
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


        this.addListeners();
    }

    public toMove(evt:egret.TouchEvent, building?:BuildingIso):void
    {
        var mc:MoveCheck = new MoveCheck();
        //this.now = TransUtils.globalToLocal(Lyrs.LYRS_ITEM_IN_SCENE, new egret.Point(evt.stageX, evt.stageY));
        this.now = Lyrs.LYRS_ITEM_IN_SCENE.globalToLocal(evt.stageX, evt.stageY);

        if(mc.check(this.last, this.now))
        {
            var pos:Point3D = TransUtils.screenToIso(this.now);
            this.building.setPosByIso(pos);
            this.isCanBePlaced = CollisionCheck.getInstance().check(this.building);
            this.editUI.updateUI(this.isCanBePlaced);
            this.building.updateBottom(this.isCanBePlaced);
            //DepthManager.getInstance().moveItem(this.building);

            this.last = this.now;
        }
    }

    public toEnd(evt:egret.TouchEvent, building?:BuildingIso):void
    {
        GameEvent.BubbEvent(evt);

        this.removeListeners();
    }


    //===================================================

    public dispose():void
    {
        this.building = null;
        this.now = null;
        this.last = null;
        this.original = null;
        this.isCanBePlaced = false;
        this.removeFlipUI();
        this.removeListeners();
    }

    public addListeners():void
    {
        Lyrs.LYRS_SCENE.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMove, this);
        Lyrs.LYRS_SCENE.addEventListener(egret.TouchEvent.TOUCH_END, this.toEnd, this);
    }

    public removeListeners():void
    {
        Lyrs.LYRS_SCENE.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMove, this);
        Lyrs.LYRS_SCENE.removeEventListener(egret.TouchEvent.TOUCH_END, this.toEnd, this);
    }

    public addEditUI():void
    {
        this.removeFlipUI();

        Lyrs.LYRS_UI_2.addChild(this.editUI);
        this.editUI.updateUI(true);
        this.editUI.x = Math.floor((Lyrs.SW - 240) * .5);
        this.editUI.y = Lyrs.SH - 110;
        this.editUI.addEventListener(GameEvent.CONFIRM_ITEM_POS, this.onConfirmItem, this);
        //this.editUI.addEventListener(GameEvent.FLIP_ITEM, this.onFlipItem, this);
    }

    public onConfirmItem(e:GameEvent):void
    {
        if(this.isCanBePlaced)
        {
            BuildingController.getInstance().move(this.building);
            //用于获取初始位置
            console.log("==========================", this.building.model.name, ":", PosUtils.getPosStr(this.building));
        }
        else
        {
            var pos:Point3D = TransUtils.screenToIso(this.original);
            this.building.setPosByIso(pos);

            DepthManager.getInstance().moveItem(this.building);

            CollisionCheck.getInstance().change(this.building, MapConst.OP_ADD);

            ModeLogic.getInstance().enterNormalMode(this.building);
        }
    }

    //public onFlipItem(e:GameEvent):void
    //{
    //    //todo
    //    console.log("==========================waiting to do");
    //}

    public removeFlipUI():void
    {
        if(this.editUI && this.editUI.parent)
        {
            this.editUI.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmItem, this);
            //this.editUI.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFlipItem, this);
            this.editUI.parent.removeChild(this.editUI);
        }
    }

    //===================================================

    public enterEditMode(building?:BuildingIso):void
    {
        this.building = building;
        console.log("==========================haha, enter edit mode");

        building.bLogic.stopCnt();

        CollisionCheck.getInstance().change(this.building, MapConst.OP_REMOVE);

        //var tmp:egret.Point = TransUtils.globalToLocal(Lyrs.LYRS_ITEM_IN_SCENE, new egret.Point(this.building.x, this.building.y));
        var tmp:egret.Point = Lyrs.LYRS_ITEM_IN_SCENE.globalToLocal(this.building.x, this.building.y);
        this.original = new egret.Point();
        this.original.x = tmp.x;
        this.original.y = tmp.y;


        this.last = new egret.Point();
        this.last.x = this.original.x;
        this.last.y = this.original.y;

        this.isCanBePlaced = true;
        building.updateBottom(true);
        building.setBottomVisible(true);
        building.setEdgeVisible(true);

        //这里会影响建筑动画
        //DepthManager.getInstance().removeItem(building);
        //Lyrs.LYRS_ITEM_IN_SCENE.removeChild(building);
        //
        //DepthManager.getInstance().pushItem(building);
        //Lyrs.LYRS_ITEM_IN_SCENE.addChild(building);

        DepthManager.getInstance().removeItem(building, false);
        DepthManager.getInstance().pushItem(building);
        Lyrs.LYRS_ITEM_IN_SCENE.addChild(building);

        TweenIt.loopTween(building, {"alpha":MapConst.ALPHA_START}, {"alpha":MapConst.ALPHA_END}, MapConst.ALPHA_TIME);

        //TweenIt.tweenBigThenNormal(building);

        PickupProgress.getInstance().hide();

        this.addEditUI();

        VillagerManager.getInstance().hideVillagers();
        AnimalManager.getInstance().hideAnimals();
    }

    //X
    public enterBuyMode():void
    {
        this.dispose();
    }

    public enterNormalMode():void
    {
        if(this.building)
        {
            this.building.setBottomVisible(false);
            this.building.setEdgeVisible(false);

            egret.Tween.removeTweens(this.building);

            this.building.alpha = 1;
        }

        VillagerManager.getInstance().reShowVillagers();
        AnimalManager.getInstance().reShowAnimals();

        this.dispose();
    }
}