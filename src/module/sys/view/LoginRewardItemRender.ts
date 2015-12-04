/**
 * Created by rodey on 15/4/21.
 */

module game{

    export class LoginRewardItemRender extends egret.gui.ItemRenderer{

        public acceptBtn: egret.gui.Button;
        public lockAsset: egret.gui.UIAsset;
        public lockIconAsset: egret.gui.UIAsset;
        public diamondBtn: egret.gui.Button;
        public goldBtn: egret.gui.Button;
        public itemBtn: egret.gui.Button;
        public dayLabel: egret.gui.Label;

        private _index: number = 0;
        private loginReward: any;

        constructor(index: number, loginReward: any){
            super();
            this.skinName = skins.uicompenet.System.LoginRewardItemRenderSkin;

            this._index = index;
            this.loginReward = loginReward;

        }

        public dataChanged(): void{
            super.dataChanged();

            if(this.diamondBtn){
                this.diamondBtn.label = String(this.data.diamond);
            }
            if(this.goldBtn){
                this.goldBtn.label = String(this.data.gold);
            }
            if(this.itemBtn){
                this.itemBtn.icon = this.data.item['imgId'];
                this.itemBtn.label = String(this.data.item['itemNum']);
            }

        }

        public childrenCreated(): void{
            super.childrenCreated();

            if(this.dayLabel){
                this.dayLabel.text = '第 ' + this._index + ' 天';
            }

            if(this.acceptBtn){

                this.acceptBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toAccept, this);

                if(this._index < this.loginReward.day && this.loginReward.status !== 0){
                    this.acceptBtn.visible = false;
                }
                else if(this._index == this.loginReward.day && this.loginReward.status === 0){
                    this.acceptBtn.visible = true;
                    //this.acceptBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toAccept, this);
                }
                else{
                    this.acceptBtn.visible = false;
                }

            }

            if(this.lockAsset){
                if(this._index < this.loginReward.day){
                    this.lockAsset.visible = true;
                    this.lockIconAsset.visible = true;
                }
                else{
                    this.lockAsset.visible = false;
                    this.lockIconAsset.visible = false;
                }
            }

        }

        private toAccept(evt: egret.TouchEvent): void{
            GameEvent.BubbEvent(evt);

            if(this._index == this.loginReward.day && this.loginReward.status !== 0){
                return;
            }

            var target: any = evt.currentTarget || evt.target;
            TweenIt.tweenBigThenNormal(target, ()=>{
                GameSystemController.instance.sendLoginReward();
            });

        }

    }

}
