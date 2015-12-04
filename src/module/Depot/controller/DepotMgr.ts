/**
 * Created by rodey on 15/2/12.
 *
 *
 *  资源管理消息侦听类
 *
 *
 */

class DepotMgr{

    private depotHarvest: game.DepotHarvestV2;
    private stim: any;
    private sdtime: number;
    private depotObject: any;

    private static _instance: DepotMgr;
    public static getInstance(): DepotMgr{
        if(!DepotMgr._instance){
            DepotMgr._instance = new DepotMgr();
        }
        return DepotMgr._instance;
    }

    constructor(){

        this.sdtime = 2000;

        //创建收获进度对象
        this.createDepotHarvest();
        //收获资源
        GameEvent.watcher.addEventListener(GameEvent.ITEM_CHANGE, this.itemChangeHandler, this);
        //消耗资源
        GameEvent.watcher.addEventListener(GameEvent.ITEM_CHANGE_REMOVE, this.itemChangeRemoveHandler, this);
        //资源不足
        GameEvent.watcher.addEventListener(GameEvent.ITEM_SHORTAGE_BUY, this.itemShortageHandler, this);
        //消耗金币、钻石
        GameEvent.watcher.addEventListener(GameEvent.RES_CHANGE_REMOVE, this.resChangeRemoveHandler, this)

    }

    private createDepotHarvest(): void{
        if(!this.depotHarvest){
            this.depotHarvest = new game.DepotHarvestV2(1, 0);
            Lyrs.LYRS_ICON_PARENT.addChild(this.depotHarvest);
            //this.depotHarvest.alpha = 0;
            this.depotHarvest.x = Lyrs.SW + 140;
            this.depotHarvest.y = 90;
            this.depotHarvest.visible = false;
        }
    }


    /**
     * 增加物品数量----------------------
     * @param evt
     */
    public itemChangeHandler(evt: egret.Event): void{
        if(!evt.data) return;
        var self = this;
        var itemChange: ItemChange = evt.data;
        var srcPos: egret.Point = itemChange.srcPos;
        var itemId: number = itemChange.id;
        var itemNum: number = itemChange.change,
            itemMode: DepotModel = DepotModel.getModelById(itemId),
            storeType: number = itemMode.storeType,
            params: any = itemChange.params,
            isBlash: boolean = (params && params['isBlash'] !== undefined) ? params['isBlash'] : true;

        //判断是否爆仓
        if(isBlash){
            if(DepotController.instance.isBlast(itemId, itemNum)){
                return;
            }
        }


        //收取动画
        if(!srcPos || srcPos == null) {
            DepotController.instance.updateLocalItemNum(itemId, itemNum);
            return;
        }

        this.sdtime += 500;

        this.depotObject = {
            current: DepotController.instance.getLocalDataTotalNum(storeType),
            max: DepotController.instance.getLocalDataMax(storeType),
            isBlash: isBlash
        };

        //更新仓库数据
        DepotController.instance.updateLocalItemNum(itemId, itemNum);

        this.itemChangeAnimate(itemChange, function(begin, target){

            self.depotHarvest.onUpdate(storeType, itemNum, self.depotObject);

            //播放音效
            SoundMgr.instance.playAudio(SoundName.ITEM_GET);

            TweenIt.tweenBigThenNormal(self.depotHarvest.iconAsset, function(){
                if(self.depotHarvest){
                    if(self.stim){
                        window.clearTimeout(self.stim);
                    }
                    self.stim = window.setTimeout(function(){
                        window.clearTimeout(self.stim);
                        self.depotHarvest.onClose();
                        self.sdtime = 2000;
                    }, self.sdtime);
                }
            });

        });
    }

    public itemChangeAnimate(itemChange: ItemChange, callback?: Function): void{
        var self = this,
            itemId: number = itemChange.id,
            itemNum: number = itemChange.change,
            srcPos: egret.Point = itemChange.srcPos,
            params: any = itemChange.params,
            itemMode: DepotModel = DepotModel.getModelById(itemId),
            imgId: string = itemMode.imgId,
            storeType: number = itemMode.storeType;
        var waitTime: number = ((params && params['waitTime']) ? params['waitTime'] : 100) + Math.random() * 140;

        if(self.stim){
            window.clearTimeout(self.stim);
        }
        this.depotHarvest.visible = true;

        this.depotHarvest.onShow(storeType, itemNum, this.depotObject, function(){

            var asset: ChangeItemButton = new ChangeItemButton(imgId, String('+' + itemNum));
            asset.x = srcPos.x + (10 + Math.random() * 50);
            asset.y = srcPos.y + (5 + Math.random() * 50);
            Lyrs.LYRS_ICON.addChild(asset);

            Icon.moveTo(asset, self.depotHarvest, callback, 0, 0, { alpha: .9, time: 1000, waitTime: waitTime });

        });

    }


