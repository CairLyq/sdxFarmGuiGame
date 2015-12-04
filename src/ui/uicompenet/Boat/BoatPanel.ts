/**
 * Created by rodey on 14/12/22.
 * 飞空艇
 *
 */

module game{

    export class BoatPanel extends egret.gui.SkinnableComponent implements IPanel
    {
        private contentGroup:egret.gui.Group;
        private titleDisplay:egret.gui.Label;
        //追加一个 Npc对话内容
        private _message: string;
        //一个打字显示对象
        private typeFont: game.TypeFont;

        //追加一个 Scroller
        public scrollerDisplay: egret.gui.Scroller;
        //追加一个 Group
        public dataGroup: egret.gui.Group;
        //追加一个发送的按钮
        public startBtn: egret.gui.UIAsset;

        //追加一个 金币数
        public priceLabel: egret.gui.Label;
        private _price: number;
        //追加一个 经验值
        public experienLabel: egret.gui.Label;
        private _experien: number;

        //数据
        private _data: any = {
            title: '飞空艇',
            message: '飞空艇来咯！飞空艇的箱子即可以单个发出也可以全部一起发出哦，一起发出奖励会提升哦！',
            data: {
                price: 1234,
                experien: 5678,
                list: [
                    { id: 1, imgId: 'sp-lajiao', total: 3 },
                    { id: 2, imgId: 'sp-lajiao', total: 5 },
                    { id: 3, imgId: 'sp-lajiao', total: 15 },
                    { id: 4, imgId: 'sp-lajiao', total: 25 },
                    { id: 5, imgId: 'sp-lajiao', total: 35 },
                    { id: 6, imgId: 'sp-lajiao', total: 45 },
                    { id: 7, imgId: 'sp-lajiao', total: 55 },
                    { id: 8, imgId: 'sp-lajiao', total: 65 },
                    { id: 9, imgId: 'sp-lajiao', total: 75 }
                ]
            }
        };


        constructor(){
            super();
            this.skinName = skins.uicompenet.Boat.BoatPanelSkin;

            this._message = this._data.message;

            this._price = this._data.data.price;
            this._experien = this._data.data.experien;

        }
        public onShow( ...args: any[] ):void
        {

        }
        public onClose( ...args: any[] ):void
        {
            this.typeFont.stop();
        }
        public onUpdate( ...args: any[] ):void
        {

        }

        /**
         * 获取或设置金币
         * @returns {number}
         */
        public get price(): number{
            return this._price;
        }
        public set price(value: number){
            if(value == this._price)
                return;
            this._price = value;
            if(this.priceLabel){
                this.priceLabel.text = String(value);
            }

        }

        /**
         * 获取或设置经验值
         * @returns {number}
         */
        public get experien(): number{
            return this._price;
        }
        public set experien(value: number){
            if(value == this._price)
                return;
            this._price = value;
            if(this.priceLabel){
                this.priceLabel.text = String(value);
            }

        }


        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
            if(instance == this.scrollerDisplay){
                this.scrollerDisplay.viewport = this.dataGroup;
                this.scrollerDisplay.verticalScrollPolicy = egret.gui.ScrollPolicy.OFF;

            }else if(instance == this.dataGroup){


                //创建 列表
                this.createList(this._data.data.list);

            }else if(instance == this.startBtn){
                this.startBtn.touchEnabled = true;
                this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toStartSend, this);

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
         * 创建箱子
         * @param data
         */
        private createList(data?: any[]){
            var data: any[] = data || this._data.data.list;
            var i: number = 0;
            var len: number = data.length;
            for(; i < len; ++i){
                var item: any = data[i];
                var itemRender: game.BoatItemRender = new game.BoatItemRender();
                itemRender.status = 1; //默认都是空的
                itemRender.icon = item.imgId;
                this.dataGroup.addElement(itemRender);

                itemRender.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toBinning, this);
            }
            this.scrollerDisplay.viewport = this.dataGroup;
        }


        private toBinning(evt: egret.TouchEvent): void{
            console.log('...转到装箱...')
            var target: game.BoatItemRender = evt.currentTarget || evt.target;
            if(target.status == 1){
                return;
            }else{
                //转到装箱面板

            }
        }


        private toStartSend(evt: egret.TouchEvent): void{
            console.log('.../..', '送走')
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