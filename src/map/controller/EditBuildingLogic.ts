///**
// * on 2015-01-08
// * by leo
// */
//
//class EditBuildingLogic
//{
//    public constructor()
//    {
//
//    }
//
//    private last:egret.Point;
//    private now:egret.Point;
//    private original:egret.Point;
//    private isCanBePlaced:boolean;
//
//    private isProgress:boolean;
//
//    private building:BuildingIso;
//
//
//
//    public toBegin(evt:egret.TouchEvent, building:BuildingIso):void
//    {
//        //if(this.item.hitTestPoint(evt.stageX, evt.stageY, true))
//        //{
//        //    GameEvent.BubbEvent(evt);
//        //}
//        //else
//        //{
//        //    return;
//        //}
//        this.building = building;
//
//        //if(Constant.MODE_EDIT == this.mode)
//        //{
//        //    GameEvent.BubbEvent(evt);
//        //}
//        if(Constant.EDIT_MODE == Constant.mode)
//        {
//            GameEvent.BubbEvent(evt);
//        }
//        else if(Constant.NORMAL_MODE == Constant.mode)
//        {
//            building.bLogic.startCnt();
//
//        }
//        //Global.DRAG_OBJECT = this.item.hashCode;
//
//        this.original = Lyrs.LYRS_ITEM_IN_SCENE.globalToLocal(evt.stageX, evt.stageY);
//        this.last = Lyrs.LYRS_ITEM_IN_SCENE.globalToLocal(evt.stageX, evt.stageY);
//
//        //if(Constant.MODE_EDIT == this.mode)
//        //{
//        //
//        //}
//        //else if(Constant.MODE_NORMAL == this.mode)
//        //{
//        //    this.startCnt();
//        //}
//
//        Lyrs.LYRS_SCENE.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMove, this);
//        Lyrs.LYRS_SCENE.addEventListener(egret.TouchEvent.TOUCH_END, this.toEnd, this);
//    }
//
//    private toMove(evt:egret.TouchEvent):void
//    {
//        //if(Constant.MODE_EDIT == this.mode)
//        //{
//        //    GameEvent.BubbEvent(evt);
//        //}
//        //
//        //if(this.item.hashCode != Global.DRAG_OBJECT)
//        //{
//        //    return;
//        //}
//
//
//        //if(Constant.MODE_EDIT == this.mode)
//        if(Constant.EDIT_MODE == Constant.mode)
//        {
//            GameEvent.BubbEvent(evt);
//
//            var mc:MoveCheck = new MoveCheck();
//            this.now = Lyrs.LYRS_ITEM_IN_SCENE.globalToLocal(evt.stageX, evt.stageY);
//            if(mc.check(this.last, this.now))
//            {
//                var pos:Point3D = TransUtils.screenToIsoShort(this.now);
//                this.building.setPosition(pos);
//
//                DepthManager.getInstance().moveItem(this.building);
//
//                this.isCanBePlaced = CollisionCheck.getInstance().check(this.building);
//                this.building.updateBorder(this.isCanBePlaced);
//
//                this.last = this.now;
//            }
//        }
//        else if(Constant.NORMAL_MODE == Constant.mode)
//        {
//            this.stopProgress();
//            this.building.bLogic.stopCnt();
//        }
//    }
//
//    private toEnd(evt:egret.TouchEvent):void
//    {
//        //if(Constant.MODE_EDIT == this.mode)
//        //{
//        //    GameEvent.BubbEvent(evt);
//        //}
//        //if(Constant.EDIT_MODE == Constant.mode)
//        //{
//        //    GameEvent.BubbEvent(evt);
//        //}
//        //
//        //if(this.item.hashCode != Global.DRAG_OBJECT)
//        //{
//        //    return;
//        //}
//        //
//        //Global.DRAG_OBJECT = 0;
//
//        //if(Constant.MODE_EDIT == this.mode)
//        if(Constant.EDIT_MODE == Constant.mode)
//        {
//            GameEvent.BubbEvent(evt);
//
//            if(this.isCanBePlaced)
//            {
//                if(this.now)
//                {
//                    //moved, ok
//                    this.move();
//                }
//                else
//                {
//                    //not moved, still in edit mode, do nothing
//                }
//            }
//            else
//            {
//                //moved, not ok
//                //this.mode = Constant.MODE_NORMAL;
//
//
//                //back to original
//                var pos:Point3D = TransUtils.screenToIsoShort(this.original);
//                pos.x = pos.x * Constant.scale;
//                pos.y = pos.y * Constant.scale;
//                pos.z = pos.z * Constant.scale;
//                this.building.setPosition(pos);
//
//                DepthManager.getInstance().moveItem(this.building);
//
//                CollisionCheck.getInstance().change(this.building, Constant.OP_ADD);
//
//                this.enterNormalMode();
//            }
//        }
//        else if(Constant.NORMAL_MODE == Constant.mode)
//        {
//            this.building.bLogic.stopCnt();
//
//            if(this.isProgress)
//            {
//                this.stopProgress();
//                return;
//            }
//            var touchEndBuilding:BuildingIso = PickupLogic.getInstance().getBuilding(new egret.Point(evt.stageX, evt.stageY));
//            if(touchEndBuilding)
//            {
//                this.building.show(evt.stageX, evt.stageY);
//
//                this.showPanel();
//            }
//        }
//
//        Lyrs.LYRS_SCENE.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMove, this);
//        Lyrs.LYRS_SCENE.removeEventListener(egret.TouchEvent.TOUCH_END, this.toEnd, this);
//    }
//
//    public enterNormalMode():void
//    {
//        console.log("enter normal mode");
//        Constant.mode = Constant.NORMAL_MODE;
//
//        this.building.setBorderVisible(false);
//
//        egret.Tween.removeTweens(this.building);
//
//        this.building.alpha = 1;
//        //===================================================
//        this.reset();
//    }
//
//    public enterEditMode():void
//    {
//        console.log("enter edit mode");
//        Constant.mode = Constant.EDIT_MODE;
//
//        this.building.bLogic.stopCnt();
//
//        this.isCanBePlaced = true;
//
//        CollisionCheck.getInstance().change(this.building, Constant.OP_REMOVE);
//
//        //===================================================
//        this.building.setBorderVisible(true);
//
//        TweenIt.loopTween(this.building, {"alpha":.7}, {"alpha":1}, 500);
//
//        TweenIt.tweenBigThenNormal(this.building);
//
//        this.stopProgress();
//    }
//
//
//    private showPanel():void
//    {
//        switch(this.building.model.buildingId)
//        {
//            case Constant.PRODUCT_ROOM:
//                UIMgr.instance.show(PanelName.PRODUCTION_PANEL);
//                break;
//            case Constant.ROAD_CANDY:
//                UIMgr.instance.show(PanelName.ROADSITE_PANAEL);
//                break;
//        }
//        console.log("BuildingLogic building_id = " + this.building.model.buildingId);
//    }
//
//    private move():void
//    {
//        var position:string = PosUtils.getPosStr(this.building);
//        var data:Object = {
//            "act":"Building.changePosition",
//            "dt":{"userBuildingId":this.building.data.userBuildingId, "position":position}
//        };
//        SocketManager.instance.send(JSON.stringify(data));
//    }
//
//    public move_cb():void
//    {
//        CollisionCheck.getInstance().change(this.building, Constant.OP_ADD);
//
//        this.enterNormalMode();
//    }
//
//    private reset():void
//    {
//        this.last = null;
//        this.now = null;
//        this.original = null;
//        this.building = null;
//    }
//
//    public startProgress():void
//    {
//        this.isProgress = true;
//        PickupProgress.getInstance().show(this.building);
//    }
//
//    public stopProgress():void
//    {
//        this.isProgress = false;
//        PickupProgress.getInstance().hide();
//    }
//
//    //===============================================================
//    private static _instance:EditBuildingLogic;
//
//    public static getInstance():EditBuildingLogic
//    {
//        if(this._instance)
//        {
//            return this._instance;
//        }
//        else
//        {
//            this._instance = new EditBuildingLogic();
//        }
//        return this._instance;
//    }
//}