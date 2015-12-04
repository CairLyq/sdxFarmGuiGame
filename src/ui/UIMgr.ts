/**
 * Created by Gordon on 14/12/22.
 *
 * ui、视图管理类
 *
 * --> 增加一些弹窗或者容器出现的效果
 * 效果处理类，专门负责处理各类显示效果
 */
class UIMgr
{
    //static LAYOUT_UI_WIDTH: number = 640;
    static LAYOUT_UI_HEIGHT:number = 630;

    private static mgr:UIMgr;
    private panelArray:Array<game.IPanel> = new Array(PanelName.PANEL_NUM);

    private args:any[];
    private win:game.IPanel;
    private closeTweenProps:any;
    private param: any;

    private _isShow:boolean = false;

    public static get instance():UIMgr
    {
        if(!UIMgr.mgr)
        {
            PanelName.init();
            UIMgr.mgr = new UIMgr();
        }
        return UIMgr.mgr;
    }

    private _sprite:egret.Sprite;
    private TouchLayerName:string = "TouchLayer";

    private get touchLayer():egret.Sprite
    {
        if(null != this._sprite)
        {
            return this._sprite;
        }

        this._sprite = new egret.Sprite();
        this._sprite.name = this.TouchLayerName;
        this._sprite.touchEnabled = true;
        this._sprite.touchChildren = true;
        this.draw();
        return this._sprite;
    }
    private draw( alpha:number = 0.5, color:number = 0x000000, Y:number = 0 ):void
    {
        this.touchLayer.graphics.clear();
        this.touchLayer.graphics.beginFill( color, alpha );
        this.touchLayer.graphics.drawRect( 0, Y, Lyrs.SW, Lyrs.SH - Y );
        this.touchLayer.graphics.endFill();
    }

    public getPanel(panelName:number):any
    {
        var win:game.IPanel = this.panelArray[panelName];
        if(null == win)
        {
            win = new PanelName.PANEL_CLASS[panelName]();
            this.panelArray[panelName] = win;
        }
        return win;
    }

    /**
     * UI 视图效果处理接受函数
     * @param content   处理对象（容器、gui）
     * param:Object 例子：{ "direction":Direction.BOTTOM, "time":500, "ease":egret.Ease.sineIn, alpha:0.3, color:0xFF0000 }
     *      @param direction    窗口进入方向：默认为Direction.BOTTOM; left(左进)、 right(右进)、top(上进)、bottom(下进)、center(中间放大)
     *      @param time         时间,单位毫秒
     *      @param ease         缓动函数  egret.Ease中取值，默认为 egret.Ease.sineIn
     *      @param alpha        背景透明度，默认为 0
     *      @param color        背景颜色
     * ...args:any[] IPane 面板onShow传入的参数
     */
    public show(panelName:number, param?:Object, ...args:any[]):void
    {
        this.win = this.getPanel( panelName );
        this.args = args;
        this.param = param || {};
        this.doShow( this.win, param );
    }

    private goLeft(content:any, time:number, ease:any)
    {

    }

    private goRight(content:any, time:number, ease:any)
    {
    }

    private goTop(content:any, time:number, ease:any)
    {
        content.alpha = 0;
        content.x = 0;
        content.y = - (content.height + 200);

        this.closeTweenProps = { y: Lyrs.SH + 200, alpha: 0 };

        this.addTweenPanel(content, {y:0, alpha:1}, time, ease);
    }

    /** 下面跳出, 自上向下消失 */
    private goBottom(content:any, time?:number, ease?:any)
    {
        content.alpha = 0;
        content.x = 0;
        content.y = Lyrs.SH + 200;
        var ch:number = Lyrs.SH - UIMgr.LAYOUT_UI_HEIGHT;
        time = 500;
        ease = egret.Ease.cubicOut;

        this.closeTweenProps = { y: Lyrs.SH + 200, alpha: 0 };

        this.addTweenPanel(content, {y:ch, alpha:1}, time, ease);
    }

    /** 中间渐大效果 这里直接改变注册点为中心*/
    private goCenter(content:any, time?:number, ease?:any)
    {
        content.scaleX = content.scaleY = 0;
        content.anchorX = content.anchorY = .5;
        content.alpha = 0;
        content.x = Lyrs.SW >> 1;
        content.y = Lyrs.SH >> 1;
        //console.log('面板位置：', content.x, content.y)
        //console.log('面板尺寸：', content.width, content.height)

        this.closeTweenProps = { scaleX:0, scaleY:0, alpha:0 };

        this.addTweenPanel(content, {scaleX:1, scaleY:1, alpha:1}, time, ease);
    }

    private goNone( content:any )
    {
        var sprite:egret.Sprite = this.touchLayer;
        sprite.addChild(content);
        Lyrs.LYRS_UI.addChild(sprite);

        this.closeTweenProps = { y: Lyrs.SH + 200 };

        this.win.onShow.apply( this.win, this.args);
    }

