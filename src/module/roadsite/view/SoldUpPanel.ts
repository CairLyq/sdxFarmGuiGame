/**
 * Created by rodey on 14/12/19.
 *
 * 商品上架 面板
 */

module game{

    export class SoldUpPanel extends egret.gui.SkinnableComponent implements IPanel
    {
        private contentGroup:egret.gui.Group;
        private titleDisplay:egret.gui.Label;

        //追加一个 Npc对话内容
        private _message: string;
        //一个打字显示对象
        private typeFont: game.TypeFont;

        //追加一个 商品的图片
        public goodsAsset: egret.gui.UIAsset;
        private _icon: string;

        //追加一个 商品数量
        public goodsNumLabel: egret.gui.Label;
        private _goodsNum: number;
        //追加一个 商品价格
        public goodsPriceLabel: egret.gui.Label;
        private _goodsPrice: number;
        //追加一个是否发布广告
        public isAdvBtn: egret.gui.Button;
        private _isAdv: number = 1;

        //追加一个 商品数量 滑块
        private goodsNumberHSlider: egret.gui.HSlider;
        //追加一个 商品价格 滑块
        private goodsPriceHSlider: egret.gui.HSlider;
        //返回按钮
        public returnBtn: egret.gui.UIAsset;
        //上架按钮
        public soldUpBtn: egret.gui.Button;

        //根据传递的商品id值去获取商品id的详细信息（或者直接传递商品的详细信息）
        private _data: any = {
            title: '商品上架',
            message: '选择商品的数量进行上架哦！',
            data: {
                id: 2,  //商品id
                imgId: 'sp-lajiao', //商品图片
                price: 10,  //商品单价
                total: 50,   //商品当前拥有的总数
                isAdv: 1    //十分发布广告
            }
        };
        private _goodsId: number;
        private _goods: any;

        constructor()
        {
            super();
            this.skinName = skins.uicompenet.Roadsite.SoldUpPanelSkin;

            this._message = this._data.message;
            this._isAdv = 1;
            //初始化为当前总数的一半
            this._goodsNum = Math.round(this._data.data.total * .5);
            //初始化为当前总价的一半
            this._goodsPrice = this._goodsNum * this._data.data.price;
        }

        /**
         * @param args
         *      goodsId = args[ 0 ];
         *      goods = args[ 1 ];
         */
        public onShow( ...args: any[] ):void
        {
            this._goodsId = args[ 0 ];
            this._goods = args[ 1 ];
            this._icon = this._goods.icon;
        }
        public onClose( ...args: any[] ):void
        {
            this.typeFont.stop();
        }
        public onUpdate( ...args: any[] ):void
        {

        }


        /** 获取或设置 商品图片 **/
        public get icon(): string{
            return this._icon;
        }
        public set icon(value: string){
            if(value == this._icon)
                return;
            this._icon = value;
            if(this.goodsAsset){
                this.goodsAsset.source = RES.getRes(value);
            }
        }

        /** 获取 或 设置 商品数量 **/
        public get goodsNumber(): number{
            return this._goodsNum;
        }
        public set goodsNumber(value: number){
            if(value == this._goodsNum)
                return;
            this._goodsNum = value;
            if(this.goodsNumLabel){
                this.goodsNumLabel.text = String(value);
            }
        }

        /** 获取 或 设置 商品价格 **/
        public get goodsPrice(): number{
            return this._goodsPrice;
        }
        public set goodsPrice(value: number){
            if(value == this._goodsPrice)
                return;
            this._goodsPrice = value;
            if(this.goodsPriceLabel){
                this.goodsPriceLabel.text = String(value);
            }
        }

        /** 获取 或 设置 是否发布广告 **/
        public get isAdv(): number{
            return this._isAdv;
        }
        public set isAdv(value: number){
            if(value == this._isAdv)
                return;
            this._isAdv = value;
            if(this.isAdvBtn){
                if(value == 0){
                    this.isAdvBtn.icon = null;
                }else{
                    this.isAdvBtn.icon = 'KJ-gou';
                }
            }
        }


