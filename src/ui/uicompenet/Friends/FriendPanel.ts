/**
 * Created by rodey on 14/12/3.
 *
 * 购买金币面板
 */

module game{

    export class FriendPanel extends egret.gui.SkinnableComponent implements IPanel
    {
        //追加 滚动组建
        public scrollerDisplay: egret.gui.Scroller;

        //追加一个ArrayConllect
        private _dataArray: egret.gui.ArrayCollection;

        //追加一个DataGroup
        public dataGroup: egret.gui.DataGroup;

        private _data: any[] = [
            { label: '土豪 NPC', avatar: RES.getRes('touxiang'), icon: RES.getRes('HT-sd'), experience: 60 },
            { label: '土豪 NPC', avatar: RES.getRes('touxiang'), icon: RES.getRes('HT-qd'), experience: 60 },
            { label: '土豪 NPC', avatar: RES.getRes('touxiang'), icon: RES.getRes('HT-qd'), experience: 60 },
            { label: '土豪 NPC', avatar: RES.getRes('touxiang'), icon: RES.getRes('HT-qd'), experience: 60 },
            { label: '土豪 NPC', avatar: RES.getRes('touxiang'), icon: RES.getRes('HT-mx'), experience: 60 },
            { label: '土豪 NPC', avatar: RES.getRes('touxiang'), icon: RES.getRes('HT-mx'), experience: 60 },
            { label: '土豪 NPC', avatar: RES.getRes('touxiang'), icon: RES.getRes('HT-mx'), experience: 50 },
            { label: '土豪 NPC', avatar: RES.getRes('touxiang'), icon: RES.getRes('HT-mx'), experience: 40 },
            { label: '土豪 NPC', avatar: RES.getRes('touxiang'), icon: RES.getRes('HT-mx'), experience: 30 },
            { label: '土豪 NPC', avatar: RES.getRes('touxiang'), icon: RES.getRes('HT-mx'), experience: 20 },
            { label: '土豪 NPC', avatar: RES.getRes('touxiang'), icon: RES.getRes('HT-mx'), experience: 10 }
        ];

        constructor(){
            super();
            this.skinName = skins.uicompenet.Friends.FriendPanelSkin;

            this._dataArray = new egret.gui.ArrayCollection(this._data);
        }
        public onShow( ...args: any[] ):void
        {
            this.alpha = 0;
            this.x = Lyrs.SW - 194 * .8;
            this.y = Lyrs.SH + 200;
            this.scaleX = this.scaleY = .8;
            var ch: number = Lyrs.SH - 860 * .8 - 110;

            egret.Tween.get( this ).to( { y: ch, alpha: 1 }, 500, egret.Ease.cubicOut ).call( function(){ UIMgr.instance.addPanelClose();}, this );
        }
        public onClose( ...args: any[] ):void
        {

        }
        public onUpdate( ...args: any[] ):void
        {

        }

        /**
         * 设置数据
         * @returns {egret.gui.ArrayCollection}
         */
        public get data(): any{
            return this._dataArray;
        }
        public set data(value: any){
            if(value == this._dataArray)
                return;
            this._dataArray = new egret.gui.ArrayCollection(value);
        }


        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
            if(instance == this.scrollerDisplay){
                //初始化滚动组建
                //this.scrollerDisplay.verticalScrollPolicy = egret.gui.ScrollPolicy.OFF;

            }else if(instance == this.dataGroup){
                //初始化DataGroup数据组建
                this.dataGroup.dataProvider = this._dataArray;
                this.createListItem();

            }
        }

        /**
         * 创建多个item
         */
        private createListItem(): void{
            if(this._dataArray.length = 0)
                return;
            //console.log(this._dataArray);
            this.dataGroup.percentWidth = 100;
            this.dataGroup.percentHeight = 100;
            this.dataGroup.itemRenderer = new egret.gui.ClassFactory(game.FriendItemRender);
            this.dataGroup.itemRendererSkinName = skins.uicompenet.Friends.FriendItemRenderSkin;

        }


    }


}
