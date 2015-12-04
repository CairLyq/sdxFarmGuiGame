/**
 * Created by rodey on 15/4/16.
 */

module game{

    export class ModifyNickNamePanel extends egret.gui.SkinnableComponent implements IPanel{

        public nickNameLabel: egret.gui.EditableText;
        public confirmBtn: egret.gui.Button;
        public panelName: number;
        public tipsLabel: egret.gui.Label;
        public closeButton: egret.gui.Button;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Setting.ModifyNickNameSkin;
        }

        public childrenCreated(): void{
            super.childrenCreated();

            if(this.confirmBtn){
                this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.modNickName, this);
            }

            if(this.closeButton){
                this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeExecute, this);
            }

        }

        public onShow( ...args: any[] ): void{
            if(args[0]){
                this.panelName = args[0];
            }

            if(this.confirmBtn){
                this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.modNickName, this);
            }

            if(this.closeButton){
                this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeExecute, this);
            }
        }

        public onUpdate( ...args: any[] ): void{

        }

        public onClose( ...args: any[] ): void{
            this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.modNickName, this);
            this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeExecute, this);
        }

        private modNickName(evt: egret.TouchEvent): void{

            var self = this;
            var target: any = evt.currentTarget || evt.target;
            var newName: string = this.nickNameLabel.text;

            //空==
            if(newName.length == 0 || newName == '' || newName.replace(/\s*/gi, '') == ''){
                self.tipsLabel.text = Language.getString( 3, 23 ); //'昵称不能为空!';
                self.tipsLabel.visible = true;
                return;
            }else{
                self.tipsLabel.visible = false;
            }
            //特殊字符==
            if(/[^a-zA-Z\u4e00-\u9fa5]+/gi.test(newName.replace(/\s*/gi, ''))){
                self.tipsLabel.text = Language.getString( 3, 24 ); //'昵称不能含有特殊字符!';
                self.tipsLabel.visible = true;
                return;
            }else{
                self.tipsLabel.visible = false;
            }
            //长度
            if(newName.length > 7){
                self.tipsLabel.text = Language.getString( 3, 25 ); //'昵称太长!';
                self.tipsLabel.visible = true;
                return;
            }else{
                self.tipsLabel.visible = false;
            }

            //合法
            if(UserModel.videMgcName(newName) == true){
                self.tipsLabel.text = Language.getString( 3, 26 ); //'昵称不合法!';
                self.tipsLabel.visible = true;
                return;
            }else{
                self.tipsLabel.visible = false;
            }

            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_OK);

            TweenIt.tweenBigThenNormal(target, ()=>{
                UIMgr.instance.closeCurrentPanel( ()=>{
                    UserController.instance.sendModNickName(newName);
                });
            });

        }

        private closeExecute(evt: egret.TouchEvent): void{
            TweenIt.tweenBigThenNormal(this.closeButton, function(){
                UIMgr.instance.closeCurrentPanel();
            });
        }



    }

}
