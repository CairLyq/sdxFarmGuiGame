/**
 * on 2015-02-04
 * by leo
 */

class FarmGuideController
{
    private step:number = 0;
    public static LAST_STEP:number = 9;
    public static BASE:number = 100;


    public constructor()
    {

    }


    public rewind():void
    {
        if(this.isInFarmGuide())
        {
            this.rewindStep();

            this.guide();
        }
    }

    public rewindStep():void
    {

        var mm: GuideModel = GuideModel.getModelByStep(FarmGuideController.BASE, this.step);
        this.step = mm.rewindStep;
    }

    public startGuide():void
    {
        if(this.isInFarmGuide())
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


    public addStep(add:number):void
    {
        this.step += add;
    }

    private addBlocksByTheFarm():void
    {
        var theFarm:BuildingIso;
        var anchorX:number;
        var anchorY:number;

        theFarm = GetBuildingUtils.getInstance().getTheFarmInGuide();
        anchorX = NumberUtils.decimal_K((theFarm.width + theFarm.model.offsetX) / theFarm.width, 1);
        anchorY = NumberUtils.decimal_K((theFarm.height + theFarm.model.offsetY) / theFarm.height, 1);
        GuideManager.getInstance().addBlocks(theFarm, anchorX, anchorY);
    }

    public nextStep(add:number = 1):void
    {
        if(this.isInFarmGuide())
        {
            this.addStep(add);

            this.guide();
            //===================================================
            GuideManager.getInstance().changeStep(FarmGuideController.BASE + this.step);

        }
    }

    //===================================================
    public guide():void
    {
        if(!this.isInFarmGuide())
        {
            GuideManager.getInstance().clear();

            BreedGuideController.getInstance().startGuide();

            return;
        }

        console.log("==========================farm guide current step:", this.step);

        var mm: GuideModel = GuideModel.getModelByStep(FarmGuideController.BASE, this.step);
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
                GuideManager.getInstance().addTouchPass();

                break;
            case 2:
                this.addBlocksByTheFarm();


                break;
            case 3:
                tar = this.getTools();
                GuideManager.getInstance().addBlocks(tar);

                break;
            case 4:
                this.addBlocksByTheFarm();


                break;
            case 5:
                GuideManager.getInstance().addTouchPass();

                break;
            case 6:
                this.addBlocksByTheFarm();


                break;
            case 7:
                tar = this.getSeed();
                GuideManager.getInstance().addBlocks(tar);

                break;
            case 8:
                this.addBlocksByTheFarm();


                break;
            case 9:
                GuideManager.getInstance().addTouchPass();

                break;
        }
    }

    //===================================================
    private getTools():egret.DisplayObject
    {
        var panel:game.ToolsPanel = UIMgr.instance.getPanel(PanelName.TOOLS_PANEL);
        return panel;
    }

    private getSeed():egret.DisplayObject
    {
        var panel:game.SeedPanel = UIMgr.instance.getPanel(PanelName.SEED_PANEL);
        return panel.getTheSeedInFarmGuide();
    }

    //private getPosRelativeToFarm(theFarm:BuildingIso):egret.Point
    //{
    //    var re:egret.Point = new egret.Point();
    //
    //    theFarm.parent.localToGlobal(theFarm.x, theFarm.y, re)
    //
    //    return re;
    //}

    public isInFarmGuide():boolean
    {
        if(FarmGuideController.LAST_STEP >= this.step)
        {
            return true;
        }
        return false;
    }

    //===================================================
    private static _instance:FarmGuideController;

    public static getInstance():FarmGuideController
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new FarmGuideController();
        }
        return this._instance;
    }
}