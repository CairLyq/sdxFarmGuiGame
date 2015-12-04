/**
 * on 2015-01-06
 * by leo
 */

class ItemChange
{
    public id:number;
    public change:number;
    public srcPos:egret.Point;
    public params: any;
    public constructor(id:number, change:number, srcPos?:egret.Point, params?: any)
    {
        this.id = id;
        this.change = change;
        this.srcPos = srcPos || null;

        /**
         * params  额外参数
         * @type {any}
         *
         * isBlash: boolen   是否提示爆仓(true:提示；false:不提示。多用于不用提示爆仓，如：领取奖励，后台自加等...)
         */
        this.params = params;
    }
}