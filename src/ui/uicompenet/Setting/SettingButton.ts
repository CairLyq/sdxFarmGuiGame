/**
 * Created by rodey on 15/4/9.
 */

module game{

    export class SettingButton extends egret.gui.Button{

        public bgAsset: egret.gui.UIAsset;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Setting.SettingButtonSkin;
        }

        public childrenCreated(): void{
            super.childrenCreated();

            if(this.bgAsset){
                this.bgAsset.source = 'SZ_aniu';
            }

        }

    }

}
