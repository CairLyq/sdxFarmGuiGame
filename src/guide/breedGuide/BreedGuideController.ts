/**
 * on 2015-02-06
 * by leo
 */

class BreedGuideController
{
    private step:number = 0;
    public static LAST_STEP:number = 13;
    public static BASE:number = 200;

    public constructor()
    {
    }

    //===================================================
    public nextStep(add:number = 1):void
    {
        if(this.isInBreedGuide())
        {
            this.addStep(add);

            this.guide();
            //===================================================
            GuideManager.getInstance().changeStep(BreedGuideController.BASE + this.step);
        }
    }

    public gotoStep(step:number):void
    {
        if(this.isInBreedGuide())
        {
            this.setStep(step);

            this.guide();
            //===================================================
            GuideManager.getInstance().changeStep(BreedGuideController.BASE + step);
        }
    }

    public rewind():void
    {
        if(this.isInBreedGuide())
        {
            this.rewindStep();

            this.guide();
        }
    }

    public startGuide():void
    {
        if(this.isInBreedGuide())
        {
            this.rewindStep();

            this.guide();
        }
    }

    public rewindStep():void
    {
        var mm:GuideModel = GuideModel.getModelByStep(BreedGuideController.BASE, this.step);
        this.step = mm.rewindStep;
    }

    //private addBlocksByTheBreed():void
    //{
    //    var theBreed:BuildingIso;
    //    var anchorX:number;
    //    var anchorY:number;
    //
    //    theBreed = GetBuildingUtils.getInstance().getTheBuildingInGuide(BuildingID.THE_BREED);
    //    anchorX = .45;
    //    anchorY = .4;
    //    GuideManager.getInstance().addBlocks(theBreed, anchorX, anchorY);
    //}
    private addBlocksByTheAnimal():void
    {
        var theAnimal:Animal;
        var anchorX:number;
        var anchorY:number;

        theAnimal = GetBuildingUtils.getInstance().getTheAnimalInGuide();
        anchorX = .5;
        anchorY = .5;
        GuideManager.getInstance().addBlocks(theAnimal, anchorX, anchorY);
    }

    public isAnimalFull():boolean
    {
        var theAnimal:Animal = GetBuildingUtils.getInstance().getTheAnimalInGuide();
        return theAnimal.isFull();
    }

    //private popupBreedPanel():void
    //{
    //    var panel:game.BreedingPanelV2 = UIMgr.instance.getPanel(PanelName.BREEDING_PANEL_V2);
    //    if(!panel.parent)
    //    {
    //        var theBreed:BuildingIso = GetBuildingUtils.getInstance().getTheBuildingInGuide(BuildingID.THE_BREED);
    //        Camera.getInstance().focus(theBreed);
    //        UIMgr.instance.show(PanelName.BREEDING_PANEL_V2, {"direction":Direction.NONE}, theBreed);
    //    }
    //}

    private focus():void
    {
        var theAnimal:Animal = GetBuildingUtils.getInstance().getTheAnimalInGuide();
        Camera.getInstance().focus(theAnimal);
    }