    /**
     * 物品消耗--------------------------------
     * @param evt
     *
     * use:
     *
     * needTools: [ { itemId: 999, itemNum: 1 } ,{itemId: 999, itemNum: 1} ]
     *
     *  if(!needTools || !needTools.length || needTools.length == 0){
                return;
            }
     var point: egret.Point = this.currentItemRender;
     //console.log('...point...', point.x, point.y)
     GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_CHANGE_REMOVE, true, new ItemChangeRemove(needTools, null, point));
     *
     */


    public itemChangeRemoveHandler(evt: egret.Event): void{

        if(!evt.data) return;
        var self = this;
        var itemChangeRemove: ItemChangeRemove = evt.data;
        var srcPos: egret.Point = itemChangeRemove.srcPos;
        var params: any = itemChangeRemove.params;
        var updateItems: boolean = (params && params['updateItems'] && params['updateItems'] === 'No') ? false : true;
        var stivTime: number = (params && params['stivTime']) ? params['stivTime'] : 300;

        //先减掉数量
        if(updateItems){
            this.reduceItemNumbers(itemChangeRemove.data);
        }

        var stiv_item_remove: any;
        var index_item_remove: number = 0;
        window.clearInterval(stiv_item_remove);
        stiv_item_remove = window.setInterval( function(){

            if(index_item_remove >= itemChangeRemove.data.length){
                window.clearInterval(stiv_item_remove);
                index_item_remove = 0;
                //console.log('......clearnItenval....', index_item_remove)
                return;
            }

            self.itemChangeRemoveAnimate(itemChangeRemove.data[index_item_remove], srcPos, params);
            index_item_remove++;

        }, stivTime);

    }


    public itemChangeRemoveAnimate(item: any, srcPos: egret.Point, params?: any): void{

        var itemId: number = item['itemId'] || item['needItem']['itemId'];
        var imgId: string =  DepotModel.getModelById(itemId).imgId;
        var itemNum: number = item['needNum'] || item['poor'];

        var waitTime: number = ((params && params['waitTime']) ? params['waitTime']: 200) + Math.random() * 140;
        var time: number = (params && params['time']) ? params['time'] : 500;
        var alpha: number = (params && params['alpha']) ? params['alpha'] : 0;

        //最后一份提示
        //this.showItemTips(itemId);

        var asset: ChangeItemButton = new ChangeItemButton(imgId, String('-' + itemNum));
        asset.x = srcPos.x - 10; // - (50 + Math.random() * 20);
        asset.y = srcPos.y - (100 + Math.random() * 20); //- 100; //- (30 + Math.random() * 50);
        //asset.x = (asset.x < 0) ? Math.abs(asset.x) : asset.x;
        asset.x = (asset.x < 0) ? 0 : asset.x;
        asset.y = (asset.y < 0) ? 0 : asset.y;
        Lyrs.LYRS_ICON.addChild(asset);

        var target: egret.DisplayObject = new egret.DisplayObject();
        target.x = srcPos.x;
        target.y = srcPos.y;
        Lyrs.LYRS_ICON.addChild(target);

        Icon.moveToRemove(asset, target, null, 0, 0, { alpha: alpha, time: time, waitTime: waitTime });

    }

    private reduceItemNumbers(data: any[]): void{

        if(!data) return;
        var i: number = 0,
            len: number = data.length;
        var itemId: number;
        var itemNum: number = 0;

        for(; i < len; ++i){
            itemId = data[i]['itemId'] || data[i]['needItem']['itemId'];
            itemNum = data[i]['needNum'] || data[i]['poor'];
            DepotController.instance.updateLocalItemNum(itemId, -itemNum);
        }

    }

