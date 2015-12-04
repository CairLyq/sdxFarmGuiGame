/**
 * on 2015-02-06
 * by leo
 */

class WomanSayUI extends egret.DisplayObjectContainer
{
    private img:egret.Bitmap;
    public bg:egret.Bitmap;
    public txt:egret.TextField;


    public constructor(imgName:string)
    {
        super();

        var self = this;

        //this.img = new egret.Bitmap(RES.getRes(imgName));
        this.img = new egret.Bitmap();
        this.addChild(this.img);
        Loader.setImageAsync(imgName, this.img);

        this.bg = new egret.Bitmap(RES.getRes("DHK_234"));
        this.addChild(this.bg);

        this.txt = new egret.TextField();
        this.addChild(this.txt);
        this.txt.size = 20;
        this.txt.width = 268;
        this.txt.height = 120;
        this.txt.textColor = Color.TYPE_FONT;
        this.txt.lineSpacing = 10;
        this.txt.bold = true;

        this.initPos();
    }

    public initPos():void
    {

    }

    public setText(text:string):void
    {
        this.txt.text = text;
    }
}