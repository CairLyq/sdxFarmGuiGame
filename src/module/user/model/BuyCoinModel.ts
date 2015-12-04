/**
 * Created by rodey on 15/1/12.
 */


class BuyCoinModel{

    private static _instance: BuyCoinModel;
    public static getInstance(): BuyCoinModel{
        if(!BuyCoinModel._instance){
            BuyCoinModel._instance = new BuyCoinModel();
        }
        return BuyCoinModel._instance;
    }

    public static itemList: Array<BuyCoinModel> = [];

    private id: number;
    private coinBonus: number;
    private coinBuy: number;
    private diamond: number;
    private imgId: string;
    private coinPre: string;

    constructor(){
        this.id = 0;
        this.coinBonus = 0;
        this.coinBuy = 0;
        this.diamond = 0;
        this.imgId = '';
        this.coinPre = '';

    }

    public static init(data: any[]){
        var i: number = 0,
            len: number = data.length;
        var item: BuyCoinModel;
        if(data && len){
            for( ; i < len; ++i){
                item = new BuyCoinModel();
                item.setData(data[i]);
                BuyCoinModel.itemList.push(item);
            }
        }
    }

    private setData(data: any): void{
        this.id = data.id;
        this.coinBonus = data.coinBonus;
        this.coinBuy = data.coinBuy;
        this.diamond = data.diamond;
        this.imgId = data.imgId;
        if(this.coinBonus > 0){
            this.coinPre = '+' + Math.floor(this.coinBonus / this.coinBuy * 100) + '%';
        }
    }

    public static getModelById(id: number): BuyCoinModel{
        var i: number = 0, len: number = BuyCoinModel.itemList.length;
        for( ; i < len; ++i){
            if(BuyCoinModel.itemList[i]['id'] == id){
                return BuyCoinModel.itemList[i];
            }
        }
        return null;
    }


}