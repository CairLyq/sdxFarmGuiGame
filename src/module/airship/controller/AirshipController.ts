/**
 * Created by Gordon on 20/April/15.
 * @class AirshipController
 * @constructor
 **/
class AirshipController
{
    static userElfShip:model.UserElfShip;
    static itemList:Array<model.UserShipOrder>;
    static panelName:boolean = false;
    static refresh:boolean = false;

    /**
     * @param panelName
     *          显示面板，默认不显示
     * @param refresh
     *          刷新面板内容，默认不刷新
     */
    public static getElfShip( panelName:boolean = false, refresh:boolean = false, showLayer:boolean = true ):void
    {
        var data:Object = { "act":"Building.getElfShip" };
        SocketManager.instance.send(JSON.stringify(data), showLayer );
        AirshipController.panelName = panelName;
        AirshipController.refresh = refresh;
    }

    static handle:number;
    public static onGetElfShip( data:Object ):void
    {
        AirshipController.userElfShip = new model.UserElfShip( data[ 'userElfShip' ] );
        AirshipController.itemList = AirshipController.userElfShip.userShipOrders;
        if( AirshipController.panelName )
        {
            AirshipController.showPanel();
        }
        if( AirshipController.refresh )
        {
            var panel:view.AirshipPanel = UIMgr.instance.getPanel( PanelName.AIRSHIP_PANEL );
            panel.refreshGroup();
        }

        var miniSecond:number = AirshipController.userElfShip.refreshDate - GTimer.getInstance().serverTime * 1000;

        clearTimeout( AirshipController.handle );
        AirshipController.handle = setTimeout( AirshipController.fly, miniSecond );

        var str:string = '装箱等待时间：';
        if( 0 == AirshipController.userElfShip.waitStatus && -1 == view.AirshipWaitBuilding.instance.flying )
        {
            view.AirshipWaitBuilding.instance.visible = false;
            view.AirshipBuilding.instance.launchOver();
            str = '飞空艇在外等待时间：';
        }

        var date:Date = new Date( AirshipController.userElfShip.refreshDate );
        console.log( str + date.getHours() + '小时' + date.getMinutes() + '分' + date.getSeconds() + '秒' );
    }

    static fly():void
    {
        view.AirshipWaitBuilding.instance.fly();
    }

    static showPanel():void
    {
        if( AirshipController.userElfShip.waitStatus == 0 )
        {
            UIMgr.instance.show( PanelName.AIRSHIP_WAIT_PANEL, { "direction":Direction.CENTER } );
            return;
        }
        UIMgr.instance.show( PanelName.AIRSHIP_PANEL, { "direction":Direction.CENTER } );
    }
    static allPack():boolean
    {
        var length:number = AirshipController.itemList.length;
        for( var index:number = 0; index < length; index++ )
        {
            if( 0 == AirshipController.itemList[ index ].status )
            {
                return false;
            }
        }
        return true;
    }
    static allEmpty():boolean
    {
        var length:number = AirshipController.itemList.length;
        for( var index:number = 0; index < length; index++ )
        {
            if( 1 == AirshipController.itemList[ index ].status )
            {
                return false;
            }
        }
        return true;
    }

    public static elfShipTakeOff( showLayer:boolean = true):void
    {
        var data:Object = { "act":"Building.elfShipTakeOff" };
        SocketManager.instance.send( JSON.stringify(data), showLayer );
    }

    public static onElfShipTakeOff( data:Object ):void
    {
        var panel:view.AirshipPanel = UIMgr.instance.getPanel( PanelName.AIRSHIP_PANEL );
        panel.onElfShipTakeOff( data );
        AirshipController.userElfShip.waitStatus = 0;
    }
    public static pack( orderId:number ):void
    {
        var data:Object = { "act":"Building.pack", "dt":{ orderId:orderId } };
        SocketManager.instance.send(JSON.stringify(data) );
        AirshipController.setShipOrderById( orderId );
    }
    public static setShipOrderById( orderId:number ):void
    {
        var length:number = AirshipController.itemList.length;
        for( var index:number = 0; index < length; index++ )
        {
            if( orderId == AirshipController.itemList[ index ].orderId )
            {
                AirshipController.itemList[ index ].status = 1;
            }
        }
    }

    public static onPack( data:Object ):void
    {
        view.AirshipPanel.intance.onPack( data );
    }
    public static elfShipSpeed():void
    {
        var data:Object = { "act":"Building.elfShipSpeed" };
        SocketManager.instance.send(JSON.stringify(data) );
    }

    public static onElfShipSpeed( data:Object ):void
    {
        var panel:view.AirshipWaitPanel = UIMgr.instance.getPanel( PanelName.AIRSHIP_WAIT_PANEL );
        panel.onElfShipSpeed( data );
    }
}