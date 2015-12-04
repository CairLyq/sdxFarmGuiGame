/**
 * Created by Gordon on 21/April/15.
 * @class UserElfShip
 * @constructor
 **/
module model
{
    export class UserElfShip
    {
        /**
         * 	int 等待解锁时间: 0 飞出去中，等待回来状态； 1 装箱状态；
         */
        waitStatus:number;
        /**
         * 	Date 下一次刷新时间
         */
        refreshDate:number;
        /**
         * 	list UserShipOrder
         */
        userShipOrders:Array<UserShipOrder>;
        /**
         * 	int	经验
         */
        exp:number;
        /**
         * 	int	金币
         */
        gold:number;
        /**
         * 	int	通知的物品 格式101*102*103
         */
        itemNotify:string;
        public constructor( obj:Object )
        {
            for( var key in obj )
            {
                this[ key ] = obj[ key ];
            }
        }
    }
}