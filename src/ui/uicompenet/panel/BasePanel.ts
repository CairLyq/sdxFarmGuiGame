/**
 * Created by rodey on 14/12/2.
 *
 * 弹窗基类
 */

module game{

    export class BasePanel extends egret.gui.TitleWindow{

        constructor(){
            super();
            this.skinName = skins.uicompenet.BasePanelSkin;
        }

        /**
         * 标题 UIAsset素材
         */
        public titleAsset: egret.gui.UIAsset;
        private _ta:any;

        public get ta(): any{
            return this._ta;
        }
        public set ta(value: any){
            if(value == this._ta) return;
            this._ta = value;
            if(this.titleAsset){
                this.titleAsset.source = value;
            }
        }


        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);

            if (instance == this.titleAsset){
                this.titleAsset.source = this._ta;
            }
        }


    }


}
