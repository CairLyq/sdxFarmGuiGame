/**
 * on 2015-02-10
 * by leo
 */
class MovieClipUtil
{
    private static movieClipDataFactory:Object = {};
    public static getMCFactory( json:string, png:string ):egret.MovieClipDataFactory
    {
        var mcFactory:egret.MovieClipDataFactory = MovieClipUtil.movieClipDataFactory[ json ];
        if( null == mcFactory )
        {
            var resJson = RES.getRes(json);
            var resPng = RES.getRes(png);
            mcFactory = new egret.MovieClipDataFactory(resJson, resPng);
        }
        return mcFactory;
    }
    public static getMC(json:string, png:string, mcName:string):egret.MovieClip
    {
        var mcFactory:egret.MovieClipDataFactory = MovieClipUtil.getMCFactory( json, png );
        return new egret.MovieClip( mcFactory.generateMovieClipData( mcName ) );
    }
}