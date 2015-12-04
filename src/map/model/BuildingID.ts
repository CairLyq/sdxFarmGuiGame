/**
 * Created by Gordon on 08/01/15.
 */
class BuildingID
{
    public static ORDER_BOARD:number = 4;
    public static ORDER_CAR:number = 5;
    /**矿洞*/
    public static MINE:number = 10;
    /**建筑id */
    public static BUILDING_ID_FARM:number = 101;
    //生产建筑
    public static PROCESS_FACTORY:number[] = ArrayUtils.Range(201, 216, true);// [201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216];
    //旅行商人
    public static MERCHANT_PERSON: number = 6;
    //动物
    public static ANIMAL_IDS: number[] = ArrayUtils.Range(102, 105, true);

    /**
     * 粮仓货仓
     */
    public static DEPOT_ROOM:number[] = [2, 3];
    /**
     *成就屋
     **/
    public static ACHIEVEMENT:number = 1;


    public static THE_BREED:number = 102;
    //新手引导 生产建筑
    public static BREAD_PRODUCT:number = 201;
    //塑料机
    public static PLASTIC_PRODUCT:number = 202;
    //路边摊
    public static ROADSITE:number = 7;
    //鸟蛋
    public static ANIMAL_BIRD: number = 1;
    /**飞空艇*/
    public static AIRSHIP:number = 8;
    /**飞空艇码头*/
    public static AIRSHIP_WAIT:number = 9;
    /**
     * 树
     */
    public static TYPE_TREE:number = 5;
    /**
     * 农田
     */
    public static TYPE_FARM:number = 2;
    /**
     * 装饰
     */
    public static TYPE_DECO:number = 7;

}