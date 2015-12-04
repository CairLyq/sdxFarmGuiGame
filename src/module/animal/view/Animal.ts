/**
 * on 2014-12-29
 * by leo
 */

class Animal extends MoveItem implements IGTimer
{
    public data:UserAnimal;

    private hungryArr:egret.MovieClip[];

    private normalArr:egret.MovieClip[];

    private fullArr:egret.MovieClip[];

    //===================================================
    public state:MoveItemState;

    public standState:AnimalStandState;

    public walkState:AnimalWalkState;
    //===================================================
    private needHint:VillagerNeed;

    //private timeHint:AnimalTimeHint;

    private leftCnt:number;

    public constructor(pos:Point3D, paramModel:AnimalModel)
    {
        super(pos, paramModel);

        this.saveRes();

        this.standState = new AnimalStandState(this);

        this.walkState = new AnimalWalkState(this);

        this.state = this.standState;

        this.needHint = new VillagerNeed();

        //this.timeHint = new AnimalTimeHint();
        //this.timeHint.addEventListener(GameEvent.ANIMAL_TIME_HINT_CLOSE, this.closeTimeHint, this);
        //this.timeHint.addEventListener(GameEvent.ANIMAL_TIME_HINT_SPEED, this.speedAnimal, this);
    }

    //===================================================
    //public closeTimeHint(e:GameEvent):void
    //{
    //    GameEvent.BubbEvent(e);
    //
    //    this.hideTimeHint();
    //}
    //
    //public speedAnimal(e:GameEvent):void
    //{
    //    GameEvent.BubbEvent(e);
    //
    //    if(UserController.instance.isDiamondEnough(SpeedModel.getSpeed(this.leftCnt)))
    //    {
    //        //播放音效
    //        SoundMgr.instance.playAudio(SoundName.BTN_OK);
    //
    //        BreedGuideController.getInstance().nextStep();
    //
    //        BreedingPlantController.getInstance().speed(this);
    //    }
    //}


    //===================================================
    private saveRes():void
    {

        this.hungryArr = [];

        this.normalArr = [];

        this.fullArr = [];

        //左上
        //右下
        //左下
        //右上

        var mc:egret.MovieClip;

        //hungry
        mc = MovieClipMgr.createMC("animal_animation_json", "animal_animation_png", this.getModel.animeHungryBack);
        mc.scaleX = 1;
        this.hungryArr.push(mc);

        mc = MovieClipMgr.createMC("animal_animation_json", "animal_animation_png", this.getModel.animeHungryFront);
        mc.scaleX = 1;
        this.hungryArr.push(mc);

        mc = MovieClipMgr.createMC("animal_animation_json", "animal_animation_png", this.getModel.animeHungryFront);
        mc.scaleX = -1;
        this.hungryArr.push(mc);

        mc = MovieClipMgr.createMC("animal_animation_json", "animal_animation_png", this.getModel.animeHungryBack);
        mc.scaleX = -1;
        this.hungryArr.push(mc);

        //normal
        mc = MovieClipMgr.createMC("animal_animation_json", "animal_animation_png", this.getModel.animeNormalBack);
        mc.scaleX = 1;
        this.normalArr.push(mc);

        mc = MovieClipMgr.createMC("animal_animation_json", "animal_animation_png", this.getModel.animeNormalFront);
        mc.scaleX = 1;
        this.normalArr.push(mc);

        mc = MovieClipMgr.createMC("animal_animation_json", "animal_animation_png", this.getModel.animeNormalFront);
        mc.scaleX = -1;
        this.normalArr.push(mc);

        mc = MovieClipMgr.createMC("animal_animation_json", "animal_animation_png", this.getModel.animeNormalBack);
        mc.scaleX = -1;
        this.normalArr.push(mc);


        //full
        mc = MovieClipMgr.createMC("animal_animation_json", "animal_animation_png", this.getModel.animeFullBack);
        mc.scaleX = 1;
        this.fullArr.push(mc);

        mc = MovieClipMgr.createMC("animal_animation_json", "animal_animation_png", this.getModel.animeFullFront);
        mc.scaleX = 1;
        this.fullArr.push(mc);

        mc = MovieClipMgr.createMC("animal_animation_json", "animal_animation_png", this.getModel.animeFullFront);
        mc.scaleX = -1;
        this.fullArr.push(mc);

        mc = MovieClipMgr.createMC("animal_animation_json", "animal_animation_png", this.getModel.animeFullBack);
        mc.scaleX = -1;
        this.fullArr.push(mc);
    }

