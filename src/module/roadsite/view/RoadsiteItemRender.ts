/**
 * Created by rodey on 14/12/17.
 *
 * 路边小店 item
 *
 */

module game{
    export class RoadsiteItemRender extends egret.gui.ItemRenderer{

        //追加一个 显示卖价
        public showPrice: egret.gui.Button;
        private _price: number;
        //追加一个 空闲
        public freeAsset: egret.gui.UIAsset;
        //追加一个 卖量
        public numLabel: egret.gui.Label;
        private _sell: number;
        //追加一个 卖品个图片
        public iconAsset: egret.gui.UIAsset;
        private _icon: string;

        //追加一个 状态（是否已售出）
        private _status: number = 0;

        constructor(status?: number){
            super();
            this.skinName = skins.uicompenet.Roadsite.RoadsiteItemRenderSkin;

            this._status = status || 0;
        }

        /**
         * 获取或设置 卖品数量
         * @returns {number}
         */
        public get sell(): number{
            return this._sell;
        }
        public set sell(value: number){
            if(value == this._sell)
                return;
            this._sell = value;
            if(this.numLabel){
                if(!value){
                    this.numLabel.alpha = 0;
                }else{
                    this.numLabel.text = String(value);
                    this.numLabel.alpha = 1;
                }
            }
        }

        /**
         * 获取或设置 卖品价格
         * @returns {number}
         */
        public get price(): number{
            return this._price;
        }
        public set price(value: number){
            if(value == this._price)
                return;
            this._price = value;
            if(this.showPrice){
                this.showPrice.label = String(value);
                //如果是 未售出
                if(this._status == 0){
                    this.icon = 'KJ-jia';
                    this.sell = null;
                    this.showPrice.alpha = 0;
                    this.freeAsset.alpha = 1;
                }else if(this._status == 1){
                    this.showPrice.alpha = 1;
                    this.freeAsset.alpha = 0;
                }else if(this._status == 2){
                    this.showPrice.alpha = 1;
                    this.freeAsset.alpha = 0;
                }
            }
        }

        /**
         * 获取或设置 卖品图片
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
                this.iconAsset.source = (!value) ? 'KJ-jia' : RES.getRes(value);
            }
        }

        public get status(): number{
            return this._status;
        }
        public set status(value: number){
            if(value == this._status)
                return;
            this._status = value;
        }


        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
            if(instance == this.iconAsset){
                this.iconAsset.source = RES.getRes(this._icon);

            }else if(instance == this.numLabel){
                if(!this._sell){
                    this.numLabel.alpha = 0;
                }else{
                    this.numLabel.text = String(this._sell);
                    this.numLabel.alpha = 1;
                }
            }else if(instance == this.showPrice){
                this.showPrice.label = String(this._price);
                //如果是 未售出
                if(this._status == 0){
                    this.icon = 'KJ-jia';
                    this.sell = null;
                    this.showPrice.alpha = 0;
                    this.freeAsset.alpha = 1;
                }else if(this._status == 1){
                    this.showPrice.alpha = 1;
                    this.freeAsset.alpha = 0;
                }else if(this._status == 2){
                    this.showPrice.alpha = 1;
                    this.freeAsset.alpha = 0;
                }
            }else if(instance == this.freeAsset){
                //如果是 未售出
                if(this._status == 0){
                    this.icon = 'KJ-jia';
                    this.sell = null;
                    this.price = null;
                    this.showPrice.alpha = 0;
                    this.freeAsset.alpha = 1;
                }else if(this._status == 1){
                    this.showPrice.alpha = 1;
                    this.freeAsset.alpha = 0;
                }else if(this._status == 2){
                    this.showPrice.alpha = 1;
                    this.freeAsset.alpha = 0;
                }
            }
        }



    }
}
