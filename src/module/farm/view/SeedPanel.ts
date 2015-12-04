/**
 * Created by rodey on 14/12/23.
 */

module game
{

    export class SeedPanel extends egret.gui.TitleWindow implements IPanel
    {

        public scroll:egret.gui.Scroller;

        //容器
        //private guiContent:egret.gui.UIAsset;
        //数据容器
        public dataGroup:egret.gui.Group;
        //public indexGroup: egret.gui.Group;
        ////每页数
        //private _pageNum:number;
        ////当前页
        //private _pageIndex:number;
        ////总页数
        //private _pageTotal:number;

        private left_btn:egret.gui.UIAsset;
        private right_btn:egret.gui.UIAsset;

        private data:FarmModel[];

        private content:egret.Sprite;
        //private _sp_index:egret.Sprite;
        private logic:SeedPanelLogic;
        public building:FarmBuilding;

        private lv:number;

        constructor()
        {
            super();

            this.skinName = skins.uicompenet.FarmV2.SeedPanelV2Skin;

            this.lv = 0;

            //this._pageIndex = 1;
            //this._pageNum = 5;


            //this.content = new egret.Sprite();
            //this.guiContent = new egret.gui.UIAsset(this.content);
            //this.guiContent.touchChildren = true;

            this.logic = new SeedPanelLogic(this);

        }

        public childrenCreated():void
        {
            super.childrenCreated();

            //this.dataGroup.mask = new egret.Rectangle(0, 0, 500, 120);
            //this.dataGroup.addElement(this.guiContent);
            this.scroll.viewport = this.dataGroup;
        }

        public partAdded(partName:string, instance:any):void
        {
            super.partAdded(partName, instance);
            if(instance == this.dataGroup)
            {

            }
            else if(instance == this.scroll)
            {

            }
        }

        private createList():void
        {
            var curLv:number = UserController.instance.level;

            if(curLv <= this.lv)
            {
                return;
            }

            var data:FarmModel[] = FarmModel.getUnlockModels(curLv, BuildingID.BUILDING_ID_FARM);
            this.data = data;
            //this._pageTotal = Math.ceil(this.data.length / this._pageNum);
            var flag:boolean = data.length > 5?true:false;
            this.left_btn.visible = this.right_btn.visible = flag;

            var i:number = 0;
            var len:number = data.length;
            var one:FarmModel;
            var seedModel:DepotModel;
            var seedData:any;
            var itemRender:SeedItemRender


            this.dataGroup.removeAllElements();

            for(i = 0; i < len; ++i)
            {
                one = data[i];
                itemRender = new SeedItemRender();

                itemRender.touchEnabled = true;

                seedModel = DepotModel.getModelById(one.itemId);
                itemRender.seedModel = seedModel;
                itemRender.icon = seedModel.imgId;

                itemRender.lock = (curLv >= seedModel.unlockLv?false:true);

                seedData = DepotController.instance.searchLocalDataAsItemId(one.itemId);
                itemRender.seedData = seedData;
                itemRender.label = seedData?String(seedData.itemNum):itemRender.lock?"":"0";

                //itemRender.x = i * (60 + 15);  //60为itemRender的宽度
                //itemRender.y = 0;

                itemRender.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startDrag, this);

                this.dataGroup.addElement(itemRender);
                //this.content.addChild(itemRender);
            }


            //this.contentGroup.addElement(new egret.gui.UIAsset(this._mask));

            //GameEvent.watcher.addEventListener(GameEvent.ITEM_CHANGE, this.changeSeedNum, this)
        }

        public updateSeedNum():void
        {
            var curLv:number = UserController.instance.level;
            var data:FarmModel[] = FarmModel.getUnlockModels(curLv, BuildingID.BUILDING_ID_FARM);
            var len:number = data.length;
            var i:number;
            var itemRender:SeedItemRender;

            for(i = 0; i < len; ++i)
            {
                itemRender = <SeedItemRender>(this.dataGroup.getElementAt(i));
                itemRender.label = itemRender.seedData?String(itemRender.seedData.itemNum):itemRender.lock?"":"0";
            }
        }

        //public changeSeedNum(e:GameEvent):void
        //{
        //    var itemChange:ItemChange = e.data;
        //
        //    var i:number;
        //    var one:SeedItemRender;
        //
        //    for(i = 0; i < this.itemRenderArr.length; i++)
        //    {
        //        one = this.itemRenderArr[i];
        //        if(one.seedData.itemId == itemChange.id)
        //        {
        //            break;
        //        }
        //    }
        //    one.label = String(one.seedData.itemNum + itemChange.change);
        //
        //}


        private startDrag(e:egret.TouchEvent):void
        {
            this.logic.toStartItem(e);
        }

        //private createIndexBtns(): void{
        //    var i: number = 0,
        //        len: number = this._pageTotal;
        //    this._sp_index = new egret.Sprite();
        //    this.indexGroup.addElement(new egret.gui.UIAsset(this._sp_index));
        //    for( ; i < len; ++i){
        //        var item: egret.Shape = new egret.Shape();
        //        item.x = i * 30;
        //        item.graphics.beginFill(0xffffff);
        //        item.graphics.drawCircle(i * (10 + 10), 0, 9);
        //        item.alpha = .6;
        //        this._sp_index.addChild(item);
        //    }
        //    this._sp_index.x = (this.indexGroup.width - (this._sp_index.width)) * .5;
        //    this._sp_index.y = 0;
        //    this._sp_index.getChildAt(this._pageIndex - 1).alpha = 1;
        //}

        //private resetIndex(index:number):void
        //{
        //    var i:number = 0,
        //        len:number = this._pageTotal;
        //    for(; i < len; ++i)
        //    {
        //        this._sp_index.getChildAt(i) && (this._sp_index.getChildAt(i).alpha = .6);
        //    }
        //    this._sp_index.getChildAt(index || (this._pageIndex - 1)).alpha = 1;
        //}


        public onShow(...args:any[]):void
        {
            this.building = args[0];

            Loader.instance.loadGroups([GroupName.GOODS_GROUP], this.onLoaded, this);
        }

        private onLoaded():void
        {
            this.building.setEdgeVisible(true);
            this.createList();

            //===================================================
            this.alpha = 0;
            this.x = 0;
            this.y = Lyrs.SH;

            var desY:number = Lyrs.SH - 158;

            egret.Tween.get(this).to({y:desY, alpha:1}, Global.PANLE_TWEEN_TIME, egret.Ease.cubicOut).call(function()
            {
                UIMgr.instance.addPanelClose();
                FarmGuideController.getInstance().nextStep();
            }, this);
        }

        public onClose(...args:any[]):void
        {
            this.building.setEdgeVisible(false);
            this.building = null;
        }

        public onUpdate(...args:any[]):void
        {

        }

        //===================================================guide related
        public getTheSeedInFarmGuide():egret.DisplayObject
        {
            return <SeedItemRender>(this.dataGroup.getElementAt(0));

        }
    }

}
