/**
 * Created by rodey on 14/12/12.
 *
 * 生产中可用的 生产物 item
 *
 */

module game{

    export class ProductionDoingItemRender extends egret.gui.ItemRenderer{

        //追加一个图标
        public iconAsset: egret.gui.UIAsset;
        public capAsset: egret.gui.UIAsset;
        private _icon: string;
        private _cap: boolean = false;

        //加速
        public speedButton: game.SpeedButton;
        //动画
        public mcAsset: egret.gui.UIAsset;
        private dongMC: game.ProductionDoingMC;
        private stim: any;


        constructor(){
            super();
            this.skinName = skins.uicompenet.Production.ProductionDoingItemRenderSkin;
        }

        /**
         * 获取或设置 生成物 图片
         * @returns {string}
         */
        public get icon(): string{ return this._icon; }
        public set icon(value: string){
            if(value == this._icon) return;
            this._icon = value;
            if(this.iconAsset){ this.iconAsset.source = RES.getRes(value); }
        }

        public get cap():boolean{ return this._cap; }
        public set cap(value:boolean){
            if(value == this._cap) return;
            this._cap = value;
            /*if(this.capAsset){
                if(value == true){
                    //盖上
                    this.downCap();
                }else{
                    //揭盖
                    this.upCap();
                }
            }*/
        }

        public start(wait: number = 300): void{

            var self = this;
            if(this.stim){ window.clearTimeout(this.stim); }
            if(!this.dongMC){
                this.dongMC = new game.ProductionDoingMC();
            }
            this.mcAsset.visible = true;
            this.mcAsset.source = this.dongMC;
            this.stim = window.setTimeout(function(){
                self.dongMC.play();
            }, 300);

        }

        public stop(): void{

            if(this.stim){ window.clearTimeout(this.stim); }
            if(this.mcAsset.source){
                this.mcAsset.source = null;
                this.mcAsset.visible = false;
            }
            if(this.dongMC){
                this.dongMC.stop();
                this.dongMC = null;
            }

        }

        public downCap(): void{

            var self = this;
            this.capAsset.visible = true;
            egret.Tween.removeTweens(self.capAsset);
            egret.Tween.get(this.capAsset).wait(300).to({ alpha: .8, y: 85 }, 200).call( ()=>{
                egret.Tween.removeTweens(self.capAsset);

            } );

        }

        public upCap(): void{

            var self = this;
            egret.Tween.removeTweens(self.capAsset);
            egret.Tween.get(this.capAsset).to({ alpha: 0, y: 40 }, 200).call( ()=>{
                self.capAsset.visible = false;
                egret.Tween.removeTweens(self.capAsset);
            } );

        }

        public capWall(bo: boolean): void{
            if(bo == true){
                egret.Tween.removeTweens(this.capAsset);
                this.capAsset.visible = true;
                this.capAsset.y = 85;
                this.capAsset.alpha = .8;
                this.cap = true;
            } else {
                egret.Tween.removeTweens(this.capAsset);
                this.capAsset.visible = false;
                this.capAsset.y = 40;
                this.capAsset.alpha = 0;
                this.cap = false;
            }

        }

        /**
         * 设置数据
         */
        public dataChanged(): void{
            this.iconAsset.source = this.data.imgId || this.data.itemImgId || '';
            this.speedButton.label = String(this.data.speedDiamod || 0);
        }

        /**
         * 实现 父类方法
         * @param partName
         * @param instance
         */
        public partAdded(partName: string, instance: any): void{
            super.partAdded(partName, instance);
            if(instance == this.iconAsset){
                this.iconAsset.source = RES.getRes(this._icon);
            }else if(instance == this.speedButton){
                //this.speedButton.skinName = skins.uicompenet.Production.ProductionSpeedButtonSkin;
                this.speedButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.speedUpDoing, this);
            }
        }

        private speedUpDoing(evt: egret.TouchEvent): void{
            this.speedButton.dispatchEventWith(GameEvent.SPEED_UP_DOING_PRODUCT, true, this);
        }


    }


}
