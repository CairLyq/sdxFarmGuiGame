/**
 * Created by Gordon on 06/February/15.
 * @class Start
 * @constructor
 **/
module game
{
    export class StartWindows extends egret.gui.SkinnableComponent
    {
        private time:number = 280;
        private step:number = 0;
        private completed:boolean = false;

        private dialog0:egret.gui.UIAsset;
        private dialog1:egret.gui.UIAsset;
        private dialog2:egret.gui.UIAsset;
        private dialog3:egret.gui.UIAsset;
        private dialog4:egret.gui.UIAsset;
        private dialog5:egret.gui.UIAsset;
        private dialog6:egret.gui.UIAsset;
        private dialog7:egret.gui.UIAsset;
        private dialog8:egret.gui.UIAsset;
        private dialog9:egret.gui.UIAsset;
        private dialog10:egret.gui.UIAsset;
        private dialog11:egret.gui.UIAsset;

        private text0:egret.gui.UIAsset;
        private text1:egret.gui.UIAsset;
        private text2:egret.gui.UIAsset;
        private text3:egret.gui.UIAsset;
        private text4:egret.gui.UIAsset;

        private typeFont0:game.TypeFont;
        private typeFont1:game.TypeFont;
        private typeFont2:game.TypeFont;
        private typeFont3:game.TypeFont;
        private typeFont4:game.TypeFont;

        private start0:egret.gui.UIAsset;
        private start1:egret.gui.UIAsset;
        private start2:egret.gui.UIAsset;
        private start3:egret.gui.UIAsset;
        private start4:egret.gui.UIAsset;
        private start5:egret.gui.UIAsset;
        private start6:egret.gui.UIAsset;
        private start7:egret.gui.UIAsset;
        private start8:egret.gui.UIAsset;
        private start9:egret.gui.UIAsset;
        private start10:egret.gui.UIAsset;

        private clickLayer:egret.gui.UIAsset;
        private jump:egret.gui.Label;

        private X:number = 5;
        private Y:number = 10;
        private Y2:number = 20;

        public constructor()
        {
            super();
            this.skinName = skins.uicompenet.Main.StartSkin;
        }
        public childrenCreated():void
        {
            super.createChildren();
            var shape:egret.Shape = new egret.Shape();
            shape.graphics.beginFill( 0x000000, 1 );
            shape.graphics.drawRect( 0, 0, Lyrs.SW, Lyrs.SH );
            shape.graphics.endFill();
            this.clickLayer.source = shape;

            this.addEventListener( egret.TouchEvent.TOUCH_TAP, this.clickHandler, this );
            this.jump.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onJump, this );
            TweenIt.loopTween( this.jump, {alpha:1}, {alpha:0}, 600 );

            this.typeFont0 = new game.TypeFont( '' );
            this.typeFont1 = new game.TypeFont( '' );
            this.typeFont2 = new game.TypeFont( '' );
            this.typeFont3 = new game.TypeFont( '' );
            this.typeFont4 = new game.TypeFont( '' );

            this.typeFont0.setFormat( { textColor:Color.WHITE } );
            this.typeFont1.setFormat( { textColor:Color.WHITE } );
            this.typeFont2.setFormat( { textColor:Color.WHITE } );
            this.typeFont3.setFormat( { textColor:Color.WHITE } );
            this.typeFont4.setFormat( { textColor:Color.WHITE } );

            this.text0.source = this.typeFont0;
            this.text1.source = this.typeFont1;
            this.text2.source = this.typeFont2;
            this.text3.source = this.typeFont3;
            this.text4.source = this.typeFont4;

            this.start0.visible = true;
            this.start0.alpha = 0;

            this.dialog0.visible = true;
            this.text0.x = this.dialog0.x + this.X;
            this.text0.y = this.dialog0.y + this.Y;
            this.typeFont0.tf.width = this.text0.width = this.dialog0.width;
            this.typeFont0.tf.height = this.text0.height = this.dialog0.height;
            this.typeFont0.update( Language.getString( 5, 0 ) );

