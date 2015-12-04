/**
 * Created by rodey on 15/3/2.
 */


class MerchantPersonController{

    private _id: number;
    private building: MerchantPersonBuilding;
    private logic: MerchantPersonLogic;
    private view: game.MerchantPersonPanel;
    private errData: any;

    constructor(){
        //GameEvent.watcher.addEventListener(GameEvent.MERCHANT_BUY, this.buyTravelOrder, this);

    }

    public init(building: MerchantPersonBuilding): void{

        this.building = building;
        this.logic = building.logic;
        this._id = building.model.buildingId;
        //打开面板
        this.open();
    }

    public open(): void{


        //加载资源
        Loader.instance.loadGroups([
            GroupName.MERCHANT_NOTIC_BUY_GROUP,
            GroupName.GOODS_GROUP
        ], ()=>{

            UIMgr.instance.show(PanelName.MERCHANT_PERSON_PANEL, { 'direction': Direction.CENTER }, this.building);

        }, this);

    }

    //发送请求获取旅行商人订单数据
    public sendTravelOrders(): void{
        var data:Object = {
            "act":"Building.getTravelOrder",
            "dt": null
        };
        SocketManager.instance.send(JSON.stringify(data));
        console.log('请求旅行商人数据....');
    }

    public setTravelOrders(data: any){

        if(!data || !data.orders.length || data.orders.length === 0) return;
        if(!this.building){
            this.getBuilding();
        }
        this.building.setTravelOrders(data.orders);

        this.init(this.building);

        this.building.data.refreshDate += 600 * 1000;

    }

    public getBuilding(): void{
        this.building = GetBuildingUtils.getInstance().getBuildingByBuildingId(BuildingID.MERCHANT_PERSON);
    }

    public getData(): any{

        return this.building.getTravelOrders();
    }

    /**
     * 格式化后台数据
     * @param data
     * @returns {any[]}
     */
    public formatTravelOrders(data: any[]): any[]{
        if(!data || !data.length || data.length === 0) return;
        var rs: any[] = [],
            i: number = 0,
            len: number = data.length;

        for( ; i < len; ++i){
            var item: DepotModel = DepotModel.getModelById(data[i].itemId),
                imgId: string = item.imgId,
                itemName: string = item.name,

                npc: NPCModel = NPCModel.getNPCById(data[i].npcId),

                nickName: string = npc.npcName,
                head: string = npc.head;

            rs.push({
                imgId: imgId,
                orderId: data[i].orderId,
                itemNum: data[i].itemNum,
                itemName: itemName,
                nickName: nickName,
                head: head,
                price: data[i].price,
                rate: data[i].rate,
                status: data[i].status
            });

        }

        return rs;

    }

    public getView(): void{
        this.view = UIMgr.instance.getPanel(PanelName.MERCHANT_PERSON_PANEL);
    }

    public buyTravelOrder(data: any): void{

        if(!this.view){
            this.getView();
        }

        this.errData = data;

        this.sendTravelOrderData(data);

    }

    //发送购买数据
    public sendTravelOrderData(data: any): void{
        var orderId: number = data.orderId;
        var sdata:Object = {
            "act":"Building.buyTravelOrder",
            "dt": { orderId: orderId }
        };
        SocketManager.instance.send(JSON.stringify(sdata));
        console.log('请求旅行商人数据....');
    }

    public updatePanelItemRender(data: any): void{
        if(this.view){
            this.getView();
        }
        if(data && data.orderId){
            var itemRender: game.MerchantItenRender = this.view.getItemRender(data.orderId);
            itemRender.status = 2;
        }

        var point: egret.Point = itemRender.parent.localToGlobal(itemRender.x, itemRender.y);

        //消耗的金币
        if(data && data.money){
            //UserController.instance.gold -= data.money;
            GameEvent.watcher.dispatchEventWith(GameEvent.RES_CHANGE_REMOVE, true, new ResChange(data.money, 0, 0, point));
        }

        //增加的物品
        if(data && data.item){
            GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_CHANGE, true, new ItemChange(data.item.itemId, data.item.itemNum, point))
        }

        this.errData = null;

    }

    public buyTravelOrderBlast(): void{

        if(!this.errData) return;

        DepotController.instance.isBlast(this.errData.itemId, this.errData.itemNum);

    }


    //----instance---
    private static _instance: MerchantPersonController;
    public static getInstance(): MerchantPersonController{
        if(!MerchantPersonController._instance){
            MerchantPersonController._instance = new MerchantPersonController();
        }
        return MerchantPersonController._instance
    }
    public static get instance(): MerchantPersonController{ return this.getInstance(); }

}