/**
 * Created by rodey on 14/12/17.
 *
 * 仓库扩充
 */

module game{
    export class DepotExtendPanel extends egret.gui.SkinnableComponent implements IPanel
    {

        //追加一个 返回按钮
        public returnBtn: egret.gui.UIAsset;
        private contentGroup:egret.gui.Group;

        //追加一个 确认按钮
        public okBtn: egret.gui.Button;
        public poorLabel: egret.gui.Label;
        private _poor: string;
        public listGroup: egret.gui.Group;

        private controller: DepotExtendController;
        //当前扩充状态
        private status: string = 'food';
        private _list: any[] = [];


        private _data: any;

        constructor(status?: string){
            super();
            this.skinName = skins.uicompenet.Depot.DepotExtendPanelSkin;

            if(!this.controller){
                this.controller = DepotExtendController.getInstance()
            }
        }

        private init(): void{
            //拿数据
            var data: any = this.controller.recomData();
            //console.log(data);
            this._data = data;

            this.poor = '当前储量: ' + this._data.data.max + '  提升后储量: ' + this._data.data.nextMax;

            this._list = this._data.data.list;
           //创建列表
            if(this._data && this._data.data.list){
                this.createList(this._list);

                if(this.okBtn){
                    if(!this.isShuffExtend()){
                        this.okBtn.visible = false;
                    }else{
                        this.okBtn.visible = true;
                    }
                }
            }


        }

        public onShow( ...args: any[] ):void
        {
            this.init();
        }
        public onClose( ...args: any[] ):void
        {
            this._data = [];
            this.status = 'food';
            this._list = [];
        }
        public onUpdate( ...args: any[] ):void
        {
            this.init();
        }

        //判断是否存在不足的情况
        private isShuffExtend(): boolean{
            var i: number = 0,
                len: number = this._list.length;
            for( ; i < len; ++i){
                var item: any = this._list[i];
                //console.log(item.itemNum, item.total);
                if(item.itemNum < item.total){
                    return false;
                }
            }
            return true;
        }

        //储量提升提示
        public get poor(): string{
            return this._poor;
        }
        public set poor(value: string){
            if(value == this._poor)
                return;
            this._poor = value;
            if(this.poorLabel){
                this.poorLabel.text = value;
            }
        }

        public childrenCreated():void
        {
            super.createChildren();

            if(this.okBtn){
                if(!this.isShuffExtend()){
                    this.okBtn.visible = false;
                }else{
                    this.okBtn.visible = true;
                }
            }
        }

        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
            if(instance == this.listGroup){
                //创建 列表
                if(this._data)
                    this.createList(this._list);

            }else if(instance == this.returnBtn){
                this.returnBtn.touchEnabled = true;
                this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.returnDepotPanel, this);

            }else if(instance == this.okBtn){
                this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toExtendPost, this);
            }else if(instance == this.poorLabel){
                this.poorLabel.text = this._poor;
            }
        }

        /**
         * 创建 所需物品列表
         * @param data
         */

        public isExtend: boolean = true;
        private currentExtendItem: game.DepotExtendItemRender;
        private createList(data?: any): void{
            //console.log(data, '////////');
            this.listGroup.removeAllElements();
            var list: any = data || this._data.data.list;
            var i: number = 0;
            var len: number = list.length;
            for(; i < len; ++i){
                var item: any = list[i];
                var itemRender: game.DepotExtendItemRender = new game.DepotExtendItemRender(item.current, item.total, item.diamond);
                itemRender.current = item.itemNum;
                itemRender.total = item.total;
                itemRender.diamond = item.diamond;
                itemRender.icon = item.imgId;
                itemRender.data = item;
                this.listGroup.addElement(itemRender);
                itemRender.addEventListener(GameEvent.ADD_ITEM_POST, this.addItemPost, this);

            }
        }

        private addItemPost(evt: egret.TouchEvent): void{
            console.log('.....addItemPost......', evt.data);
            var target = evt.currentTarget || evt.target;
            this.currentExtendItem = target;
            var itemId: number = evt.data['itemId'];
            var itemNum: number = evt.data['itemNum'];
            var poor: number = target.total - target.current;

            DepotExtendController.getInstance().currentDisplayObject = target;
            DepotExtendController.getInstance().sendBuyData(itemId, poor);

        }

        public getPoint(): egret.Point{

            if(this.currentExtendItem){
                return this.currentExtendItem.localToGlobal(0, this.currentExtendItem.y + 100 );
            }else{
                return new egret.Point(Lyrs.SW >> 1, Lyrs.SH >> 1);
            }

        }

        /**
         * 返回 仓库面板
         * @param evt
         */
        private returnDepotPanel(evt: egret.TouchEvent): void{
            var target: game.DepotItemRender = evt.currentTarget || evt.target, self = this;
            TweenIt.tweenBigThenNormal(target, function(){
                console.log('返回仓库面板...');
                //清空数据
                DepotExtendController.getInstance().needList = [];

                UIMgr.instance.closeCurrentPanel( function(){
                    DepotController.instance.init(self.controller.getType(), self.controller.building);
                });
            });
        }

        /**
         * 确定扩建
         * @param evt
         */
        private toExtendPost(evt: egret.TouchEvent): void{
            //console.log('确定扩建...');

            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_OK);

            var target: game.DepotItemRender = evt.currentTarget || evt.target;
            TweenIt.tweenBigThenNormal(target, function(){
                DepotExtendController.getInstance().toExpend();
            });


        }

    }
}
