/**
 * Created by rodey on 14/12/17.
 *
 * 仓库扩充 item
 *
 */

module game{
    export class BuyGoodsItemRender extends egret.gui.ItemRenderer{


        private _current: number; //当前用户已拥有的物品数据
        private _total: number; //当前扩建总共需要的物品数量
        private _diamond: number; //当前物品扩充需要的金币单价
        private _total_diamond: number; //总价
        private _oldTotal: number = 0;

        //追加一个 物品图片
        public iconAsset: egret.gui.UIAsset;
        private _icon: string;
        //追加一个显示当前已拥有的 Label
        public currentLabel: egret.gui.Label;
        public totalLabel: egret.gui.Label;

        //滑动购买
        public numberHSlider: egret.gui.HSlider;

        constructor(current?: number, total?: number, diamond?: number){
            super();
            this.skinName = skins.uicompenet.Depot.BuyGoodsItemRenderSkin;

            this._current = current;
            this._total = total;
            this._diamond = diamond;

            if(this._current < this._total){
                this._total_diamond = Math.abs(this._total - this._current) * this._diamond;
            }

            this._oldTotal = total || 0;

        }

        /**
         * 获取 或 设置扩建需要的物品的图片
         * @returns {string}
         */
        public get icon(): string{
            return this._icon;
        }
        public set icon(value: string){
            if(value == this._icon)
                return;
            this._icon = value;
            if(this.iconAsset){
                this.iconAsset.source = value;
            }
        }

        /**
         * 获取 或 设置当前值
         * @returns {number}
         */
        public get current(): number{
            return this._current;
        }
        public set current(value: number){
            if(value == this._current)
                return;

            this._current = value;
            if(this.currentLabel){
                this.currentLabel.text = String(value);
            }

        }

        /**
         * 获取 或 设置扩建需要的单个物品总数
         * @returns {number}
         */
        public get total(): number{
            return this._total;
        }
        public set total(value: number){
            this._total = value;
            if(this._oldTotal === 0){
                this._oldTotal = value;
            }
            if(this.totalLabel){
                this.totalLabel.text = String(value);
            }

            if(this.numberHSlider){
                this.numberHSlider.value = this.total;
            }
        }

        public get diamond(): number{
            return this._diamond;
        }
        public set diamond(value: number){
            this._diamond = value;
        }

        public showHSlider(bo: boolean): void{
            this.numberHSlider.visible = bo;
        }


        /**
         * 数据填充
         */
        public dataChanged(): void{

        }

        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
            if(instance == this.currentLabel){
                this.currentLabel.text = String(this._current);
                if(this._current >= this._total){
                    this.currentLabel.textColor = 0x68AA35;

                }else{
                    this.currentLabel.textColor = 0xC93503;
                }
            }else if(instance == this.totalLabel){
                this.totalLabel.text = String(this._total);

            }else if(instance == this.iconAsset){

                this.iconAsset.source = this._icon;
                this.iconAsset.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toSelectedItemBegin, this);
                this.iconAsset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toSelectedItemTap, this);

            }else if(instance == this.numberHSlider){

                this.numberHSlider.minimum = this.total;
                this.numberHSlider.maximum = Global.BUY_GOODS_SLIDER_MAX;
                this.numberHSlider.stepSize = Global.BUY_GOODS_SLIDER_STEP;
                this.numberHSlider.value = this.total;
                this.numberHSlider.addEventListener(egret.Event.CHANGE, this.toChangeNumber, this);

             }

        }

        private toChangeNumber(evt: egret.Event): void{

            this.total = evt.target.value;
            var patchDiamod: number = Math.abs(this._total - this._current) * this._diamond;
            var patchData: any = {
                itemId: this.data.itemId,
                total: Math.abs(this._total - this._current),
                total_diamond: patchDiamod,
                diamond: this._diamond
            };
            GameEvent.watcher.dispatchEventWith(GameEvent.HSLIDER_CHANGE, true, patchData);

        }


        private getTotalDiamond(): number{
            return (this._total_diamond = Math.abs(this._total - this._current) * this._diamond);
        }

        private toSelectedItemBegin(evt: egret.TouchEvent): void{
            TipMgr.hide();
            var target: any = evt.currentTarget || evt.target,
                tipText: string = '('+ this.data.name +') ' + this.data.desc;
            TipText.instace.play( tipText );
        }

        private toSelectedItemTap(evt: egret.TouchEvent): void{

            //播放音效
            SoundMgr.instance.playAudio(SoundName.ITEM_SELECTED);

            var target: any = evt.currentTarget || evt.target;
            TweenIt.tweenBigThenNormal(target);
            console.log('...您点击了商品...');
        }


    }
}
