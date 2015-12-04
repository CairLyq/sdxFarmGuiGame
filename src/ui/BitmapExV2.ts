/**
 * on 2015-03-17
 * by leo
 */

class BitmapExV2 extends egret.Bitmap
{
    /**
     *
     * @param resKey
     * @param anchorX
     * @param anchorY
     * @param touchEnabled
     */
    constructor(resKey:any, anchorX:number, anchorY:number, touchEnabled:boolean = true)
    {
        super();

        this.setTexture(resKey);

        this.anchorX = anchorX;
        this.anchorY = anchorY;
        this.touchEnabled = touchEnabled;

    }

    public setTexture(resourceKey:any):void
    {
        if(typeof resourceKey == 'string')
        {
            this.texture = RES.getRes(resourceKey);
        }
        else
        {
            this.texture = resourceKey;
        }
    }
}