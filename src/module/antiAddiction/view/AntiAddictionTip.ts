/**
 * Created by Gordon on 12/March/15.
 */
class AntiAddictionTip extends egret.gui.SkinnableComponent
{
    private isChildrenCreated:boolean = false;

    private static _instance:AntiAddictionTip;

    private minisecond:number;
    private bgColor:egret.gui.UIAsset;
    private maskScroll:egret.gui.UIAsset;

    private maskWidth:number = 185;
    private scrollText:ScrollText;


    constructor()
    {
        super();
        this.skinName = skins.uicompenet.antiAddiction.AntiAddictionTipSkin;
        Lyrs.LYRS_ANTI_ADDICTION.addChild( this );
    }
    static get instace():AntiAddictionTip
    {
        if( null == AntiAddictionTip._instance )
        {
            this._instance = new AntiAddictionTip();
        }
        return AntiAddictionTip._instance;
    }

    public childrenCreated():void
    {
        this.x = ( Lyrs.SW - this.width ) / 2 + 30;
        this.y = 70;

        var shape:egret.Shape = new egret.Shape();
        shape.graphics.beginFill( Color.BLACK, 0.5 );
        shape.graphics.drawRect( 0, 17, 358, 42 );
        shape.graphics.endFill();
        this.bgColor.source = shape;

        this.scrollText = new ScrollText( 321, 32 );
        this.maskScroll.source = this.scrollText;
        this.isChildrenCreated = true;
        this.show();
    }
    show():void
    {
        Lyrs.LYRS_ANTI_ADDICTION.addChild( this );
        if( !this.isChildrenCreated )
        {
            return;
        }
        this.scrollText.stop();
        this.scrollText.sroll();

        this.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this );
    }
    hide():void
    {
        this.scrollText.stop();
        if( null == this.parent )
        {
            return;
        }
        Lyrs.LYRS_ANTI_ADDICTION.removeChild( this );
        this.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this );
    }

    private onTouchTap( e:egret.TouchEvent ):void
    {
        AntiAddictionController.showPanel();
    }
}