/**
 * on 2015-03-05
 * by leo
 */

class StringUtils
{
    public static toPoint(str:string, sig:string):egret.Point
    {
        var pointStr:string[] = str.split(sig);
        var re:egret.Point = new egret.Point(Number(pointStr[0]), Number(pointStr[1]));

        return re;
    }

    public static toPointArr(str:string[], sig:string):egret.Point[]
    {
        var re:egret.Point[] = [];
        var i:number;
        var point:egret.Point;

        for(i = 0; i < str.length; i++)
        {
            point = StringUtils.toPoint(str[i], sig);
            re.push(point);
        }

        return re;
    }

    public static toNumber(str:string[]):number[]
    {
        var i:number;
        var re:number[] = [];
        for(i = 0; i < str.length; i++)
        {
            re.push(Number(str[i]));
        }

        return re;
    }
}