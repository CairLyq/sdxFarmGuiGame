/**
 * on 2015-02-10
 * by leo
 */

class MovieClipUtils
{
    public constructor()
    {

    }

    public static getMC(json:string, png:string, mcName:string):egret.MovieClip
    {
        var resJson = RES.getRes(json);
        var resPng = RES.getRes(png);

        var mcFactory = new egret.MovieClipDataFactory(resJson, resPng);
        return new egret.MovieClip(mcFactory.generateMovieClipData(mcName));
    }
}