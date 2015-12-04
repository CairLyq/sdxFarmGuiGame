/**
 * on 2014-12-26
 * by leo
 */

class ItemIso extends ObjectIso
{
    public model:any;

    public constructor(pos:Point3D, paramModel:any)
    {
        super(pos);

        this.model = paramModel;
    }
}