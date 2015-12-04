/**
 * on 2014-12-29
 * by leo
 */

class AnimalModel extends ItemIsoModel
{

    public animalId:number;
    public name:number;

    public gold:number[] = [];
    public diamond:number;

    public produceTime:number;

    public lock:string[] = [];

    public feedItemId:number;

    public itemId:number;
    public itemNum:number;


    public minStep:number;
    public maxStep:number;
    public minStandTime:number;
    public maxStandTime:number;
    public vx:number;
    public vy:number;

    //hungry
    public animeHungryFront:string;
    public animeHungryBack:string;

    //normal
    public animeNormalFront:string;
    public animeNormalBack:string;

    //full
    public animeFullFront:string;
    public animeFullBack:string;

    //status
    public emotionNormal:string;
    public emotionHungry:string;
    public emotionFull:string;


    //商店里显示的动物图标
    public imgId:string;
    //商店标识
    public buyable:number;

    //ui中用到的动画
    public animeHungryBig:string;
    public animeNormalBig:string;
    public animeFullBig:string;

    public dialogHungry:string;
    public dialogNormal:string;
    public dialogFull:string;


    public constructor(data:any)
    {
        super(data);

        this.animalId = data.animalId;
        this.name = data.name;

        this.gold = this.spliteGold(data.gold);
        this.diamond = data.diamond;

        this.produceTime = data.produceTime;

        this.lock = this.splitLock(data.lock);

        this.feedItemId = data.feedItem;

        this.itemId = data.itemId;
        this.itemNum = data.itemNum;

        this.minStep = data.minStep;
        this.maxStep = data.maxStep;
        this.minStandTime = data.minStandTime;
        this.maxStandTime = data.maxStandTime;
        this.vx = data.vx;
        this.vy = data.vy;

        this.animeHungryFront = data.animeHungryFront;
        this.animeHungryBack = data.animeHungryBack;
        this.animeNormalFront = data.animeNormalFront;
        this.animeNormalBack = data.animeNormalBack;
        this.animeFullFront = data.animeFullFront;
        this.animeFullBack = data.animeFullBack;

        this.emotionHungry = data.emotionHungry;
        this.emotionNormal = data.emotionNormal;
        this.emotionFull = data.emotionFull;

        this.imgId = data.imgId;
        this.buyable = 100;

        this.animeHungryBig = data.animeHungryBig;
        this.animeNormalBig = data.animeNormalBig;
        this.animeFullBig = data.animeFullBig;
        this.dialogHungry = data.dialogHungry;
        this.dialogNormal = data.dialogNormal;
        this.dialogFull = data.dialogFull;

    }

    private splitLock(lock:string):string[]
    {
        var tmp:string = lock;
        var arr:string[];
        arr = tmp.split(";");
        arr.pop();

        return arr;
    }

    private spliteGold(gold:string):any[]
    {

        if(!gold || '' === gold)
        {
            return;
        }

        var rs:any[] = [];
        var sarr:string[] = String(gold).split(';');
        sarr.pop();
        if(!sarr || sarr.length === 0)
        {
            rs.push({'index':0, 'gold':0});
            return rs;
        }
        if(sarr.length === 1)
        {
            rs.push({index:0, gold:Number(sarr[0])});
            return rs;
        }

        for(var i:number = 0, len:number = sarr.length; i < len; ++i)
        {
            var index:string = sarr[i].split('*')[0];
            var gold:string = sarr[i].split('*')[1];
            rs.push({index:Number(index), gold:Number(gold)});
        }

        return rs;

    }

    public static getGold(animalId:number):number
    {

        var itemModel:AnimalModel = AnimalModel.getModelByAnimalId(animalId);
        var current:number = AnimalManager.getInstance().getAnimalNum(animalId);
        for(var i:number = 0, len:number = itemModel.gold.length; i < len; ++i)
        {
            if(itemModel.gold[i]['index'] > current)
            {
                return itemModel.gold[i]['gold'];
            }
        }
        return 0;
    }

    public static getUnlockLevel(animalId:number):number
    {
        var mm:AnimalModel = this.getModelByAnimalId(animalId);
        var a:string[] = String(mm.lock[0]).split("*");
        return Number(a[0]);
    }

    public static getMax(animaId:number, lv:number):number
    {
        var mm:AnimalModel = this.getModelByAnimalId(animaId);
        var i:number;
        var one:string[];
        var max:number = 0;

        for(i = 0; i < mm.lock.length; i++)
        {
            one = mm.lock[i].split("*");
            if(lv >= Number(one[0]))
            {
                max = Number(one[1]);
            }
            else
            {
                break;
            }
        }
        return max;
    }

    //===================================================
    public static itemList:Array<AnimalModel> = [];

    public static init(data:any):void
    {
        var i:number;
        var mm:AnimalModel;
        for(i = 0; i < data.length; i++)
        {
            mm = new AnimalModel(data[i]);
            AnimalModel.itemList.push(mm);
        }
    }


    public static getModelByAnimalId(id:number):AnimalModel
    {
        var i:number;
        var one:AnimalModel;
        for(i = 0; i < AnimalModel.itemList.length; i++)
        {
            one = AnimalModel.itemList[i];
            if(one.animalId == id)
            {
                return one;
            }
        }
        return null;
    }


    public static getModelByImgId(imgId:string):AnimalModel
    {
        var i:number;
        var one:AnimalModel;
        for(i = 0; i < AnimalModel.itemList.length; i++)
        {
            one = AnimalModel.itemList[i];
            if(one.imgId === String(imgId))
            {
                return one;
            }
        }
        return null;
    }



}