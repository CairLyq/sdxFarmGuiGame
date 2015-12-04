/**
 * Created by rodey on 14/12/17.

 *  路边小店
 */

module game{
    export class RoadsitePanael extends egret.gui.SkinnableComponent implements IPanel
    {
        private npc_id:number = 8;
        //追加一个 Npc对话内容
        private _message: string;
        //一个打字显示对象
        private typeFont: game.TypeFont;

        //追加一个滚动容器
        public scrollerDisplay: egret.gui.Scroller;
        //追加一个 存放摊位的Group
        public dataGroup: egret.gui.Group;
        private contentGroup:egret.gui.Group;
        private titleDisplay:egret.gui.Label;


        private _data: any = {
            title: '路边小店',
            message: '欢饮来到Squell的路边小店，现在开始点击空闲的摊位摆卖您的物品吧，收益多多哦！',
            friends: 50,
            diamond: 20,
            data: {
                //state(当前状态, 1: 未售出；2：已售出；0：空闲)
                list: [
                    { id: 1, price: 10, number: 3, imgId: 'LC-hug', state: 1 },
                    { id: 2, price: 5, number: 10, imgId: 'LC-hb', state: 2 },
                    { id: 3, price: 20, number: 2, imgId: 'LC-hg', state: 1 },
                    { id: 4, price: 5, number: 5, imgId: 'LC-hg', state: 0 },
                    { id: 5, price: 8, number: 3, imgId: 'LC-hg', state: 0 },
                    { id: 6, price: 8, number: 3, imgId: 'LC-hg', state: 0 }
                ]
            }
        };

        constructor(title?: string, message?:  string)
        {
            super();
            this.skinName = skins.uicompenet.Roadsite.RoadsitePanelSkin;


            this._message = this._data.message;
        }
        public onShow( ...args: any[] ):void
        {

        }
        public onClose( ...args: any[] ):void
        {
            this.typeFont.stop();
        }
        public onUpdate( ...args: any[] ): void
        {

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
            if(this.typeFont)
            {
                this.typeFont.update(value);
            }
            else
            {
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
            if(instance == this.contentGroup){
                //添加一个大小显示对象
                this.createTypeFont(this._message);

            }else if(instance == this.scrollerDisplay){
                this.scrollerDisplay.verticalScrollPolicy = egret.gui.ScrollPolicy.OFF;
                this.scrollerDisplay.viewport = this.dataGroup;

            }else if(instance == this.dataGroup){

                //创建摊位
                this.createStalls();
                //创建金币购买摊位
                this.createBuyStall();
                //创建解锁摊位
                this.createUnlockStall();
            }
            else if( instance == this.titleDisplay )
            {
                this.titleDisplay.text = this._data.title;
            }
        }

        /**
         * 创建 摊位
         */
        private createStalls(data?: any): void{
            var data = data || this._data.data.list;
            var i: number = 0;
            var len: number = data.length;
            for(; i < len; ++i){
                var item: any = data[i];
                var itemRender: game.RoadsiteItemRender = new game.RoadsiteItemRender(item.state);
                itemRender.data = data;
                itemRender.icon = item.imgId;
                itemRender.sell = item.number;
                itemRender.price = item.number * item.price;
                itemRender.name = 'ROIR_' + item.id;
                this.dataGroup.addElement(itemRender);
                itemRender.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toSoldUp, this);
            }
        }

        /**
         * 购买 摊位
         * @param data
         */
        private createBuyStall(data?: number): void{
            var diamond: number = data || this._data.diamond;
            var itemRender: egret.gui.Button = new egret.gui.Button();
            itemRender.skinName = skins.uicompenet.Roadsite.RoadsiteBuyItemRenderSkin;
            itemRender.label = String(diamond);
            this.dataGroup.addElement(itemRender);
            itemRender.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addStall, this);
        }

        /**
         * 创建解锁 摊位
         * @param data
         */
        private createUnlockStall(data?: number): void{
            var value: string = (data || this._data.friends) + '个好友解锁';
            var itemRender: egret.gui.Button = new egret.gui.Button();
            itemRender.skinName = skins.uicompenet.Roadsite.RodesiteUnlockItemRenderSkin;
            itemRender.label = value;
            this.dataGroup.addElement(itemRender);
        }

        /**
         * (购买)新增一个 摊位
         */
        private addStall(): void{
            var index: number = this._data.data.list.length;
            var itemRender: game.RoadsiteItemRender = new game.RoadsiteItemRender(0);
            itemRender.icon = null;
            itemRender.sell = null;
            itemRender.price = null;
            this.dataGroup.addElementAt(itemRender, index);
        }

        /**
         * 转到 商品上架
         */
        private toSoldUp(evt: egret.TouchEvent): void{
            console.log('...商品上架...');
            var target: any = evt.currentTarget;
            var id: number = parseInt(target.name.replace(/[^0-9]/gi, ''), 10);
            var status: number = target.status;
            var itemNum: number = target.label;
            console.log('商品id = ', id);
            console.log('当前状态 = ', status);
            //这里应该根据当前item的状态来显示 上架 还是 下架
            var win: any;
            UIMgr.instance.closeCurrentPanel( function(){
                if( status == 1 )
                {
                    UIMgr.instance.show( PanelName.SOLD_DOWN_PANEL, null, [id, itemNum, status, target] );
                }
                else if( status == 0 )
                {
                    UIMgr.instance.show( PanelName.SOLDUP_PANEL, null, id, target );
                }
            });
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
