/**
 * Created by rodey on 14/12/22.
 *
 * ConfirmPanel
 */

module game{

    export class ConfirmPanel extends egret.gui.SkinnableComponent implements IPanel
    {
        private titleDisplay:egret.gui.Label;
        //确认按钮
        public confirmBtn: egret.gui.Button;
        public closeButton: egret.gui.Button;
        //文字内容
        public messageLabel: egret.gui.Label;
        private _msg: string;
        //其他情况
        public bgAsset: egret.gui.UIAsset;
        private _data: any;
        private _type: string;
        private _returnPanel: number;

        private param: any;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Commons.ConfirmPanelSkin;
        }

        /**
         * @param args
         *  title = args[ 0 ];
         *  message = args[ 1 ];
         */
        public onShow( ...args: any[] ):void
        {
            if( this.titleDisplay )
            {
                this.titleDisplay.text = args[0];
            }
            this.message = args[1];
            if(args[2])
            {
                this._returnPanel = args[2];
            }
            if(args[3]){
                this.param = args[3];
            }
            this.y = 180;

        }
        public onClose( ...args: any[] ):void
        {
            this.message = '';

        }

        public onUpdate( ...args: any[] ):void
        {

        }

        public get message(): string{
            return this._msg;
        }
        public set message(value: string){
            if(value == this._msg)
                return;
            this._msg = value;
            if(this.messageLabel){
                this.messageLabel.text = value;
            }
        }

        public get data(): any{
            return this._data;
        }
        public set data(value: any){
            if(value == this._data)
                return;
            this._data = value;
        }

        public partAdded(partName: string, instance: any): void{
            super.partAdded(partName, instance);
            if(instance == this.confirmBtn)
            {
                this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toConfirmHandler, this);
            }
            else if(instance == this.closeButton)
            {
                this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toCloseHandler, this);
            }
            else if(instance == this.messageLabel)
            {
                this.messageLabel.text = this._msg;
            }
        }

        private toCloseHandler(evt: egret.TouchEvent): void{
            console.log('......关闭公共弹窗......');
            var self = this;
            var target: egret.gui.UIAsset = evt.currentTarget || evt.target;
            TweenIt.tweenBigThenNormal(target, function(){
                UIMgr.instance.closeCurrentPanel(function(){
                    self.onClose();
                });
            });
        }

        private toConfirmHandler(evt: egret.TouchEvent): void{
            console.log('......公共弹窗确认按钮......');
            var self = this;

            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_OK);

            if(self._returnPanel){
                UIMgr.instance.closeCurrentPanel(function(){

                    self.onClose();
                    UIMgr.instance.show( self._returnPanel );

                    GameEvent.watcher.dispatchEventWith(GameEvent.CONFIRM, true, null);
                });
            }else{
                GameEvent.watcher.dispatchEventWith(GameEvent.CONFIRM, true, null);
            }

            /**
             * 回调
             * callBack: Function  回调函数
             * callTarget: any     回调中this的指向
             */
            if(this.param && this.param['callBack'] && typeof this.param['callBack'] === 'function'){
                this.param['callBack'].call(this.param['callTarget'] || this);
            }

        }

}

}
