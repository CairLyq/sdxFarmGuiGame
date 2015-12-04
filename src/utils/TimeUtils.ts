/**
 * on 2015-01-05
 * by leo
 */

class TimeUtils
{
    //天时分秒
    public static getFormatTime(second:number, separator?:string):string
    {
        var df:string = separator || '天';
        var hf:string = separator || '时';
        var mf:string = separator || '分';
        var sf:string = separator || '秒';
        var s:number = Math.floor(second % 3600 % 60);
        var m:number = Math.floor(second % 3600 / 60);
        var h:number = Math.floor(second / 3600);
        var d:number = Math.floor(h / 24);

        if(d > 0)
        {
            if(h > 24){
                d += Math.floor(h / 24);
                h = h % 24;
            }
            return d + df + h + hf;
        }
        if(h > 0)
        {
            return h + hf + m + mf;
        }
        if(m > 0)
        {
            return m + mf + s + sf;
        }

        return s + sf;
    }
}