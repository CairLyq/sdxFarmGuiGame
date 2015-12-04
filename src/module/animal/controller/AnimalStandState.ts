/**
 * on 2015-04-21
 * by leo
 */

class AnimalStandState extends MoveItemState implements IGTimer
{

    public curSecond:number = 0;
    public totalSecond:number = 0;

    public constructor(param:Animal)
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
        this.getAnimal.state = this.getAnimal.walkState;
        this.getAnimal.state.start();
    }

    public start():void
    {
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
        this.totalSecond = RandUtils.getValInRange(this.getAnimal.getModel.minStandTime, this.getAnimal.getModel.maxStandTime);

        this.getAnimal.updateView();

        GTimer.getInstance().register(this);
    }

    public get getAnimal():Animal
    {
        return <Animal>this.moveItem;
    }
}