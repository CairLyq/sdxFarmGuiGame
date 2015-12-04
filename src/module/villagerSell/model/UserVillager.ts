/**
 * on 2015-03-12
 * by leo
 */

class UserVillager
{
    public villagerId:number;
    public itemId:number;
    public itemNum:number;
    public price:number;//总价
    public status:number;//0,未出售,1 已出售
    public exp:number;

    public dialogId:number;
    public npcId:number;

    public constructor()
    {
        this.villagerId = 0;
        this.itemId = 0;
        this.itemNum = 0;
        this.price = 0;
        this.status = 0;
        this.exp = 0;

        this.dialogId = 0;
        this.npcId = 0;
    }
}