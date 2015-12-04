/**
 * on 2014-12-08
 * by leo
 * Layers:场景中的各个UI层
 */
class Lyrs
{
    /** 最底层 */
    public static LYRS_SCENE:egret.DisplayObjectContainer;

    public static LYRS_TILE_IN_SCENE:egret.DisplayObjectContainer;
    public static LYRS_ITEM_IN_SCENE:egret.DisplayObjectContainer;

    /**在面板与建筑之间;如飞空艇，白云*/
    public static LYRS_FLY:egret.DisplayObjectContainer;

    /*panel 专用*/
    public static LYRS_UI:egret.DisplayObjectContainer;

    /*需要显示在LYRS_UI之上的ui, 为了不影响LYRS_UI,有此一层*/
    public static LYRS_UI_2:egret.DisplayObjectContainer;

    public static LYRS_GUIDE:egret.DisplayObjectContainer;

    /**只加提示文本*/
    public static LYRS_TIP:egret.DisplayObjectContainer;
    /**图标飘动*/
    public static LYRS_ICON:egret.DisplayObjectContainer;
    /**图标飘动父级**/
    public static LYRS_ICON_PARENT: egret.DisplayObjectContainer;
    /**
     * 防沉迷提示
     */
    public static LYRS_ANTI_ADDICTION:egret.DisplayObjectContainer;
    /** 锁屏；最高层 */
    public static LYRS_MASK:egret.DisplayObjectContainer;
    public static LYRS_DEBUG:egret.DisplayObjectContainer;


    public static STAGE:egret.Stage;

    public static SW:number;
    public static SH:number;

    public static init(mainClass:egret.DisplayObjectContainer):void
    {
        this.STAGE = mainClass.stage;
        this.SW = mainClass.stage.stageWidth;
        this.SH = mainClass.stage.stageHeight;
        UIUtil.stageRect = new egret.Rectangle(0, 0, Lyrs.SW, Lyrs.SH);

        this.LYRS_SCENE = new egret.DisplayObjectContainer();
        this.LYRS_UI = new egret.DisplayObjectContainer();
        this.LYRS_UI_2 = new egret.DisplayObjectContainer();
        this.LYRS_GUIDE = new egret.DisplayObjectContainer();

        this.LYRS_MASK = new egret.DisplayObjectContainer();
        this.LYRS_TIP = new egret.DisplayObjectContainer();
        this.LYRS_ICON_PARENT = new egret.DisplayObjectContainer();
        this.LYRS_ICON = new egret.DisplayObjectContainer();
        this.LYRS_ANTI_ADDICTION = new egret.DisplayObjectContainer();

        this.LYRS_SCENE.name = "LYRS_SCENE";
        this.LYRS_UI.name = "LYRS_UI";
        this.LYRS_UI_2.name = "LYRS_UI_2";
        this.LYRS_GUIDE.name = "LYRS_GUIDE";

        this.LYRS_TIP.name = "LYRS_TIP";
        this.LYRS_ICON.name = "LYRS_ICON";
        this.LYRS_ICON_PARENT.name = "LYRS_ICON_PARENT";
        this.LYRS_ANTI_ADDICTION.name = "LYRS_ANTI_ADDICTION";
        this.LYRS_MASK.name = "LYRS_MASK";


        mainClass.addChild(this.LYRS_SCENE);
        mainClass.addChild(this.LYRS_UI);
        mainClass.addChild(this.LYRS_UI_2);
        mainClass.addChild(this.LYRS_GUIDE);

        mainClass.addChild(this.LYRS_TIP);
        mainClass.addChild(this.LYRS_ICON);
        mainClass.addChild(this.LYRS_ICON_PARENT);
        mainClass.addChild(this.LYRS_ANTI_ADDICTION);
        mainClass.addChild(this.LYRS_MASK);


        if( MapConst.DEBUG_MAP )
        {
            this.LYRS_TILE_IN_SCENE = new egret.DisplayObjectContainer();
            this.LYRS_TILE_IN_SCENE.name = "LYRS_TILE_IN_SCENE";
            Lyrs.LYRS_SCENE.addChild(this.LYRS_TILE_IN_SCENE);
            this.LYRS_TILE_IN_SCENE.x = MapConst.TILE_OFFSET_X;
            this.LYRS_TILE_IN_SCENE.y = MapConst.TILE_OFFSET_Y;

        }

        this.LYRS_DEBUG = new egret.DisplayObjectContainer();
        this.LYRS_DEBUG.name = "LYRS_DEBUG";
        mainClass.addChild(this.LYRS_DEBUG);
        this.tf = new egret.TextField();
        this.LYRS_DEBUG.addChild( this.tf );
        this.tf.y = 80;

        this.LYRS_ITEM_IN_SCENE = new egret.DisplayObjectContainer();
        this.LYRS_ITEM_IN_SCENE.name = "LYRS_ITEM_IN_SCENE";
        this.LYRS_SCENE.addChild(this.LYRS_ITEM_IN_SCENE);
        this.LYRS_ITEM_IN_SCENE.x = MapConst.TILE_OFFSET_X;
        this.LYRS_ITEM_IN_SCENE.y = MapConst.TILE_OFFSET_Y;


        //Lyrs.LYRS_UI_IN_SCENE = new egret.DisplayObjectContainer();
        //this.LYRS_SCENE.addChild(this.LYRS_UI_IN_SCENE);
        //this.LYRS_UI_IN_SCENE.x = MapConst.TILE_OFFSET_X;
        //this.LYRS_UI_IN_SCENE.y = MapConst.TILE_OFFSET_Y;

        Lyrs.LYRS_SCENE.x = MapConst.SCENE_OFFSET_X;
        Lyrs.LYRS_SCENE.y = MapConst.SCENE_OFFSET_Y;



    }

    public static tf:egret.TextField;

    static bebugText( s:string ):void
    {
        if( !Global.DEBUG )
        {
            Lyrs.tf.text = s;
        }
    }
}