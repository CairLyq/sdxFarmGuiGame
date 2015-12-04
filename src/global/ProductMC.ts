/**
 * Created by rodey on 15/1/28.
 */

class ProductMC extends egret.DisplayObjectContainer{

    //配置文件
    private config: string;
    //文理
    private texture: string;

    public mcFactory: egret.MovieClipDataFactory;
    public mcDisplay: egret.MovieClip;
    public mcName: string;
    private suffix: string = '_bg';
    private buildingId: number;

    public backAsset: egret.Bitmap;
    public mcSmoke: egret.MovieClip;

    constructor(source: any, mcName: string, suffix?: string){
        super();

        this.config = source.sourceName + '_json';
        this.texture = source.sourceName  + '_png';
        this.mcName = mcName;
        suffix && (this.suffix = suffix);

        //创建
        //this.initBackground();
        this.initFactory();
        this.initMC(this.mcName);
        //this.initSmoke();

    }

    private initBackground(imgId: string = null): void{
        var texture: egret.Texture = RES.getRes( imgId ? imgId : this.mcName + this.suffix );
        this.backAsset = new egret.Bitmap( texture );
        //this.backAsset.anchorX = this.backAsset.anchorY = .5;
        this.addChild(this.backAsset);

    }

    public setBackground(imgId: string = null): void{
        this.initBackground(imgId);
    }

    public removeBackground(): void{

        if(this.getChildIndex(this.backAsset) !== -1){
            this.removeChild(this.backAsset);
            this.backAsset = null;
        }

    }

    private initFactory(): void{

        this.mcFactory = new egret.MovieClipDataFactory( RES.getRes(this.config), RES.getRes(this.texture) );

    }

    public initMC(mcName?: string): void{

        if(!this.mcDisplay){
            this.mcDisplay = new egret.MovieClip( this.mcFactory.generateMovieClipData(mcName) );
            this.addChild(this.mcDisplay);
        }

        //this.mcDisplay.gotoAndStop('start');
        this.mcDisplay.stop();
        this.mcDisplay.touchEnabled = true;

    }

    public initSmoke(x?: number, y?: number): void{

        var source: any = ProductionAnimateModel.productionAnimation[0];
        this.mcFactory.mcDataSet = source.config;
        this.mcFactory.texture = source.texture;
        if(!this.mcSmoke){
            this.mcSmoke = new egret.MovieClip( this.mcFactory.generateMovieClipData('smoke') );
            this.addChild(this.mcSmoke);
        }
        //this.mcSmoke.anchorX = this.mcSmoke.anchorY = .5;
        x && (this.mcSmoke.x = x);
        y && (this.mcSmoke.y = y);
        this.mcSmoke.stop();
        this.mcSmoke.gotoAndPlay('start', -1);

    }

    public removeSmoke(): void{
        if(this.mcSmoke){
            if(this.getChildIndex(this.mcSmoke) !== -1){
                this.removeChild(this.mcSmoke);
            }
            this.mcSmoke = null;
        }
    }

    public gotoAndPlay(label: string = 'start', time: number = -1): void{

        this.mcDisplay.gotoAndPlay(label, time);
        //this.mcSmoke.gotoAndPlay(label, time);

    }

    public gotoAndStop(label: string = 'start'): void{

        this.mcDisplay && this.mcDisplay.gotoAndStop(label);
        this.mcSmoke && this.mcSmoke.gotoAndStop(label);

    }

    public stop(): void{

        this.mcDisplay && this.mcDisplay.stop();
        this.mcSmoke && this.mcSmoke.stop();

        this.gotoAndStop();

    }

}
