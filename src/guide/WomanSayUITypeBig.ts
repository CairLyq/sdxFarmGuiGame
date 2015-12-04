/**
 * on 2015-02-06
 * by leo
 */

class WomanSayUITypeBig extends WomanSayUI
{
    public constructor(imgName:string)
    {
        super(imgName);

    }

    public initPos():void
    {
        this.bg.x = 160;
        this.bg.y = 20;
        this.txt.x = 190;
        this.txt.y = 42;
    }
}