    public updateViewWithoutData():void
    {
        var mc:egret.MovieClip;
        mc = this.hungryArr[this.dir];
        this.addMC(mc);

        mc.play(-1);
    }

    public updateView():void
    {
        var mc:egret.MovieClip;

        if(this.isHungry())
        {
            mc = this.hungryArr[this.dir];
        }
        else if(this.isNormal())
        {
            mc = this.normalArr[this.dir];
        }
        else if(this.isFull())
        {
            mc = this.fullArr[this.dir];
        }
        else
        {
            console.log("==========================error: animal state error");
        }

        this.addMC(mc);

        mc.play(-1);
        //===================================================

        //表情
        if(this.isHungry())
        {
            this.addNeed(this.getModel.emotionHungry);
        }
        else if(this.isNormal())
        {
            this.addNeed(this.getModel.emotionNormal);
        }
        else if(this.isFull())
        {
            this.addNeed(this.getModel.emotionFull);
        }
    }

    //===================================================
    public second():void
    {
        this.leftCnt--;

        var panel:game.AnimalPanel = UIMgr.instance.getPanel(PanelName.ANIMAL_PANEL);
        panel.updateTime(this);


        if(0 == this.leftCnt)
        {
            this.suspend();

            this.stopCnt();

            this.data.status = AnimalConst.STATE_FULL;

            this.updateView();

            if(panel.parent)
            {
                UIMgr.instance.closeCurrentPanel();
                BreedGuideController.getInstance().nextStep();
            }
            else
            {
                BreedGuideController.getInstance().gotoStep(11);
            }
        }
    }

    public startCnt(leftCnt:number):void
    {
        this.stopCnt();

        this.leftCnt = leftCnt;
        GTimer.getInstance().register(this);
    }

    public stopCnt():void
    {
        this.leftCnt = 0;
        GTimer.getInstance().unRegister(this);
    }

    //===================================================
    //初始化
    public initData(data:UserAnimal):void
    {
        this.data = data;

        if(AnimalConst.STATE_NORMAL == data.status)
        {
            var leftTime:number = Math.floor(data.endDate * .001 - GTimer.getInstance().serverTime);
            if(leftTime > 0)
            {
                this.startCnt(leftTime);
            }
        }

        this.updateView();

    }

    //===================================================
    //需求提示
    //===================================================
    public addNeed(imgId:string):void
    {
        this.removeNeed();

        this.needHint.setNeed(imgId, new egret.Point(-22.5, 20));
        this.addChild(this.needHint);
        this.needHint.y = -this.mc.height;
    }

    public removeNeed():void
    {
        if(this.needHint.parent)
        {
            this.needHint.destroy();
            this.removeChild(this.needHint);
        }
    }

    //===================================================
    //时间提示
    //===================================================
    //public showTimeHint():void
    //{
    //    this.hideTimeHint();
    //
    //    this.addChild(this.timeHint);
    //
    //    this.updateTime();
    //}
    //
    //public hideTimeHint():void
    //{
    //    if(this.timeHint.parent)
    //    {
    //        this.removeChild(this.timeHint);
    //    }
    //}
    //
    //public updateTime():void
    //{
    //    if(AnimalTimeHint.getInstance().parent)
    //    {
    //        AnimalTimeHint.getInstance().updateTime(this.leftCnt);
    //    }
    //}

    //===================================================
    public fadeIn():void
    {
        this.alpha = 0;
        egret.Tween.get(this).to({alpha:1}, 1000).call(()=>
        {
            if(!GuideManager.getInstance().isInGuide())
            {
                if(this.isNormal())
                {
                    this.state.start();
                }
            }
        });
    }

