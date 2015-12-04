/**
 * Created by rodey on 14/12/22.
 *
 * 飞空艇 订单物品
 *
 */

module game{

    export class BoatItemRender extends egret.gui.ItemRenderer{

        //追加一个 箱子状态
        public boxAsset: egret.gui.UIAsset;
        private _status: number = 0;
        //追加一个 物品图片
        public iconAsset: egret.gui.UIAsset;
        private _icon: string;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Boat.BoatItemRenderSkin;

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
                this.iconAsset.source = RES.getRes(value);
            }
        }

        /**
         * 获取 或 设置 当前箱子状态
         * @returns {number}
         */
        public get status(): number{
            return this._status;
        }
        public set status(value: number){
            if(value == this._status)
                return;
            this._status = value;
            if(this._status == 0){
                if(this.boxAsset)
                    this.boxAsset.source = RES.getRes('FKT-kongxiang');
                if(this.iconAsset)
                    this.iconAsset.source = RES.getRes(this._icon);
            }else{
                if(this.boxAsset)
                    this.boxAsset.source = RES.getRes('FKT-shixiang');
                if(this.iconAsset)
                    this.iconAsset.source = RES.getRes('KJ-gou');
            }
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
            if(instance == this.iconAsset){
                this.iconAsset.source = RES.getRes(this._icon);
                if(this._status == 0){
                    if(this.iconAsset)
                        this.iconAsset.source = RES.getRes(this._icon);
                }else{
                    if(this.iconAsset)
                        this.iconAsset.source = RES.getRes('KJ-gou');
                }

            }else if(instance == this.boxAsset){
                this.boxAsset.source = RES.getRes('FKT-kongxiang');
                if(this._status == 0){
                    if(this.boxAsset)
                        this.boxAsset.source = RES.getRes('FKT-kongxiang');
                }else{
                    if(this.boxAsset)
                        this.boxAsset.source = RES.getRes('FKT-shixiang');
                }

            }
        }



    }

}
