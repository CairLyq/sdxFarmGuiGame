/**
 * Created by Gordon on 20/January/15.
 */
class Language
{
    private static stringCache:string[][];
    public static initLanguage():void
    {
        if( null == Language.stringCache )
        {
            Language.stringCache = RES.getRes( 'CfgLanguage_' + Global.LANGUAGE );
        }
    }
    private static getStr( idx0:number, idx1:number ):string
    {
        return Language.stringCache[ idx0 ][ idx1 ];
    }

    /**
     * @param idx0
     * @param idx1
     *      通过 idx0, idx1 获取字符串；然后将获取的字符串的{}依次替换成 args
     * @param args
     * @returns {string}
     *      返回 替换{}后的字符串
     */
    public static getString( idx0:number, idx1:number, ...args:any[] ):string
    {
        var str:string = Language.getStr( idx0, idx1 );
        if( null == args || 0 == args.length )
        {
            return str;
        }
        return Language.format( str, args );
    }

    /**
     * @param
     *      字符串str的{}依次替换成 args
     * @param args
     * @returns {string}
     *      返回 替换{}后的字符串
     */
    public static format( str:string, args:any[] ):string
    {
        var length:number = args.length;
        if( length == 0 )
            return str;

        var s: string = str;
        for( var i: number = 0; i < length; ++i )
        {
            s = s.replace( /\{\}/i, args[i] );
        }
        return s;
    }
}