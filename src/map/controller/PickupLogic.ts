/**
 * on 2014-12-27
 * by leo
 */

class PickupLogic
{
    private isLock:boolean;

    public constructor()
    {
        this.isLock = false;
        Lyrs.LYRS_SCENE.touchEnabled = true;
        Lyrs.LYRS_SCENE.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pickup, this);
    }

    /*
     禁止选择建筑
     */
    public setLock(v:boolean):void
    {
        this.isLock = v;
    }

    public pickup(e:egret.TouchEvent):void
    {
        var list:ItemIso[];

        if(this.isLock)
        {
            return;
        }


        if(FarmGuideController.getInstance().isInFarmGuide())
        {
            list = [GetBuildingUtils.getInstance().getTheFarmInGuide()];
        }
        else if(BreedGuideController.getInstance().isInBreedGuide())
        {
            list = [GetBuildingUtils.getInstance().getTheAnimalInGuide()];
        }
        //面包机
        else if(ProductGuideController.getInstance().isInProductGuide())
        {
            list = [GetBuildingUtils.getInstance().getTheBuildingInGuide(BuildingID.BREAD_PRODUCT)];
        }
        //饲料机
        else if(PlasticGuideController.getInstance().isInPlasticGuide())
        {
            list = [GetBuildingUtils.getInstance().getTheBuildingInGuide(BuildingID.PLASTIC_PRODUCT)];
        }
        else if(VillagerGuideController.getInstance().isInVillagerGuide())
        {
            list = DepthManager.getInstance().getVillagers();
        }
        //订单版
        else if(OrderGuideController.getInstance().isInOrderGuide())
        {
            list = [GetBuildingUtils.getInstance().getTheBuildingInGuide(BuildingID.ORDER_BOARD)];
        }
        else
        {
            list = GetBuildingUtils.getInstance().getItemListByMousePos(e);
        }

        //        var start = egret.getTimer();

        var i:number;
        var building:BuildingIso;
        var villager:Villager;
        var rubbish:Rubbish;
        var animal:Animal;
        var re:any;

        for(i = list.length - 1; i >= 0; i--)
        {
            if(list[i] instanceof BuildingIso)
            {

                building = <BuildingIso>list[i];
                if(building.hitTestPoint(e.stageX, e.stageY, !Global.MQQ_BROWSER))
                {
                    re = building;
                    //alert(navigator.userAgent + '---' + Global.MQQ_BROWSER);
                    break;
                }
            }
            else if(list[i] instanceof Villager)
            {
                villager = <Villager>list[i];

                if(villager.hitTestPoint(e.stageX, e.stageY, !Global.MQQ_BROWSER))
                {
                    re = villager;
                    break;
                }
            }
            else if(list[i] instanceof Rubbish)
            {
                rubbish = <Rubbish>list[i];

                if(rubbish.hitTestPoint(e.stageX, e.stageY, !Global.MQQ_BROWSER))
                {
                    re = rubbish;
                    break;
                }
            }
            else if(list[i] instanceof Animal)
            {
                animal = <Animal>list[i];

                if(animal.hitTestPoint(e.stageX, e.stageY, !Global.MQQ_BROWSER))
                {
                    re = animal;
                    break;
                }
            }
        }

        //        console.log((egret.getTimer() - start) * .001);

        if(null == re)
        {
            return;
        }

        if(re instanceof BuildingIso)
        {
            ModeLogic.getInstance().click(e, <BuildingIso>re);
            return;
        }
        if(ModeLogic.getInstance().isNormalMode())
        {
            if(re instanceof Villager)
            {
                (<Villager>re).click();
            }
            else if(re instanceof Rubbish)
            {
                (<Rubbish>re).click();
            }
            else if(re instanceof Animal)
            {
                (<Animal>re).click();
            }
        }
    }

    //===============================================================
    private static _instance:PickupLogic;

    public static getInstance():PickupLogic
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new PickupLogic();
        }
        return this._instance;
    }
}