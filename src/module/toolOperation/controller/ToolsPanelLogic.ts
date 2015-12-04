/**
 * on 2014-12-25
 * by leo
 */

class ToolsPanelLogic
{
    private asset:egret.gui.UIAsset;
    private buildingList:ItemIso[];

    private operation:number;
    private tar:ItemIso;
    private panel:game.ToolsPanel;

    private treeModel:TreeModel;
    private fellItemModel:DepotModel;
    //砍伐所需道具的信息
    private toolData:any;

    public constructor()
    {
        this.buildingList = [];
        this.asset = new egret.gui.UIAsset();
    }

    public initPanel(panel:game.ToolsPanel, tar:ItemIso, operation:number):void
    {
        this.panel = panel;

        this.tar = tar;
        //if(tar instanceof Rubbish)
        //{
        //    this.rubbish = <Rubbish>tar;
        //}
        //else if(tar instanceof BuildingIso)
        //{
        //    this.building = <BuildingIso>tar;
        //}
        this.operation = operation;

        if(ToolConst.FELL_TREE == this.operation || ToolConst.HARVEST_TREE == this.operation)
        {
            this.treeModel = TreeModel.getModelByBuildingId(this.tar.model.buildingId);
        }
        if(ToolConst.FELL_TREE == this.operation)
        {
            this.fellItemModel = DepotModel.getModelById(this.treeModel.fellId);
        }

        if(ToolConst.HARVEST_FARM == this.operation || ToolConst.HARVEST_TREE == this.operation)
        {
            this.panel.item_img.visible = true;
            this.panel.itemNum_lb.visible = false;

            this.panel.item_img.source = this.getToolImg();
        }
        else if(ToolConst.FELL_TREE == this.operation)
        {
            this.panel.item_img.visible = this.panel.itemNum_lb.visible = true;


            this.panel.item_img.source = this.fellItemModel.imgId;
            this.toolData = DepotController.instance.searchLocalDataAsItemId(this.treeModel.fellId);
            if(this.toolData)
            {
                this.panel.itemNum_lb.text = String(this.toolData.itemNum);
            }
            else
            {
                this.panel.itemNum_lb.text = "0";
            }
        }
        else if(ToolConst.PICKUP_RUBBISH == this.operation)
        {
            this.panel.item_img.visible = this.panel.itemNum_lb.visible = true;


            this.panel.item_img.source = (<Rubbish>this.tar).getModel.toolImg;
            this.toolData = DepotController.instance.searchLocalDataAsItemId((<Rubbish>this.tar).getModel.toolId);
            if(this.toolData)
            {
                this.panel.itemNum_lb.text = String(this.toolData.itemNum);
            }
            else
            {
                this.panel.itemNum_lb.text = "0";
            }
        }
    }

