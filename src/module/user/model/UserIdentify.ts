/**
 * Created by Gordon on 21/March/15.
 * @class UserIdentify
 * @constructor
 **/
module model
{
    export class UserIdentify
    {
        /**
         * 认证年龄
         */
        age:number;
        cardName:number;
        /**
         * 认证身份证号
         */
        cardNo:number;
        /**
         *认证状态:
         *  0 未提交； 1 提交但公安局未校验； 2 提交但未满18岁；
         *  3 提交并校验通过； 4 提交并校验通过但未满18岁； 5 提交校验未通过但不纳入防沉迷
         */
        status:number;
        public constructor( obj:Object )
        {
            for( var key in obj )
            {
                this[ key ] = obj[ key ];
            }
        }
        public reset( obj:Object ):void
        {
            for( var key in obj )
            {
                this[ key ] = obj[ key ];
            }
        }
    }
}