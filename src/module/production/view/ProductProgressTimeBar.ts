/**
 * Created by rodey on 15/1/19.
 */


class ProductProgressTimeBar extends egret.gui.SkinnableComponent{

    public labelDisplay: egret.gui.Label;
    public thumb: egret.gui.UIAsset;

    private totalTime: number;
    private currentTime: number;

    constructor(){
        super();
        this.skinName = skins.uicompenet.Production.ProductionProgressBarSkin;

        this.totalTime = 0;
        this.currentTime = 0;
    }

    /**获取 和 设置 总时间**/
    public get totalTimes(): number{
        return this.totalTime;
    }
    public set totalTimes(value: number){
        this.totalTime = value;
        this.updateTime(this.currentTime, value);
    }

    public partAdded(partName: string, instance: any): void{
        super.partAdded(partName, instance);
        if(this.labelDisplay){
            this.labelDisplay.text = TimeUtils.getFormatTime(this.totalTime);
        }else if(this.thumb){
            this.updateTime(this.currentTime);
        }
    }

    public updateTime(time?: number, total?: number): void{
        //this.thumb.width = 0;
        var time: number = time || this.currentTime;
        var total: number = total || this.totalTime;
        this.currentTime = time;
        var pre = time / total;
        if(this.thumb){
            this.thumb.width = 77 - Math.round(pre * 77);
        }
        if(this.labelDisplay){
            this.labelDisplay.text = TimeUtils.getFormatTime(time);
        }
    }

}