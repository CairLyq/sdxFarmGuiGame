/**
 * Created by rodey on 14/12/19.
 *
 * 路边摊 商品下架
 *
 */

module game{

    export class SoldDownPanel extends egret.gui.SkinnableComponent implements IPanel
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

        //返回按钮
        public returnBtn: egret.gui.UIAsset;
        //上架按钮
        public soldDownBtn: egret.gui.Button;


        //根据传递的商品id值去获取商品id的详细信息（或者直接传递商品的详细信息）
        private _data: any = {
            title: '商品下架',
            message: '您可以选择是否下架此商品！',
            data: {
                id: 2,  //商品id
                imgId: 'sp-lajiao', //商品图片
                price: 10,  //商品单价
                total: 50,   //商品当前拥有的总数
                isAdv: 1    //十分发布广告
            }
        };
        private _goodsId: number;
        private _goodsStatus: number;
        private _goods: any;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Roadsite.SoldDownPanelSkin;

            this._message = this._data.message;
        }

        /**
         * @param args
         *  args[ 0 ] = goodsId
         *  args[ 1 ] = goods
         */
        public onShow( ...args: any[] ):void
        {

            var arguments:any[] = args[0];
            this._goodsId = arguments[ 0 ];
            this._goodsNum = arguments[ 1 ];
            this._goodsStatus = arguments[ 2 ];
            this._goods = arguments[ 3 ];
            this._icon = this._goods.icon;
            this._goodsPrice = this._goods.data.price;
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

            }else if(instance == this.soldDownBtn){
                //下架
                this.soldDownBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toSoldDOWN, this);

            }else if(instance == this.returnBtn){
                //返回路边摊
                this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toReturn, this);

            }else if(instance == this.goodsNumLabel){
                this.goodsNumLabel.text = String(this._goodsNum);

            }else if(instance == this.goodsPriceLabel){
                this.goodsPriceLabel.text = String(this._goodsPrice);
            }else if(instance == this.contentGroup){
                //添加一个大小显示对象
                this.createTypeFont(this._message);
            }
            else if( instance == this.titleDisplay )
            {
                this.titleDisplay.text = this._data.title;
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
         * 下架
         * @param evt
         */
        private toSoldDOWN(evt: egret.TouchEvent): void{
            console.log('...商品下架...')
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
