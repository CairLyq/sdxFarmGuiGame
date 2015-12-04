/**
 * on 2014-12-09
 * by leo
 * map constant
 */
class MapConst
{
    //===================================================

//    public static BUILDING_IMG_SIZE:number = 4;
//    public static RUBBISH_IMG_SIZE:number = 2;
    //constant
    public static DEBUG_MAP:boolean = false;

    public static CONST_TILE_W:number = 64;
    public static CONST_TILE_H:number = 32;

    //alpha值变化
    public static ALPHA_START:number = .5;
    public static ALPHA_END:number = 1;
    public static ALPHA_TIME:number = 1000;//ms




    //可建造，可行走
    public static BUILD_YES_WALK_YES:number = 1;
    public static BUILD_YES_WALK_NO:number = 2;
    public static BUILD_NO_WALK_YES:number = 3;
    public static BUILD_NO_WALK_NO:number = 4;


    public static MAP_SIZE:number = 95;
    //===================================================


    //
    public static ENTER_EDIT_MODE_TIME:number = 60;//frames
    public static SHOW_PICKUP_PROGRESS_TIME:number = 30;//frames

    public static OP_ADD:string = "op_add";
    public static OP_REMOVE:string = "op_remove";


    public static FARM_RIPE:number = 1;
    public static FARM_NO_RIPE:number = 0;

    //加工厂
    public static BUILDING_TYPE_PRODUCT:number = 4;



    public static TILE_OFFSET_X:number = 1000;//1500;
    public static TILE_OFFSET_Y:number = -500 + 16;//-750;

    public static SCENE_OFFSET_X:number = -1112;//-1240;
    public static SCENE_OFFSET_Y:number = -782;//-814;

    //加工厂
    public static PRODUCT_ROOM:number = 211;
    public static ROAD_CANDY:number = 7;
    //养殖场
    public static BUILDING_ID_CHICK:number = 102;
    public static BUILDING_ID_COW:number = 103;
    public static BUILDING_ID_PIG:number = 104;
    public static BUILDING_ID_SHEEP:number = 105;

    //农作物
    public static FARM_IDS: number[] = ArrayUtils.Range(101, 112, true);

    public static TOUCH_FEED:number = 0;
    public static TOUCH_ANIMAL_ADD:number = 1;
    //public static TOUCH_HTOOL:number = 2;
    public static TOUCH_ANIMAL_H:number = 3;



    public static ANIMAL_HUNGRY:number = 0;
    public static ANIMAL_NORMAL:number = 1;
    public static ANIMAL_FULL:number = 2;

    //where use time progress
    public static WHERE_ANIMAL:number = 0;
    public static WHERE_FARM:number = 1;
    public static WHERE_TREE:number = 2;

    //tools panel
    //public static HARVEST_FARM:number = 0;
    //public static HARVEST_TREE:number = 1;
    //public static FELL_TREE:number = 2;
    //public static PICKUP_RUBBISH:number = 3;

    //修建
    static REPAIR_OK: number = 2;
    static REPAIR_NO: number = 1;



    public static ADD_TIME:number = 10;
    public static BASE_TIME:number = 10;

    public static IS_BG_BLOCKS_PLAN:boolean = false;
}