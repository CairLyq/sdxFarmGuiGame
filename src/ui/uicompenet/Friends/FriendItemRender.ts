/**
 * Created by rodey on 14/12/5.
 *
 * 好友 item
 */

module game{

    export class FriendItemRender extends egret.gui.ItemRenderer{

        //追加一个 头像
        public avatarAsset: egret.gui.UIAsset;
        private _avatar: egret.Texture;

        //追加一个 图标标识
        public iconAsset: egret.gui.UIAsset;
        private _icon: egret.Texture;

        //追加一个经验值
        public experienceLabel: egret.gui.Label;
        private _exprience: string;


        constructor(){
            super();
            this.skinName = skins.uicompenet.Friends.FriendItemRenderSkin;
        }

        /**
         * 设置 头像
         * @returns {egret.Texture}
         */
        public get avatar(): egret.Texture{
            return this._avatar;
        }
        public set avatar(value: egret.Texture){
            if(value == this._avatar)
                return;
            this._avatar = value;
            if(this.avatarAsset){
                this.avatarAsset.source = value;
            }
        }

        /**
         * 设置 图标标识
         * @returns {egret.Texture}
         */
        public get icon(): egret.Texture{
            return this._icon;
        }
        public set icon(value: egret.Texture){
            if(value == this._icon)
                return;
            this._icon = value;
            if(this.iconAsset){
                this.iconAsset.source = value;
            }
        }

        /**
         * 设置 经验值
         * @returns {egret.Texture}
         */
        public get exprience(): string{
            return this._exprience;
        }
        public set exprience(value: string){
            if(value == this._exprience)
                return;
            this._exprience = value;
            if(this.experienceLabel){
                this.experienceLabel.text = value;
            }
        }


        /**
         * 默认处理数据填充函数，
         * 覆写
         */
        public dataChanged():void{
            this.labelDisplay.text = this.data.label;
            this.experienceLabel.text = this.data.exprience;
            this.iconAsset.source = this.data.icon;
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
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toLink, this);
        }


        private toLink(evt: egret.TouchEvent): void{
            /*var alert = egret.gui.Alert.show('进行中......');
            game.GUIManager(alert);*/
        }



    }

}
