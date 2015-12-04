/**
 * Created by rodey on 15/1/12.
 */


class BuyDiamondModel{

    private static _instance: BuyDiamondModel;
    public static getInstance(): BuyDiamondModel{
        if(!BuyDiamondModel._instance){
            BuyDiamondModel._instance = new BuyDiamondModel();
        }
        return BuyDiamondModel._instance;
    }

    public static itemList: Array<BuyDiamondModel> = [];

    private id: number;
    private diamondBonus: number;
    private diamondBuy: number;
    private money: number;
    private imgId: string;
    private diamondPre: string;

    constructor(){
        this.id = 0;
        this.diamondBonus = 0;
        this.diamondBuy = 0;
        this.money = 0;
        this.imgId = '';
        this.diamondPre = '';

    }

    public static init(data: any[]){
        var i: number = 0,
            len: number = data.length;
        var item: BuyDiamondModel;
        if(data && len){
            for( ; i < len; ++i){
                item = new BuyDiamondModel();
                item.setData(data[i]);
                BuyDiamondModel.itemList.push(item);
            }
        }
    }

    private setData(data: any): void{
        this.id = data.id;
        this.diamondBonus = data.diamondBonus;
        this.diamondBuy = data.diamondBuy;
        this.money = data.money;
        this.imgId = data.imgId;
        if(this.diamondBonus > 0){
            this.diamondPre = '+' + Math.floor(this.diamondBonus / this.diamondBuy * 100) + '%';
        }
    }

    public static getModelById(id: number): BuyDiamondModel{
        var i: number = 0, len: number = BuyDiamondModel.itemList.length;
        for( ; i < len; ++i){
            if(BuyDiamondModel.itemList[i]['id'] == id){
                return BuyDiamondModel.itemList[i];
            }
        }
        return null;
    }


}