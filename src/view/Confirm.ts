/**
* Created by Gordon on 23/April/15.
* @class Confirm
* @constructor
**/
class Confirm extends egret.gui.SkinnableComponent
{
    private static confirm:Confirm;

    private isChildrenCreated:boolean = false;
    private call:Function;
    private thisObject:any;
    private titleDisplay:egret.gui.Label;
    /**
     * 确认按钮
     */
    public confirmBtn: egret.gui.Button;
    public closeButton: egret.gui.Button;
    /**
     * 文字内容
     */
    public messageLabel: egret.gui.Label;

    private bg:egret.gui.UIAsset;

    public constructor()
    {
        super();
        this.skinName = skins.uicompenet.Commons.ConfirmPanelSkin;
    }

    public static get instance():Confirm
    {
        if( !Confirm.confirm )
        {
            PanelName.init();
            Confirm.confirm = new Confirm();
        }
        return Confirm.confirm;
    }

    private arguments:Array<any> = [];
    /**
     * 五个参数：
     * 1、父容器
     * 2、标题
     * 3、内容
     * 4、回调方法
     * 5、回调方法 thisObject
     * @param args
     */
    public show( title:string, content:string, call?:Function, thisObject?:any ):void
    {
        if( !this.isChildrenCreated )
        {
            Lyrs.LYRS_ANTI_ADDICTION.addChild( this );
            this.arguments = [ title, content, call, thisObject ];
            return;
        }

        this.visible = true;

        this.x = ( Lyrs.SW - this.width ) >> 1;
        this.y =( Lyrs.SH - this.height ) >> 1;

        this.titleDisplay.text = title;
        this.messageLabel.text = content;
        this.call = call;
        this.thisObject = thisObject;

        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toConfirmHandler, this);
        this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toCloseHandler, this);
    }
    private close():void
    {
        if( !this.isChildrenCreated )
        {
            return;
        }
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toConfirmHandler, this);
        this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toCloseHandler, this);
    }

    public hide():void
    {
        this.close();
        this.visible = false;
    }
    private toCloseHandler( e:egret.TouchEvent):void
    {
        this.close();
        TweenIt.tweenBigThenNormal( e.currentTarget, ()=>{
            this.visible = false;
        });
    }

    private toConfirmHandler( e:egret.TouchEvent ):void
    {
        SoundMgr.instance.playAudio(SoundName.BTN_OK);
        this.close();
        TweenIt.tweenBigThenNormal( e.currentTarget, ()=>{
            this.visible = false;
            this.call.apply( this.thisObject );
        });
    }
    public childrenCreated():void
    {
        this.isChildrenCreated = true;
        var shape:egret.Shape = new egret.Shape();
        var g:egret.Graphics = shape.graphics;
        g.beginFill( 0x000000, 0.3 );
        g.drawRect(0, 0, Lyrs.SW, Lyrs.SH);
        g.endFill();
        shape.width = Lyrs.SW;
        shape.height = Lyrs.SH;
        this.bg.source = shape;
        this.show.apply( this, this.arguments );
    }
}