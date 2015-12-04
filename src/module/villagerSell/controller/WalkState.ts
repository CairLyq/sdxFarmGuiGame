/**
 * on 2015-03-11
 * by leo
 */

class WalkState extends MoveItemState implements IFrame
{

    public curFrame:number = 0;
    public totalFrame:number = 0;

    public vx:number;
    public vy:number;

    private last:egret.Point;
    private now:egret.Point;


    public constructor(param:Villager)
    {
        super(param);
    }

    public frame():void
    {
        this.curFrame++;

        this.now = new egret.Point(this.getVillager.x + this.vx, this.getVillager.y + this.vy);
        this.getVillager.setPosByScreen(this.now);

        var mc:MoveCheck = new MoveCheck();
        if(mc.check(this.last, this.now))
        {
            DepthManager.getInstance().moveItem(this.getVillager);
            this.last = this.now;
        }

        if(this.curFrame == this.totalFrame)
        {
            this.stop();
            this.changeToStandState();
        }
        else if(this.curFrame > this.totalFrame)
        {
            console.log("==========================villager walk error");
        }
    }

    public changeToStandState():void
    {

        this.getVillager.state = this.getVillager.standState;

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
        //    Framer.getInstance().register(this);
        //}
        this.stop();

        this.ready();
    }

    public stop():void
    {
        this.resetFrame();

        Framer.getInstance().unRegister(this);
    }

    public resetFrame():void
    {
        this.curFrame = this.totalFrame = 0;
    }

    //===================================================
    public ready():void
    {
        this.last = new egret.Point(this.getVillager.x, this.getVillager.y);

        var info:Object = this.findDes();
        if(info)
        {

            var dir:number = info["dir"];
            var step:number = info["step"];

            switch(dir)
            {
                case PersonDir.DIR_LEFT_UP:
                    //左上
                    this.vx = -this.getVillager.getModel.vx;
                    this.vy = -this.getVillager.getModel.vy;
                    this.totalFrame = Math.floor(step * MapConst.CONST_TILE_W * .5 / this.getVillager.getModel.vx);
                    break;
                case PersonDir.DIR_RIGHT_DOWN:
                    //右下
                    this.vx = this.getVillager.getModel.vx;
                    this.vy = this.getVillager.getModel.vy;
                    this.totalFrame = Math.floor(step * MapConst.CONST_TILE_W * .5 / this.getVillager.getModel.vx);
                    break;
                case PersonDir.DIR_LEFT_DOWN:
                    //左下
                    this.vx = -this.getVillager.getModel.vx;
                    this.vy = this.getVillager.getModel.vy;
                    this.totalFrame = Math.floor(step * MapConst.CONST_TILE_H * .5 / this.getVillager.getModel.vy);
                    break;
                case PersonDir.DIR_RIGHT_UP:
                    //右上
                    this.vx = this.getVillager.getModel.vx;
                    this.vy = -this.getVillager.getModel.vy;
                    this.totalFrame = Math.floor(step * MapConst.CONST_TILE_H * .5 / this.getVillager.getModel.vy);
                    break;
            }

            this.getVillager.dir = dir;

            this.getVillager.updateView();

            Framer.getInstance().register(this);
        }
        else
        {
            this.changeToStandState();
        }
    }

    /*public getInfo():Object
     {
     var re:Object;

     if(this.getVillager.isLeave())
     {
     re = this.leave();
     }
     else
     {
     re = this.continueSell();
     }

     return re;
     }

     public leave():Object
     {
     var re:Object;

     var dir:number = PersonDir.DIR_RIGHT_DOWN;
     var step:number = VillagerConstant.BP_MX - this.getVillager.pShort.x;
     re = {"dir":dir, "step":step};

     return re;
     }


     public continueSell():Object
     {
     var re:Object;

     var step:number = RandUtils.getValInRange(this.getVillager.getModel.minStep, this.getVillager.getModel.maxStep);
     var dir:number = RandUtils.getVal(2);
     var desP:egret.Point;
     if(PersonDir.DIR_LEFT_UP == dir)
     {
     //左上
     desP = new egret.Point(this.getVillager.pShort.x - step, this.getVillager.pShort.z);
     if(this.isInLS1(desP))
     {
     dir = PersonDir.DIR_LEFT_UP;
     }
     else
     {
     dir = PersonDir.DIR_RIGHT_DOWN;
     }

     }
     else if(PersonDir.DIR_RIGHT_DOWN == dir)
     {
     //右下
     desP = new egret.Point(this.getVillager.pShort.x + step, this.getVillager.pShort.z);
     if(this.isInLS1(desP))
     {
     dir = PersonDir.DIR_RIGHT_DOWN;
     }
     else
     {
     dir = PersonDir.DIR_LEFT_UP;
     }
     }

     re = {"dir":dir, "step":step};
     return re;
     }

     public isInLS1(desP:egret.Point):boolean
     {
     var startP:egret.Point = StringUtils.toPoint(VillagerConstant.LS1["startP"], "*");
     var endP:egret.Point = StringUtils.toPoint(VillagerConstant.LS1["endP"], "*");
     if(desP.x >= startP.x && desP.x <= endP.x)
     {
     return true;
     }
     return false;
     }*/

