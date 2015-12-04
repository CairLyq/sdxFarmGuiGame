/**
 * on 2015-01-28
 * by leo
 */

class ModeLogic
{
    public editMode:Mode;
    public normalMode:Mode;
    public buyMode:Mode;

    public mode:Mode;

    public prePosArr:Point3D[];

    constructor()
    {
        this.editMode = new EditMode();
        this.normalMode = new NormalMode();
        this.buyMode = new BuyMode();

        this.prePosArr = [];

        this.mode = this.normalMode;
    }

    public click(e:egret.TouchEvent, building:BuildingIso):void
    {
        this.mode.toBegin(e, building);
    }

    //===================================================
    public enterEditMode(building:BuildingIso):void
    {
        this.mode.enterEditMode();

        this.mode = this.editMode;
        this.mode.enterEditMode(building);

    }

    public enterBuyMode(model:BuildingModel):void
    {
        var pos:Point3D;
        var building:BuildingIso;

        if(BuildingID.BUILDING_ID_FARM == model.buildingId)
        {
            pos = this.getNextFarmPos();
        }
        else
        {
            pos = this.getCenterPos();
        }
        building = BuildingFactory.generate(pos, model);

        //===================================================
        this.mode.enterBuyMode();

        this.mode = this.buyMode;
        this.mode.enterBuyMode(building);
    }

    public saveFarmPos(p:Point3D):void
    {
        this.prePosArr.push(p);
        if(this.prePosArr.length > 2)
        {
            this.prePosArr.shift();
        }
    }

    public getNextFarmPos():Point3D
    {
        var pos:Point3D = new Point3D();

        if(2 == this.prePosArr.length)
        {
            if(this.prePosArr[0].x == this.prePosArr[1].x)
            {
                pos.x = this.prePosArr[1].x;
                if(this.prePosArr[1].z - this.prePosArr[0].z > 0)
                {
                    pos.z = this.prePosArr[1].z + 1;
                }
                else
                {
                    pos.z = this.prePosArr[1].z - 1;
                }
            }
            else if(this.prePosArr[0].z == this.prePosArr[1].z)
            {
                if(this.prePosArr[1].x - this.prePosArr[0].x > 0)
                {
                    pos.x = this.prePosArr[1].x + 1;
                }
                else
                {
                    pos.x = this.prePosArr[1].x - 1;
                }
                pos.z = this.prePosArr[1].z;
            }
            else
            {
                pos.x = this.prePosArr[1].x + 1;
                pos.z = this.prePosArr[1].z;
            }
        }
        else if(1 == this.prePosArr.length)
        {
            pos.x = this.prePosArr[0].x + 1;
            pos.z = this.prePosArr[0].z;
        }
        else
        {
            var p3d:Point3D = GetBuildingUtils.getInstance().getLastFarmPos();
            if(p3d)
            {
                pos.x = p3d.x + 1;
                pos.z = p3d.z;
            }
            else
            {
                console.log("==========================error: cant find the last farm");
            }
        }

        return pos;
    }

    public getCenterPos():Point3D
    {
        var pos:egret.Point = Lyrs.LYRS_ITEM_IN_SCENE.globalToLocal(Lyrs.SW * .5, Lyrs.SH * .5 - 50);

        return TransUtils.screenToIso(pos);
    }

    public enterNormalMode(building:BuildingIso = null):void
    {
        this.mode.enterNormalMode();

        this.mode = this.normalMode;
        this.mode.enterNormalMode(building);
    }

    //===================================================
    public isEditMode():boolean
    {
        return this.mode == this.editMode?true:false;
    }

    public isBuyMode():boolean
    {
        return this.mode == this.buyMode?true:false;
    }
    public isNormalMode():boolean
    {
        return this.mode == this.normalMode?true:false;
    }
    //===============================================================
    private static _instance:ModeLogic;

    public static getInstance():ModeLogic
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new ModeLogic();
        }
        return this._instance;
    }
}