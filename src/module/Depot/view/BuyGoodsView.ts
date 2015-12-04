/**
 * Created by rodey on 15/1/9.
 */

class BuyGoodsView
{

    private static _instance:BuyGoodsView;

    public static getInstance():BuyGoodsView
    {
        if(!BuyGoodsView._instance)
        {
            BuyGoodsView._instance = new BuyGoodsView();
        }
        return BuyGoodsView._instance;
    }

    constructor()
    {
        GameEvent.watcher.addEventListener(GameEvent.BUY_ITEMS, this.buyItems, this);
        GameEvent.watcher.addEventListener(GameEvent.BUY_GOODS_CLOSE, this.callBack, this);
        //GameEvent.watcher.addEventListener(GameEvent.BUY_GOODS_CLOSE, this.onClosePanel, this);
    }

    /**
     * data结构:
     *
     * [ ...{ itemId: value(物品ID), poor: value(需要购买的数量) } ]
     *
     * @type {Array}
     */

    private data:any[] = [];
    private param:Object;
    private currentPanelName:any;
    private args:any;
    private cb:any;
    private win: game.BuyGoodsConfirmPanel;

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
    public init(data:any[], panel?:any, param?:any, args?:any, callback?: Function):void
    {

        if(data && data.length)
        {
            this.data = data;
            this.render();
        }

        this.currentPanelName = panel;
        this.param = param;
        this.args = args;
        this.cb = callback;

        console.log('BuyGoodView: ', this.data);

    }

    public render():void
    {

        //加载资源
        Loader.instance.loadGroups([GroupName.GOODS_GROUP], ()=>{

            UIMgr.instance.show(
                PanelName.BUY_GODDS_CONFIRM_PANEL,
                { 'direction': Direction.CENTER },
                Language.getString( 3, 12 ), //'您可以使用钻石补充资源'
                GameEvent.BUY_ITEMS,
                this.data
            );

        }, this);

        this.win = UIMgr.instance.getPanel( PanelName.BUY_GODDS_CONFIRM_PANEL );

    }

    public addItemPost(evt:egret.TouchEvent):void
    {
        console.log('[ BuyGoodsView ].....addItemPost......', evt.data);
        var target = evt.currentTarget || evt.target;
        var itemId:number = evt.data['itemId'];
        var itemNum:number = evt.data['itemNum'];
        var poor:number = target.total - target.current;

        //fasong
        DepotExtendController.getInstance().currentDisplayObject = target;
        DepotExtendController.getInstance().sendBuyData(itemId, poor);
    }

    //一次性购买侦听回调
    public buyItems(evt:egret.TouchEvent):void
    {
        console.log('[BuyGoodsView]--buyItems（一次性购买多个物品）', this.data);

        DepotExtendController.getInstance().sendBuyItemsData(this.data, evt.data.getDiamondTotal(null));

    }


    public callBack(evt?: egret.Event):void
    {

        console.log(evt);
        if(evt && evt.data && evt.data === GameEvent.CLOSE){
            return;
        }
        //TipText.instace.play('购买成功')
        TipText.instace.play(Language.getString( 3, 36 ));

        var self = this;
        if( (this.currentPanelName || String(this.currentPanelName) === '0' )&& typeof this.currentPanelName === 'number')
        {
            if(this.currentPanelName == PanelName.PRODUCTION_PANEL)
            {

                //生产建筑物
                if(!this.args || !this.args['building']) return;
                var building:ProcessFactoryBuilding = this.args['building'];
                console.log('BuyGoodsView: building ', building)

                //购买完成后 自动添加生产
                if(this.cb && typeof this.cb === 'function'){
                    if(evt && evt.data == GameEvent.CLOSE){
                        //ProcessFactoryController.getInstance().setData(building);
                        //ProcessFactoryController.getInstance().init(building.model.buildingId);
                        ProcessFactoryController.getInstance().open(building.model.buildingId);
                        return;
                    }
                    this.cb.call(this);
                }

            }
            else if(this.currentPanelName == PanelName.ANIMAL_PANEL)
            {
                UIMgr.instance.show(this.currentPanelName, {"direction":Direction.NONE}, this.args);
            }
            else if(this.currentPanelName == PanelName.SEED_PANEL)
            {
                UIMgr.instance.show(this.currentPanelName, {"direction":Direction.NONE}, this.args);
            }
            else if(this.currentPanelName == PanelName.TOOLS_PANEL)
            {
                UIMgr.instance.show(this.currentPanelName, {"direction":Direction.NONE}, this.args[0], this.args[1]);
            }
            else if(this.currentPanelName == PanelName.VILLAGER_SELL_PANEL)
            {
                UIMgr.instance.show(this.currentPanelName, {"direction":Direction.NONE}, this.args);
            }
            else
            {
                //其他无参情况
                UIMgr.instance.show(this.currentPanelName, this.param);
            }

        }

        this.currentPanelName = null;
        this.param = null;
        this.args = null;
        this.cb = null;

    }

    public getDiamondTotal(data?: any[]): number{

        if(!this.data || !this.data.length || this.data.length == 0) return 0;

        var data: any[] = data || this.data;
        var i:number = 0, len: number = this.data.length;
        var diamond: number = 0;
        var current: number = 0;
        var total: number = 0;
        var diamondTotal: number = 0;

        for( ; i < len; ++i){
            var item: any = data[i];
            if(!item['item']){
                item['item'] = DepotModel.getModelById(item['itemId']);
            }
            diamond = item['item']['diamond'];
            current = DepotController.instance.getItemNumByItemId(item['item']['itemId']);
            total = item['poor'];

            diamondTotal += Math.abs(total) * diamond;
        }

        return diamondTotal;
    }

}
