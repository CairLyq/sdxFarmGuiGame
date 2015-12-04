/**
 * on 2014-12-12
 * by leo
 */

class BitContainer extends egret.DisplayObjectContainer
{
    private bb:egret.Bitmap;
    private cc:egret.Bitmap;

    public constructor()
    {
        super();
        //
        this.bb = new egret.Bitmap(RES.getRes("101_xiaomai"));
        this.addChild(this.bb);
        //var tex:egret.RenderTexture = new egret.RenderTexture();
        //tex.drawToTexture(RES.getRes("101_xiaomai"));
        //this.cc = new egret.Bitmap(tex);
        //this.addChild(this.cc);


        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchB, this);
        this.touchEnabled = true;

    }

    private touchB(e:egret.TouchEvent):void
    {
        var p:egret.Point = new egret.Point(e.stageX, e.stageY);
        var newP:egret.Point = this.globalToLocal(p.x, p.y);
        console.log("^^^^^^^trans local: ", newP.x, newP.y);

        console.log("^^^^^^^local: ", e.localX, e.localY);
    }
}