/**
 * Created by Gordon on 09/March/15.
 * @class AchievementItem
 * @constructor
 **/
module view
{
    export class AchievementItem extends  egret.gui.ItemRenderer
    {
        private title:egret.gui.Label;
        private awardLabel0:egret.gui.Label;
        private awardLabel1:egret.gui.Label;
        private discriptLable:egret.gui.Label;
        private progressLabel:egret.gui.Label;

        private awardIcon0:egret.gui.UIAsset;
        private awardIcon1:egret.gui.UIAsset;

        private star0:egret.gui.UIAsset;
        private star1:egret.gui.UIAsset;
        private star2:egret.gui.UIAsset;
        private moon0:egret.gui.UIAsset;
        private moon1:egret.gui.UIAsset;

        private starGray0:egret.gui.UIAsset;
        private starGray1:egret.gui.UIAsset;
        private starGray2:egret.gui.UIAsset;
        private moonGray0:egret.gui.UIAsset;
        private moonGray1:egret.gui.UIAsset;

        private acceptBtn:egret.gui.Group;

        private progressBar:egret.gui.UIAsset;

        public constructor()
        {
            super();
            this.skinName = skins.uicompenet.achievement.AchievementItemSkin;
        }

        public childrenCreated():void
        {
            this.acceptBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this );
        }
        private onTouchTap( e:egret.TouchEvent ):void
        {
            this.acceptBtn.visible = false;
            var point:egret.Point = this.acceptBtn.localToGlobal( 0, 0 );
            AchieveController.recieve( this.data.id, point );
        }
        public dataChanged():void
        {
            if( null == this.data )
            {
                return;
            }
            var userTrophy:model.UserTrophy = this.data;
            var cfgTrophy:model.CfgTrophy = model.CfgTrophy.getTrophyById( userTrophy.id );

            var step:string = userTrophy.level > 0 ? ( userTrophy.level > 1 ? 'III' : 'II' ) : 'I';
            this.title.text = cfgTrophy.name + ' ' + step;
            this.awardLabel0.text = '' + cfgTrophy.getDiamondByLevel( userTrophy.level );
            this.awardLabel1.text = '' + cfgTrophy.getExpByLevel( userTrophy.level );

            this.star0.visible = userTrophy.level > 0;
            this.star1.visible = userTrophy.level > 1;
            this.star2.visible = userTrophy.level > 2;
            this.moon0.visible = userTrophy.level > 3;
            this.moon1.visible = userTrophy.level > 4;

            this.starGray0.visible = !this.star0.visible;
            this.starGray1.visible = !this.star1.visible;
            this.starGray2.visible = !this.star2.visible;
            this.moonGray0.visible = !this.moon0.visible && userTrophy.level > 3;
            this.moonGray1.visible = !this.moon1.visible && userTrophy.level > 3;
            if( userTrophy.level > 3 )
            {
                this.star0.visible = false;
                this.star1.visible = false;
                this.star2.visible = false;
            }

            var needNum:number = cfgTrophy.getNumByLevel( userTrophy.level );
            var finishNum:number = userTrophy.finishTimes;

            var needNumStr = NumberUtils.round2K( needNum )
            var finishNumStr = NumberUtils.round2K( finishNum )

            var b:boolean =( userTrophy.level == 5 || 1 == userTrophy.status );//当前等级已经完成
            var percent:number = b ? 1 : finishNum / needNum;
            percent = percent > 1 ? 1 : percent;//预防userTrophy.finishTimes大于needNum

            this.progressBar.width = ( 0 == percent ? 0 : Math.max( 115 * percent, 20 ) );
            this.progressLabel.text = ( b ? needNumStr + '/' + needNumStr : finishNumStr + '/' + needNumStr );
            this.discriptLable.text = cfgTrophy.desc.replace( '%X%', '' + needNumStr );

            this.acceptBtn.visible = userTrophy.status == 1;

            if( this.acceptBtn.visible )
            {
                AchievementPanel.intance.setPosition( this.itemIndex );
            }
        }
    }
}