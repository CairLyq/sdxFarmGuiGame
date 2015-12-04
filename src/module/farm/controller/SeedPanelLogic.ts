/**
 * on 2014-12-24
 * by leo
 */

class SeedPanelLogic
{

    private asset:egret.gui.UIAsset;
    private farms:FarmBuilding[];
    private seedData:any;
    private panel:game.SeedPanel;

    public constructor(panel:game.SeedPanel)
    {
        this.farms = [];
        this.panel = panel;
    }

    /**
     * 开始拖动
     * @param evt
     */
    public toStartItem(evt:egret.TouchEvent):void
    {
        GameEvent.BubbEvent(evt);


        var target:SeedItemRender = evt.currentTarget;
        var seedModel:DepotModel = target.seedModel;
        if(target.lock)
        {
            TipText.instace.play("将于" + seedModel.unlockLv + "级解锁");
            return;
        }

        this.seedData = target.seedData;

        var isLack:boolean = false;
        if(!this.seedData || (this.seedData && 0 == this.seedData.itemNum))
        {
            isLack = true;
        }
        if(isLack)
        {
            var data:any[] = [{
                "itemId":seedModel.itemId,
                "poor":1,
                "needNum":1
            }];

            GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_SHORTAGE_BUY, true, {
                'data':data,
                'panel':PanelName.SEED_PANEL,
                'param':{"direction":Direction.NONE},
                'args':this.panel.building
            });
            
            return;
        }

        if(GuideManager.getInstance().isInGuide())
        {
            UIMgr.instance.closeCurrentPanel();
        }

        this.farms.length = 0;

        this.asset = new egret.gui.UIAsset(target.icon);
        this.asset.x = evt.stageX;
        this.asset.y = evt.stageY;
        this.asset.anchorX = this.asset.anchorY = .5;
        TweenIt.tweenBigThenNormal(this.asset);
        //egret.Tween.get(this.asset).to({scaleX:1.6, scaleY:1.6}, 100, egret.Ease.elasticOut);
        Lyrs.LYRS_UI.addChild(this.asset);

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

        if(0 == this.seedData.itemNum)
        {
            return;
        }

        this.asset.x = evt.stageX;
        this.asset.y = evt.stageY;

        var arr:any[];

        if(FarmGuideController.getInstance().isInFarmGuide())
        {
            arr = GetBuildingUtils.getInstance().getTheNoPlantFarmInGuide();
        }
        else
        {
            arr = GetBuildingUtils.getInstance().getNoPlantedFarms(evt);
        }
        var i:number;
        var one:FarmBuilding;
        for(i = 0; i < arr.length; i++)
        {
            one = arr[i];

            if(one.hitTestPoint(evt.stageX, evt.stageY, !Global.MQQ_BROWSER))
            {
                if(this.seedData.itemNum > 0)
                {

                    this.farms.push(one);

                    one.assistLogic.plant(this.seedData.itemId);

                    //GameEvent.watcher.dispatchEvent(new GameEvent(GameEvent.ITEM_CHANGE, false, false, new ItemChange(this.seedData.itemId, -1)));

                    //消耗派发
                    var needData:any[] = [{'itemId':this.seedData.itemId, 'needNum':1}];
                    var point:egret.Point = new egret.Point(evt.stageX, evt.stageY);

                    GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_CHANGE_REMOVE, true, new ItemChangeRemove(needData, null, point, { isUpdateItem: true }));

                    this.panel.updateSeedNum();

                    if(0 == this.seedData.itemNum)
                    {
                        this.toEndItem(evt);
                    }
                    //console.log("剩余种子数量....", this.seedData.itemNum);

                    FarmGuideController.getInstance().nextStep();

                    //播放音效
                    SoundMgr.instance.playAudio(SoundName.CROP_SEEDING);

                }
                else
                {
                    this.toEndItem(evt);
                    break;
                }
            }
        }
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

    /**
     * 拖动结束
     * @param evt
     */
    private toEndItem(evt:egret.TouchEvent):void
    {
        GameEvent.BubbEvent(evt);
        this.removeListeners();

        this.removeAsset();


        if(0 == this.farms.length)
        {
            FarmGuideController.getInstance().rewind();
        }
        else
        {
            FarmController.getInstance().plant(this.farms, this.seedData.itemId);
        }
    }

    //===================================================
    public removeAsset():void
    {
        if(this.asset && this.asset.parent)
        {
            this.asset.parent.removeChild(this.asset);
            this.asset = null;
        }
    }
}