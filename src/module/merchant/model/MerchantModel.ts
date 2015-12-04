/**
 * Created by rodey on 15/3/12.
 */

class MerchantModel{

    private static _instance: MerchantModel;
    public static getInstance(): MerchantModel{
        if(!MerchantModel._instance){
            MerchantModel._instance = new MerchantModel();
        }
        return MerchantModel._instance;
    }

    public static itemList: Array<MerchantModel> = [];

    public id: number;
    public rate: number;
    public imgId: string;
    public tag: string;

    constructor(){
        this.id = 0;
        this.rate = 0;
        this.imgId = '';
        this.tag = '';

    }

    public static init(data: any[]){
        var i:number = 0,
            len:number = data.length;
        var item:MerchantModel;
        if(data && len)
        {
            for(; i < len; ++i)
            {
                item = new MerchantModel();
                item.setData(data[i]);
                MerchantModel.itemList.push(item);
            }
        }
    }

    private setData(data: any): void{
        this.id = data.id;
        this.rate = data.rate;
        this.imgId = data.imgId;
        this.tag = data.tag;
    }

    public static getModelById(id: number): MerchantModel{
        var i: number = 0, len: number = MerchantModel.itemList.length;
        for( ; i < len; ++i){
            if(MerchantModel.itemList[i]['id'] == id){
                return MerchantModel.itemList[i];
            }
        }
        return null;
    }


}
