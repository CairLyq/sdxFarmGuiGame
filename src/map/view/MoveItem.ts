/**
 * on 2015-03-06
 * by leo
 */

class MoveItem extends ItemIso
{

    public mc:egret.MovieClip;
    public mcLyr:egret.DisplayObjectContainer;

    public dir:number;

    public constructor(pos:Point3D, paramModel:ItemIsoModel)
    {
        super(pos, paramModel);

        this.dir = 0;

        this.addMCLyr();

    }


    public addMCLyr():void
    {
        this.mcLyr = new egret.DisplayObjectContainer();
        this.addChild(this.mcLyr);
    }

    public removeMC():void
    {
        this.mcLyr.removeChildren();

        if(this.mc)
        {
            this.mc.stop();
            this.mc = null;
        }
    }

    public addMC(mc:egret.MovieClip):void
    {
        this.removeMC();

        this.mc = mc;
        this.mc.play(-1);

        this.mcLyr.addChild(this.mc);
    }


    ////===================================================
    //public stopMC():void
    //{
    //    if(this.mc)
    //    {
    //        this.mc.gotoAndStop(1);
    //    }
    //}
    //
    //public playMC():void
    //{
    //    if(this.mc)
    //    {
    //        this.mc.play(-1);
    //    }
    //}

    public dispose():void
    {
        //this.stopMC();
        this.mc = null;
        this.mcLyr = null;
    }
}