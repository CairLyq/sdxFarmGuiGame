/**
 * Created by Gordon on 15/April/15.
 * @class AirshipWaitBuilding
 * @constructor
 **/
module view
{
    export class AirshipWaitBuilding extends BuildingIso
    {
        public static instance:AirshipWaitBuilding;

        private airship_flying:egret.MovieClip;
        private airship_landing:egret.MovieClip;
        private airship_setoff:egret.MovieClip;

        private waitPanel:AirshipWaitPanel;

        public constructor( pos:Point3D, paramModel:BuildingModel )
        {
            super( pos, paramModel );
            this.init();

            AirshipWaitBuilding.instance = this;
            this.waitPanel = UIMgr.instance.getPanel( PanelName.AIRSHIP_WAIT_PANEL );

            if( UserController.instance.level < 10 )
            {
                return;
            }

            AirshipController.getElfShip();
        }

        /**
         * 初始化
         **/
        private init():void
        {
            var mcFactory = MovieClipUtil.getMCFactory( "airship_json", "airship_png" );

            this.airship_flying = new egret.MovieClip( mcFactory.generateMovieClipData( "airship_flying" ) );
            this.addChild( this.airship_flying );
            this.airship_flying.stop();
            this.airship_flying.visible = false;

            this.airship_landing = new egret.MovieClip( mcFactory.generateMovieClipData( "airship_landing" ) );
            this.addChild( this.airship_landing );
            this.airship_landing.frameRate = 20;
            this.airship_landing.gotoAndStop( 17 );
            this.airship_landing.visible = true;

            this.airship_setoff = new egret.MovieClip( mcFactory.generateMovieClipData( "airship_setoff" ) );
            this.addChild( this.airship_setoff );
            this.airship_setoff.frameRate = 20;
            this.airship_setoff.stop();
            this.airship_setoff.visible = false;
        }

        public flying:number = -1;
        public fly():void
        {
            var isVisible:boolean = UIUtil.intersectStage( AirshipWaitBuilding.instance );
            if( 0 == AirshipController.userElfShip.waitStatus )
            {
                if( this.waitPanel.isShowing )
                {
                    UIMgr.instance.closeCurrentPanel();
                }
                this.flyBack( !isVisible );
                AirshipController.getElfShip( false, true, isVisible );
                return;
            }
            var panel:AirshipPanel = UIMgr.instance.getPanel( PanelName.AIRSHIP_PANEL );

            if( panel.isShowing )
            {
                UIMgr.instance.closeCurrentPanel( ()=>
                {
                    this.elfShipTakeOff( !isVisible );
                })
            }
            else
            {
                this.elfShipTakeOff( !isVisible );
            }
            if( AirshipController.allPack() )
            {//此次全部装箱完成有效请求奖励
                AirshipController.elfShipTakeOff( isVisible );
                return;
            }

            AirshipController.getElfShip( false, true, isVisible );
        }

        public show( posX:number = 0, posY:number = 0 ):void
        {
            super.show( posX, posY );
            if( UserController.instance.level < 10 )
            {
                return;
            }
            if( null == AirshipController.itemList )
            {
                AirshipController.getElfShip( true );
                return;
            }
            if( 1 == this.flying )
            {
                TipText.instace.play( Language.getString( 1, 12 ) );
                return;
            }
            if( 2 == this.flying )
            {
                TipText.instace.play( Language.getString( 1, 11 ) );
                return;
            }
            AirshipController.showPanel();
        }

        elfShipTakeOff(  showLanding:boolean = false ):void
        {
            if( showLanding )
            {//直接显示着陆状态
                this.airship_landing.gotoAndStop( 17 );
                this.airship_landing.visible = true;
                return;
            }
            this.flying = 1;

            this.airship_landing.visible = false;

            this.airship_setoff.visible = true;
            this.airship_setoff.gotoAndPlay( 1, 1 );
            AirshipBuilding.instance.launch();
            console.log( '起飞动画' );
            this.airship_setoff.addEventListener( egret.Event.COMPLETE, this.onSetoff, this );
        }
        private onSetoff( e:egret.Event ):void
        {
            this.airship_setoff.removeEventListener( egret.Event.COMPLETE, this.onSetoff, this );

            this.airship_flying.visible = true;
            this.airship_flying.play( -1 );
            this.airship_setoff.visible = false;
            console.log( '起飞飞行中;this.visible:', this.visible );

            egret.Tween.get( this.airship_flying ).to( { x:Lyrs.SW * 0.8, y:Lyrs.SH * 0.4 }, 6000 ).call( ()=>{
                this.airship_flying.visible = false;
                this.airship_flying.x = this.airship_flying.y = 0;
                this.airship_flying.stop();
                this.flying = -1;
                if( 0 == AirshipController.userElfShip.waitStatus )
                {
                    view.AirshipWaitBuilding.instance.visible = false;
                }
                AirshipBuilding.instance.launchOver();

                console.log( '起飞飞行结束' );
            });
        }
        flyBack( showLanding:boolean = false ):void
        {
            if( showLanding )
            {//直接显示着陆状态
                this.airship_landing.gotoAndStop( 17 );
                this.airship_landing.visible = true;
                return;
            }
            this.flying = 2;

            this.airship_landing.visible = false;
            this.airship_flying.x = -Lyrs.SW * 0.8;
            this.airship_flying.y = -Lyrs.SW * 0.4;
            this.visible = true;
            this.airship_flying.visible = true;
            this.airship_flying.play( -1 );
            console.log( '飞行回来开始' );

            egret.Tween.get( this.airship_flying ).to( { x:0, y:0 }, 5000 ).call( ()=>{
                this.airship_flying.visible = false;
                this.airship_flying.stop();

                this.airship_landing.visible = true;
                this.airship_landing.gotoAndPlay( 1, 1 );
                console.log( '飞行回来着陆' );

                AirshipBuilding.instance.connect();
                this.airship_landing.addEventListener( egret.Event.COMPLETE, this.onLanding, this );
            });
        }
        private onLanding( e:egret.Event ):void
        {
            this.airship_landing.removeEventListener( egret.Event.COMPLETE, this.onLanding, this );

            this.airship_landing.gotoAndStop( 17 );

            this.flying = -1;
            console.log( '着陆完成' );
        }
        /**
         * 控制动画
         */
        public playOrStopAnimation(isPlayAnimation:boolean):void
        {
            this.visible = isPlayAnimation && ( -1 != this.flying || null == AirshipController.userElfShip || 1 == AirshipController.userElfShip.waitStatus );
        }
    }
}