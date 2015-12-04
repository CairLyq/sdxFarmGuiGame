/**
 * on 2015-02-02
 * by leo
 */

class GuideManager
{
    public static FARM_X_IN_GUIDE:number = 56;
    public static FARM_Y_IN_GUIDE:number = 45;


    private guideUI:GuideUI;

    private data:any;


    public constructor()
    {
    }

    public setData(data:any):void
    {

        this.data = data;
        //种植
        FarmGuideController.getInstance().setStep(UserExtendInfo.instance.farmStep);
        //养殖
        BreedGuideController.getInstance().setStep(UserExtendInfo.instance.breedStep);
        //面包机
        ProductGuideController.instance.setStep(UserExtendInfo.instance.produceStep);
        //饲料机
        PlasticGuideController.instance.setStep(UserExtendInfo.instance.plasticStep);
        //村民
        VillagerGuideController.getInstance().setStep(UserExtendInfo.instance.villagerStep);
        //订单
        OrderGuideController.getInstance().setStep(UserExtendInfo.instance.orderStep);
        //任务
        TaskGuideController.getInstance().setStep(UserExtendInfo.instance.taskStep);

    }


    public isInGuide():boolean
    {
        if(FarmGuideController.getInstance().isInFarmGuide())
        {
            return true;
        }
        if(BreedGuideController.getInstance().isInBreedGuide())
        {
            return true;
        }
        //面包机
        if(ProductGuideController.getInstance().isInProductGuide())
        {
            return true;
        }
        //饲料机
        if(PlasticGuideController.getInstance().isInPlasticGuide())
        {
            return true;
        }
        if(VillagerGuideController.getInstance().isInVillagerGuide())
        {
            return true;
        }
        if(OrderGuideController.getInstance().isInOrderGuide())
        {
            return true;
        }
        //任务
        /*if(TaskGuideController.getInstance().isInTaskGuide()){
            return true;
        }*/
        return false;
    }

    public init():void
    {
        //动态加载
        if(this.isInGuide())
        {
            DragLogic.getInstance().setLock(true);
            CollisionCheck.getInstance().setPoint(MapConst.BUILD_NO_WALK_NO);

            Loader.instance.loadGroups([GroupName.GUIDE_GROUP, GroupName.NPC_GROUP], this.onLoaded, this);
        }
    }

    private onLoaded():void
    {

        this.guideUI = new GuideUI();
        this.guideUI.init();


        if(FarmGuideController.getInstance().isInFarmGuide())
        {
            FarmGuideController.getInstance().startGuide();
        }
        else if(BreedGuideController.getInstance().isInBreedGuide())
        {
            BreedGuideController.getInstance().startGuide();
        }
        //面包机
        else if(ProductGuideController.getInstance().isInProductGuide())
        {
            ProductGuideController.getInstance().startGuide();
        }
        //饲料机
        else if(PlasticGuideController.getInstance().isInPlasticGuide())
        {
            PlasticGuideController.getInstance().startGuide();
        }
        else if(VillagerGuideController.getInstance().isInVillagerGuide())
        {
            VillagerGuideController.getInstance().startGuide();
        }
        else if(OrderGuideController.getInstance().isInOrderGuide())
        {
            OrderGuideController.getInstance().startGuide();
        }
        /*else if(TaskGuideController.getInstance().isInTaskGuide()){
            TaskGuideController.getInstance().startGuide()
        }*/
        //else{
        //    DragLogic.getInstance().setLock(false);
        //}

    }


    //===================================================
    public addCircle(pos:egret.Point, postwo?:egret.Point):void
    {
        this.guideUI.addCircle(pos, postwo);
    }

    /**
     * 点击之后到下一步
     */
    public addTouchPass():void
    {
        this.guideUI.addTouchPass();

        this.guideUI.touchPass.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchPass, this);
    }


    private onTouchPass(e:egret.TouchEvent):void
    {
        this.guideUI.touchPass.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchPass, this);

        if(FarmGuideController.getInstance().isInFarmGuide())
        {
            FarmGuideController.getInstance().nextStep();
        }
        else if(BreedGuideController.getInstance().isInBreedGuide())
        {
            BreedGuideController.getInstance().nextStep();
        }
        //面包机
        else if(ProductGuideController.getInstance().isInProductGuide())
        {
            ProductGuideController.getInstance().nextStep();
        }
        //饲料机
        else if(PlasticGuideController.getInstance().isInPlasticGuide())
        {
            PlasticGuideController.getInstance().nextStep();
        }
        else if(VillagerGuideController.getInstance().isInVillagerGuide())
        {
            VillagerGuideController.getInstance().nextStep();
        }
        else if(OrderGuideController.getInstance().isInOrderGuide())
        {
            OrderGuideController.getInstance().nextStep();
        }
        else if(TaskGuideController.getInstance().isInTaskGuide()){
            TaskGuideController.getInstance().nextStep();
        }
    }

    public addBlocks(tar:egret.DisplayObject, anchorX?:number, anchorY?:number):void
    {
        this.guideUI.addBlocks(tar, anchorX, anchorY);
    }

    //public addArrow(dir:number, pos:egret.Point):void
    //{
    //    this.guideUI.addArrow(dir, pos);
    //}

    public addWomanSayUI(type:number, pos:egret.Point, womanSayUIText:string):void
    {
        this.guideUI.addWomanSayUI(type, pos, womanSayUIText);
    }

    public addFinger(type:number, track:string[], time:string[]):void
    {
        if(1 == type)
        {
            this.guideUI.addClickFinger(StringUtils.toPoint(track[0], "*"));
        }
        else if(2 == type)
        {
            this.guideUI.addDragFinger(StringUtils.toPointArr(track, "*"), time);
        }
    }

    //public addDragFinger(posArr:egret.Point[]):void
    //{
    //    this.guideUI.addDragFinger(posArr);
    //}

    //===================================================
    /**
     * 禁止
     */
    public addForbiden():void
    {
        if(this.isInGuide())
        {
            this.clear();

            this.guideUI.addForbiden();

            Lyrs.LYRS_GUIDE.addChild(this.guideUI);

//            PickupLogic.getInstance().setLock(true);

        }
    }

    public addGuide():void
    {
        this.clear();

        if(!this.guideUI){
            this.guideUI = new GuideUI();
            this.guideUI.init();
        }
        Lyrs.LYRS_GUIDE.addChild(this.guideUI);

        PickupLogic.getInstance().setLock(false);
    }

    public clear():void
    {
        if(this.guideUI)
        {
            this.guideUI.clear();

            if(this.guideUI.parent)
            {
                this.guideUI.parent.removeChild(this.guideUI);
            }
        }
    }

    public changeStep(step:number):void
    {
        var data:Object = {
            "act":"User.addGuideStep",
            "dt":{
                "guideStep":step
            }
        };

        SocketManager.instance.send(JSON.stringify(data), false);
    }

    //===================================================
    private static _instance:GuideManager;

    public static getInstance():GuideManager
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new GuideManager();
        }
        return this._instance;
    }
}