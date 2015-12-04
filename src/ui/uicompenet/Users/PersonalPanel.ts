/**
 * Created by rodey on 14/12/2.
 *
 * 用户 个人信息 面板
 */


module game{

    export class PersonalPanel extends egret.gui.SkinnableComponent implements IPanel
    {
        private closeButton:egret.gui.Button;
        //追加一个个人头像
        public avatarAsset: egret.gui.UIAsset;
        private _avatar: string;

        //追加一个用户签名
        public signLabel: egret.gui.Label;
        private _signText: string;

        //追加 滚动组建
        public scrollerDisplay: egret.gui.Scroller;

        //追加一个Group
        public groupDisplay: egret.gui.Group;
        private titleDisplay:egret.gui.Label;

        //追加一个ArrayConllect
        private _dataArray: egret.gui.ArrayCollection;

        //追加一个DataGroup
        public dataGroup: egret.gui.DataGroup;
        private _dataGroup: egret.gui.DataGroup;
        private controller: PersonController;

        private _data: any;


        constructor(){
            super();
            this.skinName = skins.uicompenet.Users.ParsonalPanelSkin;

            if(!this.controller){
                this.controller = PersonController.getInstance();
            }

            /*this._signText = this._data.data.sign + ' ' + (this.controller.userController.getUserId());
            this._avatar = this._data.data.avatar;
            this._dataArray = new egret.gui.ArrayCollection(this._data.data.list);
            console.log(this._data)*/

        }

        private init(): void{
            var data: any = this.controller.recomData();
            this._data = data;

            if(this.avatarAsset)
                this._avatar = this._data.data.avatar;
            if(this.signLabel)
                this.sign = this._data.data.sign + ' ' + this._data.data.user['userId'];
            if(this.dataGroup){
                this._dataArray = new egret.gui.ArrayCollection(this._data.data.list);
                this.dataGroup.dataProvider = this._dataArray;
                this.createListItem();
            }
        }

        public onShow( ...args: any[] ):void
        {
            this.init();
            this.closeButton.addEventListener( egret.TouchEvent.TOUCH_TAP, this.close, this );
        }

        public onClose( ...args: any[] ):void
        {
            this.closeButton.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.close, this );
        }
        public onUpdate( ...args: any[] ):void
        {

        }

        private close( e:egret.TouchEvent ):void
        {
            UIMgr.instance.closeCurrentPanel();
        }
        /**
         * 标题 UIAsset素材
         */
        public titleAsset: egret.gui.UIAsset;
        private _ta:any;

        public get ta(): any{
            return this._ta;
        }
        public set ta(value: any){
            if(value == this._ta) return;
            this._ta = value;
            if(this.titleAsset){
                this.titleAsset.source = value;
            }
        }
        /**
         * 设置自己的签名
         * @returns {string}
         */
        public get sign(): string{
            return this._signText || this.signLabel.text;
        }
        public set sign(value: string){
            if(value == this._signText)
                return;
            this._signText = value;
            if(this.signLabel){
                this.signLabel.text = value;
            }
        }

        /**
         * 设置自己的头像
         * @returns {egret.gui.UIAsset}
         */
        public get avatar(): string{
            return this._avatar;
        }
        public set avatar(value: string){
            if(value == this._avatar)
                return;
            this._avatar = value;
            if(this.avatarAsset){
                this.avatarAsset.source = RES.getRes(value);
            }
        }

        /**
         * 设置数据
         * @returns {egret.gui.ArrayCollection}
         */
        public get data(): any{
            return this._dataArray;
        }
        public set data(value: any){
            if(value == this._dataArray)
                return;
            this._dataArray = new egret.gui.ArrayCollection(value);
        }

        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
            if(instance == this.scrollerDisplay){
                //初始化滚动组建
                //this.scrollerDisplay.verticalScrollPolicy = egret.gui.ScrollPolicy.OFF;

            }else if(instance == this.groupDisplay){
                //添加滚动内容
                //this.groupDisplay.addElement(this.dataGroup);

            }else if(instance == this.dataGroup){
                //初始化DataGroup数据组建
                this.dataGroup.dataProvider = this._dataArray;
                //this.createListItem();

            }else if(instance == this.avatarAsset){
                this.avatarAsset.source = this._avatar;

            }else if(instance == this.signLabel){
                //this.signLabel.text = this._signText;

            }
            else if (instance == this.titleAsset){
                //this.titleAsset.source = this._ta;
            }
            else if( instance == this.titleDisplay )
            {
                //this.titleDisplay.text = this._data.title;
            }
        }

        /**
         * 创建多个item
         */
        private createListItem(): void{
            if(this._dataArray.length = 0)
                return;
            //console.log(this._dataArray);
            this.dataGroup.percentWidth = 100;
            this.dataGroup.percentHeight = 100;
            this.dataGroup.itemRenderer = new egret.gui.ClassFactory(game.ParsonalItemRender);
            this.dataGroup.itemRendererSkinName = skins.uicompenet.Users.ParsonalItemRenderSkin;

        }



    }

}
