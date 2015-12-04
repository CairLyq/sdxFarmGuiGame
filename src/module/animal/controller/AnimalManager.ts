/**
 * on 2015-03-09
 * by leo
 */

class AnimalManager
{

    private animalDataArr:UserAnimal[];

    //private animalId:number;
    //private addAnimalData:UserAnimal;

    //private type:number;

    //public ADD:number = 1;
    //public INIT:number = 2;



    public constructor()
    {
        //===================================================
        //this.type = 0;

        //===================================================
        //this.addAnimalData = null;

        this.animalDataArr = [];
    }

    //===================================================
    //初始化动物
    public init(data:UserAnimal[]):void
    {
        this.animalDataArr = data;

        //this.loadRes(this.INIT);
        Loader.instance.loadGroups([GroupName.ANIMAL_GROUP, GroupName.GOODS_GROUP], this.onLoaded, this);
    }


    //添加动物
    //public addAnimal(data:UserAnimal):void
    //{
    //    this.addAnimalData = data;
    //
    //    this.loadRes(this.ADD);
    //}
    //public addAnimal(animalId:number):void
    //{
    //    this.animalId = animalId;
    //
    //    this.loadRes(this.ADD);
    //}

    //public loadRes(type:number):void
    //{
    //    this.type = type;
    //
    //    Loader.instance.loadGroups([GroupName.ANIMAL_GROUP, GroupName.GOODS_GROUP], this.onLoaded, this);
    //}

    //private onLoaded():void
    //{
    //    if(this.INIT == this.type)
    //    {
    //        this.initAfterLoaded();
    //    }
    //    else if(this.ADD == this.type)
    //    {
    //        this.addAnimalAfterLoaded();
    //    }
    //    this.type = 0;
    //
    //
    //}

    //===================================================
    public onLoaded():void
    {
        var i:number;
        var len:number = this.animalDataArr.length;
        var animalData:UserAnimal;
        var animal:Animal;

        for(i = 0; i < len; i++)
        {
            animalData = this.animalDataArr[i];


            animal = this.generate(animalData.animalId);

            Lyrs.LYRS_ITEM_IN_SCENE.addChild(animal);
            DepthManager.getInstance().addItem(animal, false);

            animal.setPosByIso();

            animal.initData(animalData);

            animal.fadeIn();
        }
    }


    //public addAnimalAfterLoaded():void
    //{
    //    var animal:Animal;
    //
    //
    //    animal = this.generate(this.animalId);
    //
    //    Lyrs.LYRS_ITEM_IN_SCENE.addChild(animal);
    //    DepthManager.getInstance().addItem(animal);
    //
    //    animal.setPosByIso();
    //
    //    animal.fadeInAddAnimal();
    //
    //
    //
    //    this.animalId = 0;
    //
    //
    //    //animal.updateView();
    //    //this.animalDataArr.push(this.addAnimalData);
    //    //this.addAnimalData = null;
    //    //Camera.getInstance().focus(animal);
    //
    //}

    public addAnimalData(data:UserAnimal):void
    {
        this.animalDataArr.push(data);
    }

    public generate(animalId:number):Animal
    {
        var pos3D:Point3D;
        var mm:AnimalModel;
        var animal:Animal;

        if(GuideManager.getInstance().isInGuide())
        {
            pos3D = new Point3D(AnimalConst.BP_MX_IN_GUIDE, 0, AnimalConst.BP_MZ_IN_GUIDE);
        }
        else
        {
            pos3D = CollisionCheck.getInstance().getRandPos();
        }

        mm = AnimalModel.getModelByAnimalId(animalId);
        animal = new Animal(pos3D, mm);
        //Lyrs.LYRS_ITEM_IN_SCENE.addChild(animal);

        //animal.initData(data);
        //
        //animal.fadeIn();
        //animal.setPosByIso();
        //
        //DepthManager.getInstance().addItem(animal, false);

        return animal;
    }

    public hideAnimals():void
    {
        if(GuideManager.getInstance().isInGuide())
        {
            return;
        }

        var animalList:Animal[] = DepthManager.getInstance().getAnimals();
        var i:number;
        var len:number = animalList.length;
        var one:Animal;

        for(i = 0; i < len; i++)
        {
            one = animalList[i];
            one.visible = false;

            one.suspend();
        }
    }

    public reShowAnimals():void
    {
        if(GuideManager.getInstance().isInGuide())
        {
            return;
        }

        var animalList:Animal[] = DepthManager.getInstance().getAnimals();
        var i:number;
        var len:number = animalList.length;
        var one:Animal;
        var pos3D:Point3D;

        for(i = 0; i < len; i++)
        {
            one = animalList[i];
            one.visible = true;
            pos3D = CollisionCheck.getInstance().getRandPos();
            one.setPosByIso(pos3D);
            DepthManager.getInstance().moveItem(one);

            one.startup();
        }
    }

    public removeAnimal(animal:Animal):void
    {
        var idx:number = this.animalDataArr.indexOf(animal.data);
        if(Global.NOT_FOUND != idx)
        {
            this.animalDataArr.splice(idx, 1);
            console.log("==========================delete animal from animalDataArr:", animal.getModel.animalId);
        }

        animal.dispose();

        Lyrs.LYRS_ITEM_IN_SCENE.removeChild(animal);

        DepthManager.getInstance().removeItem(animal);
    }

    public dispose():void
    {
        var i:number;
        var animalList:Animal[] = DepthManager.getInstance().getAnimals();
        var len:number = animalList.length;
        var animal:Animal;


        for(i = 0; i < len; i++)
        {
            animal = animalList[i];
            animal.dispose();
        }
    }

    //获取某种动物的数量
    public getAnimalNum(animalId:number):number
    {
        var i:number;
        var len:number = this.animalDataArr.length;
        var one:UserAnimal;
        var re:number = 0;

        for(i = 0; i < len; i++)
        {
            one = this.animalDataArr[i];
            if(one.animalId == animalId)
            {
                re++;
            }
        }
        return re;
    }
    //===============================================================
    private static _instance:AnimalManager;

    public static getInstance():AnimalManager
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new AnimalManager();
        }
        return this._instance;
    }
}