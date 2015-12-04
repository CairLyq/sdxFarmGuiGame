/**
 * on 2015-03-09
 * by leo
 */

class VillagerManager implements IGTimer
{

    private villagerDataArr:UserVillager[];

    //private idleIdArr:number[];
    private useIdArr:number[];
    private chooseVillagerId:number;

    private cnt:number;

    private type:number;

    public ADD:number = 1;
    public INIT:number = 2;


    private addData:UserVillager;


    public constructor()
    {
        this.cnt = 0;
        //===================================================
        this.type = 0;

        //===================================================
        this.addData = null;
        //===================================================
        //this.idleIdArr = [];
        this.useIdArr = [];
        this.chooseVillagerId = 3;
        //===================================================

        this.villagerDataArr = [];
    }


    public startCnt():void
    {
        this.cnt = 0;

        GTimer.getInstance().register(this);

    }

    public second():void
    {

    }

    public stopCnt():void
    {
        this.cnt = 0;

        GTimer.getInstance().unRegister(this);
    }

    //===================================================
    public init(data:UserVillager[]):void
    {
        this.useIdArr.length = 0;


        this.villagerDataArr = data;

        //this.idleIdArr = [];
        //var i:number;
        //for(i = 0; i < 8; i++)
        //{
        //    this.idleIdArr[i] = i + 3;
        //}


        this.loadRes(this.INIT);

    }

    public addVillager(data:UserVillager):void
    {
        this.addData = data;
        this.loadRes(this.ADD);
    }

    public loadRes(type:number):void
    {
        this.type = type;

        Loader.instance.loadGroups([GroupName.VILLAGER_GROUP, GroupName.GOODS_GROUP, GroupName.NPC_GROUP], this.onLoaded, this);


    }


    //private afterLoadRes(e:LaterLoadEvent):void
    //{
    //    this.laterLoad.removeEventListener(LaterLoadEvent.VILLAGER_LATER_LOAD, this.afterLoadRes, this);
    //
    //    if(this.INIT == this.type)
    //    {
    //        VillagerManager.getInstance().initAfterLoaded();
    //    }
    //    else if(this.ADD == this.type)
    //    {
    //        VillagerManager.getInstance().addVillagerAfterLoaded();
    //    }
    //}

    private onLoaded():void
    {
        if(this.INIT == this.type)
        {
            VillagerManager.getInstance().initAfterLoaded();
        }
        else if(this.ADD == this.type)
        {
            VillagerManager.getInstance().addVillagerAfterLoaded();
        }
        this.type = 0;
    }

    //===================================================
    public initAfterLoaded():void
    {
        var i:number;
        var len:number = this.villagerDataArr.length;
        var villagerData:UserVillager;
        var villager:Villager;

        for(i = 0; i < len; i++)
        {
            villagerData = this.villagerDataArr[i];

            villager = this.generate(villagerData);

            //villager.updateData(villagerData);

            Lyrs.LYRS_ITEM_IN_SCENE.addChild(villager);
            DepthManager.getInstance().addItem(villager, false);

            villager.setPosByIso();

            villager.fadeIn();

            villager.initData(villagerData);
        }
    }

    /*private check(e:egret.TouchEvent):void
     {
     var localP:egret.Point = TransUtils.globalToLocal(this.lyr, new egret.Point(e.stageX, e.stageY));
     console.log("==========================", localP);
     if(this.lyr.hitTest(localP.x, localP.y, true))
     {
     console.log("==========================hitTest yes");
     }
     else
     {
     console.log("==========================hitTest no");
     }

     var mc:egret.MovieClip = <egret.MovieClip>this.lyr.getChildAt(0);
     mc.gotoAndStop(1);
     }*/


    public addVillagerAfterLoaded():void
    {
        var villager:Villager;

        villager = this.generate(this.addData);
        Lyrs.LYRS_ITEM_IN_SCENE.addChild(villager);
        DepthManager.getInstance().addItem(villager);

        villager.setPosByIso();

        villager.fadeIn();

        villager.initData(this.addData);

        this.villagerDataArr.push(this.addData);

        this.addData = null;
    }

