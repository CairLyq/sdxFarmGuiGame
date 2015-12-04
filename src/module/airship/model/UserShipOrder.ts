/**
 * Created by Gordon on 21/April/15.
 * @class UserShipOrder
 * @constructor
 **/
module model
{
    export class UserShipOrder
    {
        /**
         * 	int	订单编号
         */
        orderId:number;
        /**
         * 	int	物品ID
         */
        itemId:number;
        /**
         * 	int	物品数量
         */
        itemNum:number;
        /**
         * 	int	经验
         */
        exp:number;
        /**
         * 	int	金币
         */
        gold:number;
        /**
         * 	int	装箱状态：1 已经装箱；0 未装箱
         */
        status:number;
        public constructor( obj:Object )
        {
            for( var key in obj )
            {
                this[ key ] = obj[ key ];
            }
        }
    }
}