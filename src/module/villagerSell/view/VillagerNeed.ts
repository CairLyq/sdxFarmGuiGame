/**
 * on 2015-03-16
 * by leo
 */

class VillagerNeed extends egret.DisplayObjectContainer
{
    private needItem:BitmapEx;
    private bg:BitmapEx;
    private harvestSTIM:any;
    private data: any;


    public constructor()
    {
        super();
        var self = this;

        this.width = 53;
        this.height = 58;

        this.bg = new BitmapExV2("SGK", .5, 1, false);
        this.addChild(this.bg);
        this.bg.width = 53;
        this.bg.height = 58;
        this.bg.visible = false;

        this.needItem = new BitmapExV2(null, .5, 1, false);
        this.addChild(this.needItem);
        this.needItem.width = 45;
        this.needItem.height = 45;
        this.needItem.x = 0;
        this.needItem.y = 0;

        this.alpha = (Math.random() < 1) ? 0 : 1;

        //加入动画
        var randomTime: number = Math.random() * 5000 + 10000;
        this.harvestSTIM = window.setInterval( ()=>
        {
            if(self.data){
                self.setData(this.data);
            }
            egret.Tween.get(self).to({ alpha: 1 }, 300).call(()=>{
                self.interval(self.timeout);
            });

        }, randomTime);

    }

    public setData(data: any): void{

        this.data = data;
        var npcModel: NPCModel = NPCModel.getNPCById(data.npcId);
        var itemModel: DepotModel = DepotModel.getModelById(data.itemId);

        var obj: any = (Math.random() < .5)
            ? { imgId: npcModel.emotionWalking, visible: false }
            : { imgId: itemModel.imgId, visible: true };

        this.setNeed(obj.imgId);
        this.setBG(obj.visible);

    }

    private interval(cb?: Function): void{

        TweenIt.loopTween(this, {scaleX:.6, scaleY:.6, alpha:1}, {scaleX:1, scaleY:1, alpha:1}, 300, 2, cb, this);

    }

    private timeout(): void{

        egret.Tween.get(this).wait(Math.random() * 500 + 3000).to({ alpha: 0 }, 300);

    }

    /*public setNeed(itemId:number):void
    {
        var dm:DepotModel = DepotModel.getModelById(itemId);
        this.needItem.setTexture(dm.imgId);
        this.needItem.y = 0;
    }*/

    public setNeed(imgId:string, point?: egret.Point):void
    {
        this.needItem.setTexture(imgId);

        this.needItem.x = point && point.x || 0;
        this.needItem.y = point && point.y || 0;

    }

    public setImg(res:string, offsetY:number = 0):void
    {
        this.needItem.setTexture(res);
        this.needItem.y = offsetY;
    }

    public destroy():void
    {

        window.clearInterval(this.harvestSTIM);
        delete this.harvestSTIM;

    }

    public setBG(v: boolean): void{
        this.bg.visible = v;
        if(v == true){
            this.needItem.x = 0;
            this.needItem.y = -10;
        }else{
            this.needItem.x = -22.5;
            this.needItem.y = 10;
        }
    }

    public show(cb: Function = null, target?: any): void{

        var self = this;
        egret.Tween.get(self).to({ alpha: 1 }, 300).call(()=>{
            self.interval(cb);
        });

    }




}