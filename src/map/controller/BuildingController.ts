/**
 * on 2015-01-13
 * by leo
 */

class BuildingController
{
    public building:BuildingIso;

    public constructor()
    {

    }

    public move(building:BuildingIso):void
    {
        this.building = building;

        var position:string = PosUtils.getPosStr(building);
        var data:Object = {
            "act":"Building.changePosition",
            "dt":{"userBuildingId":building.data.userBuildingId, "position":position}
        };
        SocketManager.instance.send(JSON.stringify(data));
    }

    public move_cb():void
    {
        //摆初始建筑用，不要删掉
        //console.log("==========================", this.building.model.name + "的位置：(" + PosUtils.getPosStr(this.building) + ")");

        CollisionCheck.getInstance().change(this.building, MapConst.OP_ADD);

        this.building.setBottomVisible(false);

        egret.Tween.removeTweens(this.building);

        this.building.alpha = 1;

        ModeLogic.getInstance().enterNormalMode(this.building);

        DepthManager.getInstance().moveItem(this.building);

        this.building = null;
    }

    public buy(building:BuildingIso):void
    {
        this.building = building;

        //判断价格
        var current:number = GetBuildingUtils.getInstance().getBuildingNumByBuildingId(building.model.buildingId);
        current = (current - 1 < 0) ? 0 : (current - 1);
        var gold: number = 0;
        if(BuildingModel.isGold(building.model.buildingId)){

            gold = BuildingModel.getGold(building.model.buildingId, current);
            if(!UserController.instance.isGoldEnough(gold))
            {
                this.building = null;
                return;
            }

        }else if(BuildingModel.isDiamond(building.model.buildingId)){

            gold = BuildingModel.getDiamond(building.model.buildingId, current);
            if(!UserController.instance.isDiamondEnough(gold))
            {
                this.building = null;
                return;
            }

        }

        var position:string = PosUtils.getPosStr(building);
        var data:Object = {
            "act":"Building.buy",
            "dt":{"buildingId":building.model.buildingId, "position":position, "buyType":0}
        };
        SocketManager.instance.send(JSON.stringify(data));
    }

    public isExceedNum():boolean
    {
        var curLv:number = UserController.instance.level;
        var cur:number = GetBuildingUtils.getInstance().getBuildingNumByBuildingId(this.building.model.buildingId);
        var total:number = BuildingModel.getMax(this.building.model.buildingId, curLv);

        if(cur == total)
        {
            //TipText.instace.play("当前等级的建筑数量已达上限");
            TipText.instace.play(Language.getString( 3, 13, cur, total ));
            return true;
        }

        return false;
    }

    public buy_cb(data:any):void
    {

        //console.log("==========================", this.building.model.name + "的位置：(" + PosUtils.getPosStr(this.building) + ")");

        egret.Tween.removeTweens(this.building);

        this.building.alpha = 1;

        this.building.setBottomVisible(false);

        this.building.updateData(data.userBuilding);

        CollisionCheck.getInstance().change(this.building, MapConst.OP_ADD);

        ModeLogic.getInstance().enterNormalMode(this.building);

        DepthManager.getInstance().moveItem(this.building);

        if(BuildingID.BUILDING_ID_FARM == this.building.model.buildingId)
        {
            var farmPos:Point3D = new Point3D();
            farmPos.x = this.building.pShort.x;
            farmPos.z = this.building.pShort.z;
            ModeLogic.getInstance().saveFarmPos(farmPos);

            if(!this.isExceedNum())
            {
                ModeLogic.getInstance().enterBuyMode(this.building.model);
            }
        }

        //购买消耗的金币数量
        if(data.money > 0){
            var pos: egret.Point = this.building.parent.localToGlobal(this.building.x, this.building.y);
            var resChange: ResChange;
            if(BuildingModel.isGold(this.building.model.buildingId)){
                resChange = new ResChange(data.money, 0, 0, pos)
            }else if(BuildingModel.isDiamond(this.building.model.buildingId)){
                resChange = new ResChange(0, data.money, 0, pos)
            }

            GameEvent.watcher.dispatchEventWith(GameEvent.RES_CHANGE_REMOVE, true, resChange);
        }

        //将建筑定位到中间
        //Camera.getInstance().focus(GetBuildingUtils.getInstance().getBuilding(this.building.data.userBuildingId));

        //新手引导  (面包机)

        GuideManager.getInstance().addForbiden();

        if(BuildingID.BREAD_PRODUCT === this.building.model.buildingId && ProductGuideController.getInstance().isInProductGuide()){

            ProductGuideController.getInstance().nextStep();

        }
        //新手引导  (饲料机)
        else if(BuildingID.PLASTIC_PRODUCT == this.building.model.buildingId && PlasticGuideController.getInstance().isInPlasticGuide()){

            PlasticGuideController.getInstance().nextStep();

        }

        this.building = null;


    }
    public static harvestProduct( buildingId:number ):void
    {
        var sdata:Object = {
            "act": "Building.harvestProduct",
            "dt": { "userBuildingId":buildingId }
        };
        SocketManager.instance.send(JSON.stringify(sdata));
    }
    public static onHarvestProduct( data:Object ):void
    {
        var building = GetBuildingUtils.getInstance().getBuilding( data[ 'userBuildingId' ] );
        var buildingId:number = building.cfgBuildingId;
        if( BuildingID.MINE == buildingId )
        {
            building.onHarvestProduct( data );
            return;
        }

        if( -1 == BuildingID.PROCESS_FACTORY.indexOf( building ) )
        {
            ProcessFactoryController.getInstance().updateHarvest(data);
        }
    }

    //================================================================================
    private static _instance:BuildingController;

    public static getInstance():BuildingController
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new BuildingController();
        }
        return this._instance;
    }
    public static get instance(): BuildingController{ return BuildingController.getInstance(); }
}