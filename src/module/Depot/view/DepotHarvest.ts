/**
 * Created by rodey on 15/1/10.
 */

module game{

    export class DepotHarvest extends egret.gui.SkinnableComponent implements IPanel{

        public noniusAsset: egret.gui.UIAsset;
        public iconAsset: egret.gui.UIAsset;

        private _icon: string;
        private _type: number;
        private controller: DepotController;
        public max: number; //仓库最大值
        public current: number; //仓库当前已存值
        private addNumber: number = 0; //当前增加的值
        private typeTitle: string; //仓库名称

        constructor(type?: number, num?: number){
            super();
            this.skinName = skins.uicompenet.Depot.DepotHarvestSkin;

            this._type = type;
            this.addNumber = num;
        }

        private init(): void{
            if(!this.controller){
                this.controller = DepotController.instance;
            }

            //根据仓库类型获取对样数据
            if(this._type == Global.DEPOT_STORAGE){
                //粮仓
                this.max = this.controller.searchLocalDataAsKey('storageMax');
                this.current = this.controller.searchLocalDataAsKey('storageNum');
                this.typeTitle = '粮仓';

            }else if(this._type == Global.DEPOT_WAREHOUSE){
                //货仓
                this.max = this.controller.searchLocalDataAsKey('warehouseMax');
                this.current = this.controller.searchLocalDataAsKey('warehouseNum');
                this.typeTitle = '货仓';

            }

            this.updateNonius();

        }

        public updateNonius(): void{
            var self = this;
            if(this.noniusAsset){
                //尺度计算

                var raw: number = 140 + this.current / this.max * 175;

                var now: number = raw + this.addNumber / this.max * 175;
                console.log('DepotHarvest: ========>>>')
                console.log('current: ', this.current)
                console.log('max: ', this.max)
                console.log('add: ', this.addNumber)
                console.log('raw: ', raw)
                console.log('now: ', now)

                egret.Tween.get(this.noniusAsset).wait(800).to({ x: now }, 800, egret.Ease.sineOut).call(function(){
                    egret.Tween.removeTweens(self.noniusAsset);
                    if(self.current + self.addNumber > self.max){
                        self.noniusAsset.x = 315;
                        //爆仓提示
                        self.blastWarehouse();
                    }
                });
            }
        }

        public blastWarehouse(): void{
            var title: string = '资源提示';
            var message: string = this.typeTitle + '快满了，是否要扩建该仓库？';
            //UIMgr.instance.show( PanelName.CONFIRM_PANEL, {direction:Direction.CENTER}, title, message );
            //GameEvent.watcher.addEventListener(GameEvent.CONFIRM, this.blastHandler, this);
            Confirm.instance.show( title, message, this.blastHandler, this );
        }

        private blastHandler(evt: egret.TouchEvent): void{
            console.log('回调....')
            var target: any = evt.currentTarget || evt.target;
            //调用控制器
            DepotExtendController.getInstance().init(this._type || target.data.type);
        }

        public onShow( ...args: any[] ): void{
            if(args[0]){
                this._type = args[0];
                if(this._type == Global.DEPOT_STORAGE){
                    //粮仓
                    this.icon = 'CC_06';
                }else if(this._type == Global.DEPOT_WAREHOUSE){
                    //货仓
                    this.icon = 'CC_09';
                }
            }
            if(args[1]){
                this.addNumber = args[1];
            }

            //
            this.init();
        }
        public onClose( ...args: any[] ): void{

        }
        public onUpdate( ...args: any[] ): void{

        }

        public get icon(): string{
            return this._icon;
        }
        public set icon(value: string){
            if(value == this._icon)
                return;
            this._icon = value;
            if(this.iconAsset){
                this.iconAsset.source = value;
            }
        }

        public partAdded( partName: string, instance: any ): void{
            super.partAdded( partName, instance);
            if(instance == this.iconAsset){
                this.iconAsset.source = this._icon;
            }else if(this.noniusAsset){
                var raw: number = 140 + Math.round(this.current / this.max) * 175;
                this.noniusAsset.x = raw;
            }
        }

    }

}
