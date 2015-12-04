/**
 * Created by rodey on 15/3/4.
 */

class ShowItemTips extends egret.DisplayObjectContainer{

    private static _instance: ShowItemTips;
    public static get instance(): ShowItemTips{
        if(!ShowItemTips._instance){
            ShowItemTips._instance = new ShowItemTips();
        }
        return ShowItemTips._instance;
    }

    /**
     * data结构:
     *
     * [ ...{ itemId: value(物品ID), poor: value(需要购买的数量) } ]
     *
     * @type {Array}
     */

    private data:any[] = [];
    private args:any;
    private okFunc:Function;
    private ceFunc:Function;

    private bgLayer: egret.Sprite;
    private showItemTipsPanel: game.ShowItemTipsPanel;

    constructor()
    {
        super();
        GameEvent.watcher.addEventListener(GameEvent.SHOW_TIPS_ITEM_OK, this.okFuncCallBack, this);
        GameEvent.watcher.addEventListener(GameEvent.SHOW_TIPS_ITEM_CANCEL, this.ceFuncCallBack, this);

        //this.createShowTipsPanel();

    }

    private createShowTipsPanel(): void{

        //显示升级面板
        if(!this.bgLayer)
        {
            this.bgLayer = this.createBGLayer();
        }
        Lyrs.LYRS_ICON_PARENT.addChild(this.bgLayer);

        if(!this.showItemTipsPanel){
            this.showItemTipsPanel = new game.ShowItemTipsPanel();
        }

        this.bgLayer.addChild(this.showItemTipsPanel);

        this.showItemTipsPanel.onShow('您即将用掉最后一份农作物，是否继续？', this.data);

    }

    private createBGLayer(parent:egret.DisplayObjectContainer = Lyrs.LYRS_ICON_PARENT, alpha:number = .5):egret.Sprite
    {
        var bgLayer:egret.Sprite = new egret.Sprite();
        //parent.addChild(bgLayer);
        bgLayer.name = 'BGLayer';
        bgLayer.graphics.clear();
        bgLayer.graphics.beginFill(0x000000, alpha);
        bgLayer.graphics.drawRect(0, 0, Lyrs.SW, Lyrs.SH);
        bgLayer.graphics.endFill();
        bgLayer.touchEnabled = true;
        return bgLayer;
    }

    /**
     *
     * @param data
     * @param panel  回弹面板
     * param:Object UIMgr::show第二参数： 例子：{ "direction":Direction.BOTTOM, "time":500, "ease":egret.Ease.sineIn, alpha:0.3, color:0xFF0000 }
     *      @param direction    默认为Direction.BOTTOM; left(左进)、 right(右进)、top(上进)、bottom(下进)、center(中间放大)
     *      @param time         时间,单位毫秒
     *      @param ease         缓动函数  egret.Ease中取值，默认为 egret.Ease.sineIn
     *      @param alpha        背景透明度，默认为 0
     *      @param color        背景颜色
     * @param args 回弹时所需要的参数，在本类的callback进行处理
     */
    public init(data:any[], okFunc?:Function, ceFunc?:Function, args?:any):void
    {

        this.args = args;
        this.okFunc = okFunc;
        this.ceFunc = ceFunc;

        if(data && data.length)
        {
            this.data = data;
            this.render();
        }else{
            this.okFunc && this.okFunc();
        }

    }

    public render():void
    {

        this.createShowTipsPanel();

    }

    public destroy(cb?: Function): void{
        this.showItemTipsPanel && this.showItemTipsPanel.onClose(cb);
        if(Lyrs.LYRS_ICON_PARENT && Lyrs.LYRS_ICON_PARENT.getChildIndex(this.bgLayer) !== 0){
            Lyrs.LYRS_ICON_PARENT.removeChild(this.bgLayer);
        }
    }

    public okFuncCallBack(evt?: egret.Event):void
    {
        this.destroy( ()=>{
            this.okFunc && this.okFunc.call(this.args, this.data);
        });

    }

    public ceFuncCallBack(evt?: egret.Event):void
    {
        this.destroy();
        this.ceFunc && this.ceFunc.call(this.args, this.data);
    }

}
