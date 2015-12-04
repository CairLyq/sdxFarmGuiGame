/**
 * Created by Gordon on 2014-01-04
 */
module model
{
    export class UserCarOrder
    {
        private static itemList:Array<UserCarOrder> = [];
        public static SHOW_PANEL:boolean = false;

        /**
         * 物品数量,格式 itemId*itemNum;itemId*itemNum;itemId*itemNum
         */
        public items:string;
        /**
         * 	1~9号订单
         */
        public orderId:number;
        /**
         * int	金币
         */
        public gold:number;
        /**
         * 	int	经验
         */
        public exp:number;
        /**
         * int	0 未完成 1 已完成
         */
        public status:number;
        /**
         * 	Date 刷新结束时间
         */
        public refreshEndDate:number;
        /**
         * 	String 来源名称
         */
        public orderFrom:string;
        /**
         * 	int 对话id
         */
        public dialogId:number;
        /**
         * 	int npcId
         */
        public npcId:number;

        public constructor( obj:Object )
        {
            for( var key in obj )
            {
                this[ key ] = obj[ key ];
            }
        }

        public static init(data:any):void
        {
            if( null == data || null == data.userCarOrders )
            {
                return;
            }

            var i:number;
            var mm:UserCarOrder;
            UserCarOrder.itemList = [];
            for(i = 0; i < data.userCarOrders.length; i++)
            {
                mm = new UserCarOrder(data.userCarOrders[i]);
                UserCarOrder.itemList.push(mm);
            }
            OrderController.instance.updateOrderBuilding();

            if( UserCarOrder.SHOW_PANEL )
            {
                UIMgr.instance.show(PanelName.ORDER_PANEL, { 'direction': Direction.CENTER } );
            }
        }
        public static get userCarOrders():Array<UserCarOrder>
        {
            return UserCarOrder.itemList;
        }
        public static refreshCarOrder( data:any, refreshStatus:boolean = true ):void
        {
            if( null == data || ( null == data.userCarOrder && !( data instanceof UserCarOrder ) ) )
            {
                return;
            }

            var mm:UserCarOrder = ( data instanceof UserCarOrder ? data : new UserCarOrder( data.userCarOrder ) );
            for( var i = 0; i < UserCarOrder.itemList.length; i++ )
            {
                if( mm.orderId == UserCarOrder.itemList[i].orderId )
                {
                    UserCarOrder.itemList.splice( i, 1, mm );
                    for( var key in data )
                    {
                        UserCarOrder.itemList[i][ key ] = data[ key ];
                    }
                    break;
                }
            }

            var win:game.OrderPanel = UIMgr.instance.getPanel( PanelName.ORDER_PANEL );
            win.onUpdate( mm, refreshStatus );

        }
        public static abandonCarOrder( data:any ):void
        {
            if( null == data || ( null == data.userCarOrder && !( data instanceof UserCarOrder ) ) )
            {
                return;
            }

            var i:number;
            var mm:UserCarOrder = data instanceof UserCarOrder ? data : new UserCarOrder( data.userCarOrder );
            for( i = 0; i < UserCarOrder.itemList.length; i++ )
            {
                if( mm.orderId == UserCarOrder.itemList[i].orderId )
                {
                    UserCarOrder.itemList.splice( i, 1, mm );
                    break;
                }
            }

            OrderController.instance.updateOrderBuilding();

            var win:game.OrderPanel = UIMgr.instance.getPanel( PanelName.ORDER_PANEL );
            win.onUpdate( mm, true );
        }
        public static recieveCarOrderReward(data:any):void
        {
            if( null == data )
            {
                return;
            }
            OrderController.instance.moveRecieveRewardIcon( data.exp, data.gold );

        }

        public static getOrderById(id:number):UserCarOrder
        {
            var i:number;
            var one:UserCarOrder;
            for(i = 0; i < UserCarOrder.itemList.length; i++)
            {
                one = UserCarOrder.itemList[i];
                if( one.orderId == id )
                {
                    return one;
                }
            }
            return null;
        }
    }
}