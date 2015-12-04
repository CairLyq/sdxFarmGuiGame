/**
 * Created by Gordon on 03/February/15.
 * @class UserItem
 * @constructor
 **/
module model
{
    export class UserItem
    {
        /**
         * 	int	物品配置ID
         */
        itemId:number;
        /**
         * 	int	增加的物品数量
         */
        itemNum:number;

        public constructor( data:Object )
        {
            for( var key in data)
            {
                this[ key ] = data[ key ];
            }
        }
    }
}