/**
 * on 2015-02-02
 * by leo
 */

class GuideUI extends egret.DisplayObjectContainer
{
    public touchPass:egret.Shape;

    public forbiden:egret.Shape;

    private circle:egret.Bitmap;
    private circleDes:egret.Bitmap;

    private finger:egret.MovieClip;
    private posArr:egret.Point[];
    private idx:number;
    private timeArr:number[];

    private womanSayUITypeBig:WomanSayUITypeBig;
    private womanSayUITypeSmall:WomanSayUITypeSmall;

    //伴随着womanSayUIType1的黑底
    private black:egret.Shape;

    public constructor()
    {
        super();
    }

    public init():void
    {
        this.circle = new egret.Bitmap(RES.getRes("GQ_03"));
        this.circle.anchorX = this.circle.anchorY = .5;

        this.circleDes = new egret.Bitmap(RES.getRes("GQ_03"));
        this.circleDes.anchorX = this.circleDes.anchorY = .5;

        this.finger = MovieClipMgr.createMC("finger_json", "finger_png", "finger");
        this.posArr = [];
        this.timeArr = [];
        this.idx = 0;

        this.womanSayUITypeBig = new WomanSayUITypeBig("GUIDE_npc");
        this.womanSayUITypeSmall = new WomanSayUITypeSmall("TX_07");

        this.touchPass = new egret.Shape;
        this.touchPass.touchEnabled = true;
        this.touchPass.width = Lyrs.SW;
        this.touchPass.height = Lyrs.SH;
        this.draw(this.touchPass);

        this.forbiden = new egret.Shape;
        this.forbiden.touchEnabled = true;
        this.forbiden.width = Lyrs.SW;
        this.forbiden.height = Lyrs.SH;
        this.draw(this.forbiden);

        this.black = new egret.Shape();
        this.forbiden.width = Lyrs.SW;
        this.forbiden.height = Lyrs.SH;
        this.black.graphics.clear();
        this.black.graphics.beginFill(0, .5);
        this.black.graphics.drawRect(0, 0, Lyrs.SW, Lyrs.SH);
        this.black.graphics.endFill();
    }


    public addTouchPass():void
    {
        this.addChild(this.touchPass);
    }

    public addForbiden():void
    {
        this.addChild(this.forbiden);
    }

    public addBlocks(tar:egret.DisplayObject, anchorX?:number, anchorY?:number):void
    {
        var rt:egret.Rectangle = new egret.Rectangle;
        try
        {
            tar.getBounds(rt);
        }catch(e)
        {
        }
        if(!tar && !tar.parent){ return; }
        var pos:egret.Point = tar.parent.localToGlobal(tar.x, tar.y);
        rt.x = pos.x - ( anchorX?rt.width * anchorX:0 );
        rt.y = pos.y - ( anchorY?rt.height * anchorY:0 );

        //if(tar instanceof BuildingIso)
        //{
        //    rt.x = rt.x - ZoomLogic.TILE_W * .5;
        //    rt.y = rt.y - tar.height + ZoomLogic.TILE_H * .5;
        //}

        if(rt.x > 0)
        {
            var bg:egret.Shape = new egret.Shape;
            bg.touchEnabled = true;
            bg.width = rt.x;
            bg.height = Lyrs.SH;
            this.addChild(bg);
            bg.x = bg.y = 0;
            //bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.draw(bg);
        }

        if(rt.y > 0)
        {
            bg = new egret.Shape;
            bg.touchEnabled = true;
            bg.width = rt.width;
            bg.height = rt.y;
            this.addChild(bg);
            bg.x = rt.x;
            bg.y = 0;
            //bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.draw(bg);
        }

        if(Lyrs.SH - rt.y - rt.height > 0)
        {
            bg = new egret.Shape;
            bg.touchEnabled = true;
            bg.width = rt.width;
            bg.height = Lyrs.SH - rt.y - rt.height;
            this.addChild(bg);
            bg.x = rt.x;
            bg.y = rt.y + rt.height;
            //bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.draw(bg);
        }

        if(Lyrs.SW - rt.x - rt.width > 0)
        {
            bg = new egret.Shape;
            bg.touchEnabled = true;
            bg.width = Lyrs.SW - rt.x - rt.width;
            bg.height = Lyrs.SH;
            this.addChild(bg);
            bg.x = rt.x + rt.width;
            bg.y = 0;
            //bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.draw(bg);
        }
    }

