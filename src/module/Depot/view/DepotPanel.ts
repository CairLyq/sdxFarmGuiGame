/**
 * Created by rodey on 14/12/17.
 *
 * 粮仓 货仓
 */

module game{
    export class DepotPanel extends egret.gui.SkinnableComponent implements IPanel
    {

        private titleDisplay:egret.gui.UIAsset;
        private _title: string;

        //追加一个可扩充按钮
        public extendAsset: egret.gui.UIAsset;
        public extendButton: egret.gui.UIAsset;
        public closeButton: egret.gui.UIAsset;
        //追加一个 放置tab的Group容器
        public tabGroup: egret.gui.Group;
        //追加一个 内容滚动
        public scrollerDisplay: egret.gui.Scroller;
        //追加一个 内容列表
        public dataGroup: egret.gui.Group;
        public dataLayout: egret.gui.TileLayout;
        //当前值和扩建值
        public reservesLabel: egret.gui.Label;
        //类型 默认粮仓
        public _type: number = 1;
        private controller: DepotController;
        public building: DepotBuilding;

        //记录当前的仓库标识（切换的是粮仓还是货仓）
        private status: string = 'food';

        private _data: any;

        private _data_tabs: any[] = [
            {name: 'food', icon: 'LC_liangc'},
            {name: 'good', icon: 'LC_huocang'}
        ];
        private _data_contents: any[] = [];

        constructor(){
            super();
            this.skinName = skins.uicompenet.Depot.DepotPanelSkin;

            if(!this.controller){
                this.controller = DepotController.instance;
            }

        }

        private init(): void{
            //拿数据
            var data: any = this.controller.recomData();
            this._data = data;
            this._type = this.controller.getType();
            //标题
            this.title = this._data_tabs[this._type - 1].icon;

            this._data_contents = [];
            this._data_contents.push(this._data.food.data);
            this._data_contents.push(this._data.good.data);

            if(this._data_contents){
                if(this.dataGroup && this.scrollerDisplay){
                    this.createTabContentListItem(this._type - 1);
                }
            }

        }
        /**
         * @param args
         */
        public onShow( ...args:any[] ): void
        {

            if(args[0]){

            }

            if(args[1]){
                this.building = args[1];
            }

            this.init();

            this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeExecute, this);
            this.extendButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toExtendDepot, this);
            this.extendAsset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toExtendDepot, this);

        }
        public onClose( ...args:any[] ): void
        {
            this.scrollerDisplay.throwHorizontally(0, 0);
            this._data = [];
            this._type = 1;
            this._data_contents = [];
            this.dataLayout.requestedRowCount = 2;

            this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeExecute, this);
            this.extendButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toExtendDepot, this);

        }
        public onUpdate( ...args:any[] ): void
        {

        }

        /**
         * 获取或设置对话内容
         * @returns {string}
         */
        public get title(): string{
            return this._title;
        }
        public set title(value: string){
            if(value == this._title)
                return;
            this._title = value;
            if(this.titleDisplay){
                this.titleDisplay.source = value;
            }
        }

        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
            if(this.closeButton)
            {
                //======关闭窗口
                //this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            }else if(instance == this.extendButton)
            {
                this.extendButton.touchEnabled = true;
                //this.extendButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toExtendDepot, this);

            }else if(instance == this.scrollerDisplay)
            {
                //初始化滚动组建
                //this.scrollerDisplay.viewport = this.dataGroup;
                //this.scrollerDisplay.verticalScrollPolicy = egret.gui.ScrollPolicy.OFF;

            }else if(instance == this.dataGroup)
            {
                //初始化DataGroup数据组建
                this.dataGroup.layout = this.dataLayout;

            }else if(instance == this.reservesLabel)
            {
                var indexItem: any = this._data_contents[0];
                this.reservesLabel.text = '储量:   ' + indexItem.current + ' / ' + indexItem.max;
            }
        }

        private closeExecute(evt: egret.TouchEvent): void{
            TweenIt.tweenBigThenNormal(this.closeButton, function(){
                UIMgr.instance.closeCurrentPanel();
            });
        }

        /**
         * 为仓库扩容
         * @param evt
         */
        private toExtendDepot(evt: egret.TouchEvent): void{
            var target: egret.gui.UIAsset = evt.currentTarget || evt.target;

            TweenIt.tweenBigThenNormal(this.extendButton, function(){
                //播放音效
                SoundMgr.instance.playAudio(SoundName.BTN_OK);

                if(DepotController.instance.isMax()){
                    //TipText.instace.play( '恭喜您已经拥有世界上最大的仓库了' );
                    TipText.instace.play( Language.getString( 3, 38 ) );
                    return;
                }

                //根据当前状态扩充
                console.log(DepotController.instance.getType());
                //调用控制器
                DepotExtendController.getInstance().init(DepotController.instance.getType(), DepotController.instance.building);
            });
        }

        /**
         * 创建多个内容
         */
        private createTabContentListItem(index?: number): void{

            this.dataGroup.removeAllElements();

            //console.log(index);
            var indexItem: any = this._data_contents[index];
            var data: any[] = indexItem.list;
            var i: number = 0;
            var len: number = data.length;
            for(; i < len; ++i){
                if(data[i]['itemNum'] > 0){
                    var item: any = data[i];
                    var itemRender: game.DepotItemRender = new game.DepotItemRender();
                    itemRender.skinName = skins.uicompenet.Depot.DepotItemRenderSkin;
                    itemRender.shadow = item.imgId;
                    itemRender.label = String(item.itemNum);
                    itemRender.data = item;
                    this.dataGroup.addElement(itemRender);
                    itemRender.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toSelectedItemBegin, this);
                    itemRender.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toSelectedItemTap, this);
                }
            }

            if(indexItem.list.length <= 4){
                this.dataLayout.requestedRowCount = 1;
            }else{
                this.dataLayout.requestedRowCount = 2;
            }
            this.scrollerDisplay.viewport = this.dataGroup;


            if(this.reservesLabel){
                this.reservesLabel.text = '储量:   ' + indexItem.current + '/' + indexItem.max;
            }

        }

        private toSelectedItemBegin(evt: egret.TouchEvent): void{
            TipMgr.hide();
            var target: game.DepotItemRender = evt.currentTarget || evt.target,
                data: any = target.data,
                tipText: string = '('+ data.name +') ' + data.desc;
            TipText.instace.play( tipText );
        }

        private toSelectedItemTap(evt: egret.TouchEvent): void{

            //播放音效
            SoundMgr.instance.playAudio(SoundName.ITEM_SELECTED);

            var target: game.DepotItemRender = evt.currentTarget || evt.target;
            TweenIt.tweenBigThenNormal(target.shadowAsset);
            console.log('...您点击了商品...');
        }


    }


}
