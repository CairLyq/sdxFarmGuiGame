/**
 * on 2015-04-13
 * by leo
 */

class RubbishModel extends ItemIsoModel
{
    public rubbishId:number;
    public rubbishName:string;
    public img:string;
    public offsetX:number;
    public offsetY:number;
    public exp:number;
    public toolImg:string;
    public toolId:number;

    public constructor(data:any)
    {
        super(data);

        this.rubbishId = data.rubbishId;
        this.rubbishName = data.rubbishName;
        this.img = data.img;
        this.offsetX = data.offsetX;
        this.offsetY = data.offsetY;
        this.exp = data.exp;
        this.toolImg = data.tool;
        this.toolId = data.toolId;
    }

    //===================================================
    public static getModelById(rubbishId:number):RubbishModel
    {
        var i:number;
        var len:number = RubbishModel.itemList.length;
        var one:RubbishModel;
        for(i = 0; i < len; i++)
        {
            one = RubbishModel.itemList[i];
            if(one.rubbishId == rubbishId)
            {
                return one;
            }
        }
        return null;
    }

    public static itemList:any[] = [];


    public static init(data:any):void
    {
        var i:number = 0;
        var len:number = data.length;
        var m:RubbishModel;
        for(; i < len; ++i)
        {
            m = new RubbishModel(data[i]);
            RubbishModel.itemList.push(m);
        }
    }
}