/**
 * Created by Gordon on 15/April/15.
 * @class AirshipBuilding
 * @constructor
 **/
module view
{
    export class AirshipBuilding extends BuildingIso
    {
        public static instance:AirshipBuilding;

        private tower_working:egret.MovieClip;
        private tower_connect:egret.MovieClip;

        public constructor( pos:Point3D, paramModel:BuildingModel )
        {
            super( pos, paramModel );

            this.init();

            AirshipBuilding.instance = this;
        }

        /**
         * 初始化
         **/
        private init():void
        {
            var mcFactory = MovieClipUtil.getMCFactory( "airship_json", "airship_png" );

            this.tower_working = new egret.MovieClip( mcFactory.generateMovieClipData( "tower_working" ) );
            this.addChild( this.tower_working );
            this.tower_working.stop();

            this.tower_connect = new egret.MovieClip( mcFactory.generateMovieClipData( "tower_connect" ) );
            this.addChild( this.tower_connect );
            this.tower_connect.frameRate = 20;
            this.tower_connect.stop();
            this.tower_connect.visible = false;
        }

        public connect():void
        {
            this.tower_working.stop();
            this.tower_working.visible = false;

            this.tower_connect.gotoAndPlay( 1, 1 );
            this.tower_connect.visible = true;
            this.tower_connect.addEventListener( egret.Event.COMPLETE, this.onConnect, this );
        }
        private onConnect( e:egret.Event ):void
        {
            this.tower_connect.removeEventListener( egret.Event.COMPLETE, this.onConnect, this );
            this.tower_connect.gotoAndStop( 17 );
        }
        public launch():void
        {
            this.tower_working.stop();
            this.tower_working.visible = false;

            this.tower_connect.gotoAndStop( 17 );
            this.tower_connect.visible = true;

            this.frame = 1;
            this.tower_connect.addEventListener( egret.Event.ENTER_FRAME, this.onLaunch, this );
        }
        private frame:number = 1;
        private onLaunch( e:egret.Event ):void
        {
            this.frame++;
            if( 0 != this.frame % 3 )
            {
                return;
            }
            this.tower_connect.prevFrame();
            if( 1 == this.tower_connect.currentFrame )
            {
                this.tower_connect.gotoAndStop( 1 );
                this.tower_connect.removeEventListener( egret.Event.ENTER_FRAME, this.onLaunch, this );
            }
        }

        public launchOver():void
        {
            this.tower_working.visible = true;
            this.tower_connect.visible = false;
            if( this.visible )
            {
                this.tower_working.play( -1 );
            }
        }

        public show(posX:number = 0, posY:number = 0, isFocus:boolean = true):void
        {
            super.show( posX, posY, isFocus );
            if( UserController.instance.level < 10 )
            {
                return;
            }
            if( null == AirshipController.itemList )
            {
                AirshipController.getElfShip( true );
                return;
            }
            if( 1 == view.AirshipWaitBuilding.instance.flying )
            {
                TipText.instace.play( Language.getString( 1, 12 ) );
                return;
            }
            if( 2 == view.AirshipWaitBuilding.instance.flying )
            {
                TipText.instace.play( Language.getString( 1, 11 ) );
                return;
            }
            AirshipController.showPanel();
        }

        public playOrStopAnimation( isPlayAnimation:boolean ):void
        {
            super.playOrStopAnimation( isPlayAnimation );

            if( !isPlayAnimation )
            {
                this.tower_working.stop();
                return;
            }
            if( null == AirshipController.userElfShip || ( null != AirshipController.userElfShip && 0 == AirshipController.userElfShip.waitStatus ) )
            {
                this.tower_working.play( -1 );
            }
        }
    }
}