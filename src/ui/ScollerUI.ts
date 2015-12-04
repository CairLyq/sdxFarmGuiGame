/**
 * Created by rodey on 14/11/21.
 *
 * 滚动 UI 类
 *
 * 滚动又三个要素组成：
 *
 * 1、被滚动的对象
 * 2、滚动视口（通常说的是可视化），这里用一个显示对象作为被滚动对象的遮罩层mask
 * 3、滚动事件（touchstart、touchmove、touchend）组合使用
 */


class ScollerUI extends egret.DisplayObjectContainer{

    //被滚动对象
    private content: egret.DisplayObjectContainer;
    //遮罩对象
    private maskRect: egret.Rectangle;
    //滚动视口宽度
    private scw: number = egret.MainContext.instance.stage.stageWidth;
    //滚动视口高度
    private  sch: number = egret.MainContext.instance.stage.stageHeight;
    //被滚动对象的宽度和高度
    private contentProp: any = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };
    //是否启用滚动
    private isScrolling: boolean = false;
    //上一次移动的位置
    private start: any = {
        x: 0,
        y: 0
    };
    //最后一次滚动的位置
    private last: any = {
        x: 0,
        y: 0
    };
    //滑动类型, 默认垂直滚动
    private scrollType: string = 'y';
    /**
     * 用于缓动的变量
     */
    private startTime: number = 0;
    private lastMoveTime = 0;
    private lastMoveStart = 0;
    private stopInertiaMove = false; // 是否停止缓动


    /**
     * 构造器
     * @param content  被滚动对象
     * @param width    视口宽度
     * @param height   视口高度
     */
    constructor(content: egret.DisplayObjectContainer, width?: number, height?: number, type?: string){
        super();

        this.scrollType = type;
        //属性初始化
        this.content = content;
        this.contentProp = {
            x: 0,
            y: 0,
            width: this.content.width,
            height: this.content.height
        };
        width && (this.scw = width);
        height && (this.sch = height);
        //本对象实例属性初始化
        this.width = this.scw;
        this.height = this.sch;
        //测试添加背景，实际中应在parent对象中已存在------
        /*var sp: egret.Sprite = new egret.Sprite();
        sp.graphics.beginFill(0xe09115);
        sp.graphics.lineStyle(5, 0x96610e, 1);
        sp.graphics.drawRect(0, 0, this.width, this.height);
        this.addChild(sp);*/

        //初始化遮罩层
        this.maskRect = new egret.Rectangle(0, 0, this.scw, this.sch);
        this.content.scrollRect = this.maskRect;
        //添加显示对象
        this.addChild(this.content);
        //初始化事件侦听
        this.initEvent();
    }

    /**
     * 初始化事件侦听
     */
    private initEvent(): void{
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touch_begin, this, false);
    }

    /**
     * 开始触摸侦听回调，回调侦听开始滚动事件 PanelEvent.SCROLL_START
     * @param evt
     */
    private touch_begin(evt: egret.TouchEvent): void{
        evt.preventDefault();
        this.isScrolling = true;
        this.start = this.last = {
            x: evt.stageX,
            y: evt.stageY
        };
        //回调侦听
        this.dispatchEventWith(PanelEvent.SCROLL_START, false, evt);
        //侦听移动和停止
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touch_move, this, false);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touch_end, this, false);
    }

    /**
     * 滑动中触摸侦听回调，回调侦听滑动中事件 PanelEvent.SCROLL_MOVE
     * @param evt
     */
    private touch_move(evt: egret.TouchEvent): void{
        evt.preventDefault();
        evt.stopPropagation();
        var self = this;
        if(this.isScrolling){
            var now: any = {
                x: evt.stageX,
                y: evt.stageY
            };
            var move: any = {
                x: now.x - this.last.x,
                y: now.y - this.last.y
            };
            //console.log(move);
            var contentLeft: number = this.maskRect.x;
            var contentTop: number = this.maskRect.y;
            // 设置top值移动content
            this.update(contentLeft - move.x, contentTop - move.y, false);
            this.last = now;
            //回调侦听
            this.dispatchEventWith(PanelEvent.SCROLL_MOVE, false, evt);
        }
    }

    /**
     * 结束触摸侦听回调，回调侦听开始结束事件 PanelEvent.SCROLL_END
     * @param evt
     */
    private touch_end(evt: egret.TouchEvent): void{
        evt.preventDefault();
        evt.stopPropagation();
        var self = this;
        if(this.isScrolling){
            this.isScrolling = false;

            var now: any = {
                x: evt.stageX,
                y: evt.stageY
            };
            var move: any = {
                x: now.x - this.last.x,
                y: now.y - this.last.y
            };
            var contentLeft: number = this.maskRect.x;
            var contentTop: number = this.maskRect.y;
            // 设置top值移动content
            this.update(contentLeft - move.x, contentTop - move.y, true);
            this.last = now;
            //移除侦听
            this.content.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touch_begin, this);
            this.content.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touch_move, this);
            //回调侦听
            this.dispatchEventWith(PanelEvent.SCROLL_END, false, evt);

        }
    }


    /**
     * 更新滚动
     * @param x
     * @param y
     */
    public update(x: number, y: number, isTwee: boolean): void{
        //范围检查
        var y: number = y, x: number;
        if(x <= 0) x = 0;
        if(x > this.content.width - this.maskRect.width){
            x = this.content.width - this.maskRect.width;
        }
        if(y < 0) y = 0;
        if(y >= this.content.height - this.maskRect.height){
            y = this.content.height - this.maskRect.height;
        }
        if(this.scrollType == GameStatic.SCROLL_X) {
            this.maskRect.x = x;
        }else if(this.scrollType == GameStatic.SCROLL_Y){
            this.maskRect.y = y;
        }else if(this.scrollType == GameStatic.SCROLL_XY){
            this.maskRect.x = x;
            this.maskRect.y = y;
        }else{
            return;
        }
        //egret.Tween.get(this.maskRect).to({ y: y }, 200);
        //this.content.scrollRect = this.maskRect;
    }


    public getContent(): egret.DisplayObjectContainer{
        return this.content;
    }

    public getScroll(): any{
        return { x: this.maskRect.x, y: this.maskRect.y };
    }


}
