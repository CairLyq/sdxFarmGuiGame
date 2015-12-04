/**
 * Created by rodey on 15/2/12.
 */

class ItemChangeRemove
{
    public data:any[];
    public change:number;
    public srcPos:egret.Point;
    public params: any;
    public constructor(data:any[], change?:number, srcPos?:egret.Point, params?: any)
    {
        this.data = data;
        this.change = change || this.getTotalNumber();
        this.srcPos = srcPos || null;
        this.params = params;

    }

    public getTotalNumber(): number{
        var total: number = 0;
        for(var i: number = 0, len: number = this.data.length; i < len; ++i){
            total += this.data[i]['itemNum'];
        }
        return total;
    }
}
