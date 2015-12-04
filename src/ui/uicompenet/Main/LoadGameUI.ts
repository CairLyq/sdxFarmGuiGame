/**
 * Created by rodey on 15/1/27.
 */

class LoadGameUI extends egret.gui.SkinnableComponent{

    public preLabel: egret.gui.Label;
    public loadText: egret.gui.Label;
    public thumb: egret.gui.UIAsset;
    public mcAsset: egret.gui.UIAsset;
    private _text: number;
    private _gtext: string;
    private _loadTextList: any[] = [];
    private timer: egret.Timer;

    constructor(){
        super();
        this.skinName = skins.uicompenet.Main.LoadingUISkin;

        this.getLoadTextList();

    }

    public get text(): number{
        return this._text;
    }
    public set text(value: number){
        this._text = value;
        if(this.preLabel){
            this.preLabel.text = Math.floor(value * 100) + '%';
        }
        if(this.thumb){
            this.thumb.width = value * 238;

        }

    }

    public get groupText(): string{
        return this._gtext;
    }
    public set groupText(value: string){
        this._gtext = value;
        if(this.loadText){
            //this.loadText.text = '正在加载资源组('+ value +')......';

            this.randomLoadText();

        }
    }

    public partAdded(partName:string, instance:any):void{
        super.partAdded(partName, instance);
        if(instance == this.mcAsset){
            this.mcAsset.anchorX = this.mcAsset.anchorY = .5;
        }
    }

    private getLoadTextList(): void{

        var i: number = 0,
            len: number = 13;

        for( ; i < len; ++i ){
            this._loadTextList.push( Language.getString( 4, i ) );
        }

        //console.log(this._loadTextList);
    }

    public randomLoadText(): void{



        if(!this.timer){
            this.timerHandler(null);
            this.timer = new egret.Timer(5000);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
            this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComplateHandler, this);
            this.timer.start();
        }

    }

    private timerHandler(evt: egret.TimerEvent): void{

        var rm: number = Math.floor( Math.random() * this._loadTextList.length);
        var lt: string = this._loadTextList[ rm ];
        this.loadText.text = lt + '('+ this._gtext +')';

    }

    private timerComplateHandler(evt: egret.TimerEvent): void{
        this.removeTimer();
        console.log(' .complate. ')
    }

    public removeTimer(): void{
        this.timer.stop();
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComplateHandler, this);
        this.timer = null;
        delete this.timer;
    }
}
