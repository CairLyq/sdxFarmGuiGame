class LoadingUIView extends egret.DisplayObjectContainer
{
    //版本
    private version:egret.TextField;

    private bg:egret.Bitmap;

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    public onAddToStage(e:egret.Event):void
    {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

        var bg:egret.Bitmap = new egret.Bitmap();
        bg.texture = RES.getRes('JZ_bg');
        bg.width = Lyrs.SW;
        bg.height = Lyrs.SH;
        this.addChild(bg);
        this.bg = bg;

        this.x = 0;
        this.y = 0;
        this.width = Lyrs.SW;
        this.height = Lyrs.SH;

        Loader.instance.load( GroupName.SOUNDS_GROUP, null, this.startLoadRes, this, false );
        this.createVersionText();
        this.createStartText();
        //创建粒子
        Loader.instance.loadGroups([GroupName.SEXPANEL_GROUP], ()=>{
            this.createParticle();
        }, this);

    }

    /**
     * 创建版本文本显示
     */
    private createVersionText():void
    {
        this.version = new egret.TextField();
        this.version.text = Global.VERSION;
        this.version.textColor = 0xFFFFFF;
        this.version.size = 20;
        this.version.x = 20;
        this.version.y = this.height - 20;

        this.addChild(this.version);
    }

    private start:egret.TextField;
    private createStartText():void
    {
        var start = new egret.TextField();
        start.text = Language.getString( 3, 37 );
        start.textColor = 0xFFFFFF;
        start.size = 24;
        start.textAlign = egret.HorizontalAlign.CENTER;
        start.bold = true;
        start.anchorX = start.anchorY = 0.5;
        start.x = Lyrs.SW >> 1;
        start.y = (Lyrs.SH >> 1) + 70;

        this.addChild(start);
        TweenIt.loopTween( start, {alpha:0}, {alpha:1}, 1000 );
        this.start = start;

        this.touchEnabled = true;
        this.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
    }

    /**
     * 添加粒子效果
     */

    public praticleSystem: particle.GravityParticleSystem;
    private createParticle():void
    {
        if( !this.praticleSystem )
        {
            this.praticleSystem = new particle.GravityParticleSystem(RES.getRes(GroupName.PETAL_KEYS[ 0 ] ), RES.getRes(GroupName.PETAL_KEYS[ 1 ]));
            this.addChild( this.praticleSystem );

            this.praticleSystem.visible = false;

        }
        this.praticleSystem.visible = true;
        this.praticleSystem.start(-1);
    }

    public destroy(): void{
        if(this.praticleSystem){
            if(this.getChildIndex(this.praticleSystem) !== -1){
                this.removeChild(this.praticleSystem);
            }
        }
        this.praticleSystem = null;
        delete this.praticleSystem;
    }


    private waitEnter:boolean = false;
    private onTap( e:egret.TouchEvent ):void
    {
        this.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );

        egret.Tween.removeTweens( this.start );
        if( this.groupIdx == this.groupNum )
        {
            this.dispatchEvent(new egret.Event(GameEvent.PRE_LOAD_GAME));
        }
        else
        {
            MaskFactory.getInstance().addMask();
            this.waitEnter = true;
        }
    }

    private groupNum:number = GroupName.LOAD_GROUP_ARR.length;
    private groupIdx:number = 0;
    private startLoadRes():void
    {
        //播放背景音乐
        SoundMgr.instance.init();

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onProgress, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onLoadError, this);

        for(var i:number = 0; i < this.groupNum; i++)
        {
            RES.loadGroup( GroupName.LOAD_GROUP_ARR[i] );
        }
    }

    /**
     * 加载资源组完成6
     */
    private onComplete(evt:RES.ResourceEvent):void
    {
        this.groupIdx++;

        Logger.log( evt.groupName + '加载完成；' );
        if("config" == evt.groupName)
        {
            var cfg:any = RES.getRes("CfgBuilding");
            BuildingModel.init(cfg);

            cfg = RES.getRes("CfgItem");
            DepotModel.init(cfg);

            cfg = RES.getRes("CfgBuyCoin");
            BuyCoinModel.init(cfg);

            cfg = RES.getRes("CfgBuyDiamond");
            BuyDiamondModel.init(cfg);

            cfg = RES.getRes("CfgExpandStorage");
            ExpendStorageModel.init(cfg);

            cfg = RES.getRes("CfgProduct");
            FarmModel.init(cfg);

            cfg = RES.getRes("CfgTree");
            TreeModel.init(cfg);

            cfg = RES.getRes("CfgSpeed");
            SpeedModel.init(cfg);

            cfg = RES.getRes("CfgNpc");
            NPCModel.init(cfg);

            cfg = RES.getRes("CfgProduct");
            ProductionModel.init(cfg);

            cfg = RES.getRes("CfgUserLevel");
            UserLevelModel.init(cfg);

            cfg = RES.getRes("CfgLivestock");
            AnimalModel.init(cfg);

            cfg = RES.getRes("CfgNpcDialog");
            model.NpcDialog.init(cfg);

            cfg = RES.getRes("CfgTask");
            model.CfgTask.init(cfg);

            cfg = RES.getRes("CfgTrophy");
            model.CfgTrophy.init(cfg);

            cfg = RES.getRes("CfgMerchant");
            MerchantModel.init(cfg);

            cfg = RES.getRes("CfgGuide");
            GuideModel.init(cfg);

            cfg = RES.getRes("CfgMapRubbish");
            RubbishModel.init(cfg);

            cfg = RES.getRes("CfgWeekBonus");
            WeekBonusModel.init(cfg);

            cfg = RES.getRes("CfgMonthBonus");
            MonthBonusModel.init(cfg);
        }

        if( this.groupIdx == this.groupNum )
        {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onProgress, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onLoadError, this);
            MaskFactory.getInstance().removeMask();

            if( this.waitEnter )
            {
                this.dispatchEvent(new egret.Event(GameEvent.PRE_LOAD_GAME));
            }

            Loader.instance.loadGroups([
                GroupName.MAPS_GROUP,
                GroupName.TREESTATE_GROUP,
                GroupName.GOODS_GROUP,
                GroupName.BUILDINGANIMATION_GROUP,
                GroupName.BUILDINGRELATED_GROUP,
                GroupName.SOUNDS_GROUP,
                GroupName.ANIMAL_GROUP,
                GroupName.VILLAGER_GROUP
            ], ()=> {}, this, false );
            Loader.instance.load( GroupName.AVATAR, GroupName.AVATAR_KEYS, ()=> {}, this, false );
        }
    }

    /**
     * 加载资源组失败
     */
    private onLoadError(e:RES.ResourceEvent):void
    {
        console.log("==========================加载资源组失败:", e.groupName);
    }

    /**
     * 加载资源组中
     */
    private onProgress(evt:RES.ResourceEvent):void
    {

    }
}