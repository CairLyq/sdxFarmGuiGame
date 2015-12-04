/**
 * Created by rodey on 14/12/3.
 *
 * IterRender 基类
 */

class ItemRenderBase extends egret.DisplayObjectContainer {

    //背景
    private itemBack: egret.Bitmap;
    //图标（如产品图片））
    private itemPic: egret.Bitmap;
    //数量
    private itemIncome: number = 0;
    //数量标识（如：5个砖石可以购买所得的金币数量）,其中包括一些fnt数据
    private itemIncomeSprite: egret.Sprite;
    //购买按钮（其中包括 icon， 花费值）
    private itemBuyBtn: egret.Sprite;
    //花费数值
    private itemPrice: number;
    //优惠块(多送)
    private itemGiveSprite: egret.Sprite;
    //优惠值
    private itemGive: string;
    //类型 默认是金币
    private type: string = GameStatic.JIN_BI;



    constructor(itemPic: string, itemIncome: number, itemBtnIcon: string, itemPrice: number, itemGive: string, type?: string){
        super();

        this.itemIncome = itemIncome;
        this.itemPrice = itemPrice;
        this.itemGive = itemGive;
        this.type = type;

        //创建背景
        this.itemBack = new egret.Bitmap(RES.getRes('GMZS-shutiao'));
        this.addChild(this.itemBack);
        //创建图标
        this.itemPic = new egret.Bitmap(RES.getRes(itemPic));
        this.addChild(this.itemPic);
        this.itemPic.x = (this.width - this.itemPic.width) * .5;
        this.itemPic.y = (this.height - this.itemPic.height) * .35;
        //创建数量标识
        this.createItemIncomeSprite(itemIncome);
        //创建优惠多送块
        this.createGive(itemGive);
        //创建下面的购买按钮
        this.createItemBuyBtn(itemBtnIcon, itemPrice);

    }

    /**
     * 创建顶部所得值块
     * @param itemNumber
     */
    private createItemIncomeSprite(itemNumber: number): void{
        this.itemIncomeSprite = new egret.Sprite();
        this.addChild(this.itemIncomeSprite);
        this.itemIncomeSprite.width = this.width;
        this.itemIncomeSprite.height = 32;
        this.itemIncomeSprite.x = 0;
        this.itemIncomeSprite.y = 20;

        //左边的x图标
        var left: egret.Bitmap = new egret.Bitmap(RES.getRes('GMZS-chenghao'));
        this.itemIncomeSprite.addChild(left);
        left.x = 10;
        left.y = (32 - left.height) * .5;

        var bt: egret.BitmapText = this.createBitmapText(String(itemNumber));
        this.itemIncomeSprite.addChild(bt);
        bt.x = left.width + 20;
        bt.y = (32 - bt.height) * .5;
        //console.log(itemNumber);
    }

    /**
     * 创建优惠多送块
     * @param itemGiveNumber
     */
    private createGive(itemGiveNumber: string): void{
        this.itemGiveSprite = new egret.Sprite();
        this.addChild(this.itemGiveSprite);
        this.itemGiveSprite.height = 35;
        //创建『多送』
        var ds: egret.Bitmap = new egret.Bitmap(RES.getRes('GMJB-duosong'));
        this.itemGiveSprite.addChild(ds);
        ds.x = 0;
        ds.y = (35 - ds.height) * .5;
        //创建多送数值
        itemGiveNumber = (this.type == GameStatic.JIN_BI) ? itemGiveNumber + '%' : itemGiveNumber;
        var bt: egret.BitmapText = this.createBitmapText(itemGiveNumber);
        this.itemGiveSprite.addChild(bt);
        bt.x = 5 + ds.width;
        bt.y = (35 - bt.height) * .5;
        //设置坐标
        this.itemGiveSprite.x = (this.width - this.itemGiveSprite.width) * .2;
        this.itemGiveSprite.y = (this.height - this.itemGiveSprite.height) * .7;
    }

    /**
     * 创建购买按钮
     * @param itemPrice
     */
    private createItemBuyBtn(itemBtnIcon: string, itemPrice: number): void{
        this.itemBuyBtn = new egret.Sprite();
        this.addChild(this.itemBuyBtn);
        this.itemBuyBtn.width = 129;
        this.itemBuyBtn.height = 74;

        //创建按钮背景
        var bg: egret.Bitmap = new egret.Bitmap(RES.getRes('GMZS-anniu'));
        this.itemBuyBtn.addChild(bg);


        //创建按钮上的数值，所花费的数值
        var text = (this.type === GameStatic.ZUAN_SHI) ? ('￥ ' + itemPrice) : String(itemPrice);
        var txt: egret.TextField = this.createTextField(text);
        this.itemBuyBtn.addChild(txt);
        //console.log(itemPrice);

        //创建按钮上的小图标
        if(itemBtnIcon && itemBtnIcon != null){
            var icon: egret.Bitmap = new egret.Bitmap(RES.getRes(itemBtnIcon));
            this.itemBuyBtn.addChild(icon);
            icon.x = 10;
            icon.y = (this.itemBuyBtn.height - icon.height) * .5;
            //改变文本的位置
            txt.x = icon.width + 10;
            txt.y = (this.itemBuyBtn.height - txt.height) * .5;
        }else{
            txt.x = (this.width - this.itemBuyBtn.width) * .5;
            txt.y = (this.itemBuyBtn.height - txt.height) * .5;
        }

        //设置坐标
        this.itemBuyBtn.width = bg.width;
        this.itemBuyBtn.x = 13;
        this.itemBuyBtn.y = (this.height - 94);

    }

    /**
     * 创建文本
     * @param text
     * @returns {egret.TextField}
     */
    private createTextField(text: string): egret.TextField{
        var txt: egret.TextField = new egret.TextField();
        txt.text = text;
        txt.textAlign = 'center';
        txt.textColor = 0xFFFFFF;
        txt.size = 26;
        txt.stroke = 2;
        txt.strokeColor = 0x333333;
        //txt.bold = true;

        return txt;
    }

    /**
     * 创建 fnt文字 文理
     * @param text
     * @returns {egret.BitmapText}
     */
    private createBitmapText(text: string): egret.BitmapText{
        var spriteSheet:egret.BitmapTextSpriteSheet = RES.getRes("24font_fnt");
        var bt = new egret.BitmapText();
        bt.spriteSheet = spriteSheet;
        bt.text = text;
        return bt;
    }


    public setItemGive(flag: boolean = true): void{
        if(!flag){
            this.itemGiveSprite.alpha = 0;
            this.itemGiveSprite.visible = flag;
        }
    }


    /** =======Public=========== **/

    //获取当前的所得值
    public getItemIncome(): number{
        return this.itemIncome;
    }
    //获取所需要的值
    public getItemPrice(): number{
        return this.itemPrice;
    }
    //获取当前类型
    //获取优惠值
    public getItemGive(): string{
        return this.itemGive;
    }


}
