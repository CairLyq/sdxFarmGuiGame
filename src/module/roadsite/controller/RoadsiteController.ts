///**
// * on 2014-12-27
// * by Gordon
// */
//
//class RoadsiteController
//{
//    public constructor()
//    {
//
//    }
//
//    //---显示取消和购买按钮对象
//    private buyUI:BuyUI;
//
//    /**
//     * 玩家订单
//     */
//    public getStallOrder():void
//    {
//        if(this.item)
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
//        //item
//        //var pos:Point3D = Constant.DEFAULT_POINT3D;
//        var pos:Point3D = TransUtils.screenToIsoShort(Lyrs.LYRS_ITEM_IN_SCENE.globalToLocal(Lyrs.SW * .5, Lyrs.SH * .5));
//        this.item = BuildingFactory.generate(pos, data);
//
//        Lyrs.LYRS_ITEM_IN_SCENE.addChild(this.item);
//        this.item.setBorderVisible(true);
//        this.item.setPosition(pos);
//        //侦听item，有时候无法走到toBegin
//        //this.last = new egret.Point(this.item.x, this.item.y);
//        DepthManager.getInstance().addItem(this.item);
//        //this.initListeners();
//
//        //ui
//        Lyrs.LYRS_UI_IN_SCENE.addChild(this.buyUI);
//        this.setUIPosition();
//        this.flag = CollisionCheck.getInstance().check(this.item);
//        this.buyUI.updateUI(this.flag);
//
//        //DepthManager.getInstance().setTouchEnabled(false);
//        //this.item.touchEnabled = true;
//
//        //Lyrs.LYRS_SCENE.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toBegin, this, false, 1);
//    }
//
//    private toBegin(evt:egret.TouchEvent):void
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
//            this.flag = CollisionCheck.getInstance().check(this.item);
//            this.item.updateBorder(this.flag);
//
//
//            DepthManager.getInstance().moveItem(this.item);
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
//    private item:BuildingIso;
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
//        //DepthManager.getInstance().setTouchEnabled(true);
//
//        this.removeItem();
//
//        this.removeUI();
//
//        this.resetVars();
//
//        this.item = null;
//    }
//
//    public buy(evt:GameEvent):void
//    {
//        GameEvent.BubbEvent(evt);
//        //console.log("buy")
//        if(!this.flag)
//        {
//            Lyrs.LYRS_UI.addChild(new AlertPanel('该地已被占用，请选择其他地块'));
//            return;
//        }
//
//        ShopController.getInstance().buy(this.item);
//
//
//
//    }
//
//    public buy_cb(sData:any):void
//    {
//        MapDebug.log(this.item.model.name + "offset border：" + this.item.model.borderOffsetX + "," + this.item.model.borderOffsetY);
//
//        //DepthManager.getInstance().setTouchEnabled(true);
//
//        this.readyNewItem(sData);
//
//        this.removeUI();
//
//        this.resetVars();
//
//        this.item = null;
//    }
//
//    //========================================================
//
//    private readyNewItem(sData:any):void
//    {
//        //this.removeListeners();
//        Lyrs.LYRS_SCENE.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toBegin, this);
//
//        var pos:Point3D = TransUtils.screenToIsoShort(new egret.Point(this.item.x, this.item.y));
//        this.item.setPosition(pos);
//
//        this.item.setBorderVisible(false);
//
//        //this.item.addLogic();
//
//        this.item.updateData(sData);
//
//        CollisionCheck.getInstance().change(this.item, Constant.OP_ADD);
//    }
//
//
//    //=======================================================
//    public removeItem():void
//    {
//        //this.removeListeners();
//        Lyrs.LYRS_SCENE.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toBegin, this);
//
//        if(this.item && Lyrs.LYRS_ITEM_IN_SCENE.contains(this.item))
//        {
//            Lyrs.LYRS_ITEM_IN_SCENE.removeChild(this.item);
//
//            DepthManager.getInstance().removeItem(this.item);
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
//        this.item.setPosition(pos);
//    }
//
//    public setUIPosition():void
//    {
//        var posX:number = this.item.pShort.x + this.item.model.col;
//        var posZ:number = this.item.pShort.z + this.item.model.row;
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