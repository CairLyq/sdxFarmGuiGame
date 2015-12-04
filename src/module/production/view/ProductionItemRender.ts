/**
 * Created by rodey on 14/12/12.
 *
 * 生产中可用的 生产物 item
 *
 */

module game{

    export class ProductionItemRender extends egret.gui.ItemRenderer{

        //追加一个图标
        public shadowAsset: egret.gui.UIAsset;
        private _shadow: string;
        public bgAsset: egret.gui.UIAsset;
        public lockAsset: egret.gui.UIAsset;
        private _itemNum: number;
        public labelDisplay: egret.gui.Label;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Production.ProductionItemRenderSkin;
        }

        /**
         * 获取或设置 生成物 图片
         * @returns {string}
         */
        public get shadow(): string{
            return this._shadow;
        }
        public set shadow(value: string){
            if(value == this._shadow)
                return;
            this._shadow = value;
            if(this.shadowAsset){
                this.shadowAsset.source = value;
            }
        }

        public get itemNum(): number{ return this._itemNum; }
        public set itemNum(value: number){
            if(value == this._itemNum) return;
            this._itemNum = value;
            if(this.labelDisplay){
                this.labelDisplay.text = String(value);
                if(value <= 0){
                    this.labelDisplay.textColor = 0xFF0000;
                }else{
                    this.labelDisplay.textColor = 0xFFFFFF;
                }
            }
        }

        /**
         * 设置数据
         */
        public dataChanged(): void{
            //console.log(RES.getRes(this.data.imgId))

            //当前物品的仓库数量
            var itemNum: number = DepotController.instance.getItemNumByItemId(this.data.itemId);
            this._itemNum = itemNum;
            //判断解锁等级
            var level: number = UserController.instance.level;
            var unlockLevel: number = DepotModel.getModelById(this.data.itemId).unlockLv;
            if(level < unlockLevel){
                this.lockAsset.visible = true;
                this.labelDisplay.visible = false;
                //this.labelDisplay.text = ''; //String(this.data.itemNum || this.data.number);
            }else{
                this.lockAsset.source = false;
                this.labelDisplay.visible = true;
                this.labelDisplay.text = String(itemNum); //String(this.data.itemNum || this.data.number);
            }

            if(itemNum <= 0){
                this.labelDisplay.textColor = 0xFF645C;
            }else{
                this.labelDisplay.textColor = 0xFFFFFF;
            }

            this.shadowAsset.source = this.data.itemImgId || this.data.imgId;

        }

        /**
         * 实现 父类方法
         * @param partName
         * @param instance
         */
        public partAdded(partName: string, instance: any): void{
            super.partAdded(partName, instance);
            if(instance == this.shadowAsset){
                this.shadowAsset.source = RES.getRes(this._shadow);
            }
        }


    }


}
