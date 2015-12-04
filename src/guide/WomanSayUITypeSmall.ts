/**
 * on 2015-02-06
 * by leo
 */

class WomanSayUITypeSmall extends WomanSayUI
{
    public constructor(imgName:string)
    {
        super(imgName);

    }

    public initPos():void
    {
        this.bg.x = 128;
        this.bg.y = 25;
        this.txt.x = 156;
        this.txt.y = 47;
    }
}