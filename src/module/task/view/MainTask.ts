/**
 * Created by Gordon on 02/February/15.
 * @class Task 主线任务
 * @constructor
 **/
module game
{
    export class MainTask extends egret.gui.SkinnableComponent implements IPanel
    {
        private isChildrenCreated:boolean = false;

        /**
         *打印文本
         */
        private typeFont:game.TypeFont;
        private npc:egret.gui.UIAsset;
        private dialog:egret.gui.UIAsset;
        private closeBtn:egret.gui.UIAsset;
        private progressLable:egret.gui.Label;
        private discriptionLable:egret.gui.Label;
        private acceptBtn:egret.gui.Group;
        private awardLable0:egret.gui.Label;
        private awardIcon0:egret.gui.UIAsset;
        private awardLable1:egret.gui.Label;
        private awardIcon1:egret.gui.UIAsset;

        private task:model.UserTask;
        private cfgTask:model.CfgTask;

        public constructor()
        {
            super();
            this.skinName = skins.uicompenet.task.MainTaskSkin;
            this.task = model.UserTask.mainTask;
            this.cfgTask = model.CfgTask.getTaskById( this.task.taskId );
        }

        public onShow( ...args: any[] ):void
        {
            if( !this.isChildrenCreated )
            {
                return;
            }
            this.closeBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.clickHandler, this );
            this.acceptBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onAccept, this );
            this.updateTask();

            TaskGuideController.getInstance().nextStep(3);

        }

        public onClose( ...args: any[] ):void
        {
            this.closeBtn.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.clickHandler, this );
            this.acceptBtn.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.onAccept, this );
            this.typeFont.stop();
        }

        public onUpdate( ...args: any[] ):void
        {
            this.cfgTask = model.CfgTask.getTaskById( this.task.taskId );

            if( null == this.parent )
            {
                return;
            }

            this.updateTask();
        }

        private updateTask():void
        {
            var awardList:Array<Object> = [];
            if( this.cfgTask.gold > 0 )
            {
                awardList.push( { num:this.cfgTask.gold, icon:'Dd-jib' } );
            }
            if( this.cfgTask.exp > 0 )
            {
                awardList.push( { num:this.cfgTask.exp, icon:'cj-jiny' } );
            }
            if( this.cfgTask.diamond > 0 )
            {
                awardList.push( { num:this.cfgTask.diamond, icon:'cj-zuans' } );
            }
            this.awardLable0.text = awardList[ 0 ][ 'num' ];
            this.awardLable1.text = awardList[ 1 ][ 'num' ];

            Loader.setUIAssetAsync( awardList[ 0 ][ 'icon' ], this.awardIcon0 );
            Loader.setUIAssetAsync( awardList[ 1 ][ 'icon' ], this.awardIcon1 );

            this.discriptionLable.text = this.cfgTask.taskName;
            this.typeFont.update( this.cfgTask.taskDesc );
            var url:string = NPCModel.getNPCById( this.cfgTask.npcId ).body;
            Loader.setUIAssetAsync( url, this.npc );
            this.progressLable.text = TaskController.getMainTaskProgress();

            this.acceptBtn.visible = ( 1 == this.task.status );
        }

        public childrenCreated():void
        {
            this.isChildrenCreated = true;
            this.createTypeFont();
            this.onShow();
        }
        private createTypeFont():void
        {
            this.typeFont = new game.TypeFont( '' );
            this.typeFont.setFormat( { width:280, height:72 } );
            this.dialog.source = this.typeFont;
        }

        private clickHandler( e:egret.TouchEvent ):void
        {
            TweenIt.tweenBigThenNormal( this.closeBtn, ()=>{ UIMgr.instance.closeCurrentPanel(); } );
        }

        private onAccept( e:egret.TouchEvent ):void
        {
            var point:egret.Point = this.acceptBtn.localToGlobal( 0, 0 );
            UIMgr.instance.closeCurrentPanel( null, 1 );
            TaskController.sendRecieve( this.task.taskId, point, this.callBack, this );
            this.acceptBtn.touchEnabled = false;
        }
        private callBack():void
        {
            this.acceptBtn.touchEnabled = true;
            UIMgr.instance.show(PanelName.TASK_PANEL, {direction:Direction.CENTER} );
        }
    }
}