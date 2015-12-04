/**
 * Created by rodey on 15/4/24.
 */

class TaskGuideController
{

    private step:number = 0;
    public static LAST_STEP:number = 1;
    public static BASE:number = 700;


    public constructor()
    {
    }


    public startGuide():void
    {
        if(this.isInTaskGuide())
        {
            this.rewindStep();
            this.guide();
            GuideManager.getInstance().changeStep(TaskGuideController.BASE + this.step);
        }
    }

    public rewind():void
    {

        if(this.isInTaskGuide())
        {
            this.rewindStep();

            this.guide();
        }

    }


    public nextStep(add:number = 1):void
    {

        if(this.isInTaskGuide())
        {
            this.addStep(add);
            GuideManager.getInstance().changeStep(TaskGuideController.BASE + this.step);
            this.guide();
        }

    }

    public backStep(step:number):void
    {
        if(this.isInTaskGuide())
        {
            this.setStep(step);

            this.guide();
        }
    }


    //===================================================
    public setStep(step:number):void
    {
        this.step = step;
    }

    public rewindStep():void
    {
        var mm:GuideModel = GuideModel.getModelByStep(TaskGuideController.BASE, this.step);
        this.step = mm.rewindStep;
    }

    public addStep(add:number):void
    {
        this.step += add;
    }

    public getStep(): number{
        return this.step;
    }

    //===================================================


    public guide():void
    {

        if(!this.isInTaskGuide())
        {
            this.clearGuide();

            return;
        }
        console.log("==========================task guide current step:", this.step);

        var mm:GuideModel = GuideModel.getModelByStep(TaskGuideController.BASE, this.step);
        if(!mm) {
            this.clearGuide();

            return;
        }
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
                tar = GameUI.instance.mainTaskBg;
                GuideManager.getInstance().addBlocks(tar);

                break;
            case 1:
                //this.focus();
                //PickupLogic->pickup

                break;

        }

    }

    public isInTaskGuide():boolean
    {
        if(TaskGuideController.LAST_STEP >= this.step)
        {
            return true;
        }
        return false;
    }

    private clearGuide(): void{
        GuideManager.getInstance().clear();
        DragLogic.getInstance().setLock(false);
        CollisionCheck.getInstance().setPoint(MapConst.BUILD_YES_WALK_YES);
        console.log("==========================task guide finish, all guide finish");
    }

    //================================================================================
    private static _instance:TaskGuideController;

    public static getInstance():TaskGuideController
    {
        if(!TaskGuideController._instance)
        {
            TaskGuideController._instance = new TaskGuideController();
        }
        return this._instance;
    }
}