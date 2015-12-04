/**
 * on 2014-12-29
 * by leo
 */

class AnimalController
{
    private buyAnimalUI:BuyUI;
    private bg:egret.Shape;
    private animal:Animal;
    private animalId:number;

    public constructor()
    {
        this.buyAnimalUI = new BuyUI();
        this.bg = new egret.Shape();
        this.bg.touchEnabled = true;
        this.bg.width = Lyrs.SW;
        this.bg.height = Lyrs.SH;
    }

    public buyAnimal(animalId:number):void
    {
        this.animalId = animalId;

        Loader.instance.loadGroups([GroupName.ANIMAL_GROUP, GroupName.GOODS_GROUP], this.onLoaded, this);
    }

    public onLoaded():void
    {
        this.showBuyAnimalUI();
        this.showAnimal();
    }

    public onBuy(e:GameEvent):void
    {
        GameEvent.BubbEvent(e);

        this.add(this.animal);
    }

    public onCancel(e:GameEvent):void
    {
        GameEvent.BubbEvent(e);

        this.hideBuyAnimalUI();
        this.hideAnimal();

    }

    public showAnimal():void
    {
        this.animal = AnimalManager.getInstance().generate(this.animalId);
        Lyrs.LYRS_ITEM_IN_SCENE.addChild(this.animal);
        DepthManager.getInstance().addItem(this.animal);
        this.animal.setPosByIso();
        this.animal.updateViewWithoutData();
        this.animal.fadeInWithoutData();
        Camera.getInstance().focus(this.animal, ()=>
        {
            BreedGuideController.getInstance().nextStep();
        });
    }

    public hideAnimal():void
    {
        Lyrs.LYRS_ITEM_IN_SCENE.removeChild(this.animal);
        DepthManager.getInstance().removeItem(this.animal);
        this.animal = null;
    }

    public add(animal:Animal):void
    {
        this.animal = animal;
        var data:Object = {
            "act":"Building.addAnimal",
            "dt":{"animalId":animal.getModel.animalId, "buyType":0}
        };

        SocketManager.instance.send(JSON.stringify(data), false);
    }

    public add_cb(data:any):void
    {
        //GameEvent.watcher.dispatchEvent(new GameEvent(GameEvent.RES_CHANGE_REMOVE, false, false, new ResChange(data.gold, 0, 0, null)));
        //
        //this.pos = null;
        //
        //this.building.data.livestocks.push(data);
        //
        //BreedGuideController.getInstance().nextStep();
        //
        ////===================================================
        //var mm:BreedingPlantModel = BreedingPlantModel.getModelById(this.building.model.buildingId);
        //        var animal:Animal = new Animal(mm);
        //        animal.updateState(data);
        //
        //
        //
        //        animal.x = Math.floor(lineSegement.startX + MapConst.LINE_SEGMENT_LEN * Math.random());
        //        animal.y = animal.x * .5 + lineSegement.l;
        //
        //        this.building.animalLyr.addChild(animal);
        //
        //        this.animals.push(animal);
        this.hideBuyAnimalUI();

        var popupPos:egret.Point = this.animal.parent.localToGlobal(this.animal.x, this.animal.y);
        GameEvent.watcher.dispatchEvent(new GameEvent(GameEvent.RES_CHANGE_REMOVE, false, false, new ResChange(data.gold, 0, 0, popupPos)));

        this.animal.initData(data.userLivestock);

        AnimalManager.getInstance().addAnimalData(data.userLivestock);

        this.animal = null;

        BreedGuideController.getInstance().nextStep();
    }


    public feed(animal:Animal):void
    {
        this.animal = animal;

        var feedItemData:any = DepotController.instance.searchLocalDataAsItemId(animal.getModel.feedItemId);

        if(!feedItemData || 0 == feedItemData.itemNum)
        {
            var passData:any[] = [{
                "itemId":animal.getModel.feedItemId,
                "poor":1,
                "needNum":1
            }];
            GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_SHORTAGE_BUY, true, {
                'data':passData,
                'panel':PanelName.ANIMAL_PANEL,
                'param':{"direction":Direction.NONE},
                'args':animal
            });
            return;
        }

        UIMgr.instance.closeCurrentPanel();

        var data:Object = {"act":"Building.feedAnimal", "dt":{"userLivestockIds":[animal.data.userLivestockId]}};

