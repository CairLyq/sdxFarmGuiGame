///**
// * on 2014-12-11
// * by leo
// */
//
//class BuyBuildingLogic
//{
//    public constructor()
//    {
//        this.buyUI = new BuyUI(Lyrs.LYRS_ITEM_IN_SCENE, 1000);
//        this.buyUI.addEventListener(GameEvent.CANCEL_BUY_ITEM, this.cancel, this);
//        this.buyUI.addEventListener(GameEvent.BUY_ITEM, this.buy, this);
//    }
//
//    //---显示取消和购买按钮对象
//    private buyUI:BuyUI;
//
//    public reset():void
//    {
//        if(this.building)
//        {
//            this.removeItem();
//            this.removeUI();
//        }
//        this.resetVars();
//    }
//
//    public createItem(data:any):void
//    {
//        //console.log(this.data);
//
//        this.reset();
//        //item
//        //var pos:Point3D = Constant.DEFAULT_POINT3D;
//        var pos:Point3D = TransUtils.screenToIsoShort(Lyrs.LYRS_ITEM_IN_SCENE.globalToLocal(Lyrs.SW * .5, Lyrs.SH * .5));
//        this.building = BuildingFactory.generate(pos, data);
//
//        TweenIt.loopTween(this.building, {"alpha":.7}, {"alpha":1}, 500);
//
//
//        Lyrs.LYRS_ITEM_IN_SCENE.addChild(this.building);
//        this.building.setBorderVisible(true);
//        this.building.setPosition(pos);
//
//        Constant.mode = Constant.BUY_MODE;
//        //侦听item，有时候无法走到toBegin
//        //this.last = new egret.Point(this.item.x, this.item.y);
//        DepthManager.getInstance().addItem(this.building);
//        //this.initListeners();
//
//        //ui
//        Lyrs.LYRS_UI_IN_SCENE.addChild(this.buyUI);
//        this.setUIPosition();
//        this.flag = CollisionCheck.getInstance().check(this.building);
//        this.buyUI.updateUI(this.flag);
//
//        //DepthManager.getInstance().setTouchEnabled(false);
//        //this.item.touchEnabled = true;
//
//        //Lyrs.LYRS_SCENE.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toBegin, this, false, 1);
//    }
//
//    public toBegin(evt:egret.TouchEvent):void
//    {
//        //Global.DRAG_OBJECT = this.item.hashCode;
//        //if(this.item.hitTestPoint(evt.stageX, evt.stageY, true))
//        //{
//        //    GameEvent.BubbEvent(evt);
//        //
//        //}
//        //else
//        //{
//        //    return;
//        //}
//
//        this.last = Lyrs.LYRS_ITEM_IN_SCENE.globalToLocal(evt.stageX, evt.stageY);
//
//        Lyrs.LYRS_SCENE.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMove, this);
//        Lyrs.LYRS_SCENE.addEventListener(egret.TouchEvent.TOUCH_END, this.toEnd, this);
//        //console.log("start", DepthManager.getInstance().itemList);
//    }
//    private toMove(evt:egret.TouchEvent):void
//    {
//        GameEvent.BubbEvent(evt);
//        //if(this.item.hashCode != Global.DRAG_OBJECT)
//        //{
//        //    return;
//        //}
//        //console.log("move")
//        var mc:MoveCheck = new MoveCheck();
//        this.now = Lyrs.LYRS_ITEM_IN_SCENE.globalToLocal(evt.stageX, evt.stageY);
//        if(mc.check(this.last, this.now))
//        {
//
//            this.setItemPosition();
//
//            this.flag = CollisionCheck.getInstance().check(this.building);
//            this.building.updateBorder(this.flag);
//
//
//            DepthManager.getInstance().moveItem(this.building);
//
//
//            this.setUIPosition();
//            this.buyUI.updateUI(this.flag);
//
//
//            this.last = this.now;
//
//
//            //console.log("move", DepthManager.getInstance().itemList);
//        }
//    }
//
//    private toEnd(evt:egret.TouchEvent):void
//    {
//        GameEvent.BubbEvent(evt);
//
//        Lyrs.LYRS_SCENE.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMove, this);
//        Lyrs.LYRS_SCENE.removeEventListener(egret.TouchEvent.TOUCH_END, this.toEnd, this);
//        //if(this.item.hashCode != Global.DRAG_OBJECT)
//        //{
//        //    return;
//        //}
//        //Global.DRAG_OBJECT = 0;
//
//        //console.log("end", DepthManager.getInstance().itemList);
//    }
//
//    private flag:boolean;
//    private building:BuildingIso;
//    private last:egret.Point;
//    private now:egret.Point;
//
//    //========================================================
//    //ui op
//    public cancel(evt:GameEvent):void
//    {
//        GameEvent.BubbEvent(evt);
//        //console.log("cancel")
//
//        //===============================================================================
//
//        this.removeItem();
//
//        this.removeUI();
//
//        this.resetVars();
//
//        this.building = null;
//
//        Constant.mode = Constant.NORMAL_MODE;
//    }
//
//    public buy(evt:GameEvent):void
//    {
//        GameEvent.BubbEvent(evt);
//
//        //if(!this.flag)
//        //{
//        //    Lyrs.LYRS_UI.addChild(new AlertPanel('该地已被占用，请选择其他地块'));
//        //    return;
//        //}
//        if(UserController.instance.isGoldEnough(this.building.model.gold))
//        {
//            ShopController.getInstance().buy(this.building);
//        }
//    }
//
//    public buy_cb(sData:any):void
//    {
//        //MapDebug.log(this.item.model.name + "的位置：(" + PosUtils.getPosStr(this.item) + ")");
//        console.log("==========================", this.building.model.name + "的位置：(" + PosUtils.getPosStr(this.building) + ")");
//
//        egret.Tween.removeTweens( this.building );
//        this.building.alpha = 1;
//
//        this.readyNewItem(sData);
//
//        this.removeUI();
//
//        this.resetVars();
//
//        this.building = null;
//
//        Constant.mode = Constant.NORMAL_MODE;
//    }
//
//    //========================================================
//
//    private readyNewItem(sData:any):void
//    {
//        //Lyrs.LYRS_SCENE.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toBegin, this);
//
//        var pos:Point3D = TransUtils.screenToIsoShort(new egret.Point(this.building.x, this.building.y));
//        this.building.setPosition(pos);
//
//        this.building.setBorderVisible(false);
//
//        //this.item.addLogic();
//
//        this.building.updateData(sData);
//
//        CollisionCheck.getInstance().change(this.building, Constant.OP_ADD);
//    }
//
//
//    //=======================================================
//    public removeItem():void
//    {
//        egret.Tween.removeTweens(this.building);
//        this.building.alpha = 1;
//
//        this.building.dispose();
//
//        //Lyrs.LYRS_SCENE.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toBegin, this);
//
//        if(this.building && Lyrs.LYRS_ITEM_IN_SCENE.contains(this.building))
//        {
//            Lyrs.LYRS_ITEM_IN_SCENE.removeChild(this.building);
//
//            DepthManager.getInstance().removeItem(this.building);
//        }
//    }
//
//    public removeUI():void
//    {
//        if(this.buyUI && Lyrs.LYRS_UI_IN_SCENE.contains(this.buyUI))
//        {
//            Lyrs.LYRS_UI_IN_SCENE.removeChild(this.buyUI);
//        }
//    }
//
//    public setItemPosition():void
//    {
//        var pos:Point3D = TransUtils.screenToIsoShort(this.now);
//        this.building.setPosition(pos);
//    }
//
//    public setUIPosition():void
//    {
//        var posX:number = this.building.pShort.x + this.building.model.col;
//        var posZ:number = this.building.pShort.z + this.building.model.row;
//        var pos:egret.Point = TransUtils.isoShortToScreen(new Point3D(posX, 0, posZ))
//        this.buyUI.x = pos.x - 80;
//        this.buyUI.y = pos.y;
//    }
//
//    public resetVars():void
//    {
//        this.last = null;
//        this.now = null;
//        this.flag = false;
//    }
//
//    //=====================================================================================
//    //private initListeners():void
//    //{
//    //    if(this.item)
//    //    {
//    //        this.item.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toBegin, this);
//    //        this.item.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMove, this);
//    //        this.item.addEventListener(egret.TouchEvent.TOUCH_END, this.toEnd, this);
//    //    }
//    //}
//    //
//    //private removeListeners():void
//    //{
//    //    if(this.item)
//    //    {
//    //        this.item.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toBegin, this);
//    //        this.item.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMove, this);
//    //        this.item.removeEventListener(egret.TouchEvent.TOUCH_END, this.toEnd, this);
//    //    }
//    //}
//
//    //================================================================================
//    private static _instance:BuyBuildingLogic;
//
//    public static getInstance():BuyBuildingLogic
//    {
//        if(this._instance)
//        {
//            return this._instance;
//        }
//        else
//        {
//            this._instance = new BuyBuildingLogic();
//        }
//        return this._instance;
//    }
//}