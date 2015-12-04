/**
 * Created by Gordon on 10/March/15.
 * @class CfgTrophy
 * @constructor
 **/
module model
{
    export class CfgTrophy
    {
        private static list:Array<CfgTrophy> = [];
        /**
         * int	配置id
         */
        id:number;
        /**
         * 成就名称
         */
        name:string;
        /**
         * 成就描述
         */
        desc:string;
        /**
         * 完成目标
         */
        target:number;

        /**
         * 参数
         */
        param:number;

        /**
         * 类型
         */
        type:number;

        /**
         * 目标1数量
         */
        needNum1:number;
        /**
         * 目标1经验
         */
        exp1:number;
        /**
         * 目标1钻石
         */
        diamond1:number;

        /**
         * 目标2数量
         */
        needNum2:number;
        /**
         * 目标2经验
         */
        exp2:number;
        /**
         * 目标2钻石
         */
        diamond2:number;

        /**
         * 目标3数量
         */
        needNum3:number;
        /**
         * 目标3经验
         */
        exp3:number;
        /**
         * 目标3钻石
         */
        diamond3:number;


        /**
         * 目标4数量
         */
        needNum4:number;
        /**
         * 目标4经验
         */
        exp4:number;
        /**
         * 目标4钻石
         */
        diamond4:number;

        /**
         * 目标5数量
         */
        needNum5:number;
        /**
         * 目标5经验
         */
        exp5:number;
        /**
         * 目标5钻石
         */
        diamond5:number;

        public constructor( obj:any )
        {
            for( var key in obj )
            {
                this[ key ] = obj[ key ];
            }
        }

        /**
         * 根据目标等级 1、2、3、4、5获取经验
         */
        public getExpByLevel( level:number ):number
        {
            if( 0 == level )
            {
                return this.exp1;
            }
            if( 1 == level )
            {
                return this.exp2;
            }
            if( 2 == level )
            {
                return this.exp3;
            }
            if( 3 == level )
            {
                return this.exp4;
            }
            if( 4 == level || 5 == level )
            {
                return this.exp5;
            }
        }
        /**
         * 根据目标等级 1、2、3、4、5获取钻石
         */
        public getDiamondByLevel( level:number ):number
        {
            if( 0 == level )
            {
                return this.diamond1;
            }
            if( 1 == level )
            {
                return this.diamond2;
            }
            if( 2 == level )
            {
                return this.diamond3;
            }
            if( 3 == level )
            {
                return this.diamond4;
            }
            if( 4 == level || 5 == level )
            {
                return this.diamond5;
            }
        }
        /**
         * 根据目标等级 1、2、3获取需要完成数量
         */
        public getNumByLevel( level:number ):number
        {
            if( 0 == level )
            {
                return this.needNum1;
            }
            if( 1 == level )
            {
                return this.needNum2;
            }
            if( 2 == level )
            {
                return this.needNum3;
            }
            if( 3 == level)
            {
                return this.needNum4;
            }
            if( 4 == level || 5 == level )
            {
                return this.needNum5;
            }
        }

        public static init( data:Object[] ):void
        {
            var length:number = data.length;
            for( var i:number = 0; i < length; i++ )
            {
                var trophy:CfgTrophy = new CfgTrophy( data[i] );
                CfgTrophy.list.push( trophy );
            }
        }

        public static getTrophyById( id:number ):CfgTrophy
        {
            var length:number = CfgTrophy.list.length;
            for( var i:number = 0; i < length; i++ )
            {
                var trophy:CfgTrophy = CfgTrophy.list[i];
                if( trophy.id == id )
                {
                    return trophy;
                }
            }
            return null;
        }
    }
}