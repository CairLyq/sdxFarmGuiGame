/**
 * Created by rodey on 15/3/2.
 */

module game{

    export class MerchantPersonPanel extends egret.gui.SkinnableComponent implements IPanel {

        public closeButton: egret.gui.UIAsset;
        public scrollerDisplay: egret.gui.Scroller;
        public dataGroup: egret.gui.Group;

        public controller: MerchantPersonController;
        public building: MerchantPersonBuilding;
        private _data: any;
        private _dataArray: any[] = [];

        constructor(){
            super();
            this.skinName = skins.uicompenet.MerchantPerson.MerchantPersonPanelSkin;

            if(!this.controller){
                this.controller = MerchantPersonController.getInstance();
            }

        }

        public init(): void{

            this._data = this.controller.getData();

            if(this.dataGroup){
                this.createListItem();
            }

        }

        public onShow( ...args: any[] ): void{

            if(args[0] && args[0] instanceof MerchantPersonBuilding){
                this.building = args[0];
            }

            this.init();

        }
        public onClose( ...args: any[] ): void{

        }
        public onUpdate( ...args: any[] ): void{

        }

        public childrenCreated(): void{
            super.childrenCreated();

            if(this.closeButton){
                this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
            }

        }

        public partAdded(partName: string, instance: any): void{
            super.partAdded(partName, instance);
            if(instance == this.closeButton){
                //this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
            }
            else if(instance == this.dataGroup){
                this._data = this.controller.getData();
                //this.createListItem();
            }
        }

        public closeHandler(evt: egret.TouchEvent): void{
            GameEvent.BubbEvent(evt);
            var target: egret.gui.UIAsset = evt.currentTarget || evt.target;
            TweenIt.tweenBigThenNormal(target, function(){
                UIMgr.instance.closeCurrentPanel();
            });

        }

        /**
         * 创建多个item
         */
        private createListItem(): void{

            var self = this;

            if(this._data.length == 0)
                return;

            this.dataGroup.removeAllElements();
            var item: game.MerchantItenRender;

            for(var i: number = 0, len: number = this._data.length; i < len; ++i){
                item = new game.MerchantItenRender();
                item.data = this._data[i];

                this.dataGroup.addElement(item);
            }

            this.scrollerDisplay.viewport = this.dataGroup;

        }


        public getItemRender(orderId: number): game.MerchantItenRender{
            if(!this.dataGroup) return;
            var childs: any = this.dataGroup.numElements;
            if(childs === 0) return;

            for(var i: number = 0; i < childs; ++i){
                var item: any = this.dataGroup.getElementAt(i);
                if(orderId == item.data.orderId){
                    return item;
                }
            }
            return null;
        }

    }


}
