/**
 * Created by Gordon on 09/March/15.
 * @class AchievementBuildingh
 * @constructor
 **/
module view
{
    export class AchievementBuilding extends BuildingIso
    {
        /**
         * 背影发光
         */
        private shineIcon:egret.Bitmap;
        /**
         * 满足完成状态图片（五星发光）
         */
        private readyIcon:egret.Bitmap;

        private openLevel:number = 1;

        public constructor( pos:Point3D, paramModel:BuildingModel )
        {
            super( pos, paramModel );
            this.init();
        }

        /**
         * 初始化
         **/
        private init()
        {
            this.shineIcon = new egret.Bitmap();
            this.addChild( this.shineIcon );
            this.shineIcon.visible = false;

            this.readyIcon = new egret.Bitmap();
            this.addChild( this.readyIcon );
            this.readyIcon.visible = false;

            this.readyIcon.y = -70;
            this.readyIcon.x = -10;

            RES.getResAsync( 'SCJZ_shanliang', (e)=>{
                this.shineIcon.texture = RES.getRes( 'SCJZ_shanliang' );

                RES.getResAsync( 'CH-3da', (e)=>{
                    this.readyIcon.texture = RES.getRes( 'CH-3da' );
                    this.shineIcon.anchorX = this.shineIcon.anchorY = 0.5;
                    this.shineIcon.y = this.readyIcon.y + this.readyIcon.height / 2;
                    this.shineIcon.x = this.readyIcon.x + this.readyIcon.width / 2;
                    model.UserTrophy.hasAward();
                }, this );

            }, this );

        }
        public showHasAward():void
        {
            egret.Tween.removeTweens( this.shineIcon );
            TweenIt.loopTween( this.shineIcon, { scaleX:2, scaleY:2 }, { scaleX:0, scaleY:0 } );
            this.shineIcon.visible = this.readyIcon.visible = true;
        }
        public show( posX:number = 0, posY:number = 0 ):void
        {
            super.show( posX, posY );
            if( UserController.instance.level < this.openLevel )
            {
                return;
            }

            if( null != this.shineIcon && this.shineIcon.visible )
            {
                this.hideAlertIcon();
            }

            AchieveController.getUserTrophies();
        }
        public hideAlertIcon():void
        {
            egret.Tween.removeTweens( this.shineIcon );
            this.shineIcon.visible = this.readyIcon.visible = false;
        }
        public playOrStopAnimation( isPlayAnimation:boolean ):void
        {
            super.playOrStopAnimation( isPlayAnimation );

            if( isPlayAnimation )
            {

            }
            else
            {

            }
        }
    }
}