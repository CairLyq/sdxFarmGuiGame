/**
 * Created by rodey on 15/4/21.
 */

module game{

    export class SignInRewardItemRender extends egret.gui.ItemRenderer{

        public bgAsset: egret.gui.UIAsset;
        public currentAsset: egret.gui.UIAsset;
        public iconAsset: egret.gui.UIAsset;
        public lockBgAsset: egret.gui.UIAsset;
        public lockIconAsset: egret.gui.UIAsset;
        public indexLabel: egret.gui.Label;
        public giveLabel: egret.gui.Label;

        private _index: number = 0;
        private signReward: any;

        constructor(index: number, signReward: any){
            super();
            this.skinName = skins.uicompenet.System.SignInRewardItemRenderSkin;

            this._index = index;
            this.signReward = signReward;

            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toAccept, this);

        }

        public dataChanged(): void{
            super.dataChanged();

            if(null !== this.data.item){
                this.iconAsset.source = this.data.item['imgId'];
                this.giveLabel.text = String(this.data.item['itemNum']);
            }
            if(null !== this.data.diamond){
                this.iconAsset.source = 'ZJMER-zuanshi';
                this.giveLabel.text = String(this.data.diamond);
            }
            if(null !== this.data.gold){
                this.iconAsset.source = 'ZJMER-jinbi';
                this.giveLabel.text = String(this.data.gold);
            }

            if(this.indexLabel){
                this.indexLabel.text = String(this._index);
            }

        }

        private toAccept(evt: egret.TouchEvent): void{
            GameEvent.BubbEvent(evt);

            if(this._index == this.signReward.day && this.signReward.status !== 0){
                return;
            }

            GameSystemController.instance.sendSignInReward();

        }

        public childrenCreated(): void{
            super.childrenCreated();

            if(this.currentAsset){
                if(this._index <= this.signReward.day && this.signReward.status !== 0){
                    this.currentAsset.visible = false;
                    this.bgAsset.visible = true;

                    this.touchChildren = false;
                    this.touchEnabled = false;
                }
                else if(this._index == this.signReward.day && this.signReward.status === 0){

                    this.currentAsset.visible = true;
                    this.bgAsset.visible = false;

                    this.touchChildren = true;
                    this.touchEnabled = true;

                }
                else{
                    this.currentAsset.visible = false;
                    this.bgAsset.visible = true;

                    this.touchChildren = false;
                    this.touchEnabled = false;
                }
            }

            if(this.lockBgAsset && this.lockIconAsset){

                if(this._index < this.signReward.day){
                    this.lockBgAsset.visible = true;
                    this.lockIconAsset.visible = true;

                }else{
                    this.lockBgAsset.visible = false;
                    this.lockIconAsset.visible = false;

                }

            }

        }

    }

}
