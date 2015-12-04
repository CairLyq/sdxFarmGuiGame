/**
 * on 2015-01-30
 * by leo
 */

class DragPosCheck
{
    public static check(tryX:number, tryY:number):egret.Point
    {
        var re:egret.Point = new egret.Point();

        var posX:number;
        var posY:number;

        var boarderX:number = Lyrs.SW - ZoomLogic.BG_WIDTH;
        var boarderY:number = Lyrs.SH - ZoomLogic.BG_HEIGHT;

        if(tryX > 0)
        {
            posX = 0;
        }
        else if(tryX < boarderX)
        {
            posX = boarderX;
        }
        else
        {
            posX = tryX;
        }

        if(tryY > 0)
        {
            posY = 0;
        }
        else if(tryY < boarderY)
        {
            posY = boarderY;
        }
        else
        {
            posY = tryY;
        }

        re.x = posX;
        re.y = posY;

        return re;
    }
}