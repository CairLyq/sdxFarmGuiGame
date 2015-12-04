/**
 * Created by rodey on 14/12/2.
 *
 * 设置面板
 */

module game{

    export class SettingPanel extends egret.gui.SkinnableComponent implements IPanel
    {

        public useridLabel: egret.gui.Label; //用户ID
        public levelLabel: egret.gui.Label; //VIP等级
        public signLabel: egret.gui.Label; //签名

        public avatarAsset: egret.gui.UIAsset; //头像

        public bgSoundSlider: egret.gui.HSlider; //背景音乐
        public audioSlider: egret.gui.HSlider; //音效


        public modNameBtn: game.SettingButton; //修改昵称
        public openDiamondBtn: game.SettingButton; //开启钻石确认
        public helpBtn: game.SettingButton; //帮助与支持
        public websiteBtntn: game.SettingButton; //访问官网
        public langBtn: game.SettingButton; //语言切换
        public accountBtn: game.SettingButton; //账号切换

        public signBtn: game.SettingButton; //修改昵称

        public closeButton: egret.gui.Button;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Setting.SettingPanelSkin;

        }
        public onShow( ...args: any[] ):void
        {

        }

        public onClose( ...args: any[] ):void
        {

        }
        public onUpdate( ...args: any[] ):void
        {

        }


        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);

            if(instance == this.useridLabel){
                this.useridLabel.text = String(UserController.instance.getUserId());
            }
            else if(instance == this.levelLabel){
                this.levelLabel.text = String(UserController.instance.level);
            }
            else if(instance == this.avatarAsset){
                this.avatarAsset.source = UserController.instance.getUserHead();
            }
            else if(instance == this.signLabel){
                this.signLabel.text = UserController.instance.sign;

            }
            else if(instance == this.bgSoundSlider){
                this.bgSoundSlider.value = Global.BG_VOLUME * 100;

            }
            else if(instance == this.audioSlider){
                this.audioSlider.value = Global.AU_VOLUME * 100;

            }
            else if(instance == this.accountBtn){
                this.accountBtn.bgAsset.source = 'SZ_aniu';
            }
            else if(instance == this.modNameBtn){
                this.modNameBtn.bgAsset.source = 'SZ_aniu';
            }

        }

        public childrenCreated():void
        {
            super.childrenCreated();

            this.modNameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.modNickName, this);
            this.openDiamondBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openDiamond, this);
            this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.help, this);
            this.websiteBtntn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.website, this);
            this.langBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.langSwitch, this);
            this.accountBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.accountSwitch, this);

            this.bgSoundSlider.addEventListener(egret.Event.CHANGE, this.bgSoundChange, this);
            this.audioSlider.addEventListener(egret.Event.CHANGE, this.audioChange, this);

            this.signBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.modSign, this);

            this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeExecute, this);
        }


        private modNickName(evt: egret.TouchEvent): void{
            console.log('.../' + evt.currentTarget.label + '\\...')
            var target: any = evt.currentTarget || evt.target,
                self = this;

            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_OK);

            TweenIt.tweenBigThenNormal(target, function(){
                UIMgr.instance.closeCurrentPanel(function(){
                    UIMgr.instance.show( PanelName.MODIFY_NICK_NAME_PANEL, { direction: Direction.CENTER }, PanelName.SETTING_PANEL );
                });
            });
        }

        private openDiamond(evt: egret.TouchEvent): void{
            console.log('.../' + evt.currentTarget.label + '\\...')
            var target: any = evt.currentTarget || evt.target,
                self = this;

            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_OK);

            TweenIt.tweenBigThenNormal(target, function(){
                //UIMgr.instance.closeCurrentPanel();
            });
        }

        private help(evt: egret.TouchEvent): void{
            console.log('.../' + evt.currentTarget.label + '\\...')
            var target: any = evt.currentTarget || evt.target,
                self = this;

            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_OK);

            TweenIt.tweenBigThenNormal(target, function(){
                //UIMgr.instance.closeCurrentPanel();
            });
        }

        private website(evt: egret.TouchEvent): void{
            console.log('.../' + evt.currentTarget.label + '\\...')
            var target: any = evt.currentTarget || evt.target,
                self = this;

            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_OK);

            TweenIt.tweenBigThenNormal(target, function(){
                //UIMgr.instance.closeCurrentPanel();
            });
        }

        private langSwitch(evt: egret.TouchEvent): void{
            console.log('.../' + evt.currentTarget.label + '\\...')
            var target: any = evt.currentTarget || evt.target,
                self = this;

            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_OK);

            TweenIt.tweenBigThenNormal(target, function(){
                //UIMgr.instance.closeCurrentPanel();
            });
        }

        private accountSwitch(evt: egret.TouchEvent): void{
            console.log('.../' + evt.currentTarget.label + '\\...')
            var target: any = evt.currentTarget || evt.target,
                self = this;

            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_OK);

            TweenIt.tweenBigThenNormal(target, function(){
                //UIMgr.instance.closeCurrentPanel();
                window.localStorage.clear();
                window.location.href = ( Global.DEBUG ? 'launcher/' : '../' ) + 'sxdlogin.html';

            });
        }

        private bgSoundChange(evt: egret.Event): void{
            //console.log('.../ 背景音量当前值：' + evt.target.value + ' \\...')
            if(evt.target.value < 30){
                this.bgSoundSlider.trackHighlight.width = 30;
            }
            SoundMgr.instance.bgVol = evt.target.value;
            //console.log(this.bgSoundSlider.trackHighlight.width, evt.target.value)
        }

        private audioChange(evt: egret.Event): void{
            //console.log('.../ 音效音量当前值：' + evt.target.value + ' \\...')
            SoundMgr.instance.audioVol = evt.target.value;
        }

        private modSign(evt: egret.TouchEvent): void{
            console.log('.../ 修改签名 \\...')
            var target: any = evt.currentTarget || evt.target,
                self = this;

            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_OK);

            TweenIt.tweenBigThenNormal(target, function(){
                /*UIMgr.instance.closeCurrentPanel(function(){
                    UIMgr.instance.show( PanelName.MODIFY_NICK_NAME_PANEL, { direction: Direction.CENTER }, PanelName.SETTING_PANEL );
                });*/
            });
        }

        private closeExecute(evt: egret.TouchEvent): void{
            TweenIt.tweenBigThenNormal(this.closeButton, function(){
                UIMgr.instance.closeCurrentPanel();
            });
        }

    }

}
