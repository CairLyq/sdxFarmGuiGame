/**
 * on 2015-01-13
 * by leo
 */

class NormalMode extends Mode
{
    public isMoved:boolean;
    //添加移动和点击的时间间隔判断
    private letterTimer: number = 0;

    public constructor()
    {
        super();

        this.isMoved = false;
    }

    public toBegin(evt:egret.TouchEvent, building:BuildingIso):void
    {
        this.building = building;

        this.isMoved = false;
        this.letterTimer = egret.getTimer();

        if(!GuideManager.getInstance().isInGuide()){
            building.bLogic.startCnt();
        }

        this.addListeners();
    }

    public toMove(evt:egret.TouchEvent):void
    {
        var timer: number = egret.getTimer() - this.letterTimer;
        //console.log(timer);
        if(timer > 100){
            this.isMoved = true;
        }

        PickupProgress.getInstance().hide();
        this.building.bLogic.stopCnt();
    }

    public toEnd(evt:egret.TouchEvent):void
    {
        PickupProgress.getInstance().hide();

        this.building.bLogic.stopCnt();

        if(!this.isMoved)
        {
            this.building.show(evt.stageX, evt.stageY);
        }

        PickupProgress.getInstance().hide();

        this.removeListeners();
    }

    //===================================================
    public addListeners():void
    {
        this.removeListeners();
        Lyrs.LYRS_SCENE.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMove, this, true );
        Lyrs.LYRS_SCENE.addEventListener(egret.TouchEvent.TOUCH_END, this.toEnd, this, true );
    }

    public removeListeners():void
    {
        Lyrs.LYRS_SCENE.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMove, this, true );
        Lyrs.LYRS_SCENE.removeEventListener(egret.TouchEvent.TOUCH_END, this.toEnd, this, true );
    }

    public dispose():void
    {
        this.building = null;
        this.isMoved = false;
        this.removeListeners();
    }

    //===================================================
    public enterNormalMode():void
    {
        this.dispose();
    }

    public enterEditMode():void
    {
        this.dispose();
    }

    public enterBuyMode():void
    {
        this.dispose();
    }
}