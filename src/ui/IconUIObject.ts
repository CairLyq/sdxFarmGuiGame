/**
 * Created by rodey on 14/11/20.
 * UI 图标类
 */

class IconUIObject extends UIFactory{

    constructor(key: string, bgmap?: string){
        super();
        this.key = key;
        this.name = key;
        //开启触摸
        this.touchEnabled = true;

        //背景或者边框
        if(bgmap && '' !== bgmap){
            this.addBgMap(bgmap);
        }
        //主图标
        if(key && '' !== key){
            this.init();
        }
    }

    /**
     * 初始化
     */
    private init(): void{
        this.bitmap = null;
        this.remove();
        this.addBitMap(this.key);
    }

    /**
     * 移除当前对象
     */
    public remove(){
        if(this.parent){
            this.parent.removeChild(this);
        }
    }

    /**
     * 添加主图标
     * @param bitmap
     */
    public addBitMap(bitmap: string): IconUIObject{
        this.bitmap = null;
        this.remove();
        this.bitmap = new BitmapEx(this.key);
        this.addChild(this.bitmap);
        this.bitmap.x = (this.width - this.bitmap.width) * .5;
        this.bitmap.y = (this.height - this.bitmap.height) * .5 - 10;
        return this;
    }

    /**
     * 添加背景或者边框
     * @param bgmap
     */
    public addBgMap(bgmap: string):void
    {
        var self = this;
        self.bgmap = new BitmapEx(bgmap);
        self.addChild(self.bgmap);
    }

    /**
     * 添加 标识
     * @param tip
     */
    public addTip(tip: string, x?: number, y?: number): IconUIObject{
        var self = this;
        self.tip = new BitmapEx(tip);
        self.addChild(self.tip);
        self.tip.x = x || 0;
        self.tip.y = y || 0;
        return self;
    }

    public getIcon(): egret.Bitmap{
        return this.bitmap;
    }


}