    /**
     * 添加一个遮罩层
     * @param content
     */
    private addTweenPanel(content:any, props:any, time?:number, ease?:any):void
    {
        var sprite:egret.Sprite = this.touchLayer;
        sprite.addChild(content);
        Lyrs.LYRS_UI.addChild(sprite);

        //播放打开面板的音效
        SoundMgr.instance.playAudio(SoundName.WINDOW_OPEN);

        this.win.onShow.apply( this.win, this.args);

        egret.Tween.get(content).to(props, time, ease).call(this.addPanelClose, this);
    }
    /**
     *当使用 NONE 方式弹窗，要调用此添加关闭面板事件
     */
    public addPanelClose():void
    {
        console.log("++++添加面板关闭事件。");

        if(this.param['touchLayer'] === undefined){
            this.touchLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeWindHandler, this );
        }

        var win:any = this.win;
        var point:egret.Point = win.localToGlobal( 0, 0 );
        RenderUtils.setRenderRt( new egret.Rectangle( point.x, point.y, point.x + win.width, point.y + win.height ) );
    }

    /**
     * 移除弹窗
     * @param evt
     */
    private closeWindHandler(e?:egret.TouchEvent):void
    {
        if( null == e.target )
        {
            return;
        }
        var target:any = e.target;
        if( target.name != this.TouchLayerName )
        {
            console.log( target.name );
            return;
        }

        //GameEvent.BubbEvent(e);
        this.closeCurrentPanel();
    }

    /**
     * 关闭当前窗口
     * @param callback
     *          关闭后回调方法
     * @param closeType
     *          关闭方式
     */
    public closeCurrentPanel( callback?:any, closeType:number = 0, param?: any ):void
    {
        var self = this;
        var target:any = Lyrs.LYRS_UI.getChildByName( this.TouchLayerName );
        if( null == target )
        {
            return;
        }
        var child:any = target.getChildAt( 0 );
        if( null == child )
        {
            return;
        }
        if( null == target.parent )
        {
            return;
        }

        /*if(this.param['touchLayer'] !== undefined && this.param['touchLayer'] == false){
            return;
        }*/

        target.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeWindHandler, this);
        console.log("----删除面板关闭事件。");

        if( 1 == closeType )
        {
            this.removePanel(param);
            if( typeof callback == "function" )
            {
                callback.call(this);
            }
            return;
        }

        if( 2 == closeType )
        {
            this.closeTweenProps = { alpha: 0 };
        }

        //清理全局数据
        this.param['touchLayer'] = undefined;
        egret.Tween.get(child).to( this.closeTweenProps, 100, egret.Ease.sineOut).call(
            ()=>{
                //播放音效
                SoundMgr.instance.playAudio(SoundName.WINDOW_CLOSE);

                this.removePanel(param);
                if( null == callback )
                {
                    return;
                }
                if( typeof callback == "function" )
                {
                    callback.call(this);
                }
            }
        );
    }

    private removePanel(param: any):void
    {

        RenderUtils.renderWhole();

        var callCloseFunc: boolean = (param && param['callCloseFunc'] !== undefined) ? param['callCloseFunc'] : true;

        var sprite:egret.Sprite = this.touchLayer;
        try
        {
            Lyrs.LYRS_UI.removeChild( sprite );
            var child:any = sprite.getChildAt(0);
            if( child && sprite.getChildIndex( child ) !== -1 )
            {
                callCloseFunc && child.onClose();
                sprite.removeChild(child);
            }

        }catch (e){}

        this._isShow = false;
    }

    public get isShow():boolean
    {
        return this._isShow;
    }

    /**
     * UI 视图效果处理接受函数
     * @param content   处理对象（容器、gui）
     * @param type      默认为=Direction.BOTTOM; left(左进)、 right(右进)、top(上进)、bottom(下进)、center(中间放大)
     * @param time      时间,默认为=200毫秒
     * @param ease      缓动函数  egret.Ease中取值
     */
    private doShow(content:any, param:Object ):void
    {
        if( null == content )
        {
            return;
        }
        //判断界面当前是否已经弹出面板，如果有则先消除
        this.closeCurrentPanel( null, 1, param );
        var type:number = (param && param["direction"] !== undefined) && (param["direction"] || Direction.BOTTOM);
        var time:number = (param && param["time"] !== undefined) && (param["time"] || 200);
        var ease = (param && param["ease"] !== undefined) && (param["ease"] || egret.Ease.sineIn);

        if( param && (null != param["alpha"] || null != param["color"] || null != param["y"] ))
        {
            var alpha:number = ( null == param["alpha"] ) ? 0.5 : param["alpha"];
            var color:number = param["color"] || 0x000000;
            var Y:number = param["y"] || 0;
            this.draw( alpha, color, Y );
        }

        switch(type)
        {
            case Direction.LEFT:
                this.goLeft(content, time, ease);
                break;
            case Direction.RIGHT:
                this.goRight(content, time, ease);
                break;
            case Direction.TOP:
                this.goTop(content, time, ease);
                break;
            case Direction.BOTTOM:
                this.goBottom(content, time, ease);
                break;
            case Direction.CENTER:
                this.goCenter(content, time, ease);
                break;
            case Direction.NONE:
                this.goNone(content);
                break;
            default :
                this.goCenter(content, time, ease);
                break;
        }

        this._isShow = true;
    }
}