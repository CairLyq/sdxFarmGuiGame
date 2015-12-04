/**
 * Created by rodey on 14/11/26.
 */

class GameEvent extends egret.Event
{
    //开始游戏
    public static GAME_START:string = 'game_start';
    public static GAME_SELECT_NAME:string = 'game_select_name';

    //加载log
    public static LOGO_PLAY_DONE:string = 'logoPlayDone';
    //加载进入游戏所需资源
    public static PRE_LOAD_GAME:string = 'preLoadGame';

    //地图格子事件常量
    public static MGP_TAP:string = 'mgp_tap';
    public static MGP_START:string = 'mgp_start';
    public static MGP_MOVE:string = 'mgp_move';
    public static MGP_END:string = 'mgp_end';

    //滑动组件常量
    public static SCROLL_X:string = 'x';
    public static SCROLL_Y:string = 'y';
    public static SCROLL_XY:string = 'xy';

    //购买物品
    public static CANCEL_BUY_ITEM:string = 'cancel_buy_item';
    public static BUY_ITEM:string = 'buy_item';
    public static FLIP_ITEM:string = 'flip_item';
    //确定摆放位置
    public static CONFIRM_ITEM_POS:string = 'confirm_item_pos';


    public static CLICK_ITEM_IN_SHOP:string = 'click_item_in_shop';
    public static BUY_ITEMS:string = 'buy_items';
    public static SHOW_ITEM_TIPS: string = 'show_item_tips';

    //升级仓库
    public static ADD_ITEM_POST:string = 'add_post';
    public static BUY_ITEM_POST:string = 'buy_post';
    //公共弹窗确认按钮
    public static CONFIRM:string = 'confirm';
    //关闭弹窗
    public static CLOSE_WINDOW:string = 'close_window';
    //加速生产
    public static SPEED_UP_DOING_PRODUCT:string = 'speed_up_doing_product';
    //玩家等级变化,用户升级确认
    public static USER_UPGRADE:string = 'user_upgrade';
    /**
     * 升级后处理新标识
     * @type {string}
     */
    public static UPGRADE_NEW_ITEMS:string = 'upgrade_new_items';
    public static UPGRADE_NEW_ITEMS_CHANGE:string = 'upgrade_new_items_change';

    //用户数据改变
    public static RES_CHANGE:string = 'res_change';
    public static RES_CHANGE_REMOVE:string = 'res_change_remove';

    //增加物品
    public static ITEM_CHANGE:string = 'item_change';
    //消耗物品
    public static ITEM_CHANGE_REMOVE:string = 'item_change_remove';
    //物品不足
    public static ITEM_SHORTAGE_BUY:string = 'item_shortage';

    public static BUY_GOODS_CLOSE:string = 'buy_goods_close';


    public static HSLIDER_CHANGE:string = 'hslider_change';

    //旅行商人中购买
    public static MERCHANT_BUY: string = 'merchant_buy';

    //维修加速
    public static RESTORE_BUILD_SPEED: string = 'restore_build_speed';
    //公告跳转
    public static NOTIVE_GOTO: string = 'notice_goto';
    //动物成熟
    public static ANIMAL_FULL_BY_NATURAL: string = 'animal_full_by_natural';
    public static ANIMAL_FULL_BY_SPEED: string = 'animal_full_by_speed';

    public static ANIMAL_HARVEST: string = 'animal_harvest';

    //最后一份物品提示
    public static SHOW_TIPS_ITEM_OK: string = 'show_tips_item_ok';
    public static SHOW_TIPS_ITEM_CANCEL: string = 'show_tips_item_cancel';


    //===================================================
    //动物新版
    public static ANIMAL_TIME_HINT_CLOSE: string = 'animal_time_hint_close';
    public static ANIMAL_TIME_HINT_SPEED: string = 'animal_time_hint_speed';

    public static TIME_BAR_SPEED: string = 'time_bar_speed';
    public static SPEED:string = 'speed';


    public static SELL_DECO:string = 'sell_deco';
    public static CANCEL_SELL_DECO:string = 'cancel_sell_deco';




    public static watcher:egret.EventDispatcher = new egret.EventDispatcher();

    public data:any;

    constructor(type:string, bubble:boolean = false, cancelable:boolean = false, data:any = null)
    {
        super(type, bubble, cancelable);

        this.data = data;
    }


    /**
     * 阻止事件冒泡
     * @param evt
     * @constructor
     */
    public static BubbEvent(evt:any):void
    {
        if(evt)
        {
            evt.preventDefault();
            evt.stopImmediatePropagation();
            evt.stopPropagation();
        }
    }

    public static TweenTarget(target?:any, cb?:Function):void
    {
        TweenIt.tweenBigThenNormal(target, cb);
    }

}
