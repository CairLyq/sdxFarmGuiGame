/**
 * Created by rodey on 14/12/16.
 *
 * 打字效果
 */
module game
{
    export class TypeFont extends egret.Sprite
    {
        private _text: string;
        private _tlen: number;
        public tf: egret.gui.Label;

        private _speed: number = GameStatic.NPC_TYPEFOT_SPEED;
        private timer: egret.Timer;

        constructor( text:string, speed?:number )
        {
            super();

            this._text = text;
            this._tlen = this._text.length;
            this._speed = speed || GameStatic.NPC_TYPEFOT_SPEED;
            this.timer = new egret.Timer( this._speed, this._tlen );

            this.tf = new egret.gui.Label;
            this.addChild(this.tf);

            this.tf.size = 18;
            this.tf.width = 600;
            this.tf.height = 80;
            this.tf.maxDisplayedLines = 0;
            this.tf.textColor = Color.TYPE_FONT;
            this.tf.paddingLeft = 10;
            this.tf.paddingRight = 10;
            this.tf.lineSpacing = 5;
            this.tf.fontFamily = 'Microsoft YaHei';

            this.start();
        }

        /**
         * 创建一个gui Label对象
         * 用于打字效果
         */
        public setFormat( format:Object = {} ):void
        {
            for( var key in format )
            {
                this.tf[ key ] = format[ key ];
            }
        }

        public get running():boolean
        {
            return this.timer.running;
        }
        public stop():void
        {
            if( this.timer.running )
            {
                console.log('结束了');
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            }
        }

        private start(): void
        {
            if( this.timer.running )
            {
                return;
            }
            if( 0 == this._tlen )
            {
                return;
            }
            this.tf.text = this._text[ 0 ];
            this.timer.addEventListener( egret.TimerEvent.TIMER, this.onTimer, this );
            this.timer.start();
        }

        private onTimer( evt:egret.TimerEvent ):void
        {
            if( this._tlen == this.timer.currentCount )
            {
                this.stop();
                return;
            }

            this.tf.text += this._text[ this.timer.currentCount ];
        }

        public update(text: string):void
        {
            this._text = text;
            this._tlen = this._text.length;
            this.timer.repeatCount = this._tlen;

            this.timer.reset();
            this.stop();
            this.start();
        }
    }
}
