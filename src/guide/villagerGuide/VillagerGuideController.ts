/**
 * on 2015-03-04
 * by leo
 */

class VillagerGuideController
{
    private step:number = 0;
    public static LAST_STEP:number = 2;
    public static BASE:number = 500;


    public constructor()
    {

    }


    public nextStep(add:number = 1):void
    {
        if(this.isInVillagerGuide())
        {
            this.addStep(add);

            this.guide();
            //===================================================
            GuideManager.getInstance().changeStep(VillagerGuideController.BASE + this.step);

        }
    }


    public startGuide():void
    {
        if(this.isInVillagerGuide())
        {
            this.rewindStep();

            this.guide();
        }
    }

    public rewind():void
    {
        if(this.isInVillagerGuide())
        {
            this.rewindStep();

            this.guide();
        }
    }


    //===================================================
    public setStep(step:number):void
    {
        this.step = step;
    }


    //===================================================
    public guide():void
    {

        if(!this.isInVillagerGuide())
        {
            GuideManager.getInstance().clear();
            PickupLogic.getInstance().setLock(false);

            OrderGuideController.getInstance().startGuide();//订单引导开始
            return;
        }

        console.log("==========================villager guide current step:", this.step);

        var mm: GuideModel = GuideModel.getModelByStep(VillagerGuideController.BASE, this.step);
        var tar:egret.DisplayObject;

        PickupLogic.getInstance().setLock(true);

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
                this.focus();
                GuideManager.getInstance().addTouchPass();

                break;
            case 1:
                this.addBlocksByTheVillager();

                break;
            case 2:
                tar = this.getSellBtn();
                GuideManager.getInstance().addBlocks(tar);

                break;
        }
    }

    //===================================================
    public addStep(add:number):void
    {
        this.step += add;
    }

    private rewindStep():void
    {
        var mm: GuideModel = GuideModel.getModelByStep(VillagerGuideController.BASE, this.step);
        this.step = mm.rewindStep;
    }

    //===================================================
    private focus():void
    {
        var theVillager:Villager;

        theVillager = GetBuildingUtils.getInstance().getTheVillagerInGuide();
        Camera.getInstance().focus(theVillager);
    }

    private addBlocksByTheVillager():void
    {
        var theVillager:Villager;
        var anchorX:number;
        var anchorY:number;

        theVillager = GetBuildingUtils.getInstance().getTheVillagerInGuide();
        anchorX = .5;
        anchorY = 1;
        //console.log(anchorX, anchorY)
        GuideManager.getInstance().addBlocks(theVillager, anchorX, anchorY);
    }

    private getSellBtn():egret.DisplayObject
    {
        var panel:game.VillagerSellPanel = UIMgr.instance.getPanel(PanelName.VILLAGER_SELL_PANEL);
        return panel.getSellBtnInVillagerGuide();
    }

    public isInVillagerGuide():boolean
    {
        if(VillagerGuideController.LAST_STEP >= this.step)
        {
            return true;
        }
        return false;
    }

    //===================================================
    private static _instance:VillagerGuideController;

    public static getInstance():VillagerGuideController
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new VillagerGuideController();
        }
        return this._instance;
    }
}