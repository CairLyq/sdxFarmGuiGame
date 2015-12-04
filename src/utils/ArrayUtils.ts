/**
 * on 2014-12-10
 * by leo
 */

class ArrayUtils
{
    /**
     * 从数组中随机获取一个
     * @param arr
     */
    public static getRandom( arr:any[] ):any
    {
        if( null == arr || 0 == arr.length )
        {
            return;
        }
        var idx:number = Math.floor( Math.random() * arr.length );
        return arr[ idx ];
    }

    /**
     * 从数组中随机获取一个
     * @param arr
     * @param triggerType
     * @param param
     * @returns {*}
     */
    public static getRandomDialog( arr:model.NpcDialog[], triggerType:number = 0, param:number = 0 ):model.NpcDialog
    {
        if( 0 != triggerType )
        {//triggerType不等于0，从满足triggerType条件的元素中抽取
            arr = ArrayUtils.getArrayByKey( arr, "triggerType", triggerType );
        }
        if( 0 != param )
        {//param不等于0，从满足triggerType条件的元素中抽取
            arr = ArrayUtils.getArrayByKey( arr, "param", param );
        }
        return ArrayUtils.getRandom( arr );
    }
    public static getArrayByKey( arr:any[], key:string, value:any ):any[]
    {
        var list:any[]  = [];
        for( var index:number = 0; index < arr.length; index++ )
        {
            if( value == arr[ index ][key] )
            {
                list.push( arr[ index ] );
            }
        }
        return list;
    }

    public static Range(start: number, end: number, flag: boolean = false): number[]{
        var data: number[] = [];

        var space: number = end - start;

        //var len: number = (flag) ? space + 1 : space;
        var len: number = (flag) ? end + 1 : end;

        for(var i: number = start; i < len; ++i){
            data.push(i);
        }

        return data;
    }
}