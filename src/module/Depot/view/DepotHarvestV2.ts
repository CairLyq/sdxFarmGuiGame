/**
 * Created by rodey on 15/1/10.
 */

module game{

    export class DepotHarvestV2 extends egret.gui.SkinnableComponent implements IPanel{

        public iconAsset: egret.gui.UIAsset;
        public pressAsset: egret.gui.UIAsset;
        public labelDisplay: egret.gui.Label;

        private _icon: string;
        private _type: number; //仓库类别
        private controller: DepotController;
        public max: number; //仓库最大值
        public current: number; //仓库当前已存值
        private addNumber: number = 0; //当前增加的值
        private typeTitle: string; //仓库名称
        private maskRect: egret.Rectangle;
        private depotObject: any;

        constructor(type?: number, num?: number){
            super();
            this.skinName = skins.uicompenet.Depot.DepotHarvestSkin;

            this.maskRect = new egret.Rectangle(0, 0, 79, 24);
            this._type = type;
            this.addNumber = num;

            this.current = 0;
            this.max = 0;

            //this.init();
        }

        private init(): void{
            if(!this.controller){
                this.controller = DepotController.instance;
            }

            //根据仓库类型获取对样数据
            this.max        = this.controller.getLocalDataMax(this._type);
            this.current    = this.controller.getLocalDataTotalNum(this._type);

            if(this.labelDisplay){
                this.labelDisplay.text = this.current + '/' + this.max;
            }

            this.updateNonius();

        }

        public updateNonius(): void{
            var self = this;

            var pre: number = Math.floor(this. current / this.max * 79);
            this.maskRect = new egret.Rectangle(0, 0, pre, 24);
            if(this.pressAsset){

                this.pressAsset.mask = this.maskRect;

                //if(self.current + self.addNumber > self.max){
                if(self.current > self.max){
                    self.maskRect.width = 79;
                    //爆仓提示
                    if(this.depotObject.isBlash){
                        self.blastWarehouse();
                    }
                    return;
                }

            }
            if(this.labelDisplay){
                this.labelDisplay.text = this.current + '/' + this.max;
            }

        }

        public blastWarehouse(): void{
            if(this._type == Global.DEPOT_STORAGE){
                //粮仓
                this.typeTitle = '粮仓';
            }else if(this._type == Global.DEPOT_WAREHOUSE){
                //货仓
                this.typeTitle = '货仓';
            }
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
            var self = this;
            if(args[0]){
                this._type = args[0];
                if(this._type == Global.DEPOT_STORAGE){
                    //粮仓
                    this.icon = 'CC_05';
                }else if(this._type == Global.DEPOT_WAREHOUSE){
                    //货仓
                    this.icon = 'CC_07';
                }
            }
            if(args[1]){
                this.addNumber = args[1];
            }

            if(args[2]){
                this.depotObject = args[2];
            }

            //
            this.init();

            this.visible = true;
            egret.Tween.get(this).to({ x: Lyrs.SW - 140 }, 100, egret.Ease.quadInOut).call(()=>{

                /*if(self.labelDisplay){
                    self.labelDisplay.text = self.depotObject.current + '/' + self.depotObject.max;
                }*/

                if(args[3]){

                    (args[3]).call(self);

                }
            });

        }
        public onClose( ...args: any[] ): void{

            var self = this;
            egret.Tween.get(this).to({ x: Lyrs.SW + 140 }, 300, egret.Ease.sineOut).call(function(){
                //self.visible = false;
            });

        }
        public onUpdate( ...args: any[] ): void{

            var self = this;
            if(args[0]){
                this._type = args[0];
                if(this._type == Global.DEPOT_STORAGE){
                    //粮仓
                    this.icon = 'CC_05';
                }else if(this._type == Global.DEPOT_WAREHOUSE){
                    //货仓
                    this.icon = 'CC_07';
                }
            }
            if(args[1]){
                this.addNumber = args[1];
            }

            if(args[2]){
                this.depotObject = args[2];
            }

            //
            this.init();

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

        public get label(): string{ return this.labelDisplay.text; }
        public set label(value: string){
            this.labelDisplay && (this.labelDisplay.text = value);
        }

        public partAdded( partName: string, instance: any ): void{
            super.partAdded( partName, instance);
            if(instance == this.iconAsset){

                this.iconAsset.source = this._icon;

            }
            else if(instance == this.pressAsset){

                this.pressAsset.mask = this.maskRect;

            }
            else if(instance == this.labelDisplay){

                this.labelDisplay.text = this.current + '/' + this.max;

            }
        }

    }

}