    public addCircle(pos:egret.Point, posTwo?:egret.Point):void
    {
        this.addChild(this.circle);
        this.circle.x = pos.x;
        this.circle.y = pos.y;

        TweenIt.loopTween(this.circle, {"scaleX":.8, "scaleY":.8, "alpha":1}, {
            "scaleX":1,
            "scaleY":1,
            "alpha":.3
        }, 1000);

        if(posTwo)
        {
            this.addChild(this.circleDes);
            this.circleDes.x = posTwo.x;
            this.circleDes.y = posTwo.y;

            TweenIt.loopTween(this.circleDes, {"scaleX":.8, "scaleY":.8, "alpha":1}, {
                "scaleX":1,
                "scaleY":1,
                "alpha":.3
            }, 1000);
        }

    }

    public addWomanSayUI(type:number, pos:egret.Point, womanSayUIText:string):void
    {
        var ui:WomanSayUI;

        if(1 == type)
        {
            ui = this.womanSayUITypeBig;
            this.addChild(this.black);
        }
        else if(2 == type)
        {
            ui = this.womanSayUITypeSmall;
        }
        this.addChild(ui);
        ui.setText(womanSayUIText);
        ui.x = pos.x;
        ui.y = pos.y;
    }

    public addClickFinger(pos:egret.Point):void
    {
        this.finger.play(-1);
        this.finger.x = pos.x;
        this.finger.y = pos.y;
        this.addChild(this.finger);
    }


    public addDragFinger(posArr:egret.Point[], timeArr:string[]):void
    {
        this.posArr = posArr;

        this.timeArr = StringUtils.toNumber(timeArr);
        var i:number;
        for(i = 0; i < this.timeArr.length; i++)
        {
            this.timeArr[i] = this.timeArr[i] * 1000;
        }

        this.initFinger();
    }

    public toPoint():void
    {
        this.idx++;
        if(this.idx < this.posArr.length)
        {
            var pos:egret.Point = this.posArr[this.idx];
            var tw:egret.Tween = egret.Tween.get(this.finger);
            tw.to({"x":pos.x, "y":pos.y}, this.timeArr[this.idx]).call(()=>
            {
                this.toPoint();
            });
        }
        else
        {
            this.reAddFingerAnimation();
        }
    }

    public reAddFingerAnimation():void
    {
        this.removeChild(this.finger);

        this.initFinger();
    }

    public initFinger():void
    {
        this.idx = 0;

        var pos:egret.Point = this.posArr[this.idx];
        this.finger.x = pos.x;
        this.finger.y = pos.y;
        this.addChild(this.finger);

        this.finger.gotoAndPlay(1, 1);
        var tw:egret.Tween = egret.Tween.get(this.finger);
        tw.wait(this.timeArr[this.idx]).call(()=>
        {
            this.toPoint();
        });
    }

    public clear():void
    {
        this.removeChildren();

        //finger
        egret.Tween.removeTweens(this.finger);
        this.posArr.length = 0;
        this.timeArr.length = 0;
        this.idx = 0;

        //circle
        egret.Tween.removeTweens(this.circle);
        //circleDes
        egret.Tween.removeTweens(this.circleDes);
    }

    private draw(bg:egret.Shape):void
    {
         /*var g:egret.Graphics = bg.graphics;
         g.clear();
         g.beginFill(0x337777, .8);
         g.drawRect(0, 0, bg.width, bg.height);
         g.endFill();*/
    }

    //private onTap(e:egret.TouchEvent):void
    //{
    //    console.log("==========================asdf");
    //}
}