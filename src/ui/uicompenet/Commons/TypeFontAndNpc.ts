/**
 * Created by rodey on 14/12/17.
 */

module game{
    export class TypeFontAndNpc extends egret.Sprite{

        private _message: string;
        private typeFont: game.TypeFont;

        constructor(message?: string, npc?: any){
            super();

            this._message = message;

            this.createTypeFont();
        }


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
            this.addChild(this.typeFont);
        }
    }
}
