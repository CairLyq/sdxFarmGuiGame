/**
 * Created by Gordon on 14/12/4.
 *
 * 每日任务 面板
 */
module game
{
    export class EveryTaskPanel extends egret.gui.SkinnableComponent implements IPanel
    {
        static instance:EveryTaskPanel;
        private isChildrenCreated:boolean = false;
        private closeBtn:egret.gui.UIAsset;

        private contentGroup:egret.gui.Group;

        //追加一个DataGroup部件
        public dataGroup:egret.gui.DataGroup;

        //追加一个ArrayConllect
        private _dataArray: egret.gui.ArrayCollection;

        constructor()
        {
            super();
            this.skinName = skins.uicompenet.task.EveryTaskPanelSkin;
            this._dataArray = new egret.gui.ArrayCollection( model.UserTask.taskList );
            EveryTaskPanel.instance = this;
        }
        public onShow( ...args:any[] ):void
        {
            if( !this.isChildrenCreated )
            {
                return;
            }
            this.closeBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.clickHandler, this );

            this.onUpdate();
        }
        public onClose( ...args:any[] ):void
        {
            this.closeBtn.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.clickHandler, this );
        }
        public onUpdate( ...args:any[] ):void
        {
            if( null == this.parent )
            {
                return;
            }
            var updateOne:boolean = args.length > 0;//只更新一个任务的状态

            var length:number = this.dataGroup.numElements;
            for( var i:number = 0; i < length; i++ )
            {
                var item:any = this.dataGroup.getVirtualElementAt( i );
                if( null == item )
                {
                    console.log( 'EveryTaskPanel::onShow item 是 null');
                    continue;
                }
                if( updateOne )
                {
                    if( null != item.data && args[ 0 ] == item.data.taskId )
                    {
                        item.dataChanged();
                        return;
                    }
                    continue;
                }
                item.dataChanged();
            }
        }
        public setPosition( index:number ):void
        {
            if( !this.isChildrenCreated )
            {
                return;
            }
            if( index < 2 )
            {
                this.dataGroup.horizontalScrollPosition = 0;
                return;
            }
            setTimeout( ()=>{
                this.dataGroup.horizontalScrollPosition = index * 146 - 146.5;
            }, 100 );
            //this.dataGroup.horizontalScrollPosition = index * 140 + ( index - 1 ) * 6 - 210.5 + 70;
            /*
             1308 = 140 * num + 6 * ( num - 1 ) 总长度 this.dataGroup.contentWidth
             140 单个宽度
             421 容器宽度
             6 间隔
             */
        }
        private clickHandler( e:egret.TouchEvent ):void
        {
            TweenIt.tweenBigThenNormal( this.closeBtn, ()=>{ UIMgr.instance.closeCurrentPanel(); } );
        }

        public childrenCreated():void
        {
            super.createChildren();

            this.isChildrenCreated = true;
            this.onShow();
        }

        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
            if(instance == this.dataGroup)
            {
                this.dataGroup.dataProvider = this._dataArray;
                this.createListItem();
            }
        }

        /**
         * 创建多个item
         */
        private createListItem(): void
        {
            if(this._dataArray.length = 0)
                return;
            this.dataGroup.percentWidth = 100;
            this.dataGroup.percentHeight = 100;
            this.dataGroup.itemRenderer = new egret.gui.ClassFactory(game.EveryTaskItemRender);
            this.dataGroup.itemRendererSkinName = skins.uicompenet.task.EveryTaskItemRenderSkin;
        }
    }
}
