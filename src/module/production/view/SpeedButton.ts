/**
 * Created by rodey on 15/3/30.
 */

module game{

    export class SpeedButton extends egret.gui.Button{

        public titleLabel: egret.gui.Label;
        private _title: string;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Production.ProductionSpeedButtonSkin;
        }

        public get title(): string{ return this._title; }
        public set title(value:string){
            if(this._title == value) return;
            this._title = value;
            if(this.titleLabel){ this.titleLabel.text = value; }
        }

    }

}
