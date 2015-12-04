/**
 * Created by rodey on 14/12/4.
 *
 * 个人信息 itemRender
 */

module game{

    export class ParsonalItemRender extends egret.gui.ItemRenderer{

        //追加一个好友头像
        public avatarAsset: egret.gui.UIAsset;
        private _avatarAsset: string;

        //访问按钮
        public linkBtn: egret.gui.Button;

        //追加一个好友名称
        //public labelDisplay: egret.gui.Label;
        private _name: string;

        //追加一个时间
        public dateDisplay: egret.gui.Label;
        private _date: string;

        //追加一条信息
        public infoDisplay: egret.gui.Label;
        private _info: string;

        /**
         * 构造器
         */
        constructor(){
            super();
            this.skinName = skins.uicompenet.Users.ParsonalItemRenderSkin;
        }

        public get avatar(): string{
            return this._avatarAsset;
        }
        public set avatar(value: string){
            if(value == this._avatarAsset)
                return;
            this._avatarAsset = value;
            if(this.avatarAsset){
                this.avatarAsset.source = RES.getRes(value);
            }
        }

        public get name(): string{
            return this._name;
        }
        public set name(value: string){
            if(value == this._name)
                return;
            this._name = value;
            if(this.labelDisplay){
                this.labelDisplay.text = value;
            }
        }

        public get date(): string{
            return this._date;
        }
        public set date(value: string){
            if(value == this._date)
                return;
            this._date = value;
            if(this.dateDisplay){
                this.dateDisplay.text = value;
            }
        }

        public get info(): string{
            return this._info;
        }
        public set info(value: string){
            if(value == this._info)
                return;
            this._info  = value;
            if(this.infoDisplay){
                this.infoDisplay.text = value;
            }
        }

        /**
         * 默认处理数据填充函数，
         * 覆写
         */
        public dataChanged():void{
            this.labelDisplay.text = this.data.label;
            this.dateDisplay.text = this.data.date;
            this.infoDisplay.text = this.data.info;
            this.avatarAsset.source = this.data.avatar;
            //console.log(this.data.label)
        }

        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
            if(instance == this.linkBtn){
                this.linkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toLink, this);
            }

        }

        /**
         * 访问好友主页
         * @param evt
         */
        private toLink(evt: egret.TouchEvent): void{
            console.log( "进行中......" );
        }


    }

}
