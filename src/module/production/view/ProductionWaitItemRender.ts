/**
 * Created by rodey on 14/12/12.
 *
 * 生产中等待 生产物 item
 *
 */

module game{

    export class ProductionWaitItemRender extends egret.gui.ItemRenderer{

        //追加一个图标
        public iconAsset: egret.gui.UIAsset;
        private _icon: string;
        public boxAsset: egret.gui.UIAsset;
        public capAsset: egret.gui.UIAsset;
        //索引
        private _index: number;
        private _status: boolean = false;
        private _cap: boolean = false;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Production.ProductionWaitItemRenderSkin;
        }

        /**
         * 获取或设置 生成物 图片
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
                if(!value){
                    this.iconAsset.visible = false;
                }else{
                    this.iconAsset.visible = true;
                }
                this.iconAsset.source = value;
            }
        }

        public get index(): number{
            return this._index;
        }
        public set index(value: number){
            this._index = value;
        }

        public get status(): boolean{ return this._status; }
        public set status(value: boolean){
            if(value == this._status) return;
            this._status = value;
            if(this.boxAsset){
                if(this._status == true){
                    this.boxAsset.source = 'SCJZ_dakaixiangzi';
                }else if(this._status == false){
                    this.boxAsset.source = 'SCJZ_xiangzi';
                }
            }
        }

        public get cap():boolean{ return this._cap; }
        public set cap(value:boolean){
            if(value == this._cap) return;
            this._cap = value;
            if(this.capAsset){
                if(value == true){
                    //盖上
                    this.downCap();
                }else{
                    //揭盖
                    this.upCap();
                }
            }
        }

        private downCap(): void{

            var self = this;
            this.capAsset.visible = true;
            egret.Tween.removeTweens(self.capAsset);
            egret.Tween.get(this.capAsset).wait(150).to({ alpha: .8, y: 3 }, 200).call( ()=>{
                egret.Tween.removeTweens(self.capAsset);

            } );

        }

        private upCap(): void{

            var self = this;
            egret.Tween.removeTweens(self.capAsset);
            egret.Tween.get(this.capAsset).to({ alpha: 0, y: -14 }, 200).call( ()=>{
                self.capAsset.visible = false;
                egret.Tween.removeTweens(self.capAsset);
            } );

        }


        /**
         * 设置数据
         */
        public dataChanged(): void{
            this.iconAsset.source = this.data.imgId || null;
            //this.labelDisplay.text = String(this.data.number);

            if(this._status == true){
                this.boxAsset.source = 'SCJZ_dakaixiangzi';
            }else if(this._status == false){
                this.boxAsset.source = 'SCJZ_xiangzi';
            }
        }


        /**
         * 实现 父类方法
         * @param partName
         * @param instance
         */
        public partAdded(partName: string, instance: any): void{
            super.partAdded(partName, instance);
            if(instance == this.iconAsset){
                this.iconAsset.source = this._icon;
            }else if(instance == this.boxAsset){
                this.boxAsset.source = 'SCJZ_xiangzi';
            }
        }


    }


}
