/**
 * Created by rodey on 14/12/18.
 *
 * 游戏性别选择和名字
 *
 */

module game
{
    export class MainSexPanel extends egret.gui.SkinnableComponent
    {
        private loadedAndCreated:number = 0;

        /**
         * 是否进入游戏创角了
         * @type {boolean}
         */
        public static CREATE_ROLE:boolean = false;
        //昵称
        private _name: string;

        //追加一个 性别选择图切换
       // public sexAsset: egret.gui.UIAsset;
        private _sex: number = 1;  //0: man || 1: woman

        //追加一个 开始游戏 按钮
        public gameStartBtn: egret.gui.Button;
        //追加一个 随机昵称 按钮
        public randomNameBtn: egret.gui.UIAsset;
        //追加一个 昵称输入框
        public nameLabel: egret.gui.EditableText;
        public tipsLabel: egret.gui.Label;
        //获取随机昵称和性别
        private item: any;

        //donghua
        public manBtn: game.SexChoseMCButton;
        public womanBtn: game.SexChoseMCButton;
        public praticleSystem: particle.GravityParticleSystem;

        private _data: any = {
            data: {
                man: 'XBXZ_1',
                woman: 'XBXZ_2',
                man_mc: 'sexChose_man',
                woman_mc: 'sexChose_woman'
            }
        };

        constructor(){
            super();

            this.skinName = skins.uicompenet.Main.MainSexPanelSkin;

            //加载配置
            UserModel.init();

            //这个昵称应该是从后台取得随机
            this.item = UserModel.getRandomName(7, this._sex);
            this._name = this.item.name;

            MainSexPanel.CREATE_ROLE = true;

            Loader.instance.load( GroupName.SEXPANEL_GROUP, null, this.onloaded, this );
        }

        private onloaded():void
        {
            this.loadedAndCreated++;
            this.sex = this.item.sex;

            //创建花瓣动画
            this.createParticle();

        }

        public destroy(): void{
            if(this.praticleSystem){
                if(Lyrs.STAGE.getChildIndex(this.praticleSystem) !== -1){
                    Lyrs.STAGE.removeChild(this.praticleSystem);
                }
            }
            this.praticleSystem = null;
            delete this.praticleSystem;
        }

        /**
         * 获取或设置 昵称
         * @returns {string}
         */
        public get nickName(): string{
            return this._name;
        }
        public set nickName(value: string){
            if(value == this._name)
                return;
            this._name = value;
            if(this.nameLabel){
                this.nameLabel.text = value;
            }
        }

        /**
         * 获取或设置性别
         * @returns {number}
         */
        private get sex(): number{
            return this._sex;
        }
        private set sex(value: number){

            this._sex = value;
            if(this.manBtn && this.womanBtn){
                this.choseSex(value);
            }

        }

        private choseSex(sex: number): void{
            if(sex === 0){
                //man
                console.log('man')

                this.manBtn.play();
                this.womanBtn.stop();

            } else if(sex === 1){
                //woman
                console.log('woman')

                this.manBtn.stop();
                this.womanBtn.play();
            }
        }

        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public childrenCreated():void
        {
            super.childrenCreated();
            this.sex = this.item.sex;

            this.manBtn.label = 'sexChose_man';
            this.womanBtn.label = 'sexChose_woman';
            this.manBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toChoseSexMan, this);
            this.womanBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toChoseSexWoman, this);

