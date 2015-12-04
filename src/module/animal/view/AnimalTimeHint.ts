///**
// * on 2015-04-21
// * by leo
// */
//
//class AnimalTimeHint extends egret.DisplayObjectContainer
//{
//    private timeBar:TimeBarV2;
//    private bg:egret.Shape;
//
//    private animal:Animal;
//
//    public constructor()
//    {
//        super();
//
//        this.bg = new egret.Shape();
//        this.bg.width = Lyrs.SW;
//        this.bg.height = Lyrs.SH;
//        this.bg.touchEnabled = true;
//
//        this.timeBar = new TimeBarV2();
//
//        this.addChild(this.bg);
//
//        this.addChild(this.timeBar);
//
//        this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
//        this.timeBar.addEventListener(GameEvent.SPEED, this.onSpeed, this);
//
//    }
//
//    public show(animal:Animal):void
//    {
//        this.animal = animal;
//
//        animal.suspend();
//
//        //===================================================
//        this.timeBar.setProduct(this.animal.getModel.itemId);
//
//        Lyrs.LYRS_UI_2.addChild(AnimalTimeHint.getInstance());
//
//        var pos:egret.Point;
//
//        var endX:number = animal.x;
//        var endY:number = animal.y + ZoomLogic.TILE_H;
//
//        pos = animal.parent.localToGlobal(endX, endY);
//
//        this.timeBar.x = pos.x;
//        this.timeBar.y = pos.y;
//
//        this.updateTime(animal);
//    }
//
//    //自动成熟hide
//    //点击空白hide
//    //加速完成hide
//    public hide():void
//    {
//        if(AnimalTimeHint.getInstance().parent)
//        {
//            AnimalTimeHint.getInstance().parent.removeChild(AnimalTimeHint.getInstance());
//        }
//    }
//
//    public updateTime(animal:Animal):void
//    {
//        if(animal == this.animal)
//        {
//            this.timeBar.updateTime(animal.getLeftCnt());
//        }
//    }
//
//    public onClose(e:egret.TouchEvent):void
//    {
//        GameEvent.BubbEvent(e);
//
//        if(this.animal)
//        {
//            this.animal.startup();
//            this.animal = null;
//        }
//        this.hide();
//    }
//
//    public onSpeed(e:GameEvent):void
//    {
//        GameEvent.BubbEvent(e);
//
//        if(UserController.instance.isDiamondEnough(SpeedModel.getSpeed(this.animal.getLeftCnt())))
//        {
//            //播放音效
//            SoundMgr.instance.playAudio(SoundName.BTN_OK);
//
//            BreedingPlantController.getInstance().speed(this.animal);
//        }
//    }
//
//    public getSpeedBtn():egret.DisplayObject
//    {
//        return this.timeBar.speed_btn;
//    }
//
//
//    //===================================================
//    private static _instance:AnimalTimeHint;
//
//    public static getInstance():AnimalTimeHint
//    {
//        if(this._instance)
//        {
//            return this._instance;
//        }
//        else
//        {
//            this._instance = new AnimalTimeHint();
//        }
//        return this._instance;
//    }
//}