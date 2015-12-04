/**
 * Created by rodey on 15/1/13.
 */

module game{

    export class ShowItemTipsPanel extends egret.gui.SkinnableComponent implements IPanel
    {
        public bgLy: egret.gui.UIAsset;
        //确认按钮
        public confirmBtn: egret.gui.Button;
        public closeButton: egret.gui.Button;
        //文字内容
        public messageLabel: egret.gui.Label;
        private _msg: string;
        //其他情况
        private _content: any;
        private _data: any;
        public isOpen: boolean = false;

        public listScroller: egret.gui.Scroller;
        public listGroup: egret.gui.Group;


        constructor(){
            super();
            this.skinName = skins.uicompenet.Commons.ShowItemTipsPanelSkin;

            this.width = 480;
            this.height = 410;
            this.anchorX = this.anchorY = .5;

        }

        /**
         * @param args
         *  title = args[ 0 ];
         *  message = args[ 1 ];
         */
        public onShow( ...args: any[] ):void
        {

            this.message = '';
            this.listGroup.removeAllElements();

            if(args[0]){
                this.message = args[0];
            }
            if(args[1]){
                this.data = args[1];
            }

            this.alpha = 0;
            this.scaleX = this.scaleY = 0;
            var cx: number = Lyrs.SW >> 1;
            var cy: number = Lyrs.SH >> 1;
            this.x = cx;
            this.y = cy;
            var to: any = { scaleX: 1, scaleY: 1, alpha: 1 };
            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to(to, 200, egret.Ease.sineIn);

        }
        public onClose( ...args: any[] ):void
        {

            var cb: Function;
            if(args[0]){
                cb = args[0];
            }

            var to: any = { scaleX: 0, scaleY: 0, alpha: 0 };
            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to(to, 200, egret.Ease.sineOut).call( ()=>{
                this.message = '';
                this.listGroup.removeAllElements();

                if(this.parent && this.parent.getChildIndex(this) !== 0){
                    this.parent.removeChild(this);
                }

                cb && cb.call(this);

            } );

        }

        public onUpdate( ...args: any[] ):void
        {
            this.message = '';
            this.listGroup.removeAllElements();

            if(args[0]){
                this.message = args[0];
            }

            if(args[1]){
                this.data = args[1];
            }
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

            }
        }

        public childrenCreated(): void{
            super.childrenCreated();

            if(this.confirmBtn){
                //======关闭窗口
                this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toCloseHandler, this);
            }

            if(this.confirmBtn){
                this.confirmBtn.touchChildren = true;
                this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toConfirmHandler, this);
            }

        }

        public partAdded(partName: string, instance: any): void{
            super.partAdded(partName, instance);

            if(instance == this.messageLabel)
            {
                this.messageLabel.text = this._msg;
            }

        }

        private toCloseHandler(evt: egret.TouchEvent): void{
            console.log('......取消消耗......');

            var target: egret.gui.UIAsset = evt.currentTarget || evt.target;
            TweenIt.tweenBigThenNormal(target, function(){
                GameEvent.watcher.dispatchEventWith(GameEvent.SHOW_TIPS_ITEM_CANCEL, true, null);
            });
        }

        private toConfirmHandler(evt: egret.TouchEvent): void{
            console.log('......继续消耗......');

            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_OK);

            var target: egret.gui.UIAsset = evt.currentTarget || evt.target;
            TweenIt.tweenBigThenNormal(target, function(){
                GameEvent.watcher.dispatchEventWith(GameEvent.SHOW_TIPS_ITEM_OK, true, null);
            });

        }


        private createItemList(data?: any[]): void{

            this.listGroup.removeAllElements();

            var data: any[] = data || this.data;
            var i: number = 0, len: number = data.length;

            var icon: string,
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
                icon = item['item']['imgId'];
                current = DepotController.instance.getItemNumByItemId(item['item']['itemId']);
                total = item['needNum'] || item['poor'];

                var itemRender:game.BuyGoodsItemRender = new game.BuyGoodsItemRender(current, total, null);

                itemRender.data = item['item'];
                itemRender.icon = icon;
                itemRender.current = (current < 0) ? 0 : current;
                itemRender.total = total;
                this.listGroup.addElement(itemRender);
                itemRender.showHSlider(false);

                itemRender.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toSelectedItemBegin, this);
                itemRender.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toSelectedItemTap, this);

            }

        }


        private toSelectedItemBegin(evt: egret.TouchEvent): void{
            TipMgr.hide();
            var target: game.DepotExtendItemRender = evt.currentTarget || evt.target,
                data: any = target.data,
                tipText: string = '('+ data.name +') ' + data.desc;
            TipText.instace.play( tipText );
        }

        private toSelectedItemTap(evt: egret.TouchEvent): void{

            //播放音效
            SoundMgr.instance.playAudio(SoundName.ITEM_SELECTED);

            var target: game.DepotExtendItemRender = evt.currentTarget || evt.target;
            TweenIt.tweenBigThenNormal(target.iconAsset);
        }


    }

}
