/**
 * on 2015-03-06
 * by rodey
 *
 * Bitmap扩展
 */
class BitmapEx extends egret.Bitmap
{
    /**
     *
     * @param resKey
     * @param isCenter 是否中心为注册点
     * @param touchEnabled
     */
    constructor(resourceKey:any, isCenter:boolean = false, touchEnabled:boolean = true)
    {
        super();

        this.setTexture(resourceKey);

        this.touchEnabled = touchEnabled;
        if(isCenter)
        {
            this.anchorX = this.anchorY = 0.5;
        }
    }

    public setTexture(resourceKey:any):void
    {
        if(typeof resourceKey == 'string')
        {
            Loader.setImageAsync( resourceKey, this );
        }
        else
        {
            this.texture = resourceKey;
        }
    }
}
