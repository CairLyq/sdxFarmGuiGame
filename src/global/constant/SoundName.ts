/**
 * Created by rodey on 15/2/4.
 */

class SoundName{

    //背景音乐
    static BG_SOUND: string = 'title_bgm';

    //面板相关
    static BTN_OK: string = 'btn_ok';
    static BTN_ARROW: string = 'btn_arrow';
    static BOX_OPEN: string = 'box_open';
    static WINDOW_OPEN: string = 'window_open';
    static WINDOW_CLOSE: string = 'window_close';

    //收割、收获
    static CROP_GET: string = 'crop_get'; //收获
    static COIN_GET: string = 'coin_get'; //金币飞入
    static EXP_GET: string = 'exp_get'; //经验值飞入
    static DIAMOND_GET: string = 'diamond_get'; //钻石飞入
    static ITEM_GET: string = 'item_get'; //收获的物品飞入仓库时

    static CROP_SEEDING: string = 'crop_seeding'; //播种

    //选择
    static ITEM_SELECTED: string = 'item_selected'; //点击或选择物品

    //升级
    static LEVEL_UP: string = 'level_up';

    //订单板
    static ORDER_BIRD_FLY: string = 'order_bird_fly'; //飞鸟的叫声
    static ORDER_BIRD_CHUNK: string = 'order_bird_chunk'; //飞鸟挥动翅膀的叫声

    //养殖场
    static BIRD_CHUCK: string = 'bird_chuck'; //鸡叫
    static COW_MOO: string = 'cow_moo'; //牛叫
    static PIG_GRUNT: string = 'pig_grunt'; //猪叫
    static SHEEP_BLEAT: string = 'sheep_bleat'; //羊叫

    //动物对应的叫声
    static BREEDING_LIST: any = {
        '1': SoundName.BIRD_CHUCK,
        '2': SoundName.COW_MOO,
        '3': SoundName.PIG_GRUNT,
        '4': SoundName.SHEEP_BLEAT
    };

}
