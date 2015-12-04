/**
 * on 2014-12-30
 * by leo
 */
class GetBuildingUtils
{
    public constructor()
    {

    }

    //========================================================================================


    public getBuilding(userBuildingId:number, key:string = 'userBuildingId'):any
    {
        var itemList:ItemIso[] = DepthManager.getInstance().getItemList();
        var item:ItemIso;
        var i:number;
        for(i = 0; i < itemList.length; i++)
        {
            item = itemList[i];

            if(item instanceof BuildingIso)
            {
                if((<BuildingIso>item).data[key] == userBuildingId)
                {
                    return <BuildingIso>item;
                }
            }
        }
    }

    public getBuildingByBuildingId(buildingId:number):any
    {
        return this.getBuilding(buildingId, 'buildingId');
    }


    public getBuildingNumByBuildingId(id:number):number
    {
        var itemList:ItemIso[] = DepthManager.getInstance().getBuildings();
        var item:ItemIso;
        var i:number;
        var re:number = 0;

        for(i = 0; i < itemList.length; i++)
        {
            item = itemList[i];
            if(item instanceof BuildingIso)
            {
                if((<BuildingIso>item).model.buildingId == id)
                {
                    re++;
                }
            }
        }

        return re;
    }


    public getAnimalNum(buildingId:number):number
    {
        var buildingList:BuildingIso[] = DepthManager.getInstance().getBuildings();
        var building:BuildingIso;
        var i:number;
        var len:number = buildingList.length;
        var re:number = 0;

        for(i = 0; i < len; i++)
        {
            building = buildingList[i];
            if(building.model.buildingId == buildingId)
            {
                re += building.data.livestocks && (building.data.livestocks.length || 0);
            }
        }

        return re;

    }


    public getItemListByMousePos(e:egret.TouchEvent):ItemIso[]
    {
        var itemList:ItemIso[] = DepthManager.getInstance().getItemList();
        var p:egret.Point = Lyrs.LYRS_ITEM_IN_SCENE.globalToLocal(e.stageX, e.stageY);
        var p3d:Point3D = TransUtils.screenToIso(p);
        //         var leftUp:Point3D = new Point3D(p3d.x - 4, 0, p3d.z - 4);
        //         var rightBottom:Point3D = new Point3D(p3d.x + 4, 0, p3d.z + 4);

        var mouseRt:egret.Rectangle = new egret.Rectangle(p3d.x, p3d.z, 4, 4);
        var itemRt:egret.Rectangle;


        var i:number = 0;
        var len:number = itemList.length;
        var one:ItemIso;
        var re:ItemIso[] = [];

        for(i = 0; i < len; i++)
        {
            one = itemList[i];
            itemRt = new egret.Rectangle(one.pShort.x, one.pShort.z, one.model.col, one.model.row);
            if(itemRt.intersects(mouseRt))
            {
                re.push(one);
            }
            //             if ((one.pShort.x >= leftUp.x && one.pShort.z >= leftUp.z && one.pShort.x < rightBottom.x && one.pShort.z < rightBottom.z) ||
            //                 (one.pShort.x + one.model.col >= leftUp.x && one.pShort.z + one.model.row >= leftUp.z && one.pShort.x + one.model.col < rightBottom.x && one.pShort.z + one.model.row < rightBottom.z)){
            //                 re.push(one);
            //             }
            //            if (one.pShort.x >= leftUp.x && one.pShort.z >= leftUp.z && one.pShort.x < rightBottom.x && one.pShort.z < rightBottom.z)
            //            {
            //                re.push(one);
            //            }

        }
        return re;
    }

    //===================================================
    //农田
    public getNoPlantedFarms(e:egret.TouchEvent):FarmBuilding[]
    {
        var itemList:ItemIso[] = DepthManager.getInstance().getItemList();

        var p:egret.Point = Lyrs.LYRS_ITEM_IN_SCENE.globalToLocal(e.stageX, e.stageY);
        var p3d:Point3D = TransUtils.screenToIso(p);

        var i:number;
        var len:number = itemList.length;
        var one:ItemIso;
        var re:FarmBuilding[] = [];
        var two:FarmBuilding;

        for(i = 0; i < len; i++)
        {
            one = itemList[i];
            if(one instanceof FarmBuilding)
            {
                two = <FarmBuilding>one;
                if(!two.assistLogic.isPlanted)
                {
                    if(one.pShort.x == p3d.x && one.pShort.z == p3d.z)
                    {
                        re.push(two);
                    }
                }
            }
        }
        return re;
    }

