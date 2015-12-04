/**
 * on 2015-01-06
 * by leo
 */

class ResChange
{
    public goldChange:number;
    public diamondChange:number;
    public expChange:number;
    public srcPos: egret.Point;
    public parmas: any;

    public constructor(goldChange:number = 0, diamondChange:number = 0, expChange:number = 0, srcPos?: egret.Point, parmas?: any)
    {
        this.goldChange = goldChange;
        this.diamondChange = diamondChange;
        this.expChange = expChange;
        this.srcPos = srcPos || null;
        this.parmas = parmas;
    }
}