            egret.Tween.get( this.start0 ).to( { alpha:1 }, this.time ).call( this.onComplete, this );
        }
        private clickHandler( e:egret.TouchEvent ):void
        {
            if( !this.completed )
            {
                return;
            }
            this.completed = false;
            this.step++;
            if( 1 == this.step )
            {
                egret.Tween.removeTweens( this.start0 );
                this.start0.alpha = 1;

                this.typeFont0.tf.text = Language.getString( 5, 0 );
                this.typeFont0.stop();

                this.dialog1.visible = true;
                this.text1.x = this.dialog1.x + this.X;
                this.text1.y = this.dialog1.y + this.Y2;
                this.typeFont1.tf.width = this.text1.width = this.dialog1.width;
                this.typeFont1.tf.height = this.text1.height = this.dialog1.height;
                this.typeFont1.update( Language.getString( 5, 1 ) );
                this.completed = true;
                return;
            }
            if( 2 == this.step )
            {
                this.start1.alpha = 0;
                this.start1.visible = true;

                this.typeFont1.tf.text = Language.getString( 5, 1 );
                this.typeFont1.stop();

                this.dialog2.visible = true;
                this.text2.x = this.dialog2.x + this.X;
                this.text2.y = this.dialog2.y + this.Y2;
                this.typeFont2.tf.width = this.text2.width = this.dialog2.width;
                this.typeFont2.tf.height = this.text2.height = this.dialog2.height;
                this.typeFont2.update( Language.getString( 5, 2 ) );

                egret.Tween.get( this.start1 ).to( { alpha:1 }, this.time ).call( this.onComplete, this );
                return;
            }
            if( 3 == this.step )
            {
                egret.Tween.removeTweens( this.start1 );
                this.start1.alpha = 1;
                this.typeFont2.tf.text = Language.getString( 5, 2 );
                this.typeFont2.stop();

                this.dialog3.visible = true;
                this.text3.x = this.dialog3.x + this.X;
                this.text3.y = this.dialog3.y + this.Y;
                this.typeFont3.tf.width = this.text3.width = this.dialog3.width;
                this.typeFont3.tf.height = this.text3.height = this.dialog3.height;
                this.typeFont3.update( Language.getString( 5, 3 ) );
                this.completed = true;
                return;
            }
            if( 4 == this.step )
            {
                this.start2.alpha = 0;
                this.start2.visible = true;

                this.typeFont3.tf.text = Language.getString( 5, 3 );
                this.typeFont3.stop();

                this.dialog4.visible = true;
                this.text4.x = this.dialog4.x + this.X;
                this.text4.y = this.dialog4.y + this.Y2;
                this.typeFont4.tf.width = this.text4.width = this.dialog4.width;
                this.typeFont4.tf.height = this.text4.height = this.dialog4.height;
                this.typeFont4.update( Language.getString( 5, 4 ) );

                egret.Tween.get( this.start2 ).to( { alpha:1 }, this.time ).call( this.onComplete, this );
                return;
            }
            if( 5 == this.step )
            {
                this.completed = true;
                if( this.typeFont4.running )
                {
                    egret.Tween.removeTweens( this.start2 );
                    this.start2.alpha = 1;
                    this.typeFont4.tf.text = Language.getString( 5, 4 );
                    this.typeFont4.stop();
                    return;
                }
                this.clickHandler( null );
                return;
            }
            if( 6 == this.step )
            {//第二页第一张图
                this.start0.visible = false;
                this.start1.visible = false;
                this.start2.visible = false;
                this.dialog0.visible = false;
                this.dialog1.visible = false;
                this.dialog2.visible = false;
                this.dialog3.visible = false;
                this.dialog4.visible = false;
                this.typeFont1.update( '' );
                this.typeFont2.update( '' );
                this.typeFont3.update( '' );
                this.typeFont4.update( '' );

                this.text1.visible = false;
                this.text2.visible = false;
                this.text3.visible = false;
                this.text4.visible = false;

                this.start3.alpha = 0;
                this.start3.visible = true;

                egret.Tween.removeTweens( this.start2 );
                this.start2.alpha = 1;
                this.typeFont4.tf.text = Language.getString( 5, 4 );
                this.typeFont4.stop();

                this.dialog5.visible = true;
                this.text0.x = this.dialog5.x + this.X;
                this.text0.y = this.dialog5.y + this.Y2;
                this.typeFont0.tf.width = this.text0.width = this.dialog5.width;
                this.typeFont0.tf.height = this.text0.height = this.dialog5.height;
                this.typeFont0.update( Language.getString( 5, 5 ) );

                egret.Tween.get( this.start3 ).to( { alpha:1 }, this.time ).call( this.onComplete, this );
                return;
            }
            if( 7 == this.step )
            {
                this.start4.alpha = 0;
                this.start4.visible = true;

                egret.Tween.removeTweens( this.start3 );
                this.start3.alpha = 1;
                this.typeFont0.tf.text = Language.getString( 5, 5 );
                this.typeFont0.stop();

                this.dialog6.visible = true;
                this.text1.visible = true;
                this.text1.x = this.dialog6.x + this.X;
                this.text1.y = this.dialog6.y + this.Y2;
                this.typeFont1.tf.width = this.text1.width = this.dialog6.width;
                this.typeFont1.tf.height = this.text1.height = this.dialog6.height;
                this.typeFont1.update( Language.getString( 5, 6 ) );

                egret.Tween.get( this.start4 ).to( { alpha:1 }, this.time ).call( this.onComplete, this );
                return;
            }
            if( 8 == this.step )
            {
                egret.Tween.removeTweens( this.start4 );
                this.start4.alpha = 1;
                this.typeFont1.tf.text = Language.getString( 5, 6 );
                this.typeFont1.stop();

                this.dialog7.visible = true;
                this.text2.visible = true;
                this.text2.x = this.dialog7.x + this.X;
                this.text2.y = this.dialog7.y + this.Y2;
                this.typeFont2.tf.width = this.text2.width = this.dialog7.width;
                this.typeFont2.tf.height = this.text2.height = this.dialog7.height;
                this.typeFont2.tf.textColor = Color.YELLOW;
                this.typeFont2.tf.italic = true;
                this.typeFont2.update( Language.getString( 5, 7 ) );
                this.completed = true;
                return;
            }
            if( 9 == this.step )
            {
                this.start5.alpha = 0;
                this.start5.visible = true;

                this.typeFont2.tf.text = Language.getString( 5, 7 );
                this.typeFont2.stop();

                this.dialog8.visible = true;
                this.text3.visible = true;

                this.text3.x = this.dialog8.x + this.X;
                this.text3.y = this.dialog8.y + this.Y2;
                this.typeFont3.tf.width = this.text3.width = this.dialog8.width;
                this.typeFont3.tf.height = this.text3.height = this.dialog8.height;
                this.typeFont3.update( Language.getString( 5, 8 ) );

                egret.Tween.get( this.start5 ).to( { alpha:1 }, this.time ).call( this.onComplete, this );
                return;
            }
            if( 10 == this.step )
            {
                this.completed = true;
                if( this.typeFont3.running )
                {
                    egret.Tween.removeTweens( this.start5 );
                    this.start5.alpha = 1;
                    this.typeFont3.tf.text = Language.getString( 5, 8 );
                    this.typeFont3.stop();
                    return;
                }
                this.clickHandler( null );
                return;
            }
            if( 11 == this.step )
            {//第三页第一张图
                this.start3.visible = false;
                this.start4.visible = false;
                this.start5.visible = false;
                this.dialog5.visible = false;
                this.dialog6.visible = false;
                this.dialog7.visible = false;
                this.dialog8.visible = false;
                this.typeFont1.update( '' );
                this.typeFont2.update( '' );
                this.typeFont3.update( '' );

                this.typeFont2.tf.textColor = Color.WHITE;
                this.typeFont2.tf.italic = false;

                this.text1.visible = false;
                this.text2.visible = false;
                this.text3.visible = false;
                this.text4.visible = false;

                this.start6.alpha = 0;
                this.start6.visible = true;

                egret.Tween.removeTweens( this.start5 );
                this.start5.alpha = 1;
                this.typeFont3.tf.text = Language.getString( 5, 8 );
                this.typeFont3.stop();

                this.dialog9.visible = true;
                this.text0.x = this.dialog9.x + this.X;
                this.text0.y = this.dialog9.y + this.Y2;
                this.typeFont0.tf.width = this.text0.width = this.dialog9.width;
                this.typeFont0.tf.height = this.text0.height = this.dialog9.height;
                this.typeFont0.update( Language.getString( 5, 9 ) );

                egret.Tween.get( this.start6 ).to( { alpha:1 }, this.time ).call( this.onComplete, this );
                return;
            }
            if( 12 == this.step )
            {
                this.start7.alpha = 0;
                this.start7.visible = true;

                this.text1.visible = true;

                this.typeFont1.tf.textColor = Color.YELLOW;
                this.typeFont1.tf.italic = true;

                egret.Tween.removeTweens( this.start6 );
                this.start6.alpha = 1;
                this.typeFont0.tf.text = Language.getString( 5, 9 );
                this.typeFont0.stop();

                this.text1.x = this.dialog9.x + this.X;
                this.text1.y = this.dialog9.y + this.Y + this.dialog9.height >> 1;
                this.typeFont1.tf.width = this.text1.width = this.dialog9.width;
                this.typeFont1.tf.height = this.text1.height = this.dialog9.height;
                this.typeFont1.update( Language.getString( 5, 10 ) );

                egret.Tween.get( this.start7 ).to( { alpha:1 }, this.time ).call( this.onComplete, this );
                return;
            }
            if( 13 == this.step )
            {
                this.start8.alpha = 0;
                this.start8.visible = true;

                this.typeFont1.tf.text = Language.getString( 5, 10 );
                this.typeFont1.stop();

                egret.Tween.removeTweens( this.start7 );
                this.start7.alpha = 1;
                egret.Tween.get( this.start8 ).to( { alpha:1 }, this.time ).call( this.onComplete, this );
                return;
            }
            if( 14 == this.step )
            {
                this.start9.alpha = 0;
                this.start9.visible = true;

                egret.Tween.removeTweens( this.start8 );
                this.start8.alpha = 1;

                this.dialog10.visible = true;
                this.text2.visible = true;
                this.text2.x = this.dialog10.x + this.X;
                this.text2.y = this.dialog10.y + this.Y;
                this.typeFont2.tf.width = this.text2.width = this.dialog10.width;
                this.typeFont2.tf.height = this.text2.height = this.dialog10.height;
                this.typeFont2.tf.italic = false;
                this.typeFont2.update( Language.getString( 5, 11 ) );

                egret.Tween.get( this.start9 ).to( { alpha:1 }, this.time ).call( this.onComplete, this );
                return;
            }
            if( 15 == this.step )
            {
                egret.Tween.removeTweens( this.start9 );
                this.start9.alpha = 1;
                this.typeFont2.tf.text = Language.getString( 5, 11 );
                this.typeFont2.stop();

                this.text3.visible = true;
                this.text3.x = this.dialog10.x + this.X;
                this.text3.y = this.dialog10.y + this.Y2 + this.dialog10.height;
                this.typeFont3.tf.width = this.text3.width = this.dialog10.width;
                this.typeFont3.tf.height = this.dialog10.width * 2;
                this.typeFont3.tf.size = 28;
                this.text3.height = this.dialog10.height;
                this.typeFont3.update( Language.getString( 5, 12 ) );
                this.completed = true;
                return;
            }
            if( 16 == this.step )
            {
                this.start10.alpha = 0;
                this.start10.visible = true;

                this.typeFont3.tf.text = Language.getString( 5, 12 );
                this.typeFont3.stop();

                this.dialog11.visible = true;
                this.text4.visible = true;

                this.typeFont4.width = this.text4.width = this.dialog11.width;
                this.typeFont4.height = this.text4.height = this.dialog11.height;
                this.text4.x = this.dialog11.x + this.X;
                this.text4.y = this.dialog11.y + this.Y2;
                this.typeFont4.update( Language.getString( 5, 13 ) );

                egret.Tween.get( this.start10 ).to( { alpha:1 }, this.time ).call( this.onComplete, this );
                return;
            }
            if( 17 == this.step )
            {
                this.completed = true;
                if( this.typeFont4.running )
                {
                    egret.Tween.removeTweens( this.start10 );
                    this.start10.alpha = 1;
                    this.typeFont4.tf.text = Language.getString( 5, 13 );
                    this.typeFont4.stop();
                    return;
                }
                this.clickHandler( null );
                return;
            }
            this.onJump( null );
        }
        private onComplete():void
        {
            this.completed = true;
        }

        private onJump( e:egret.TouchEvent ):void
        {
            this.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.clickHandler, this );
            this.jump.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.onJump, this );
            Game.instance.init();
            this.parent.removeChild( this );
            egret.Tween.removeTweens( this.jump );
        }
    }
}