    public getRipeFarms(e:egret.TouchEvent):FarmBuilding[]
    {
        //===
        var itemList:ItemIso[] = DepthManager.getInstance().getItemList();
        var p:egret.Point = Lyrs.LYRS_ITEM_IN_SCENE.globalToLocal(e.stageX, e.stageY);
        var p3d:Point3D = TransUtils.screenToIso(p);

        var i:number = 0;
        var len:number = itemList.length;
        var one:ItemIso;
        var re:FarmBuilding[] = [];
        var two:FarmBuilding;

        for(i = 0; i < len; i++)
        {
            one = itemList[i];
            if(one instanceof FarmBuilding)
            {
                two = <FarmBuilding>one;
                if(two.assistLogic.isRipe)
                {
                    if(one.pShort.x == p3d.x && one.pShort.z == p3d.z)
                    {
                        re.push(two);
                    }
                }
            }
        }
        return re;
    }

    public getLastFarmPos():Point3D
    {
        var itemList:ItemIso[] = DepthManager.getInstance().getItemList();

        var i:number;
        var len:number = itemList.length;
        var one:ItemIso;
        var two:FarmBuilding;
        var lastFarm:FarmBuilding;
        var re:Point3D;

        for(i = 0; i < len; i++)
        {
            one = itemList[i];
            if(one instanceof FarmBuilding)
            {
                if(null == lastFarm)
                {
                    lastFarm = <FarmBuilding>one;
                }
                else
                {
                    two = <FarmBuilding>one;
                    if(two.data.userBuildingId > lastFarm.data.userBuildingId)
                    {
                        lastFarm = two;
                    }
                }
            }
        }

        if(lastFarm)
        {
            re = lastFarm.pShort;
        }

        return re;
    }

    //===================================================
    //果树
    public getRipeTrees():BuildingIso[]
    {
        var itemList:BuildingIso[] = DepthManager.getInstance().getBuildings();
        var i:number;
        var len:number = itemList.length;
        var re:BuildingIso[] = [];
        var one:BuildingIso;
        for(i = 0; i < len; i++)
        {
            one = itemList[i];

            if(BuildingID.TYPE_TREE == one.model.type && (<TreeBuilding>one).assistLogic.isRipe)
            {
                re.push(one);
            }
        }
        return re;
    }

    //===================================================
    //新手引导获取相关建筑
    //===================================================
    public getTheFarmInGuide():BuildingIso
    {
        var itemList:BuildingIso[] = DepthManager.getInstance().getBuildings();
        var i:number;
        var len:number = itemList.length;
        var one:BuildingIso;
        for(i = 0; i < len; i++)
        {
            one = itemList[i];
            if(this.isTheFarmInGuide(one))
            {
                return one;
            }
        }
        console.log("==========================error: the farm whichs in farm guide is not exsited");
        return null;
    }

    public getTheNoPlantFarmInGuide():BuildingIso[]
    {
        var re:BuildingIso[] = [];

        var theFarm:BuildingIso = this.getTheFarmInGuide();
        if(!(<FarmBuilding>theFarm).assistLogic.isPlanted)
        {
            re.push(theFarm);
        }
        return re;
    }

    public getTheRipeFarmInGuide():BuildingIso[]
    {
        var re:BuildingIso[] = [];

        var theFarm:BuildingIso = this.getTheFarmInGuide();
        if((<FarmBuilding>theFarm).assistLogic.isRipe)
        {
            re.push(theFarm);
        }
        return re;
    }

    public getTheBuildingInGuide(buildingId:number):BuildingIso
    {
        var itemList:BuildingIso[] = DepthManager.getInstance().getBuildings();
        var i:number;
        var len:number = itemList.length;
        var one:BuildingIso;
        for(i = 0; i < len; i++)
        {
            one = itemList[i];

            if(buildingId == one.model.buildingId)
            {
                return one;
            }
        }
        return null;
    }

    public getTheVillagerInGuide():Villager
    {
        var villagerList:Villager[] = DepthManager.getInstance().getVillagers();
        return villagerList[0];
    }

    public getTheAnimalInGuide():Animal
    {
        var animalList:Animal[] = DepthManager.getInstance().getAnimals();
        return animalList[0];
    }

    public isTheFarmInGuide(building:BuildingIso):boolean
    {
        var pos:egret.Point = StringUtils.toPoint(building.data.position, "*");
        if(GuideManager.FARM_X_IN_GUIDE == pos.x && GuideManager.FARM_Y_IN_GUIDE == pos.y)
        {
            return true;
        }
        return false;
    }
    //===============================================================
    private static _instance:GetBuildingUtils;

    public static getInstance():GetBuildingUtils
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new GetBuildingUtils();
        }
        return this._instance;
    }
}

