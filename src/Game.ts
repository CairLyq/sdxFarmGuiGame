/**
 * Created by rodey on 14/11/20.
 * 游戏开始
 * 一些页面初始化工作
 */
class Game
{


    private buildingData:any[];
    private villagerData:UserVillager[];
    private rubbishData:any[];
    private animalData:any[];

    public constructor()
    {

    }

    /**
     *四格漫画后init
     */
    public init():void
    {
        //加载资源
        Loader.instance.loadGroups([

            GroupName.MAPS_GROUP,
            GroupName.TREESTATE_GROUP,
            GroupName.GOODS_GROUP,
            GroupName.BUILDINGANIMATION_GROUP,
            GroupName.BUILDINGRELATED_GROUP,
            GroupName.ANIMAL_GROUP,
            GroupName.SHOPPING_GROUP,
            GroupName.MERCHANT_NOTIC_BUY_GROUP

        ], ()=> {
            //加载 建筑、[...] 动画资源
            ProductionAnimateModel.init();
            //初始化场景
            Game.instance.initScene();
        }, this );

        Background.instance.init();

        GameUI.instance.create();

        //测试代码
        Game.instance.initDebugger();

        //公告
        //NoticeController.instance.init();

        //登录奖励
        GameSystemController.instance.openLoginRewardPanel();

        //防沉迷
        if( AntiAddictionController.indulgeFlag && UserController.instance.isIndulge )
        {
            AntiAddictionController.instance.start();
        }
    }

    //===================================================
    /**
     * login 启动
     */
    public startup(buildingData:any[], villagerData:UserVillager[], rubbishData:any[], animalData:any[]):void
    {
        this.buildingData = buildingData;
        this.villagerData = villagerData;
        this.rubbishData = rubbishData;
        this.animalData = animalData;

        if(game.MainSexPanel.CREATE_ROLE)
        {
            game.MainSexPanel.CREATE_ROLE = false;
            var win:game.StartWindows = new game.StartWindows();
            Lyrs.LYRS_UI.addChild(win);
            return;
        }

        this.init();
    }

    /**
     * 创建游戏的主场景上的建筑，以及场景上其它一些功能
     */
    public initScene():void
    {

        DepthManager.getInstance().dispose();

        CollisionCheck.getInstance().init();

        MapDebug.init();

        BuildingManager.getInstance().init(this.buildingData);

        RubbishManager.getInstance().init(this.rubbishData);

        VillagerManager.getInstance().init(this.villagerData);

        AnimalManager.getInstance().init(this.animalData);

        DepthManager.getInstance().setDepth();

        PickupLogic.getInstance();

        DragLogic.getInstance();

        GuideManager.getInstance().init();

    }
    //private static instance:Game;
    private static _instance:Game;

    public static get instance():Game
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new Game();
        }
        return this._instance;
    }
    //===============================================================


    /**
     * rodey
     * =====================''''''Debugger Area'''''''=================
     */
    private initDebugger():void
    {

        //this.createSexPanel();
        //this.createMoveClip('finger');
        //this.createPagetion()

        //NoticeController.instance.init();

        //var upgrade: any = new game.UserUpgradePanel();
        //Lyrs.LYRS_UI.addChild(upgrade);

        /*var productMC: game.ProductionDoingMC = new game.ProductionDoingMC();
        productMC.x = 200;
        productMC.y = 300;
        productMC.play();
        Lyrs.LYRS_UI.addChild(productMC);*/


        /*var btm: egret.Bitmap = new egret.Bitmap(RES.getRes('FCM_06'));
        Lyrs.STAGE.addChild(btm);
        btm.anchorX = .5;
        btm.x = Lyrs.SW >> 1;
        btm.y = Lyrs.SH >> 1;
        btm.touchEnabled = true;

        btm.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt)=>{

            var target = evt.currentTarget || evt.target;
            egret.Tween.get(target).to( { scaleX: -1 }, 1000 ).call( ()=>{
                egret.Tween.get(target).to( { scaleX: 1 }, 1000 ).call( ()=>{
                    egret.Tween.removeTweens(target);
                } );
            } );

        }, this);*/

        /*//签到奖励
        Lyrs.STAGE.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt)=>{

            UIMgr.instance.show( PanelName.SIGNIN_REWARD_PANEL, { diretion: Direction.CENTER, touchLayer: false } );

        }, this);*/

    }

    /*private createSexPanel():void
    {
        Loader.instance.loadGroups([GroupName.SEXPANEL_GROUP], ()=> {
            var win:game.MainSexPanel = new game.MainSexPanel();
            Lyrs.LYRS_UI.addChild(win);
        }, this);

    }*/

    /*private createMoveClip(mcName:string):void
     {
     var json = RES.getRes("finger_json");
     var texture = RES.getRes("finger_png");
     var mcDataFactory = new egret.MovieClipDataFactory(json, texture);
     var loadMC = new egret.MovieClip(mcDataFactory.generateMovieClipData(mcName));
     loadMC.anchorX = loadMC.anchorY = .5;
     //this.loadMC.x = (Lyrs.SW - this.loadGui.width) * .5;
     loadMC.x = 100;
     loadMC.y = 200;
     Lyrs.LYRS_UI.addChild(loadMC);
     loadMC.gotoAndPlay('start', -1);
     }*/
    /*
    private createPagetion():void
    {

        var wait: egret.Bitmap = new egret.Bitmap();
         wait.texture = RES.getRes('Socket_jiazai');
         wait.anchorX = wait.anchorY = .5;
         wait.x = Lyrs.SW * .5; //(Lyrs.SW - this.wait.width ) * .5;
         wait.y = Lyrs.SH * .5; //(Lyrs.SH - this.wait.height ) * .5;
         egret.MainContext.instance.stage.addChild(wait);
         window.setInterval(function(){
         wait.rotation += 5;
         }, 10);

    }*/

}
