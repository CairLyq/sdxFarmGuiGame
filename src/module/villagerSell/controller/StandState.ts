/**
 * on 2015-03-11
 * by leo
 */

class StandState extends MoveItemState implements IGTimer
{

    public curSecond:number = 0;
    public totalSecond:number = 0;

    public constructor(param:Villager)
    {
        super(param);
    }


    public second():void
    {
        this.curSecond++;
        if(this.curSecond == this.totalSecond)
        {
            this.stop();
            this.changeToWalkState();
        }
        else if(this.curSecond > this.totalSecond)
        {
            console.log("==========================stand error");
        }
    }

    public changeToWalkState():void
    {
        this.getVillager.state = this.getVillager.walkState;
        this.getVillager.state.start();
    }

    public start():void
    {
        //if(this.getVillager.isLeave() && this.getVillager.isInBP())
        //{
        //    this.getVillager.setDir(PersonDir.DIR_RIGHT_DOWN);
        //    this.getVillager.fadeOut();
        //}
        //else
        //{
        //    this.ready();
        //
        //    GTimer.getInstance().register(this);
        //}
        this.stop();

        this.ready();
    }

    public stop():void
    {
        this.resetSecond();

        GTimer.getInstance().unRegister(this);
    }

    public resetSecond():void
    {
        this.curSecond = this.totalSecond = 0;
    }

    //===================================================
    public ready():void
    {
        this.totalSecond = RandUtils.getValInRange(this.getVillager.getModel.minStandTime, this.getVillager.getModel.maxStandTime);

        this.getVillager.updateView();

        GTimer.getInstance().register(this);
    }

    public get getVillager():Villager
    {
        return <Villager>this.moveItem;
    }
}