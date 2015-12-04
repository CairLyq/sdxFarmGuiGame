/**
 * on 2014-12-11
 * by leo
 */

class DepthManager
{
    public itemList:ItemIso[];

    public constructor()
    {
        this.itemList = [];
    }

    public addItem(newItem:ItemIso, isUpdate:boolean = true):void
    {
        var i:number;
        var one:ItemIso;
        var idx:number = Global.NOT_FOUND;

        for(i = 0; i < this.itemList.length; i++)
        {
            one = this.itemList[i];
            if(one.pShort.x + one.model.col - 1 >= newItem.pShort.x && one.pShort.z + one.model.row - 1 >= newItem.pShort.z)
            {
                idx = i;
                break;
            }
        }
        if(Global.NOT_FOUND != idx)
        {
            this.itemList.splice(idx, 0, newItem);
        }
        else
        {
            this.itemList.push(newItem);
        }

        if(isUpdate)
        {
            this.setDepth();
        }
    }

    public removeItem(newItem:ItemIso, isUpdate:boolean = true):void
    {
        var idx:number = this.itemList.indexOf(newItem);

        if(Global.NOT_FOUND != idx)
        {
            this.itemList.splice(idx, 1);
        }
        else
        {
            console.log("==========================error: remove item", (<Villager>newItem).getModel.npcId);
        }

        if(isUpdate)
        {
            this.setDepth();
        }
    }

    public moveItem(newItem:ItemIso):void
    {
        this.removeItem(newItem, false);
        this.addItem(newItem, false);

        this.setDepth();
    }

    public setDepth():void
    {
        //itemList sort
        var i:number;
        var item:any;

        for(i = 0; i < this.itemList.length; i++)
        {
            item = this.itemList[i];
            Lyrs.LYRS_ITEM_IN_SCENE.setChildIndex(item, i);
        }
    }

    public dispose():void
    {
        BuildingManager.getInstance().dispose();
        VillagerManager.getInstance().dispose();

        Lyrs.LYRS_ITEM_IN_SCENE.removeChildren();
        this.itemList.length = 0;
    }

    public popItem():void
    {
        this.itemList.pop();
    }

    public pushItem(newItem:ItemIso):void
    {
        this.itemList.push(newItem);
    }

    //===================================================
    public getItemList():ItemIso[]
    {
        return this.itemList;
    }



    public getVillagers():Villager[]
    {
        var i:number;
        var item:any;
        var re:Villager[] = [];

        for(i = 0; i < this.itemList.length; i++)
        {
            item = this.itemList[i];
            if(item instanceof Villager)
            {
                re.push(<Villager>item);
            }

        }
        return re;
    }

    public getBuildings():BuildingIso[]
    {
        var i:number;
        var item:any;
        var re:BuildingIso[] = [];

        for(i = 0; i < this.itemList.length; i++)
        {
            item = this.itemList[i];
            if(item instanceof BuildingIso)
            {
                re.push(<BuildingIso>item);
            }

        }
        return re;
    }



    public getRubbish():Rubbish[]
    {
        var i:number;
        var item:any;
        var re:Rubbish[] = [];

        for(i = 0; i < this.itemList.length; i++)
        {
            item = this.itemList[i];
            if(item instanceof Rubbish)
            {
                re.push(<Rubbish>item);
            }

        }
        return re;
    }

    public getAnimals():Animal[]
    {
        var i:number;
        var item:any;
        var re:Animal[] = [];

        for(i = 0; i < this.itemList.length; i++)
        {
            item = this.itemList[i];
            if(item instanceof Animal)
            {
                re.push(<Animal>item);
            }

        }
        return re;
    }
    //================================================================================
    private static _instance:DepthManager;

    public static getInstance():DepthManager
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new DepthManager();
        }
        return this._instance;
    }
}