/**
 * Created by Gordon on 06/March/15.
 * @class UserBuilding
 * @constructor
 **/
module model
{
    export class UserBuilding
    {
        /**
         * 用户建筑ID
         */
        userBuildingId:number;
        /**
         * 建筑配置ID
         */
        buildingId:number;
        /**
         * 	int	1 维修 2 静止 3 工作或生长 4 完成状态 5 求助 10 废弃或枯萎
         */
        status:number;
        /**
         * 	Date 更新时间
         */
        updateDate:number;
        /**
         * 	Date 刷新时间
         */
        refreshDate:number;
        /**
         * 	位置
         */
        position:string;
        /**
         * 	int	建筑等级(果树等级)
         */
        level:number;
        /**
         * 	int	生产上限
         */
        upperLimit:number;

        product:UserProduct;
        products:any[];
        livestocks:Array<Object>;

        public constructor( obj:Object )
        {
            for( var key in obj )
            {
                this[ key ] = obj[ key ];
            }
        }
    }
}