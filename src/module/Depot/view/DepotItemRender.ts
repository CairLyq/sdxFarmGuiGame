/**
 * Created by rodey on 14/12/24.
 */

module game{

    export class DepotItemRender extends egret.gui.ItemRenderer{

        //追加一个图标
        public shadowAsset: egret.gui.UIAsset;
        private _shadow: string;

        //追加一个 存储生成物描述的 Label
        public messageLabel: egret.gui.Label;
        private _msg: string;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Depot.DepotItemRenderSkin;
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
                this.shadowAsset.source = RES.getRes(value);
            }
        }

        /**
         * 获取或设置 描述文字
         * @returns {string}
         */
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

        /**
         * 设置数据
         */
        public dataChanged(): void{
            //console.log(RES.getRes(this.data.imgId))
            this.shadowAsset.source = RES.getRes(this.data.imgId);
            this.messageLabel.text = this.data.desc;
            this.labelDisplay.text = String(this.data.itemNum);
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
            }else if(instance == this.messageLabel){
                this.messageLabel.text = this._msg;
            }
        }


    }


}