    /**
     * 开始拖动
     * @param evt
     */
    public toStartItem(evt:egret.TouchEvent):void
    {
        GameEvent.BubbEvent(evt);

        if(ToolConst.FELL_TREE == this.operation)
        {
            if(!this.toolData || (this.toolData && 0 == this.toolData.itemNum))
            {
                var tree:TreeBuilding = <TreeBuilding>this.tar;
                var data:any[] = [{
                    "itemId":tree.getModel.fellId,//this.fellModel.itemId,
                    "poor":1,
                    "needNum":1
                }];

                GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_SHORTAGE_BUY, true, {
                    'data':data,
                    'panel':PanelName.TOOLS_PANEL,
                    'param':{"direction":Direction.NONE},
                    'args':[this.operation, tree]
                });
                return;
            }
        }
        else if(ToolConst.PICKUP_RUBBISH == this.operation)
        {
            if(!this.toolData || (this.toolData && 0 == this.toolData.itemNum))
            {
                var data:any[] = [{
                    "itemId":(<Rubbish>this.tar).getModel.toolId,
                    "poor":1,
                    "needNum":1
                }];

                GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_SHORTAGE_BUY, true, {
                    'data':data,
                    'panel':PanelName.TOOLS_PANEL,
                    'param':{"direction":Direction.NONE},
                    'args':[this.operation, (<Rubbish>this.tar)]
                });
                return;
            }
        }


        if(GuideManager.getInstance().isInGuide())
        {
            UIMgr.instance.closeCurrentPanel();
        }

        this.buildingList.length = 0;

        if(ToolConst.HARVEST_FARM == this.operation || ToolConst.HARVEST_TREE == this.operation)
        {
            //this.asset.source = this.getToolImg();
            Loader.setUIAssetAsync(this.getToolImg(), this.asset);
        }
        else if(ToolConst.FELL_TREE == this.operation)
        {
            //this.asset.source = this.fellModel.imgId;
            Loader.setUIAssetAsync(this.fellItemModel.imgId, this.asset);
        }
        else if(ToolConst.PICKUP_RUBBISH == this.operation)
        {
            Loader.setUIAssetAsync((<Rubbish>this.tar).getModel.toolImg, this.asset);
        }
        this.asset.x = evt.stageX;
        this.asset.y = evt.stageY;
        this.asset.anchorX = this.asset.anchorY = .75;
        TweenIt.tweenBigThenNormal(this.asset);
        Lyrs.LYRS_UI_2.addChild(this.asset);

        this.addListeners();


        FarmGuideController.getInstance().nextStep();
    }


    /**
     * 拖动中
     * @param evt
     */
    private toMoveItem(evt:egret.TouchEvent):void
    {
        GameEvent.BubbEvent(evt);

        this.asset.x = evt.stageX;
        this.asset.y = evt.stageY;

        var arr:any[];
        if(ToolConst.HARVEST_TREE == this.operation)
        {
            arr = GetBuildingUtils.getInstance().getRipeTrees();
        }
        else if(ToolConst.HARVEST_FARM == this.operation)
        {
            if(FarmGuideController.getInstance().isInFarmGuide())
            {
                arr = GetBuildingUtils.getInstance().getTheRipeFarmInGuide();
            }
            else
            {
                arr = GetBuildingUtils.getInstance().getRipeFarms(evt);
            }
        }
        else if(ToolConst.FELL_TREE == this.operation)
        {
            arr = [(<TreeBuilding>this.tar)];
        }
        else if(ToolConst.PICKUP_RUBBISH == this.operation)
        {
            arr = [(<Rubbish>this.tar)];
        }


        var i:number;
        var len:number = arr.length;
        var one:any;
        for(i = 0; i < len; i++)
        {
            one = arr[i];

            if(one.hitTestPoint(evt.stageX, evt.stageY, !Global.MQQ_BROWSER))
            {
                if(ToolConst.HARVEST_FARM == this.operation || ToolConst.HARVEST_TREE == this.operation)
                {
                    this.harvest(one);
                }
                else if(ToolConst.FELL_TREE == this.operation)
                {
                    this.fell(one);
                }
                else if(ToolConst.PICKUP_RUBBISH == this.operation)
                {
                    this.pickup(one);
                }

                break;
            }
        }
    }

    //碰到的rubbish
    public pickup(rubbish:Rubbish):void
    {
        if(UserController.instance.isIndulgeState2())
        {
            AntiAddictionController.showPanel();
            return;
        }

        if(this.toolData.itemNum > 0)
        {

            RubbishController.getInstance().pickup(rubbish);

            this.dispose();

        }

    }

    public fell(building:BuildingIso):void
    {
        if(UserController.instance.isIndulgeState2())
        {
            AntiAddictionController.showPanel();
            return;
        }


        if(this.toolData.itemNum > 0)
        {

            TreeController.getInstance().fell(<TreeBuilding>building);

            this.dispose();
        }
    }

    public harvest(building:BuildingIso):void
    {
        var itemId:number;
        var itemNum:number;
        var exp:number;

        if(UserController.instance.isIndulgeState2())
        {
            AntiAddictionController.showPanel();
            return;
        }

        if(ToolConst.HARVEST_TREE == this.operation)
        {
            itemId = this.treeModel.harvestItemId;
            itemNum = this.treeModel["num" + String(building.data.level + 1)];
        }
        else if(ToolConst.HARVEST_FARM == this.operation)
        {
            itemId = building.data.product.itemId;
            itemNum = building.data.product.itemNum;
        }
        var dm:DepotModel = DepotModel.getModelById(itemId);
        exp = dm.exp;

        if(UserController.instance.isIndulgeState1())
        {
            itemNum = Math.ceil(itemNum * .5);
            exp = Math.ceil(exp * .5);
        }


        if(DepotController.instance.isBlast(itemId, itemNum))
        {
            this.toEndItem(null);
            //this.dispose();
            //return;
        }
        else
        {
            //播放音效
            SoundMgr.instance.playAudio(SoundName.CROP_GET);

            var popupItemPos:egret.Point = building.parent.localToGlobal(building.x, building.y);
            GameEvent.watcher.dispatchEvent(new GameEvent(GameEvent.ITEM_CHANGE, false, false, new ItemChange(itemId, itemNum, popupItemPos)));

            GameEvent.watcher.dispatchEvent(new GameEvent(GameEvent.RES_CHANGE, false, false, new ResChange(0, 0, exp, popupItemPos)));

            console.log("==========================收获:", dm.name, "经验值:", exp);

            if(ToolConst.HARVEST_TREE == this.operation)
            {
                (<TreeBuilding>building).assistLogic.harvest();
            }
            else if(ToolConst.HARVEST_FARM == this.operation)
            {
                (<FarmBuilding>building).assistLogic.harvest();
            }

            this.buildingList.push(building);
        }
    }


    private toEndItem(evt:egret.TouchEvent):void
    {
        GameEvent.BubbEvent(evt);

        if(ToolConst.HARVEST_TREE == this.operation)
        {
            TreeController.getInstance().harvest(this.buildingList);
        }
        else if(ToolConst.HARVEST_FARM == this.operation)
        {
            if(0 == this.buildingList.length)
            {
                FarmGuideController.getInstance().rewind();
            }
            else
            {
                FarmController.getInstance().harvest(this.buildingList);
            }
        }

        this.dispose();

    }

    public dispose():void
    {
        this.removeListeners();
        if(this.asset && this.asset.parent)
        {
            this.asset.parent.removeChild(this.asset);
        }
    }


    public updateNum():void
    {
        this.panel.itemNum_lb.text = String(this.toolData.itemNum);
    }

    private addListeners():void
    {
        this.removeListeners();
        Lyrs.STAGE.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMoveItem, this);
        Lyrs.STAGE.addEventListener(egret.TouchEvent.TOUCH_END, this.toEndItem, this);
    }

    private removeListeners():void
    {
        Lyrs.STAGE.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMoveItem, this);
        Lyrs.STAGE.removeEventListener(egret.TouchEvent.TOUCH_END, this.toEndItem, this);
    }

    //===================================================
    /**
     * 获得收获工具
     */
    public getToolImg():string
    {
        var model:BuildingModel = BuildingModel.getModelById(this.tar.model.buildingId);
        return model.hTool;
    }

    //===============================================================
    private static _instance:ToolsPanelLogic;

    public static getInstance():ToolsPanelLogic
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new ToolsPanelLogic();
        }
        return this._instance;
    }
}