/**
 * Created by rodey on 14/12/22.
 *
 * 装箱面板
 */

module game{

    export class BoatBinningPanel extends egret.gui.TitleWindow{

        //追加一个 Npc对话内容
        private _message: string;
        //一个打字显示对象
        private typeFont: game.TypeFont;

        //数据
        private _data: any = {
            title: '飞空艇',
            message: '飞空艇来咯！飞空艇的箱子即可以单个发出也可以全部一起发出哦，一起发出奖励会提升哦！',
            data: {
                price: 1234,
                experien: 5678,
                list: [
                    { id: 1, imgId: 'sp-lajiao', total: 3 },
                    { id: 2, imgId: 'sp-lajiao', total: 5 },
                    { id: 3, imgId: 'sp-lajiao', total: 15 },
                    { id: 4, imgId: 'sp-lajiao', total: 25 },
                    { id: 5, imgId: 'sp-lajiao', total: 35 },
                    { id: 6, imgId: 'sp-lajiao', total: 45 },
                    { id: 7, imgId: 'sp-lajiao', total: 55 },
                    { id: 8, imgId: 'sp-lajiao', total: 65 },
                    { id: 9, imgId: 'sp-lajiao', total: 75 }
                ]
            }
        };


        constructor(){
            super();
            this.skinName = skins.uicompenet.Boat.BoatBinningPanelSkin;

            this.title = this._data.title;
            this._message = this._data.message;
        }




        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
            if(instance == this.contentGroup){

                //添加一个大小显示对象
                this.createTypeFont(this._message);

            }
        }


        /**
         * 获取或设置对话内容
         * @returns {string}
         */
        public get message(): string{
            return this._message;
        }
        public set message(value: string){
            if(value == this._message)
                return;
            this._message = value;
            if(this.typeFont){
                this.typeFont.update(value);
            }else{
                this.createTypeFont(value);
            }
        }


        /**
         * 创建 npc 对话
         * @param message
         */
        private createTypeFont(message?: string): void{
            console.log(this._message)
            this.typeFont = new game.TypeFont(message || this._message);
            this.typeFont.x = 17;
            this.typeFont.y = 535;
            this.contentGroup.addElement(new egret.gui.UIAsset(this.typeFont));
        }

    }

}
