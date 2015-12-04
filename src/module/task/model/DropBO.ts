/**
 * Created by Gordon on 03/February/15.
 * @class DropBO
 * 统一掉落对象 ; 所有的数据都表示是新增的数量
 * @constructor
 **/
module model
{
    export class DropBO
    {
        /**
         * 	int	钻石
         */
        diamond:number;
        /**
         * 	int	掉落金币
         */
        gold:number;
        /**
         * 	int	经验
         */
        exp:number;
        /**
         * 	List UserItem
         */
        //items:Array<UserItem>;
        items:any[];
        public constructor( data:Object )
        {
            for( var key in data )
            {
                this[ key ] = data[ key ];
            }

            var itemList:Array<UserItem> = [];
            var length:number = this.items.length;
            for( var i:number = 0; i < length; i++ )
            {
                var item:UserItem = new UserItem( this.items[ i ] );
                itemList.push( item );
            }
        }
    }
}