/**
 * on 2014-12-08
 * by leo
 */
class Global
{
    /**
     * 盛迅达: true  其他 false
     * @type {boolean}
     */
    public static DEBUG:boolean = ( null != window[ 'debug' ] );

    public static PLATFORM:number = 1001;

    public static START_X:number = 0;
    public static START_Y:number = 100;

    public static SCALE_X:number = 1;
    public static SCALE_Y:number = 1;

    //全局当前模块

    //当前语言
    public static LANGUAGE: string = 'sc';
    //版本号
    public static VERSION: string = window[ 'version' ];

    public static IP: string = window.localStorage.getItem( 'ip' );

    public static PORT: string = '10000';
    public static WEB_PORT: string = '';

    public static SOCKET_URL:string = "ws://" + Global.IP + ":" + Global.PORT + "/farm";
    //182.254.229.209//外网
    //192.168.1.22//测试服
    //192.168.0.147//本地


    //公告地址
    public static NOTICE_URL: string = 'http://' + Global.IP + ':' + Global.WEB_PORT + '/farm-web/getNotice';

    public static CACHE_URL: string = ( (Global.DEBUG ? 'launcher' : 'launcher') + '/appcache.html' );

    //默认音量
    public static BG_VOLUME: number = Global.DEBUG ? 0 : .5;
    public static AU_VOLUME: number = .0;

    public static TOKEN_OUT_OF_DATE:number = 97;
    public static TOKEN_NULL:number = 98;
    public static RC_SUCCESS:number = 100;
    public static RC_USER_REG: number = 2;

    //购买物品
    public static RC_BUY_ITEM: number = 5;

    //以后用drag对象的hash值
    public static DRAG_OBJECT:number = 0;


    public static NOT_FOUND:number = -1;

    //1000ms
    public static SECOND:number = 1000;
    //300ms
    public static ANIMATION_INTERVAL:number = 40;


    //遮罩透明度
    public static MASKER_OPACITY: number = .2;
    //ms
    public static PANLE_TWEEN_TIME: number = 500;

    //===
    public static DEPOT_STORAGE:number = 1; //粮仓
    public static DEPOT_WAREHOUSE:number = 2; //货仓

    //系统建筑开关
    public static SYS_BUILDING_SWITCH: boolean = false;

    //旅行商人订单刷新时间 (单位 秒)
    public static MERCHANT_REFRESTDATE: number = 600;

    //variables
    public static sdToken: string = GameUtils.getToken();
    public static sdUserClass: any; //sdk对象，为以后操作其他接口使用
    public static nickName: string; //昵称
    public static sex: number; //性别

    //Sounds
    public static bgSound: egret.Sound;

    //new items
    public static NEW_ITEMS: string = '_upgrade_new_items_';

    //维修动画相关资源名
    public static RESTORE_BUILD_JSON: string = 'fixing_mine_json';
    public static RESTORE_BUILD_PNG: string = 'fixing_mine_png';
    public static RESTORE_BUILD_MC_BG: string = 'fixing_bg';
    public static RESTORE_BUILD_MC_NAME: string = 'fixing_part';
    public static RESTORE_BUILD_MC_BACK: string = 'robot_walk_back';
    public static RESTORE_BUILD_MC_FIX: string = 'robot_walk_fixing';
    public static RESTORE_BUILD_MC_FRONT: string = 'robot_walk_front';

    //粮仓 货仓数据
    public static DepotData: any;
    //public static useTimeProgressObj:number = 0;

    //资源不足购买滑块相关值
    public static BUY_GOODS_SLIDER_MAX: number = 10;
    public static BUY_GOODS_SLIDER_STEP: number = 1;

    public static useTimeBarV2Obj:number = 0;


    public static MASK_TYPE_RECT:string = "rect";

    //浏览器判断
    public static MQQ_BROWSER: boolean = GameUtils.getBrowser('MQQBrowser');
    public static CHROME_BROWSER: boolean = GameUtils.getBrowser('Chrome');
    public static SAFARI_BROWSER: boolean = GameUtils.getBrowser('Safari');
    //public static MOZ_BROWSER: boolean = GameUtils.getBrowser('');


}