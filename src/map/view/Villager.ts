/**
 * on 2015-03-06
 * by leo
 */

class Villager extends MoveItem
{

    public walkState:WalkState;
    public standState:StandState;
    public state:MoveItemState;


    public data:UserVillager;

    private villagerNeed:VillagerNeed;

    private standArr:egret.MovieClip[];
    private walkArr:egret.MovieClip[];


    public constructor(pos:Point3D, paramModel:NPCModel)
    {
        super(pos, paramModel);


        this.saveRes();


        this.walkState = new WalkState(this);
        this.standState = new StandState(this);
        this.state = this.standState;

        this.villagerNeed = new VillagerNeed();

        this.updateView();
    }

    private saveRes():void
    {
        this.standArr = [];
        this.walkArr = [];

        var mc:egret.MovieClip;

        //左上
        //右下
        //左下
        //右上

        //walk
        mc = MovieClipMgr.createMC("npc_animation_json", "npc_animation_png", this.getModel.walkBack);
        mc.scaleX = 1;
        this.walkArr.push(mc);

        mc = MovieClipMgr.createMC("npc_animation_json", "npc_animation_png", this.getModel.walkFront);
        mc.scaleX = 1;
        this.walkArr.push(mc);

        mc = MovieClipMgr.createMC("npc_animation_json", "npc_animation_png", this.getModel.walkFront);
        mc.scaleX = -1;
        this.walkArr.push(mc);

        mc = MovieClipMgr.createMC("npc_animation_json", "npc_animation_png", this.getModel.walkBack);
        mc.scaleX = -1;
        this.walkArr.push(mc);


        //stand
        mc = MovieClipMgr.createMC("npc_animation_json", "npc_animation_png", this.getModel.standBack);
        mc.scaleX = 1;
        this.standArr.push(mc);

        mc = MovieClipMgr.createMC("npc_animation_json", "npc_animation_png", this.getModel.standFront);
        mc.scaleX = 1;
        this.standArr.push(mc);

        mc = MovieClipMgr.createMC("npc_animation_json", "npc_animation_png", this.getModel.standFront);
        mc.scaleX = -1;
        this.standArr.push(mc);

        mc = MovieClipMgr.createMC("npc_animation_json", "npc_animation_png", this.getModel.standBack);
        mc.scaleX = -1;
        this.standArr.push(mc);
    }

    public addNeed(imgId:string, bv:boolean = false):void
    {
        this.removeNeed();

        this.villagerNeed.setNeed(imgId);
        this.villagerNeed.setBG(bv);
        this.addChild(this.villagerNeed);
        this.villagerNeed.y = -this.mc.height;

    }

    public removeNeed():void
    {
        if(this.villagerNeed.parent)
        {
            this.villagerNeed.destroy();
            this.removeChild(this.villagerNeed);
        }
    }

    public fadeIn():void
    {
        this.alpha = 0;
        egret.Tween.get(this).to({alpha:1}, 1000).call(()=>
        {
            if(!GuideManager.getInstance().isInGuide())
            {
                this.state.start();
            }
        });
    }

    public showEmotionAndFadeOut():void
    {
        var imgId:string;

        if(this.isNoSelled())
        {
            imgId = this.getModel.emotionSatisfied;
        }
        else if(this.isSelled())
        {
            imgId = this.getModel.emotionSatisfied;
        }
        else if(this.isRefused())
        {
            imgId = this.getModel.emotionRejected;
        }

        console.log('表情： ', imgId);

        this.addNeed(imgId, false);
        this.villagerNeed.show(()=>
        {
            this.fadeOut();
        });

    }

    public fadeOut():void
    {
        egret.Tween.get(this).wait(3000).to({alpha:0}, 1000).call(()=>
        {
            VillagerManager.getInstance().removeVillager(this);
        });
    }

    //===================================================
    /*public initData(vData:UserVillager):void
     {
     this.data = vData;
     this.addNeed(vData.itemId);
     }*/

    public initData(vData:UserVillager):void
    {
        this.data = vData;

        var itemModel:DepotModel = DepotModel.getModelById(vData.itemId);
        var obj:any = (Math.random() < .5)
            ?{imgId:this.getModel.emotionWalking, visible:false}
            :{imgId:itemModel.imgId, visible:true};

        this.addNeed(obj.imgId, obj.visible);

        this.villagerNeed.setData(vData);
    }

    public sell_cb():void
    {
        //selled
        this.data.status = VillagerConstant.SELLED;
        this.showEmotionAndFadeOut();
    }

    public refuse_cb():void
    {
        //refused
        this.data.status = VillagerConstant.REFUSED;
        this.showEmotionAndFadeOut();
    }

    //===================================================
    public updateView():void
    {
        var mc:egret.MovieClip;

        if(this.isStand())
        {
            mc = this.standArr[this.dir];
        }
        else
        {
            mc = this.walkArr[this.dir];
        }

        this.addMC(mc);

        mc.play(-1);
    }

    //private onTap(e:egret.TouchEvent):void
    public click():void
    {
        if(ModeLogic.getInstance().isEditMode())
        {
            return;
        }
        if(this.isRefused() || this.isSelled())
        {
            return;
        }

        UIMgr.instance.show(PanelName.VILLAGER_SELL_PANEL, {direction:Direction.NONE}, this);
    }

    //===================================================
    //窗口启动
    public startup():void
    {
        this.state.start();
    }

    //窗口中断
    public suspend():void
    {
        this.state.stop();
    }

    //public isInBP():boolean
    //{
    //    if(this.pShort.x == VillagerConstant.BP_MX && this.pShort.z == VillagerConstant.BP_MZ)
    //    {
    //        return true;
    //    }
    //    return false;
    //}

    /*public isLeave():boolean
     {
     if(VillagerConstant.SELLED == this.data.status || VillagerConstant.REFUSED == this.data.status)
     {
     return true;
     }
     else if(VillagerConstant.NO_SELLED == this.data.status)
     {
     return false;
     }
     }*/

    public isNoSelled():boolean
    {
        return VillagerConstant.NO_SELLED == this.data.status;
    }

    public isSelled():boolean
    {
        return VillagerConstant.SELLED == this.data.status;
    }

    public isRefused():boolean
    {
        return VillagerConstant.REFUSED == this.data.status;
    }

    private isStand():boolean
    {
        return this.state == this.standState?true:false;
    }

    public dispose():void
    {
        super.dispose();

        if(null !== this.walkState)
        {
            this.walkState.stop();
            this.walkState = null;
        }

        if(null !== this.standState)
        {
            this.standState.stop();
            this.standState = null;
        }

        this.state = null;
        this.data = null;
        this.villagerNeed.destroy();
        this.villagerNeed = null;
    }

    public get getModel():NPCModel
    {
        return <NPCModel>this.model;
    }

    //===================================================
    /*
     public addShape():void
     {
     var s:egret.Shape = new egret.Shape();
     s.width = 27;
     s.height = 55;
     this.addChild(s);
     s.x = this.getModel.offsetX;
     s.y = this.getModel.offsetY;
     }
     */
}