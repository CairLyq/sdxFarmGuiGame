/**
 * Created by rodey on 15/4/10.
 */

module game{

    export class SexChoseMCButton extends egret.gui.Button{

        //动画资源
        private mcJson: egret.Texture;
        private mcPng: egret.Texture;
        private mcFactory: egret.MovieClipDataFactory;
        private mcDisplay: egret.MovieClip;

        private _sex: number = 1;
        private assetName: string = 'XBXZ_1';

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
            this.skinName = skins.uicompenet.Main.SexChoseMCButtonSkin;

            this.mcJson = RES.getRes('sexChose_json');
            this.mcPng = RES.getRes('sexChose_png');

            this.assetName = (this.label === this._data.data.woman_mc) ? this._data.data.woman: this._data.data.man;
        }

        public childrenCreated(): void{

            //this.init(null);

        }

        public get sex(): number{ return this._sex; }
        public set sex(value: number){
            if(value == this._sex) return;
            this._sex = value;
            this.assetName = (value === 1) ? this._data.data.woman: this._data.data.man;
            console.log(this.assetName)
            if(this.iconDisplay){
                this.init(value);
            }

        }

        public play(): void{
            this.init();
            this.mcDisplay && (this.mcDisplay.gotoAndPlay(1, -1));
        }

        public stop(): void{

            if(this.mcDisplay){
                this.mcDisplay.gotoAndStop(1);
            }

            this.assetName = (this.label === this._data.data.woman_mc) ? this._data.data.woman: this._data.data.man;
            this.iconDisplay.source = this.assetName;
        }

        private init(sex?: number): void{

            var mcName: string = this.label; //(sex === 1) ? this._data.data.woman_mc: this._data.data.man_mc;

            this.initFactory();
            this.initMC(mcName);

        }

        private initFactory(): void{

            this.mcFactory = new egret.MovieClipDataFactory( this.mcJson, this.mcPng );
            //console.log(this.mcJson, this.mcPng)

        }

        private initMC(mcName?: string): void{

            //console.log(mcName)
            this.mcDisplay = new egret.MovieClip( this.mcFactory.generateMovieClipData(mcName) );
            this.mcDisplay.anchorX = -.5;
            this.mcDisplay.anchorY = -1;

            this.icon = this.mcDisplay;

        }


    }

}