    /*private isOut(...param):boolean
    {
        var len:number = param.length;
        var i:number;
        var one:number;

        for(i = 0; i < len; i++)
        {
            one = param[0];
            if(one < 0 || one >= MapConst.MAP_SIZE || one < 0 || one >= MapConst.MAP_SIZE)
            {
                return true;
            }
        }
        return false;
    }*/

    private getStep(dir:number, step:number):number
    {
        var px_start:number, px_end:number;
        var pz_start:number, pz_end:number;
        var px:number, pz:number;
        var i:number;
        var re:number = 0;

        if(PersonDir.DIR_LEFT_UP == dir)
        {
            //左上
            px_start = this.getVillager.pShort.x - 1;
            px_end = this.getVillager.pShort.x - step;

            pz = this.getVillager.pShort.z;

            for(i = px_start; i >= px_end ; i--)
            {
                if(CollisionCheck.getInstance().checkPos(i, pz))
                {
                    re++;
                }
                else
                {
                   break;
                }
            }
            return re;
        }
        else if(PersonDir.DIR_RIGHT_DOWN == dir)
        {
            //右下
            px_start = this.getVillager.pShort.x + 1;
            px_end = this.getVillager.pShort.x + step;

            pz = this.getVillager.pShort.z;

            for(i = px_start; i <= px_end ; i++)
            {
                if(CollisionCheck.getInstance().checkPos(i, pz))
                {
                    re++;
                }
                else
                {
                    break;
                }
            }
            return re;
        }
        //
        else if(PersonDir.DIR_LEFT_DOWN == dir)
        {
            //左下
            px = this.getVillager.pShort.x;

            pz_start = this.getVillager.pShort.z + 1;
            pz_end = this.getVillager.pShort.z + step;

            for(i = pz_start; i <= pz_end ; i++)
            {
                if(CollisionCheck.getInstance().checkPos(px, i))
                {
                    re++;
                }
                else
                {
                    break;
                }
            }
            return re;
        }
        else if(PersonDir.DIR_RIGHT_UP == dir)
        {
            //右上
            px = this.getVillager.pShort.x;

            pz_start = this.getVillager.pShort.z - 1;
            pz_end = this.getVillager.pShort.z - step;

            for(i = pz_start; i >= pz_end ; i--)
            {
                if(CollisionCheck.getInstance().checkPos(px, i))
                {
                    re++;
                }
                else
                {
                    break;
                }
            }
            return re;
        }
        else
        {
            console.log("==========================error: villager dir error");
        }
    }

    public findDes():Object
    {
        //var start:number, end:number;

        var dir:number;
        var step:number;

        var tryStep:number;
        //start = egret.getTimer();


        var dirList:number[] = [0, 1, 2, 3];
        var idx:number;

        for(;;)
        {
            idx = RandUtils.getVal(dirList.length);
            dir = dirList.splice(idx, 1)[0];

            tryStep = RandUtils.getValInRange(this.getVillager.getModel.minStep, this.getVillager.getModel.maxStep);
            step = this.getStep(dir, tryStep);
            if(step > 0)
            {
                break;
            }

            if(0 == dirList.length)
            {
                console.log("==========================未找到路径: ", this.getVillager.getModel.npcId, this.getVillager.data.villagerId);
                return null;
            }
        }

        //end = egret.getTimer();
        //console.log("==========================use time: ", (end - start) * .001);

        //console.log("==========================dir: ", dir, "step: ", step, "npcId: ", this.getVillager.getModel.npcId);
        return {"dir":dir, "step":step};
    }

    //===================================================

    public get getVillager():Villager
    {
        return <Villager>this.moveItem;
    }
}