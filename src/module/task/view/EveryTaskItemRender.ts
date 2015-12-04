/**
 * Created by Gordon on 14/12/4.
 *
 * 每日任务 item
 */
module game
{
    export class EveryTaskItemRender extends egret.gui.ItemRenderer
    {
        public icon:egret.gui.UIAsset;
        public discriptLable:egret.gui.Label;
        /**
         * 经验值
         */
        public expLabel:egret.gui.Label;
        public awardLabel:egret.gui.Label;
        public awardIcon:egret.gui.UIAsset;
        public finished:egret.gui.UIAsset;
        public acceptBtn:egret.gui.Group;
        public progressLable:egret.gui.Label;

        public task:model.UserTask;
        public cfgTask:model.CfgTask;

        constructor()
        {
            super();
            this.skinName = skins.uicompenet.task.EveryTaskItemRenderSkin;
        }

        /**
         * 数据填充
         */
        public dataChanged():void
        {
            if( null == this.data )
            {
                return;
            }
            this.task = this.data;
            this.cfgTask = model.CfgTask.getTaskById( this.task.taskId );
            Loader.setUIAssetAsync( this.cfgTask.iconId, this.icon );
            this.discriptLable.text = this.cfgTask.taskName;
            this.expLabel.text = String(this.cfgTask.exp);

            if( 0 == this.task.status )
            {// 0 新任务
                this.finished.visible = false;
                this.acceptBtn.visible = false;
                this.progressLable.visible = true;
                this.progressLable.textFlow = TaskController.getTaskProgress( this.task.taskId );
            }
            else if( 1 == this.task.status )
            {//1 已完成
                this.finished.visible = false;
                this.acceptBtn.visible = true;
                this.progressLable.visible = false;

                EveryTaskPanel.instance.setPosition( this.itemIndex );
            }
            else if( 2 == this.task.status )
            {//2 已领取
                this.finished.scaleX = this.finished.scaleY = 2;
                egret.Tween.get( this.finished ).to( { scaleX:1, scaleY:1 }, 500 );
                this.finished.visible = true;
                this.acceptBtn.visible = false;
                this.progressLable.visible = false;
            }


            if( this.cfgTask.gold > 0 )
            {
                Loader.setUIAssetAsync( 'Dd-jib', this.awardIcon );
                this.awardLabel.text = String( this.cfgTask.gold );
                return;
            }
            if( this.cfgTask.diamond > 0 )
            {
                Loader.setUIAssetAsync( 'TYER-zuanshi', this.awardIcon );
                this.awardLabel.text = String( this.cfgTask.diamond );
            }
        }

        public childrenCreated():void
        {
            super.childrenCreated();

            this.acceptBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onAccept, this );
        }
        private onAccept( e:egret.TouchEvent ):void
        {
            if( UserController.instance.isIndulgeState2() )
            {
                AntiAddictionController.showPanel();
                return;
            }
            this.acceptBtn.touchEnabled = false;
            var point:egret.Point = this.acceptBtn.localToGlobal( 0, 0 );
            TaskController.sendRecieve( this.task.taskId, point, this.callBack, this );
        }
        private callBack():void
        {
            this.acceptBtn.touchEnabled = true;
            this.task.status = 2;
            model.UserTask.taskUpdate( this.task );
        }
    }
}