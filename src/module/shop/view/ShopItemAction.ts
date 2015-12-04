/**
 * Created by rodey on 14/12/12.
 *
 *
 */

class ShopItemAction extends egret.Sprite{

    //取消按钮
    public closeBtn:game.CloseButton;
    //费用显示对象(购买按钮)
    public buyBtn:game.ShopBuyButton;
    private refer: any;
    private glob: number;
    public BUYBTN_UP:string = 'FZJZ-kedianji';
    public BUYBTN_DOWN:string = 'FZJZ-bukedianji';

    constructor(refer: any, glob: number){
        super();
        this.refer = refer;
        this.glob = glob;
        this.render(refer, glob);

        //comment by leo
        //this.x = this.refer.x;
        //this.y = this.refer.y;
    }

    public render(refer?: any, glob?: number): void{
        var refer = refer || this.refer;
        var glob = glob || this.glob;


        this.closeBtn = new game.CloseButton();
        this.addChild(this.closeBtn);
        this.buyBtn = new game.ShopBuyButton();
        this.addChild(this.buyBtn);
        this.buyBtn.label = String(glob);
        this.buyBtn.x = 80;

        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toClose, this);
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toBuy, this);
    }


    /**
     * 购买 商品
     * @param evt
     */
    private toBuy(evt:egret.TouchEvent):void
    {
        GameEvent.BubbEvent(evt);
        //如果是不可放置状态，则直接return或者是提示
        //this.buyBtn.dispatchEventWith(GameEvent.BUY_ITEM, true, this);
        ControllerFacade.getInstance().moveController.buy();
    }

    /**
     * 取消购买 商品
     * @param evt
     */
    private toClose(evt:egret.TouchEvent):void
    {
        GameEvent.BubbEvent(evt);

        console.log('取消购买////.....')
        //this.closeBtn.dispatchEventWith(GameEvent.CLOSE, true, this);
        ControllerFacade.getInstance().moveController.cancel();
    }

    public updateUI(bo:boolean)
    {
        if(bo)
        {
            this.buyBtn.icon = RES.getRes(this.BUYBTN_UP);
        }else
        {
            this.buyBtn.icon = RES.getRes(this.BUYBTN_DOWN);
        }
    }

}