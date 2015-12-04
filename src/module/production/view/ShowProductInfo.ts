/**
 * Created by rodey on 15/1/23.
 */

class ShowProductInfo extends egret.gui.SkinnableComponent{

    public nameLabel: egret.gui.Label;
    public timeLabel: egret.gui.Label;
    public contentGroup: egret.gui.Group;
    public bgAsset: egret.gui.UIAsset;

    private _name: string;
    private _time: number;
    private _data: any[] = [];

    constructor(name?: string, time?: number, data?: any[]){
        super();
        this.skinName = skins.uicompenet.Production.ShowProductInfoSkin;

        this._name = name;
        this._time = time;
        this._data = data;
    }

    public get data(): any[]{
        return this._data;
    }
    public set data(value: any[]){
        if(value == this._data)
            return;
        this._data = value;
        if(this.contentGroup){
            this.createDataList(value);
        }
    }

    public get time(): number{ return this._time; }
    public set time(value: number){
        if(value == this._time) return;
        this._time = value;
        if(this.timeLabel){
            this.timeLabel.text = TimeUtils.getFormatTime(this._time);
        }
    }

    public get name(): string{ return this._name; }
    public set name(value: string){
        if(value == this._name) return;
        this._name = value;
        if(this.nameLabel){
            this.nameLabel.text = value;
        }
    }

    public partAdded(partName:string, instance:any):void{
        super.partAdded(partName, instance);
        if(instance == this.nameLabel){
            this.nameLabel.text = this._name;

        }else if(instance == this.timeLabel){
            this.timeLabel.text = TimeUtils.getFormatTime(this._time);

        }else if(instance == this.contentGroup){
            //创建列表
            this.createDataList();

        }
    }

    private createDataList(data?: any[]): void{
        this.contentGroup.removeAllElements();
        var data: any[] = data || this._data;
        var i: number = 0,
            len: number = this._data.length;
        var itemRender: game.ShowProductItemRender;
        for( ; i < len; ++i){
            itemRender = new game.ShowProductItemRender();
            itemRender.data = data[i];
            this.contentGroup.addElement(itemRender);
        }

    }
}