    /**
     * 物品不足----------------------------
     *
     *--> evt.data:
     *      @data: [ { itemId: number, needNum(poor): number  } ]   ;物品不足数据
     *      @panel: number                                          ;需要返回的面板
     *      @param: any                                             ;需要返回的面板打开参数
     *      @args: any                                              ;其他参数
     *      @callback: Function                                     ;返回面板后回调函数
     *
     */

    private itemShortageHandler(evt: egret.Event): void{

        if(!evt.data || !evt.data['data'] ){
            return;
        }

        var data: any[] = evt.data['data'];
        var panel: any = ( null != evt.data['panel'] ) ? evt.data['panel'] : null;
        var param: any = ( null != evt.data['param'] ) ? evt.data['param'] : null;
        var args: any = evt.data['args'] || null;
        var callback: any = evt.data['callback'] || null;

        //重新更新data
        var rsData: any[] = [];
        for( var i: number = 0, len: number = data.length; i < len; ++i){
            var itemId: number = data[i]['itemId'];
            var needItem: DepotModel = DepotModel.getModelById(itemId);
            var currentNum: any = DepotController.instance.getItemNumByItemId(itemId);

            var needNum: number = (data[i]['needNum'] && data[i]['needNum'] !== 0)
                                    ? data[i]['needNum']
                                    : (
                                        (data[i]['poor'] && data[i]['poor'] !== 0)
                                        ? data[i]['poor']
                                        : 0
                                      );
            if(needNum == 0){
                continue;
            }
            var poor: number = currentNum - needNum;

            var needPoor: any = {
                'item': needItem,
                'itemId': itemId,
                'current': currentNum,
                'needNum': needNum,
                'poor': Math.abs(poor) //needNum
            };

            if(needNum > currentNum){
                rsData.push(needPoor);
            }

            data[i] = needPoor;

        }

        BuyGoodsView.getInstance().init(rsData, panel, param, args, callback);

    }

    private resChangeRemoveHandler(evt: egret.Event): void{

        var self = this;
        var resChange: ResChange = evt.data;
        var gold: number = resChange.goldChange;
        var diamond: number = resChange.diamondChange;
        var exp: number = resChange.expChange;


        if(gold !== 0){
            this.havertAnimate('gold', gold, resChange, function(){ self.changeRes('gold', gold) });
            UserController.instance['gold'] -= gold;
        }

        if(diamond !== 0){
            this.havertAnimate('diamond', diamond, resChange, function(){ self.changeRes('diamond', diamond) });
            UserController.instance['diamond'] -= diamond;
        }

        if(exp !== 0){
            this.havertAnimate('exp', exp, resChange, function(){ self.changeRes('exp', exp) });
            UserController.instance['exp'] -= exp;
        }

    }

    private changeRes(type: string, num: number): void{
        //UserController.instance[type] -= num;
    }

        //收获飞入动画
    public havertAnimate(type: string, num: number, resChange: ResChange, cb?: Function): void{
        var self = this;
        var imgId: string;
        var target: egret.DisplayObject;
        var srcPos: egret.Point = resChange.srcPos,
            parmas: any = resChange.parmas,
            waitTime: number = ((parmas && parmas['waitTime']) ? parmas['waitTime'] : 300) + Math.random() * 140;

        if(type == 'exp'){
            //经验值
            imgId = UIPosition.JYZ_POSITION.imgId;
        }else if(type == 'gold'){
            //金币
            imgId = UIPosition.JB_POSITION.imgId;

        }else if(type == 'diamond'){
            //钻石
            imgId = UIPosition.ZS_POSITION.imgId;

        }

        var asset: ChangeItemButton = new ChangeItemButton(imgId, String('-' + num));
        asset.x = srcPos.x - (50 + Math.random() * 50);
        asset.y = srcPos.y - (50 + Math.random() * 100);
        asset.x = (asset.x < 0) ? Math.abs(asset.x) : asset.x;
        Lyrs.LYRS_ICON.addChild(asset);

        var target: egret.DisplayObject = new egret.DisplayObject();
        target.x = srcPos.x;
        target.y = srcPos.y;
        Lyrs.LYRS_ICON.addChild(target);

        Icon.moveToRemove(asset, target, cb, 0, 0, { alpha: .0, time: 500, waitTime: waitTime });

    }

}
