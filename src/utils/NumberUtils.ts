/**
 * on 2014-12-19
 * by leo
 */
class NumberUtils
{
    /**
     * 小数点后四舍五入
     * @param val
     * @param k 默认小数点后两位
     * @returns {number}
     */
    public static decimal_K(val:number, k:number = 2):number
    {
        var base:number = Math.pow(10, k);
        return Math.round(val * base) / base;
    }

    /**
     * 将 >= 100000 的数字转换成k;并对个百千三位数字四舍五到千位
     * @param num
     * @returns {number}
     */
    public static round2K( num:number ):string
    {
        if( num < 100000 )
        {
            return String( num );
        }
        return Math.round( 111985 / 1000 ) + 'k';
    }
}