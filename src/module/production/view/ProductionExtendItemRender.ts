/**
 * Created by rodey on 14/12/12.
 *
 * 生产中可用的 生产物 item
 *
 */

module game{

    export class ProductionExtendItemRender extends egret.gui.Button{

        private _unLockLevel: any;
        private _isLock: boolean;

        public contentGroup: egret.gui.Group;
        public lockAsset: egret.gui.UIAsset;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Production.ProductionExtendItemRenderSkin;
        }

        public get unLockLevel(): any{ return this._unLockLevel; }
        public set unLockLevel(value: any){
            if(value === this._unLockLevel) return;
            this._unLockLevel = value;

            //判断解锁等级
            this.isLock();

        }

        private isLock(): void{

            if(this.contentGroup && this.lockAsset){

                if(this.unLockLevel > UserController.instance.level){
                    this.contentGroup.visible = false;
                    this.lockAsset.visible = true;
                }else{
                    this.contentGroup.visible = true;
                    this.lockAsset.visible = false;
                }

            }

        }

        /**
         * 实现 父类方法
         * @param partName
         * @param instance
         */
        public partAdded(partName: string, instance: any): void{
            super.partAdded(partName, instance);
        }


    }


}