        /**
         * 获取或设置对话内容
         * @returns {string}
         */
        public get message(): string{
            return this._message;
        }
        public set message(value: string){
            if(value == this._message)
                return;
            this._message = value;
            if(this.typeFont){
                this.typeFont.update(value);
            }else{
                this.createTypeFont(value);
            }
        }


        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
            if(instance == this.goodsAsset){
                this.goodsAsset.source = RES.getRes(this._icon);

            }else if(instance == this.soldUpBtn){
                //上架
                this.soldUpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toSoldUPGoods, this);

            }else if(instance == this.returnBtn){
                //返回路边摊
                this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toReturn, this);

            }else if(instance == this.isAdvBtn){
                this.isAdvBtn.touchEnabled = true;
                //初始化 是否发布广告
                if(this._isAdv == 0){
                    this.isAdvBtn.icon = null;
                }else{
                    this.isAdvBtn.icon = 'KJ-gou';
                }
                this.isAdvBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toIsAdv, this);

            }else if(instance == this.goodsNumLabel){
                this.goodsNumLabel.text = String(this._goodsNum);

            }else if(instance == this.goodsPriceLabel){
                this.goodsPriceLabel.text = String(this._goodsPrice);
            }else if(instance == this.contentGroup){
                //添加一个大小显示对象
                this.createTypeFont(this._message);
                //数量滑块
                this.setGoodsNumHSliderProp(this._data.data);
                //价格滑块
                this.setGoodsPriceHSliderProp(this._data.data);
            }
            else if( instance == this.titleDisplay )
            {
                this.titleDisplay.text = this._data.title;
            }
        }

        //设置 数理滑块参数
        private setGoodsNumHSliderProp(data?: any): void{
            var data: any = this._data.data;
            this.goodsNumberHSlider = new egret.gui.HSlider();
            this.goodsNumberHSlider.skinName = skins.uicompenet.Roadsite.SoldHSliderSkin;
            this.goodsNumberHSlider.x = 332;
            this.goodsNumberHSlider.y = 276;
            this.contentGroup.addElement(this.goodsNumberHSlider);
            this.goodsNumberHSlider.minimum = 1;
            this.goodsNumberHSlider.maximum = this._data.data.total;
            this.goodsNumberHSlider.stepSize = 1;
            this.goodsNumberHSlider.value = Math.round(this._data.data.total * .5);
            this.goodsNumberHSlider.addEventListener(egret.Event.CHANGE, this.toChangeNumber, this);
            this.goodsNumber = data.total * .5;
        }
        //设置 价格滑块参数
        private setGoodsPriceHSliderProp(data?: any): void{
            var data: any = this._data.data;
            this.goodsPriceHSlider = new egret.gui.HSlider();
            this.goodsPriceHSlider.skinName = skins.uicompenet.Roadsite.SoldPriceHSliderSkin;
            this.goodsPriceHSlider.x = 332;
            this.goodsPriceHSlider.y = 364;
            this.contentGroup.addElement(this.goodsPriceHSlider);
            this.goodsPriceHSlider.minimum = 1;
            this.goodsPriceHSlider.maximum = (this._data.data.total * this._data.data.price);
            this.goodsNumberHSlider.stepSize = 1;
            this.goodsPriceHSlider.value = (this._data.data.total * this._data.data.price) * .5;
            this.goodsPriceHSlider.addEventListener(egret.Event.CHANGE, this.toChangePrice, this);
            this.goodsPrice = (this._data.data.total * this._data.data.price) * .5;
        }

        // 数量滑块回调
        private toChangeNumber(evt: egret.Event): void{
            console.log(evt.target.value)
            if(this.goodsNumLabel){
                this.goodsNumLabel.text = String(evt.target.value);
            }
        }

        // 价格滑块回调
        private toChangePrice(evt: egret.Event): void{
            console.log(evt.target.value)
            if(this.goodsPriceLabel){
                this.goodsPriceLabel.text = String(evt.target.value);
            }
        }

        /**
         * 返回 路边摊面板
         * @param evt
         */
        private toReturn(evt: egret.TouchEvent): void{
            console.log('返回路边摊面板...');
            UIMgr.instance.closeCurrentPanel( function(){
                UIMgr.instance.show( PanelName.ROADSITE_PANAEL );
            });
        }

        /**
         * 是否发布广告
         * @param evt
         */
        private toIsAdv(evt: egret.TouchEvent): void{
            if(this._isAdv == 0){
                this.isAdv = 1;
                console.log('...您选择的是『发布』广告...')
            }else{
                this.isAdv = 0;
                console.log('...您选择的是『不发布』广告...')
            }
        }

        /**
         * 上架
         * @param evt
         */
        private toSoldUPGoods(evt: egret.TouchEvent): void{
            console.log('...商品上架...');
        }


        /**
         * 创建 npc 对话
         * @param message
         */
        private createTypeFont(message?: string): void{
            console.log(this._message)
            this.typeFont = new game.TypeFont(message || this._message);
            this.typeFont.x = 17;
            this.typeFont.y = 535;
            this.contentGroup.addElement(new egret.gui.UIAsset(this.typeFont));
        }

    }

}
