/**
 * Created by rodey on 15/3/3.
 */

class RestoreBuildTimeBar extends egret.gui.SkinnableComponent{

    public speed_btn: egret.gui.Button;

    public timeLabel: egret.gui.Label;
    public nameLabel: egret.gui.Label;
    private _name: string;
    private _time: number;
    private _currentTime: number;
    public diamonLabel:egret.gui.Label;
    private _diamond: number;
    private _data: any;

    public building: BuildingIso;

    public constructor(data?: any){
        super();
        this.skinName = skins.uicompenet.Commons.RestoreBuildTimeBarSkin;

        this.data = data;
    }

    public get time(): number{ return this._time; }
    public set time( value: number ){
        if(value == this._time) return;
        this._time = value;
        this._currentTime = value;
        this.updateTime(value);
    }

    public get name(): string{ return this._name; }
    public set name(value: string){
        this._name = value;
        if(this.nameLabel){
            this.nameLabel.text = value;
        }
    }

    //根据时间获取加速所需要的钻石数
    public get diamond(): number{ return this._diamond; }
    public set diamond(value: number){
        if(value == this._diamond) return;
        this._diamond = value;
        if(this.speed_btn){
            this.speed_btn.label = String(value);
        }
    }

    //当前建筑数据
    public get data(): any{ return this._data; }
    public set data(value: any){
        if(value == this._data) return;
        this._data = value;
        this.name = value.building.model.name;
    }

    public childrenCreated(): void{
        super.childrenCreated();

        if(this.speed_btn){
            this.speed_btn.touchEnabled = true;
            this.speed_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.speedRestoreBuild, this);
        }

        if(this.nameLabel){
            this.nameLabel.text = this._name;
        }

        if(this.timeLabel){
            this.updateTime(this._time);
        }

    }

    public partAdded(partName: string, instance: any): void{
        super.partAdded(partName, instance);
        /*if(instance == this.speed_btn){
            this.speed_btn.touchEnabled = true;
            this.speed_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.speedRestoreBuild, this);
        }*/
    }

    public speedRestoreBuild(evt: egret.TouchEvent): void{

        if(this._currentTime <= 0) return;

        var target: egret.gui.UIAsset = evt.currentTarget || evt.target;
        GameEvent.watcher.dispatchEventWith(GameEvent.RESTORE_BUILD_SPEED, true, this.data);

    }

    public updateTime(time: number): void{
        this._currentTime = time;
        if(this.timeLabel){
            this.timeLabel.text = TimeUtils.getFormatTime(time);
        }
        this.updateDiamond();
    }

    public updateDiamond(): void{
        var diamond: number;
        if(this._currentTime <= 0){
            diamond = 0;
        }else{
            diamond = SpeedModel.getSpeed(this._currentTime);
        }
        if(this.speed_btn){
            this.speed_btn.label = String(diamond);
        }
    }


}
