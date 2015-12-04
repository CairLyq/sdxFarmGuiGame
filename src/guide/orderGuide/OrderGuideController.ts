/**
 * Created by Gordon on 23/March/15.
 * @class OrderGuideController
 * @constructor
 **/
class OrderGuideController
{

    private step:number = 0;
    public static LAST_STEP:number = 4;
    public static BASE:number = 600;


    public constructor()
    {
    }


    public startGuide():void
    {
        if(this.isInOrderGuide())
        {
            this.rewindStep();
            this.guide();
        }
    }

    public rewind():void
    {

        if(this.isInOrderGuide())
        {
            this.rewindStep();

            this.guide();
        }

    }


    public nextStep(add:number = 1):void
    {

        if(this.isInOrderGuide())
        {
            this.addStep(add);
            this.guide();

            GuideManager.getInstance().changeStep(OrderGuideController.BASE + this.step);
        }
    }

    public backStep(step:number):void
    {
        if(this.isInOrderGuide())
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
        var mm:GuideModel = GuideModel.getModelByStep(OrderGuideController.BASE, this.step);
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

        if(!this.isInOrderGuide())
        {
            GuideManager.getInstance().clear();
            DragLogic.getInstance().setLock(false);
            CollisionCheck.getInstance().setPoint(MapConst.BUILD_YES_WALK_YES);
            console.log("==========================order guide finish, all guide finish");

            return;
        }
        console.log("==========================order guide current step:", this.step);

        var mm:GuideModel = GuideModel.getModelByStep(OrderGuideController.BASE, this.step);
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
                this.focus();
                //PickupLogic->pickup

                break;
            case 2:
                //提示点击完成按钮
                tar = this.getCompleteBtn();
                GuideManager.getInstance().addBlocks(tar, .5, .5);

                break;
            case 3:
                this.focus();

                break;
            case 4:
                //提示点击金币按钮
                this.focus();
                break;

        }

    }

    private focus():void
    {
        var theOrder:BuildingIso = GetBuildingUtils.getInstance().getTheBuildingInGuide(BuildingID.ORDER_BOARD);
        Camera.getInstance().focus(theOrder, ()=>
        {
            this.addBlocksByTheOrder();
        });
    }

    public getCompleteBtn():egret.DisplayObject
    {
        var win:game.OrderPanel = UIMgr.instance.getPanel(PanelName.ORDER_PANEL);
        return win.getCompleteBtn();
    }

    //public getGoldBtn():egret.DisplayObject
    //{
    //    var orderBuilding:BuildingIso = GetBuildingUtils.getInstance().getTheBuildingInGuide(BuildingID.ORDER_BOARD);
    //    return (<OrderBuilding>orderBuilding).getGoldBtn();
    //}

    private addBlocksByTheOrder():void
    {
        var tar:BuildingIso;
        var anchorX:number;
        var anchorY:number;

        tar = GetBuildingUtils.getInstance().getTheBuildingInGuide(BuildingID.ORDER_BOARD);
        //anchorX = NumberUtils.decimal_K((tar.width + tar.model.offsetX) / tar.width, 1);
        //anchorY = NumberUtils.decimal_K((tar.height + tar.model.offsetY) / tar.height, 1);
        anchorX = .4;
        anchorY = .8;
        //console.log(anchorX, anchorY)
        GuideManager.getInstance().addBlocks(tar, anchorX, anchorY);
    }

    public isInOrderGuide():boolean
    {
        if(OrderGuideController.LAST_STEP >= this.step)
        {
            return true;
        }
        return false;
    }

    //================================================================================
    private static _instance:OrderGuideController;

    public static getInstance():OrderGuideController
    {
        if(!OrderGuideController._instance)
        {
            OrderGuideController._instance = new OrderGuideController();
        }
        return this._instance;
    }
}