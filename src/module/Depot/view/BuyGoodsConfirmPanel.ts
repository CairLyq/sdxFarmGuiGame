/**
 * Created by rodey on 15/1/13.
 */

module game{

    export class BuyGoodsConfirmPanel extends egret.gui.SkinnableComponent implements IPanel
    {
        //private titleDisplay:egret.gui.Label;
        //确认按钮
        public confirmBtn: egret.gui.Button;
        public closeButton: egret.gui.Button;
        //文字内容
        public repxLabel: egret.gui.Label;
        public messageLabel: egret.gui.Label;
        private _msg: string;
        //其他情况
        private _content: any;
        private _data: any;
        private _type: string;
        private _totalDiamond: number;

        public listScroller: egret.gui.Scroller;
        public listGroup: egret.gui.Group;


        constructor(){
            super();
            this.skinName = skins.uicompenet.Commons.BuyGoodsConfirmPanelSkin;
        }

        /**
         * @param args
         *  title = args[ 0 ];
         *  message = args[ 1 ];
         */
        public onShow( ...args: any[] ):void
        {

            this.width = 480;
            this.message = '';
            this.listGroup.removeAllElements();

            if(args[0]){
                this.message = args[0];
            }

            if(args[1]){
                this._type = args[1];
            }
            if(args[2]){
                this.data = args[2];
            }
            /*if(args[3])
            {
                this.content = args[3];
            }*/

            GameEvent.watcher.addEventListener(GameEvent.HSLIDER_CHANGE, this.toItemRenderChange, this);

        }
        public onClose( ...args: any[] ):void
        {
            this.message = '';
            this.listGroup.removeAllElements();
            this._totalDiamond = 0;
        }

        public onUpdate( ...args: any[] ):void
        {

        }

        public get message(): string{
            return this._msg;
        }
        public set message(value: string){
            if(value == this._msg)
                return;
            this._msg = value;
            if(this.messageLabel){
                this.messageLabel.text = value;
            }
        }

        public get content(): any{
            return this._content;
        }
        public set content(value: any){
            if(value == this._content)
                return;
            this._content = value;

        }

        public get data(): any{
            return this._data;
        }
        public set data(value: any){
            if(value == this._data)
                return;
            this._data = value;
            if(this.listGroup){

                this.createItemList(value);

                if(this.confirmBtn){
                    this.confirmBtn.label = String(this.getDiamondTotal(value));
                }

            }
        }


        public childrenCreated(): void{
            super.childrenCreated();

            if(this.closeButton){
                //======关闭窗口
                this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toCloseHandler, this);
            }

            if(this.confirmBtn){
                this.confirmBtn.touchChildren = true;
                this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toConfirmHandler, this);
            }

            if(this.repxLabel){
                this.repxLabel.text = Language.getString( 3, 45 );
            }

            if(this.messageLabel){
                this.messageLabel.text = this._msg;
            }
        }

        private toCloseHandler(evt: egret.TouchEvent): void{
            console.log('......关闭公共弹窗......');
            var self = this;

            var target: egret.gui.UIAsset = evt.currentTarget || evt.target;
            TweenIt.tweenBigThenNormal(target, function(){
                UIMgr.instance.closeCurrentPanel(function(){
                    GameEvent.watcher.dispatchEventWith(GameEvent.BUY_GOODS_CLOSE, true, GameEvent.CLOSE);
                });
            });
        }

        private toConfirmHandler(evt: egret.TouchEvent): void{
            console.log('......公共弹窗确认按钮......');
            var self = this;

            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_OK);

            UIMgr.instance.closeCurrentPanel(function(){
                if(self._type == GameEvent.BUY_ITEMS){
                    //购买物品 to DepotController
                    GameEvent.watcher.dispatchEventWith(GameEvent.BUY_ITEMS, true, self);
                }else{
                    GameEvent.watcher.dispatchEventWith(GameEvent.CONFIRM, true, self);
                }
            });
        }


        private createItemList(data?: any[]): void{

            this.listGroup.removeAllElements();

            var data: any[] = data || this.data;
            var i: number = 0, len: number = data.length;

            var diamond: number = 0,
                icon: string,
                current: number = 0,
                total: number = 0,
                item: any;

            for(; i < len; ++i)
            {

                item = data[i];
                if(!item['item'])
                {
                    item['item'] = GameUtils.copyData(DepotModel.getModelById(item['itemId']));
                }
                diamond = item['item']['diamond'];
                icon = item['item']['imgId'];
                current = DepotController.instance.getItemNumByItemId(item['item']['itemId']);
                total = item['needNum'] || item['poor'];

                var itemRender:game.BuyGoodsItemRender = new game.BuyGoodsItemRender(current, total, diamond);
                itemRender.data = item['item'];
                itemRender.icon = icon;
                itemRender.diamond = diamond;
                itemRender.current = (current < 0) ? 0 : current;
                itemRender.total = total;
                this.listGroup.addElement(itemRender);

            }

        }


        private toItemRenderChange(evt: egret.Event): void{
            var currentItem: number = evt.data;
            //console.log(currentItem);

            var i: number = 0, len: number = this.data.length;
            var item: any, current: number = 0;

            for( ; i< len; ++i ){
                item = this.data[i]['item'];
                if(currentItem['itemId'] == item['itemId']){
                    this.data[i]['poor'] = currentItem['total'];
                }
            }

            //console.log(this.data);
            this.getDiamondTotal(this.data);

            if(this.confirmBtn){
                this.confirmBtn.label = String(this._totalDiamond);
            }
        }


        public getDiamondTotal(data?: any[]): number{

            var data: any[] = data || this.data;

            if(!data || !data.length || data.length == 0) {
                return 0;
            }

            var i:number = 0, len: number = data.length;
            var diamond: number = 0;
            var current: number = 0;
            var total: number = 0;
            var diamondTotal: number = 0;

            for( ; i < len; ++i){
                var item: any = data[i];
                //console.log('当前物品: ', item)
                if(!item['item']){
                    item['item'] = DepotModel.getModelById(item['itemId']);
                }
                diamond = item['item']['diamond'];
                //console.log('当前物品：', item['item']['name'])
                //console.log('当前物品钻石：', item['item']['diamond'])
                current = DepotController.instance.getItemNumByItemId(item['item']['itemId']);
                total = item['poor'];
                //console.log('当前物品数量：', total)

                diamondTotal += Math.abs(total) * diamond;
                //console.log('所有物品总钻石数：', diamondTotal)
            }

            this._totalDiamond = diamondTotal;
            return diamondTotal;
        }

    }

}
