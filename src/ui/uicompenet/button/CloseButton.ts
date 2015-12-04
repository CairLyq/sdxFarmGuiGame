/**
 * Created by rodey on 14/12/9.
 *
 * GUI Close Button 关闭按钮
 *
 */

module game{

    export class CloseButton extends game.GuiButtonBase{

        constructor(key?: string){
           super();
            this.skinName = skins.uicompenet.Buttons.GuiButtonBaseSkin;
        }

        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
            if(instance = this.btnAsset){
                this.btnAsset.source = RES.getRes('FZJZ-guanbi');
            }
        }

    }

}
