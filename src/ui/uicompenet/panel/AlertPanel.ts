/**
 * Created by rodey on 14/11/20.
 */

class AlertPanel extends egret.Sprite{

    private container: egret.Sprite;
    private okBtn: game.CloseButton;
    private cancelBtn: game.CloseButton;
    private item: any;
    private ease: any;

    constructor(item: any, ease?: any){
        super();
        this.item = item;
        this.ease = ease || egret.Ease.elasticOut;

        this.width = egret.MainContext.instance.stage.stageWidth * .9;
        this.height = 200;
        this.alpha = 0;
        this.scaleX = this.scaleY = 0.1;
        //弹窗背景
        var shape: egret.Shape = new egret.Shape();
        shape.graphics.beginFill(0xe09115);
        shape.graphics.lineStyle(5, 0x96610e, 1);
        shape.graphics.drawRoundRect(0, 0, this.width, 200, 30, 30);
        this.addChild(shape);
        //存放文字内容的容器
        this.container = new egret.Sprite();
        this.container.width = this.width;
        this.container.height = 150;
        this.addChild(this.container);

        this.x = (egret.MainContext.instance.stage.stageWidth) * .5;
        this.y = (egret.MainContext.instance.stage.stageHeight) * .5;
        this.anchorX = this.anchorY = .5;

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }

    private addToStage(): void{

        var w: number = egret.MainContext.instance.stage.stageWidth * .9;
        var h: number = 200;

        //创建文字内容
        if(typeof this.item === 'string'){
            this.appendText(this.item);
        }

        //初始化创建按钮
        this.appendBtns();

        egret.Tween.get(this).wait(50).to({ alpha: 1, scaleX: 1, scaleY: 1}, 500, this.ease);

    }

    public appendBtns(){
        //创建按钮
        this.cancelBtn = new game.CloseButton();
        this.cancelBtn.x = this.width - 28;
        this.cancelBtn.y = -19.5;
        this.addChild(this.cancelBtn);

        //按钮侦听事件
        //this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toTapOk, this);
        this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toTapCancel, this);
    }

    /**
     * 为弹窗添加文字内容
     * @param item
     */
    public appendText(item?: any): void{
        var txt: egret.TextField = new egret.TextField();
        txt.textAlign = 'left';
        txt.textColor = 0x613408;
        txt.size = 30;
        txt.text = item || this.item;
        txt.width = this.width * .9;
        txt.height = this.height * .7;
        txt.x = (this.width * .2) * .5;
        txt.y = (this.height * .3) * .5;
        this.container.addChild(txt);

    }

    /**
     * 创建按钮函数
     * @param text
     * @returns {egret.Shape}
     */
    private createBotton(text: string, x: number, y: number): egret.Sprite{
        var sprite: egret.Sprite = new egret.Sprite();
        var shape: IconUIObject = new IconUIObject(text);
        shape.width = shape.height = 60;
        sprite.addChild(shape);
        sprite.anchorX = sprite.anchorY = .5;
        sprite.x = x;
        sprite.y = y;
        sprite.touchEnabled = true;
        return sprite;
    }

    /**
     * 确认按钮回调, 回调侦听 Panel.ALERT_OK
     * @param evt
     */
    private toTapOk(evt: egret.TouchEvent): void{
        egret.Tween.get(this).to({ alpha: 0, scaleX: 0, scaleY: 0}, 100).call(function(){
            this.parent.removeChild(this);
            this.dispatchEvent(new egret.Event('AlertOk'));
        });
    }

    /**
     * 取消按钮回调, 回调侦听 Panel.ALERT_CANCEL
     * @param evt
     */
    private toTapCancel(evt: egret.TouchEvent): void{
        egret.Tween.get(this).to({ alpha: 0, scaleX: 0, scaleY: 0}, 100).call(function(){
            this.parent.removeChild(this);
            this.dispatchEvent(new egret.Event('AlertCancel'));
        });
    }

}