    public generate(data:UserVillager):Villager
    {
        var villager:Villager;
        var pos3D:Point3D;
        var mm:NPCModel;

        if(GuideManager.getInstance().isInGuide())
        {
            pos3D = new Point3D(VillagerConstant.BP_MX_IN_GUIDE, 0, VillagerConstant.BP_MZ_IN_GUIDE);
        }
        else
        {
            pos3D = CollisionCheck.getInstance().getRandPos();
        }

        //mm = this.getOnlyModel();
        mm = NPCModel.getNPCById(data.npcId);
        villager = new Villager(pos3D, mm);

        return villager;
    }

    public hideVillagers():void
    {
        if(GuideManager.getInstance().isInGuide())
        {
            return;
        }

        var villagerList:Villager[] = DepthManager.getInstance().getVillagers();
        var i:number;
        var len:number = villagerList.length;
        var one:Villager;

        for(i = 0; i < len; i++)
        {
            one = villagerList[i];
            one.visible = false;

            one.suspend();
        }
    }

    public reShowVillagers():void
    {
        if(GuideManager.getInstance().isInGuide())
        {
            return;
        }

        var villagerList:Villager[] = DepthManager.getInstance().getVillagers();
        var i:number;
        var len:number = villagerList.length;
        var one:Villager;
        var pos3D:Point3D;

        for(i = 0; i < len; i++)
        {
            one = villagerList[i];
            one.visible = true;
            pos3D = CollisionCheck.getInstance().getRandPos();
            one.setPosByIso(pos3D);
            DepthManager.getInstance().moveItem(one);

            one.startup();
        }
    }

    private getOnlyModel():NPCModel
    {
        //var idx:number = RandUtils.getVal(this.idleIdArr.length);
        //var villagerId:number = this.idleIdArr[idx];
        //this.idleIdArr.splice(idx, 1);
        var depth:number = 0;
        for(; ;)
        {
            this.chooseVillagerId++;
            if(this.chooseVillagerId > 10)
            {
                this.chooseVillagerId = 3;
            }
            if(Global.NOT_FOUND == this.useIdArr.indexOf(this.chooseVillagerId))
            {
                break;
            }
            if( ++depth > 8)
            {
                console.log("error: cant find model");
                break;
            }
        }

        this.useIdArr.push(this.chooseVillagerId);
        console.log("==========================add villager to useIdArr:", this.chooseVillagerId);
        return NPCModel.getNPCById(this.chooseVillagerId);
    }

    public removeVillager(villager:Villager):void
    {
        var idx:number = this.villagerDataArr.indexOf(villager.data);
        if(Global.NOT_FOUND != idx)
        {
            this.villagerDataArr.splice(idx, 1);
            console.log("==========================delete villager from villagerDataArr:", villager.getModel.npcId);
        }

        var idx:number = this.useIdArr.indexOf(villager.getModel.npcId);
        if(Global.NOT_FOUND != idx)
        {
            this.useIdArr.splice(idx, 1);
            console.log("==========================delete villager from useIdArr:", villager.getModel.npcId);
        }
        //var villagerId:number = this.useIdArr.pop();
        //this.idleIdArr.push(villagerId);

        villager.dispose();

        if(Lyrs.LYRS_ITEM_IN_SCENE.getChildIndex(villager) !== -1){
            Lyrs.LYRS_ITEM_IN_SCENE.removeChild(villager);
        }

        DepthManager.getInstance().removeItem(villager);

    }

    public dispose():void
    {
        var i:number;
        var villagerList:Villager[] = DepthManager.getInstance().getVillagers();
        var len:number = villagerList.length;
        var villager:Villager;


        for(i = 0; i < len; i++)
        {
            villager = villagerList[i];
            villager.dispose();
        }
    }

    //===============================================================
    private static _instance:VillagerManager;

    public static getInstance():VillagerManager
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new VillagerManager();
        }
        return this._instance;
    }
}