    public fadeInWithoutData():void
    {
        this.alpha = 0;
        egret.Tween.get(this).to({alpha:1}, 1000);
    }

    public fadeOut():void
    {
        egret.Tween.get(this).to({alpha:0}, 1000).call(()=>
        {
            AnimalManager.getInstance().removeAnimal(this);
        });
    }

    public click():void
    {
        Loader.instance.loadGroups([GroupName.GOODS_GROUP], this.onLoaded, this);
    }

    private onLoaded():void
    {
        UIMgr.instance.show(PanelName.ANIMAL_PANEL, {direction:Direction.NONE}, this);
    }


    //public changeState(param:any):void
    //{
    //    this.data = param;
    //
    //    if(MapConst.ANIMAL_FULL == param.status)
    //    {
    //        this.state = this.fullS;
    //        this.state.update();
    //    }
    //    else if(MapConst.ANIMAL_NORMAL == param.status)
    //    {
    //        var passTime:number = Math.floor(GTimer.getInstance().serverTime - param.startDate * .001);
    //        if(passTime > 0)
    //        {
    //            this.state = this.normalS;
    //            this.state.update();
    //            (<NormalState>this.state).startCnt(passTime);
    //        }
    //    }
    //    else if(MapConst.ANIMAL_HUNGRY == param.status)
    //    {
    //        this.state = this.hungryS;
    //        this.state.update();
    //    }
    //}

    //normal->full
    //public turnToFull(way:number):void
    //{
    //    this.normalS.stopCnt();
    //
    //    //this.state = this.fullS;
    //    //this.state.update();
    //
    //    if(BreedConst.FULL_WAY_NATURAL == way)
    //    {
    //        GameEvent.watcher.dispatchEvent(new GameEvent(GameEvent.ANIMAL_FULL_BY_NATURAL, false, false, this));
    //    }
    //    else if(BreedConst.FULL_WAY_SPEED == way)
    //    {
    //        GameEvent.watcher.dispatchEvent(new GameEvent(GameEvent.ANIMAL_FULL_BY_SPEED, false, false, this));
    //    }
    //}


    //public setDir(dir:number):void
    //{
    //    this.mcLyr.scaleX = dir;
    //}


    //===================================================
    //public changeState(state:number):void
    //{
    //    if(MapConst.ANIMAL_NORMAL == state)
    //    {
    //        this.state = this.normalS;
    //        //this.state.update();
    //    }
    //    else if(MapConst.ANIMAL_HUNGRY == state)
    //    {
    //        this.state = this.hungryS;
    //        //this.state.update();
    //    }
    //}

    //public feedAnimal1():void
    //{
    //this.state = this.normalS;
    //this.state.update();
    //(<NormalState>this.state).startCnt(0);
    //
    //this.data.status = MapConst.ANIMAL_NORMAL;
    //this.data.startDate = GTimer.getInstance().serverTime * 1000;
    //this.data.endDate = (GTimer.getInstance().serverTime + this.mm.produceTime) * 1000;
    //}

    //public hAnimal_cb():void
    //{
    //    this.data.status = MapConst.ANIMAL_HUNGRY;
    //    this.data.startDate = 0;
    //    this.data.endDate = 0;
    //
    //}

    //===================================================
    public getLeftCnt():number
    {
        return this.leftCnt;
    }

    //===================================================
    //窗口启动
    public startup():void
    {
        if(this.isNormal())
        {
            this.state.start();
        }
    }

    //窗口中断
    public suspend():void
    {
        if(this.isNormal())
        {
            this.state.stop();
        }
    }

    //============================================================
    //状态判断
    public isHungry():boolean
    {
        if(AnimalConst.STATE_HUNGRY == this.data.status)
        {
            return true;
        }
        return false;
    }

    public isNormal():boolean
    {
        if(AnimalConst.STATE_NORMAL == this.data.status)
        {
            return true;
        }
        return false;
    }

    public isFull():boolean
    {
        if(AnimalConst.STATE_FULL == this.data.status)
        {
            return true;
        }
        return false;
    }

    //===================================================
    public get getModel():AnimalModel
    {
        return <AnimalModel>this.model;
    }
}