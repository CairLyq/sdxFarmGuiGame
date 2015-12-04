/**
 * on 2014-12-09
 * by leo
 */

class TileIso extends ObjectIso
{
    private txtPos:egret.TextField;
    private image:egret.Bitmap;
    //private p:Point3D;
    //private pShort:Point3D;

    public constructor(p:Point3D)
    {
        super(p);

        this.image = new egret.Bitmap();
        this.addChild(this.image);
        //this.image.scaleX = ZoomLogic.scale;
        //this.image.scaleY = ZoomLogic.scale;

        this.setPass();
        this.anchorX = this.anchorY = .5;
        //this.txtPos = new egret.TextField();
        ////console.log(this.txtPos.size);//30
        //this.txtPos.size = 20;
        //this.addChild(this.txtPos);
        //
        //
        //this.txtPos.text = this.pShort.x + "*" + this.pShort.z;
        //
        //this.txtPos.x = (Constant.TILE_W * Constant.scale - this.txtPos.width) * .5;
        //this.txtPos.y = (Constant.TILE_H * Constant.scale - this.txtPos.height) * .5;
    }

    public setPass():void
    {

        var state:number = CollisionCheck.getInstance().getState(this.pShort.x, this.pShort.z);
        //var state:number = 0;
        if(MapConst.BUILD_YES_WALK_YES == state)
        {
            this.image.texture = RES.getRes("tile");
        }
        else if(MapConst.BUILD_NO_WALK_NO == state)
        {
            this.image.texture = RES.getRes("tile_warn");
        }
    }
}
