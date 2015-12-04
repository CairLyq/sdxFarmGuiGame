/**
 * Created by rodey on 15/2/9.
 *
 * Socket错误代码
 */

class SocketError{

    constructor(){}

    //生产建筑
    static RC_BUILDING_NOT_EXITS: number = 301; //建筑不存在
    static RC_BUILDING_PRODUCER_OUT_LIMIT: number = 340; //已达扩展最大上限

    //------------------------登录  "User.login"
    static SYS_GOLD_NOT_ENOUGH: number              = 2;    //用户不存在
    static SYS_TOKEN_OUTTIME: number                = 97;   //token失效
    static SYS_KICK_OFF: number                     = 95;   //帐号同事登录

    //------------------------添加生产错误处理  "Building.produce"
    static BUILDING_PRODUCER_OUT_LIMIT: number      = 340;  //超出生产上限

    //------------------------收获错误处理  "Building.harvestProduct"
    static ITEM_OUT_LIMIT: number                   = 103;  //爆仓
    static BUILDING_PRODUCT_NOT_COMPLETE: number    = 341;  //产品未完成

    //------------------------扩建错误处理  "Building.expand"
    static BUILDING_NOT_EXITS: number               = 301;  //建筑不存在

    //------------------------加速错误处理  "Building.speedUp"


    //------------------------扩仓错误处理  "Item.expand"
    static ITEM_EXPAND_OUT_LIMIT: number            = 101;  //超出扩展上限
    static SYS_RESOURCE_NOT_ENOUGH: number          = 60;   //资源不足

    //

    public static loginReset(msg?: string){

        /*UIMgr.instance.show(
            PanelName.SOCKET_ERROR_PANEL,
            null,
            (msg || Language.getString( 3, 27 ) ), // '服务连接失败，请重新登录'),
            Language.getString( 3, 28 ), //'重新登录',
            'ok',
            function(){
                window.location.href = ( Global.DEBUG ? 'launcher/' : '../' ) + 'sxdlogin.html';
            }, { 'buttonWidth': 150 });*/

        window.location.href = ( Global.DEBUG ? 'launcher/' : '../' ) + 'sxdlogin.html';

    }

    public static resetOpenSocket(msg?: string): void{

            UIMgr.instance.show(
                PanelName.SOCKET_ERROR_PANEL,
                { direction: Direction.CENTER },
                (msg || Language.getString( 3, 29 ) ), // '服务连接已断开，请重新连接'),
                Language.getString( 3, 30 ), //'重新连接',
                'ok',
                function(){
                    SocketManager.instance.init();
                }, { 'buttonWidth': 150 });
    }

    public static kickOff(): void{
        UIMgr.instance.show(
            PanelName.SOCKET_ERROR_PANEL,
            { direction: Direction.CENTER },
            Language.getString( 3, 41 ), // '您的账号已经在另一台设备上登录，您被迫下线。如果这不是您自己的操作，请注意自己的账号安全。',
            Language.getString( 3, 28 ), //'重新登录',
            'ok',
            function(){
                window.location.href = ( Global.DEBUG ? 'launcher/' : '../' ) + 'sxdlogin.html';
            }, { 'buttonWidth': 150 });
    }

}
