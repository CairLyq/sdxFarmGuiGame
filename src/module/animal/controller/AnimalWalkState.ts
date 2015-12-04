/**
 * on 2015-04-21
 * by leo
 */

class AnimalWalkState extends MoveItemState implements IFrame
{

    public curFrame:number = 0;
    public totalFrame:number = 0;

    public vx:number;
    public vy:number;

    private last:egret.Point;
    private now:egret.Point;


    public constructor(param:Animal)
    {
        super(param);
    }

    public frame():void
    {
        this.curFrame++;

        this.now = new egret.Point(this.getAnimal.x + this.vx, this.getAnimal.y + this.vy);
        this.getAnimal.setPosByScreen(this.now);

        var mc:MoveCheck = new MoveCheck();
        if(mc.check(this.last, this.now))
        {
            DepthManager.getInstance().moveItem(this.getAnimal);
            this.last = this.now;
        }

        if(this.curFrame == this.totalFrame)
        {
            this.stop();
            this.changeToStandState();
        }
        else if(this.curFrame > this.totalFrame)
        {
            console.log("==========================error");
        }
    }

    public changeToStandState():void
    {

        this.getAnimal.state = this.getAnimal.standState;

        this.getAnimal.state.start();

    }

    public start():void
    {
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
        this.last = new egret.Point(this.getAnimal.x, this.getAnimal.y);

        var info:Object = this.findDes();
        if(info)
        {

            var dir:number = info["dir"];
            var step:number = info["step"];

            switch(dir)
            {
                case PersonDir.DIR_LEFT_UP:
                    //左上
                    this.vx = -this.getAnimal.getModel.vx;
                    this.vy = -this.getAnimal.getModel.vy;
                    this.totalFrame = Math.floor(step * MapConst.CONST_TILE_W * .5 / this.getAnimal.getModel.vx);
                    break;
                case PersonDir.DIR_RIGHT_DOWN:
                    //右下
                    this.vx = this.getAnimal.getModel.vx;
                    this.vy = this.getAnimal.getModel.vy;
                    this.totalFrame = Math.floor(step * MapConst.CONST_TILE_W * .5 / this.getAnimal.getModel.vx);
                    break;
                case PersonDir.DIR_LEFT_DOWN:
                    //左下
                    this.vx = -this.getAnimal.getModel.vx;
                    this.vy = this.getAnimal.getModel.vy;
                    this.totalFrame = Math.floor(step * MapConst.CONST_TILE_H * .5 / this.getAnimal.getModel.vy);
                    break;
                case PersonDir.DIR_RIGHT_UP:
                    //右上
                    this.vx = this.getAnimal.getModel.vx;
                    this.vy = -this.getAnimal.getModel.vy;
                    this.totalFrame = Math.floor(step * MapConst.CONST_TILE_H * .5 / this.getAnimal.getModel.vy);
                    break;
            }

            this.getAnimal.dir = dir;

            this.getAnimal.updateView();

            Framer.getInstance().register(this);
        }
        else
        {
            this.changeToStandState();
        }
    }

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
            px_start = this.getAnimal.pShort.x - 1;
            px_end = this.getAnimal.pShort.x - step;

            pz = this.getAnimal.pShort.z;

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
            px_start = this.getAnimal.pShort.x + 1;
            px_end = this.getAnimal.pShort.x + step;

            pz = this.getAnimal.pShort.z;

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
            px = this.getAnimal.pShort.x;

            pz_start = this.getAnimal.pShort.z + 1;
            pz_end = this.getAnimal.pShort.z + step;

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
            px = this.getAnimal.pShort.x;

            pz_start = this.getAnimal.pShort.z - 1;
            pz_end = this.getAnimal.pShort.z - step;

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
        //===================================================
        //var start:number, end:number;

        var dir:number;
        var step:number;

        var tryStep:number;
        //start = egret.getTimer();


        var dirList:number[] = [0, 1, 2, 3];
        var idx:number;

        for(; ;)
        {
            idx = RandUtils.getVal(dirList.length);
            dir = dirList.splice(idx, 1)[0];

            tryStep = RandUtils.getValInRange(this.getAnimal.getModel.minStep, this.getAnimal.getModel.maxStep);
            step = this.getStep(dir, tryStep);
            if(step > 0)
            {
                break;
            }

            if(0 == dirList.length)
            {
                console.log("==========================未找到路径", this.getAnimal.getModel.animalId, this.getAnimal.getModel.name, this.getAnimal.data.userLivestockId);
                return null;
            }
        }

        //end = egret.getTimer();
        //console.log("==========================use time: ", (end - start) * .001);

        //console.log("==========================dir: ", dir, "step: ", step, this.getAnimal.getModel.animalId, this.getAnimal.getModel.name, this.getAnimal.data.userLivestockId);
        return {"dir":dir, "step":step};
    }

    //===================================================

    public get getAnimal():Animal
    {
        return <Animal>this.moveItem;
    }
}