    //===================================================
    public guide():void
    {
        if(!this.isInBreedGuide())
        {
            GuideManager.getInstance().clear();

            console.log("==========================breed guide finish, turn to product guide");

            //            TouchLogic.getInstance().setIsLock(false);

            //开始进入生产建造引导中...
            /*UIMgr.instance.closeCurrentPanel(function(){
             ProductGuideController.getInstance().startGuide();
             });*/

            return;
        }

        console.log("==========================breed guide current step:", this.step);

        var mm:GuideModel = GuideModel.getModelByStep(BreedGuideController.BASE, this.step);
        var tar:egret.DisplayObject;

        GuideManager.getInstance().addGuide();

        if(mm.promptType)
        {
            GuideManager.getInstance().addWomanSayUI(mm.promptType, StringUtils.toPoint(mm.npcPos, "*"), mm.promptTxt);
        }
        if(mm.circlePos)
        {
            GuideManager.getInstance().addCircle(StringUtils.toPoint(mm.circlePos, "*"));
        }
        if(mm.fingerType)
        {
            GuideManager.getInstance().addFinger(mm.fingerType, mm.fingerTrack, mm.time);
        }


        switch(this.step)
        {
            case 0:
                GuideManager.getInstance().addTouchPass();
                break;

            case 1:
                //定位商店图标
                tar = this.getShopIcon();
                GuideManager.getInstance().addBlocks(tar);
                break;

            case 2:
                //定位养殖栏目
                tar = this.getShopCate();
                GuideManager.getInstance().addBlocks(tar);
                break;

            case 3:
                //定位嘟嘟鸟
                tar = this.getShopItem();
                GuideManager.getInstance().addBlocks(tar);
                break;

            case 4:
                tar = this.getBuyBtn();
                GuideManager.getInstance().addBlocks(tar);
                break;

            case 5:
                this.focus();
                GuideManager.getInstance().addTouchPass();
                break;

            case 6:
                //喂食
                this.addBlocksByTheAnimal();
                break;

            case 7:
                tar = this.getFeedBtn();
                GuideManager.getInstance().addBlocks(tar);
                break;

            case 8:
                if(this.isAnimalFull())
                {
                    this.gotoStep(11);
                }
                else
                {
                    this.focus();
                    GuideManager.getInstance().addTouchPass();
                }
                break;

            case 9:
                this.addBlocksByTheAnimal();
                break;

            case 10:
                tar = this.getSpeedBtn();
                GuideManager.getInstance().addBlocks(tar);
                break;

            case 11:
                this.focus();
                GuideManager.getInstance().addTouchPass();
                break;

            case 12:
                this.addBlocksByTheAnimal();
                break;

            case 13:
                tar = this.getHarvestBtn();
                GuideManager.getInstance().addBlocks(tar);
                break;
        }
    }

    //===================================================
    public isInBreedGuide():boolean
    {
        if(BreedGuideController.LAST_STEP >= this.step)
        {
            return true;
        }
        return false;
    }

    //===================================================
    public setStep(step:number):void
    {
        this.step = step;
    }

    public addStep(add:number):void
    {
        this.step += add;
    }

    //===================================================assist
    //private getAnimalImg():egret.DisplayObject
    //{
    //    var panel:game.BreedingPanelV2 = UIMgr.instance.getPanel(PanelName.BREEDING_PANEL_V2);
    //    return panel.getAnimalImg();
    //}
    //
    //private getFeedImg():egret.DisplayObject
    //{
    //    var panel:game.BreedingPanelV2 = UIMgr.instance.getPanel(PanelName.BREEDING_PANEL_V2);
    //    return panel.getFeedImg();
    //}

    private getPosRelativeToTar(obj:egret.DisplayObject):egret.Point
    {
        var re:egret.Point = new egret.Point();

        obj.parent.localToGlobal(obj.x + obj.width * .5, obj.y + obj.height * .5, re);

        return re;
    }

    public getFeedBtn():egret.DisplayObject
    {
        var win:game.AnimalPanel = UIMgr.instance.getPanel(PanelName.ANIMAL_PANEL);
        return win.getFeedBtn();
    }

    public getSpeedBtn():egret.DisplayObject
    {
        var win:game.AnimalPanel = UIMgr.instance.getPanel(PanelName.ANIMAL_PANEL);
        return win.getSpeedBtn();
    }

    public getHarvestBtn():egret.DisplayObject
    {
        var win:game.AnimalPanel = UIMgr.instance.getPanel(PanelName.ANIMAL_PANEL);
        return win.getHarvestBtn();
    }


    public getBuyBtn():egret.DisplayObject
    {
        return AnimalController.getInstance().getBuyBtn();
    }

    public getShopIcon():egret.DisplayObject
    {
        return GameUI.instance.shop;
    }

    public getShopCate():egret.DisplayObject
    {
        var win:any = UIMgr.instance.getPanel(PanelName.SHOPPING_PANEL);
        return win.getShopCate(0);
    }

    public getShopItem():egret.DisplayObject
    {
        var win:any = UIMgr.instance.getPanel(PanelName.SHOP_CATE_PANEL);
        return win.getShopItem(0);
    }

    //================================================================================
    private static _instance:BreedGuideController;

    public static getInstance():BreedGuideController
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new BreedGuideController();
        }
        return this._instance;
    }
}