            this.gameStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toGameStart, this);

            this.randomNameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toRandomName, this);

            this.nameLabel.text = this.item.name;
            this.nameLabel.maxChars = 7;
            this.tipsLabel.visible = false;
            this.loadedAndCreated++;
        }
        public onClose():void
        {
            this.manBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toChoseSexMan, this);
            this.womanBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toChoseSexWoman, this);
            this.gameStartBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toGameStart, this);
            this.randomNameBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toRandomName, this);
            this.destroy();
        }

        /**
         * 选择 性别
         * @param evt
         */
        private toChoseSexMan(evt: egret.TouchEvent):void
        {

            //this.sex = this._sex == 0 ? 1 : 0;
            if(this.sex == 0) return;
            this.sex = 0;
            this.toRandomName();
        }

        private toChoseSexWoman(evt: egret.TouchEvent):void
        {

            if(this.sex == 1) return;
            this.sex = 1;
            this.toRandomName();
        }

        /**
         * 开始游戏
         * @param evt
         */
        private toGameStart(evt: egret.TouchEvent): void{
            this.gameStartBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toGameStart, this);
            var self = this;
            var target: any = evt.currentTarget || evt.target;
            self.tipsLabel.visible = false;
            this.nickName = this.nameLabel.text;

            TweenIt.tweenBigThenNormal(target, ()=>{


                //空==
                if(self.nickName.length == 0 || self.nickName == '' || self.nickName.replace(/\s*/gi, '') == ''){
                    self.tipsLabel.text = Language.getString( 3, 23 ); //'昵称不能为空!';
                    self.tipsLabel.visible = true;
                    this.gameStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toGameStart, this);
                    return;
                }else{
                    self.tipsLabel.visible = false;
                }
                //特殊字符==
                if(/[^a-zA-Z\u4e00-\u9fa5]+/gi.test(self.nickName.replace(/\s*/gi, ''))){
                    self.tipsLabel.text = Language.getString( 3, 24 ); //'昵称不能含有特殊字符!';
                    self.tipsLabel.visible = true;
                    this.gameStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toGameStart, this);
                    return;
                }else{
                    self.tipsLabel.visible = false;
                }
                //长度
                if(this.nickName.length > 7){
                    self.tipsLabel.text = Language.getString( 3, 25 ); //'昵称太长!';
                    self.tipsLabel.visible = true;
                    this.gameStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toGameStart, this);
                    return;
                }else{
                    self.tipsLabel.visible = false;
                }

                //合法
                if(UserModel.videMgcName(this.nickName) == true){
                    self.tipsLabel.text = Language.getString( 3, 26 ); //'昵称不合法!';
                    self.tipsLabel.visible = true;
                    this.gameStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toGameStart, this);
                    return;
                }else{
                    self.tipsLabel.visible = false;
                }

                var sdata: any = {
                    act: 'User.create',
                    dt: {
                        token: Global.sdToken,
                        name: this.nickName,
                        sex: this.sex
                    }
                };
                sdata = JSON.stringify(sdata);
                SocketManager.instance.send(sdata);
            });
        }

        /**
         * 随机昵称
         * @param evt
         */
        private toRandomName(evt?: egret.TouchEvent): void{
            var self = this;
            if(evt){
                var target: egret.gui.UIAsset = evt.currentTarget || evt.target;
                TweenIt.tweenBigThenNormal(target/*, function(){
                    var item: any = UserModel.getRandomName(7, self.sex);
                    console.log(item.name, self.sex)
                    self.nameLabel.text = item.name;
                    self.nickName = self.nameLabel.text;
                    //self.sex = item.sex;
                    //self.randomNameBtn.dispatchEventWith(GameEvent.GAME_SELECT_NAME, true, self.nameLabel);
                }*/);
            }

            var item: any = UserModel.getRandomName(7, self.sex);
            console.log(item.name, self.sex)
            self.nameLabel.text = item.name;
            self.nickName = self.nameLabel.text;
        }


        private createParticle():void
        {
            if( !this.praticleSystem )
            {
                this.praticleSystem = new particle.GravityParticleSystem(RES.getRes(GroupName.PETAL_KEYS[ 0 ] ), RES.getRes(GroupName.PETAL_KEYS[ 1 ]));
                Lyrs.STAGE.addChild( this.praticleSystem );

                this.praticleSystem.visible = false;

            }
            this.praticleSystem.visible = true;
            //this.praticleSystem.x = -200;
            //this.praticleSystem.y = 0;
            this.praticleSystem.start(-1);
        }

    }

}
