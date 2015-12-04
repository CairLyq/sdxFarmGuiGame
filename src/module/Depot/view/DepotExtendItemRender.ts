/**
 * Created by rodey on 14/12/17.
 *
 * 仓库扩充 item
 *
 */

module game{
    export class DepotExtendItemRender extends egret.gui.ItemRenderer{


        private _current: number; //当前用户已拥有的物品数据
        private _total: number; //当前扩建总共需要的物品数量
        private _diamond: number; //当前物品扩充需要的金币单价
        private _total_diamond: number; //总价

        //追加一个 物品图片
        public iconAsset: egret.gui.UIAsset;
        private _icon: string;
        //追加一个 购买按钮
        public addPostExtendBtn: egret.gui.Button;
        //追加一个 满足条件按钮
        public meetAsset: egret.gui.UIAsset;
        //追加一个显示当前已拥有的 Label
        public currentLabel: egret.gui.Label;
        public totalLabel: egret.gui.Label;

        private _isShowButton: boolean = true;
        //滑动购买
        //public numberHSlider: egret.gui.HSlider;

        constructor(current?: number, total?: number, diamond?: number){
            super();
            this.skinName = skins.uicompenet.Depot.DepotExtenItemRenderSkin;

            if(this.addPostExtendBtn){
                this.addPostExtendBtn.skinName = skins.uicompenet.Depot.DepotExtendItemButtionSkin;
            }

            this._current = current;
            this._total = total;
            this._diamond = diamond;

            if(this._current < this._total){
                this._total_diamond = Math.abs(this._total - this._current) * this._diamond;
            }

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

        public get isShowButton(): boolean{ return this._isShowButton; }
        public set isShowButton(value: boolean){
            if(value == this._isShowButton)
                return;
            this._isShowButton = value;
            if(this.addPostExtendBtn){
                if(this._isShowButton == true){
                    this.addPostExtendBtn.visible = true;
                }else{
                    this.addPostExtendBtn.visible = false;
                }
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
            if(value >= this._total){
                if(this.addPostExtendBtn){
                    this.addPostExtendBtn.visible = false;
                }
                if(this.meetAsset){
                    this.meetAsset.visible = true;
                }
                if(this.currentLabel){
                    this.currentLabel.textColor = 0x68AA35;
                }
            }/*else{
                if(this.currentLabel) {
                    this.currentLabel.textColor = 0xC93503;
                }
            }*/

            /*if(this.numberHSlider){
                this.numberHSlider.value = this.current;
            }*/

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
            if(this.totalLabel){
                this.totalLabel.text = String(value);
            }
            if(value <= this._current){
                if(this.addPostExtendBtn){
                    this.addPostExtendBtn.visible = false;
                }
                if(this.meetAsset){
                    this.meetAsset.visible = true;
                }
            }
        }

        public get diamond(): number{
            return this._diamond;
        }
        public set diamond(value: number){
            this._diamond = value;
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

            }else if(instance == this.meetAsset){

                if(this._current >= this._total && this._isShowButton == true){

                    this.meetAsset.visible = true;

                }else{
                    this.meetAsset.visible = false;
                }
            }else if(instance == this.addPostExtendBtn){

                this.addPostExtendBtn.skinName = skins.uicompenet.Depot.DepotExtendItemButtionSkin;
                if(this._current >= this._total || !this._isShowButton){
                    this.addPostExtendBtn.visible = false;
                }else{
                    this.addPostExtendBtn.visible = true;
                    this._total_diamond = Math.abs(this._total - this._current) * this._diamond;
                    this.addPostExtendBtn.label = String(this._total_diamond);
                    this.addPostExtendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toAddPost, this);
                }

            }else if(instance == this.iconAsset){

                this.iconAsset.source = this._icon;

            }/*else if(instance == this.numberHSlider){

                this.numberHSlider.minimum = 0;
                this.numberHSlider.maximum = 50;
                this.numberHSlider.stepSize = 1;
                this.numberHSlider.value = this.current;
                this.numberHSlider.addEventListener(egret.Event.CHANGE, this.toChangeNumber, this);

            }*/

        }

        public childrenCreated(): void{
            super.childrenCreated();

            if(this.iconAsset){
                this.iconAsset.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toSelectedItemBegin, this);
                this.iconAsset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toSelectedItemTap, this);
            }

        }

        /*private toChangeNumber(evt: egret.Event): void{

            this.current = evt.target.value;

            GameEvent.watcher.dispatchEventWith(GameEvent.HSLIDER_CHANGE, true, this.getTotalDiamond());

        }*/


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


        /**
         * 单个购买
         * @param evt
         */
        private toAddPost(evt: egret.TouchEvent): void{
            //console.log('...购买..物品', this._total_diamond)
            this.data['total_diamond'] = this._total_diamond;

            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_OK);

            var target: game.DepotItemRender = evt.currentTarget || evt.target;
            TweenIt.tweenBigThenNormal(target, ()=>{

                console.log(UserController.instance.diamond, this._total_diamond);
                if(!UserController.instance.isDiamondEnough(this._total_diamond)){
                    return;
                }

                this.addPostExtendBtn.dispatchEventWith(GameEvent.ADD_ITEM_POST, true, this.data);

            }, this);

        }

        /*private getTotalDiamond(): number{
            return (this._total_diamond = Math.abs(this._total - this._current) * this._diamond);
        }*/


    }
}
