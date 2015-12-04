/**
 * Created by Gordon on 29/12/14.
 */
module order
{

    class UserStallOrder
    {
        /**
         *订单编号
         */
        orderId:number;
        /**
         *用户ID
         */
        userId:number;
        /**
         *	用户名
         */
        userName:number;
        /**
         * 	玩家头像
         */
        userImgUrl:string;
        /**
         * 	物品ID
         */
        itemId:number;
        /**
         *	物品数量
         */
        itemNum:number;
        /**
         *	出售价格
         */
        price:number;
        /**
         *	订单状态
         */
        status:number;
        /**
         *	购买用户Id
         */
        buyUserId:number;
        /**
         *	购买用户名字
         */
        buyUserName:string;
        /**
         *	购买玩家头像地址
         */
        buyUserImgUrl:string;
        /**
         *	下单时间
         */
        orderDate:number;
    }
}

