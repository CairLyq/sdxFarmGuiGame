/**
 * Created by rodey on 14/12/30.
 */

class SpeedModel{

    private static _instance: SpeedModel;
    public static getInstance(): SpeedModel{
        if(!SpeedModel._instance){
            SpeedModel._instance = new SpeedModel();
        }
        return SpeedModel._instance;
    }

    public static itemList: Array<SpeedModel> = [];

    private time: number;
    private diamond: number;

    constructor(){
        this.time = 0;
        this.diamond = 0;
    }

    public static init(data: any): void{
        var i: number = 0,
            len: number = data.length,
            item: SpeedModel;
        for(; i < len; ++i){
            item = new SpeedModel();
            item.setData(data[i]);
            SpeedModel.itemList.push(item);
        }
    }

    public setData(data: any): void{
        this.time = data.time;
        this.diamond = data.diamond;
    }

    public static getSpeed(time: number): number{
        var i: number = 0,
            len: number = SpeedModel.itemList.length;
        for( ; i < len; ++i){
            if(SpeedModel.itemList[i]['time'] >= time){
                return SpeedModel.itemList[i]['diamond'];
                break;
            }
        }
        return 0;
    }


}
