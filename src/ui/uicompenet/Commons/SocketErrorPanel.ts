/**
 * Created by rodey on 15/2/9.
 */

module game{

    export class SocketErrorPanel extends egret.gui.SkinnableComponent implements IPanel{

        public msgLabel: egret.gui.Label;
        public handlerButton: egret.gui.Button;

        private _message: string;
        private _status: string;
        private _label: string;

        private callBack: Function;
        private parmas: any;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Commons.SocketErrorPanelSkin;

            this._message = '';
            this._label = Language.getString( 3, 32 ); //'确认';
            this._status = 'ok';
            this.callBack = new Function();

            this.width = 480;

        }

        public get message(): string{ return this._message; }
        public set message(value:string){
            if(value == this._message) return;
            this._message = value;
            if(this.msgLabel){
                this.msgLabel.text = value;
            }
        }

        public get label(): string{ return this._label; }
        public set label(value: string){
            if(value == this._label) return;
            this._label = value;
            if(this.handlerButton){
                this.handlerButton.label = value;
            }
        }

        public get status(): string{ return this._status; }
        public set status(value: string){
            if(value == this._status) return;
            this._status = value;
            if(this.handlerButton){
                if(value == 'ok'){
                    this.handlerButton.icon = 'TC_anniu1';
                }else{
                    this.handlerButton.icon = 'TC_anniu2';
                }
            }
        }


        public onShow( ...args: any[] ): void{
            this.setParmas( args );
        }

        public onClose( ...args: any[] ): void{
            this._label = '';
            this._message = '';
            this.status = 'ok';
            this.parmas = null;
            this.handlerButton.iconDisplay.width = 80;
            this.msgLabel.textColor = 0x281600;
        }

        public onUpdate( ...args: any[] ): void{
            this.setParmas( args );
        }

        private setParmas( args: any[] ): void{

            if(args[0]){
                this.message = args[0];
            }

            if(args[1]){
                this.label = args[1];
            }

            if(args[2]){
                this.status = args[2];
            }

            if(args[3]){
                this.callBack = args[3];
            }

            if(args[4]){
                this.parmas = args[4];
            }

            if(!this.parmas) return;

            if(this.parmas['buttonWidth'] && this.handlerButton){
                this.handlerButton.iconDisplay.width = Number(this.parmas['buttonWidth']);
            }
            if(this.parmas['messageColor'] && this.msgLabel){
                this.msgLabel.textColor = this.parmas['messageColor'];
            }

        }


        public partAdded(partName: string, instance: any): void{
            super.partAdded(partName, instance);
            if(instance == this.msgLabel){
                this.msgLabel.text = this._message;
            }
            else if(instance == this.handlerButton){
                this.label = this._label;
                this.status = this._status;

                this.handlerButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handlerFunc, this);
            }

        }

        private handlerFunc(evt: egret.TouchEvent): void{
            var self = this;
            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_OK);

            var target: any = evt.currentTarget || evt.target;
            TweenIt.tweenBigThenNormal(target, function(){
                UIMgr.instance.closeCurrentPanel(self.callBack.call(self));
            });

        }


    }

}