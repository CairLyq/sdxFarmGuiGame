/**
 * Created by rodey on 14/12/3.
 *
 * 购买金币和钻石基类
 */

class BuyItemRender extends egret.DisplayObjectContainer{

    //创建的数量
    private num: number;
    //创建的类型: 金币item || 砖石item  默认为金币类型
    private type: string = GameStatic.JIN_BI;
    //所得数值对应数组
    private incomeData: number[];
    //花费数值对应的数组
    private priceData: number[];

    constructor(num: number, type: string){
        super();

        this.num = num;
        this.type = type;
        //创建元素
        this.createItem(type);

        this.incomeData = [500, 1000, 2000, 5000, 15000];
        this.priceData = [50, 100, 200, 500, 1500];

    }

    /**
     * 根据TYPE创建item
     * @param type
     */
    private createItem(type: string): void{
        if(type === GameStatic.JIN_BI){
            this.createJB();
        }else if(type === GameStatic.ZUAN_SHI){
            this.createZS();
        }
    }

    /**
     * 创建金币购买item
     */
    private createJB(): void{
        //初始化数组所需要的对应数据
        this.incomeData = [500, 1000, 2000, 5000, 15000];
        this.priceData = [50, 100, 200, 500, 1500];
        //生成多个
        var i: number = 0, len: number = this.num;
        for(; i < len; ++i){
            var key: string = 'GMZS-jinbi' + this.incomeData[i];
            var num: number = this.incomeData[i];
            var price: number = this.priceData[i];
            var give: string = (price / 10).toString();
            var item: ItemRenderBase = new ItemRenderBase(key, num, 'GMZS-zuangshi', price, give, this.type);
            //第一个优惠没有
            if(i == 0){
                item.setItemGive(false);
            }
            this.addChild(item);
            item.x = (item.width + 10) * i;
            item.y = 0;
        }
    }

    /**
     * 创建砖石购买item
     */
    private createZS(): void{
        //初始化数组所需要的对应数据
        this.incomeData = [60, 300, 1280, 1980, 4880];
        this.priceData = [6, 30, 128, 198, 488];
        //生成多个
        var i: number = 0, len: number = this.num;
        for(; i < len; ++i){
            var key: string = 'GMZS-zuanshi' + this.incomeData[i];
            var num: number = this.incomeData[i]; //所得数值
            var price: number = this.priceData[i]; //所花数值
            var give: string = num.toString() ;    //优惠（多送数值）
            var item: ItemRenderBase = new ItemRenderBase(key, num, null, price, give, this.type);
            this.addChild(item);
            item.x = (item.width + 10) * i;
            item.y = 0;
        }
    }


}
