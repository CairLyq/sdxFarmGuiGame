/**
 * on 2014-12-17
 * by leo
 */

class PosUtils
{
    //提供给server的坐标集合
    public static getPosStr(item:BuildingIso):string
    {
        var i:number, j:number;
        var re:string = "";

        for(j = 0; j < item.model.col; j++)
        {
            for(i = 0; i < item.model.row; i++)
            {
                re += (item.pShort.x + j) + "*" + (item.pShort.z + i) + ",";
            }
        }
        return re.substr(0, re.length - 1);
    }

    //server坐标转换为client使用坐标
    public static getPos(str:string):egret.Point
    {
        var posArr:string[] = str.split(",");
        return StringUtils.toPoint(posArr[0], "*");
    }
}