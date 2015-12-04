/**
 * Created by rodey on 14/12/23.
 */

class GoodsModel{
    public imgId: string = '';
    public exp: number = 0;
    public desc: string = '';
    public unlockLv: number = 0;
    public diamond: number = 0;
    public name: string = '';
    public storeType: number = 0;
    public gold: number = 0;
    public type: number = 0;
    public itemId: number = 0;

    constructor(){}

    public setData(data: any): void{
        this.exp = data.exp;
        this.desc = data.desc;
        this.unlockLv = data.unlockLv;
        this.diamond = data.diamond;
        this.name = data.name;
        this.storeType = data.storeType;
        this.gold = data.gold;
        this.type = data.type;
        this.itemId = data.itemId;
        this.imgId = data.imgId;
    }

}