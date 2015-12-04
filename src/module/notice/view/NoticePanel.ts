/**
 * Created by rodey on 15/3/12.
 */

module game{

    export class NoticePanel extends egret.gui.SkinnableComponent implements game.IPanel{

        public closeButton: egret.gui.Button;

        public scrollerDisplay: egret.gui.Scroller;
        public dataGroup: egret.gui.Group;

        public listData: any[];

        constructor(){
            super();
            this.skinName = skins.uicompenet.Main.NoticePanelSkin;
            this.listData = [];
        }

        public init(): void{

            if(this.dataGroup){
                this.createList();
            }

        }


        public onShow( ...args: any[] ): void{
            if(args[0]){
                this.listData = args[0];
            }

            this.init();

        }
        public onUpdate( ...args: any[] ): void{}
        public onClose( ...args: any[] ): void{
            this.dataGroup.removeAllElements();

            //新手引导
            TaskGuideController.getInstance().startGuide();

            delete NoticeController.instance;

        }

        public childrenCreated(): void{
            super.childrenCreated();

            if(this.closeButton){
                this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
            }

        }

        private closeHandler(evt: egret.TouchEvent):void
        {
            var target: egret.gui.UIAsset = evt.currentTarget || evt.target;
            TweenIt.tweenBigThenNormal( target,
                ()=>{
                    UIMgr.instance.closeCurrentPanel(
                        ()=>{
                            AntiAddictionController.showPanel();
                        }
                    );
                }
            );
        }

        /*private toGameHandler(evt: egret.TouchEvent): void{
         var target: egret.gui.UIAsset = evt.currentTarget || evt.target;
         TweenIt.tweenBigThenNormal(target, function(){
         UIMgr.instance.closeCurrentPanel();

         });
         }*/

        public partAdded(partName: string, instance: any): void{
            super.partAdded(partName, instance);
        }

        public createList(): void{

            if(!this.listData || !this.listData.length || this.listData.length === 0) return;

            this.dataGroup.removeAllElements();

            var i: number = 0,
                len: number = this.listData.length,
                item: game.NoticeItemRender;

            for( ; i < len; ++i ){

                item = new game.NoticeItemRender();
                item.data = this.listData[i];
                this.dataGroup.addElement(item);

            }

            this.scrollerDisplay.viewport = this.dataGroup;

        }


    }

}
