/**
 * on 2015-04-14
 * by leo
 */

class ImageCache
{
    private imgs:Object;

    public constructor()
    {
        this.imgs = null;
    }

    public setImg(key:string, v:any):void
    {
        this.imgs[key] = v;
    }

    public getImg(key:string):any
    {
        return this.imgs[key];
    }
}