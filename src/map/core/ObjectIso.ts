/**
 * on 2014-12-09
 * by leo
 */

class ObjectIso extends egret.DisplayObjectContainer
{
    public p:Point3D;
    public pShort:Point3D;

    public constructor(pos:Point3D)
    {
        super();
        if(!pos)
        {
            pos = new Point3D(0, 0, 0)
        }
        this.p = new Point3D();
        this.p.x = pos.x * ZoomLogic.TILE_SIZE;// * Variable.scale;
        this.p.y = pos.y * ZoomLogic.TILE_SIZE;// * Variable.scale;//0
        this.p.z = pos.z * ZoomLogic.TILE_SIZE;// * Variable.scale;

        this.pShort = new Point3D();
        this.pShort.x = pos.x;
        this.pShort.y = pos.y;//0
        this.pShort.z = pos.z;

    }

    /*public get depth():number
    {
        return (this.p.x + this.p.z) * .866 - this.p.y * .707;

        //var TILE_SIZE:number = 50；
        //var re:number = (this.p.x * Constant.TILE_SIZE + this.p.z * Constant.TILE_SIZE - (this.width + this.height) * Constant.TILE_SIZE / 2) * .866 - this.p.z * .707;
        //return re;
        //var re:number = (mx + my) * .866 - 0 * .707;
        // _position 是object在等角地图的node节点下标。
        // TILE_SIZE是地图图块最小单位的尺寸，
        // _size是这个object在等角地图中的尺寸，
        // 0.866和0.707则是两个修正系数
    }*/

    public setPosByIso(pIso:Point3D = null, isUpdate:boolean = true):void
    {
        if(pIso)
        {
            this.pShort.x = pIso.x;
            this.pShort.y = pIso.y;//0
            this.pShort.z = pIso.z;
        }
        this.p.x = this.pShort.x * ZoomLogic.TILE_SIZE;
        this.p.y = this.pShort.y * ZoomLogic.TILE_SIZE;//0
        this.p.z = this.pShort.z * ZoomLogic.TILE_SIZE;

        if(isUpdate)
        {
            var pScreen:egret.Point = TransUtils.isoToScreen(this.pShort);

            this.x = pScreen.x;
            this.y = pScreen.y;
        }
    }

    public setPosByScreen(pScreen:egret.Point, isUpdate:boolean = true):void
    {
        this.x = pScreen.x;
        this.y = pScreen.y;

        if(isUpdate)
        {
            var pIso:Point3D = TransUtils.screenToIso(pScreen);

            this.pShort.x = pIso.x;
            this.pShort.y = pIso.y;//0
            this.pShort.z = pIso.z;

            this.p.x = this.pShort.x * ZoomLogic.TILE_SIZE;
            this.p.y = this.pShort.y * ZoomLogic.TILE_SIZE;//0
            this.p.z = this.pShort.z * ZoomLogic.TILE_SIZE;
        }
    }
}