        SocketManager.instance.send(JSON.stringify(data), false);
    }

    public feed_cb(data:any):void
    {
        BreedGuideController.getInstance().nextStep();

        var dataList:any[] = data.userLivestocks;

        if(dataList && dataList.length > 0)
        {
            this.animal.data = dataList[0];

            this.animal.state = this.animal.standState;
            if(!GuideManager.getInstance().isInGuide())
            {
                this.animal.startup();
            }

            this.animal.startCnt(this.animal.getModel.produceTime);

            this.animal.updateView();

            //消耗派发
            var needData:any[] = [{'itemId':data.item.itemId, 'needNum':data.item.itemNum}];
            var popupPos:egret.Point = this.animal.parent.localToGlobal(this.animal.x, this.animal.y);
            GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_CHANGE_REMOVE, true, new ItemChangeRemove(needData, null, popupPos));
        }

    }

    //===================================================
    //收获动物

    public hAnimal(animal:Animal):void
    {
        this.animal = animal;

        if(UserController.instance.isIndulgeState2())
        {
            AntiAddictionController.showPanel();
            return;
        }

        var itemId:number = this.animal.getModel.itemId;
        var itemNum:number = this.animal.getModel.itemNum;

        if(UserController.instance.isIndulgeState1())
        {
            itemNum = Math.ceil(itemNum * .5);
        }

        if(DepotController.instance.isBlast(itemId, itemNum))
        {
            TipText.instace.play('爆仓');
            return;
        }

        UIMgr.instance.closeCurrentPanel();

        var data:Object = {"act":"Building.harvestAnimal", "dt":{"userLivestockIds":[animal.data.userLivestockId]}};

        SocketManager.instance.send(JSON.stringify(data), false);
    }

    public hAnimal_cb(data:any):void
    {
        BreedGuideController.getInstance().nextStep();

        var popupPos:egret.Point = this.animal.parent.localToGlobal(this.animal.x, this.animal.y);
        GameEvent.watcher.dispatchEvent(new GameEvent(GameEvent.RES_CHANGE, false, false, new ResChange(0, 0, data.exp, popupPos)));

        GameEvent.watcher.dispatchEvent(new GameEvent(GameEvent.ITEM_CHANGE, false, false, new ItemChange(data.item.itemId, data.item.itemNum, popupPos)));

        this.animal.data = data.userLivestocks[0];

        this.animal.updateView();

        this.animal = null;
    }


    //===================================================
    public speed(animal:Animal, dNum:number):void
    {
        this.animal = animal;

        if(!UserController.instance.isDiamondEnough(dNum))
        {
            return;
        }

        UIMgr.instance.closeCurrentPanel();


        var data:Object = {
            "act":"Building.speedUp",
            "dt":{
                "userBuildingId":0,
                "userProductId":animal.data.userLivestockId,
                "moduleType":SpeedupType.SPEEDUP_ANIMAL
            }
        };

        SocketManager.instance.send(JSON.stringify(data), false);
    }


    public speed_cb(data:any):void
    {
        console.log("change to full state by speed");

        var popupPos:egret.Point = this.animal.parent.localToGlobal(this.animal.x, this.animal.y);
        GameEvent.watcher.dispatchEvent(new GameEvent(GameEvent.RES_CHANGE_REMOVE, false, false, new ResChange(0, data.money, 0, popupPos)));

        this.animal.suspend();

        this.animal.stopCnt();

        this.animal.data = data.userLivestock;

        this.animal.updateView();

        this.animal = null;

        BreedGuideController.getInstance().nextStep();
    }

    public showBuyAnimalUI():void
    {
        var gold:number;

        Lyrs.LYRS_UI_2.addChild(this.bg);
        gold = AnimalModel.getGold(this.animalId);
        this.buyAnimalUI.setGold(gold);
        this.buyAnimalUI.addEventListener(GameEvent.CANCEL_BUY_ITEM, this.onCancel, this);
        this.buyAnimalUI.addEventListener(GameEvent.BUY_ITEM, this.onBuy, this);
        Lyrs.LYRS_UI_2.addChild(this.buyAnimalUI);
        this.buyAnimalUI.x = Math.floor((Lyrs.SW - 327) * .5);
        this.buyAnimalUI.y = Lyrs.SH - 107;
        this.buyAnimalUI.setTwoBtnAlpha(0.6, 1);
    }

    public hideBuyAnimalUI():void
    {
        if(this.buyAnimalUI.parent)
        {
            this.buyAnimalUI.parent.removeChild(this.buyAnimalUI);
        }
        if(this.bg.parent)
        {
            this.bg.parent.removeChild(this.bg);
        }
    }

    public getBuyBtn():egret.DisplayObject
    {
        return this.buyAnimalUI.buy_btn;
    }

    //================================================================================
    private static _instance:AnimalController;

    public static getInstance():AnimalController
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new AnimalController();
        }
        return this._instance;
    }
}