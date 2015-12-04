/**
 * on 2014-12-10
 * by leo
 */

class SocketManager
{
    private ws:WebSocket;
    private rc:number;
    private action:string;
    private data:any;

    public constructor()
    {
    }

    public init():void
    {
        if(null == window['WebSocket'])
        {
            alert(Language.getString(1, 1));
            return;
        }
        this.ws = new WebSocket(Global.SOCKET_URL);
        this.ws.onerror = this.onError;
        this.ws.onmessage = this.onMessage;
        this.ws.onopen = this.onOpen;
        this.ws.onclose = this.onClose;
    }

    public onMessage(e:any):void
    {
        var self = this;
        MaskFactory.getInstance().removeMask();

        var re:string = e.data;

        var reJson:any = JSON.parse(re);

        var rc:number = SocketManager.instance.getRC(reJson);

        var action:string = SocketManager.instance.getAction(reJson);

        var data:any = SocketManager.instance.getData(reJson);

        //-----
        this.rc = rc;
        this.action = action;

        if(Global.RC_SUCCESS != rc && Global.RC_USER_REG != rc)
        {
            console.log("error:[action:" + action + ", rc: " + rc + "]");

            //新手引导，如果报错，则清理引导
            GuideManager.getInstance().clear();

            if(( rc == Global.TOKEN_OUT_OF_DATE || rc == Global.TOKEN_NULL ) && Global.PLATFORM == Platform.SDX)
            {
                SocketError.loginReset(data);
                return;
            }
            else if(rc == SocketError.SYS_KICK_OFF)
            {
                SocketError.kickOff();
                return;
            }

            //一系列对应的错误处理
            switch(action)
            {
                //-----添加生产错误处理-----
                case "Building.produce":
                    //未完成
                    if(rc == SocketError.BUILDING_PRODUCER_OUT_LIMIT)
                    {
                        ProcessFactoryController.getInstance().removeBuildProduct();

                    }
                    //资源不足

                    else if(rc == SocketError.SYS_RESOURCE_NOT_ENOUGH)
                    {

                        ProcessFactoryController.getInstance().buyNeedToolsList();

                    }
                    break;

                //-----收获错误处理-----
                case "Building.harvestProduct":
                    //爆仓
                    if(rc == SocketError.ITEM_OUT_LIMIT)
                    {
                        DepotController.instance.isBlast();
                    }
                    else if(rc == SocketError.BUILDING_PRODUCT_NOT_COMPLETE)
                    {
                        TipText.instace.play(Language.getString(3, 19));
                    }
                    break;

                //-----旅行商人-----
                case "Building.buyTravelOrder":
                    //爆仓
                    if(rc == SocketError.ITEM_OUT_LIMIT)
                    {
                        MerchantPersonController.instance.buyTravelOrderBlast();

                    }
                    break;

                //-----登录-----
                case "User.login":
                    //token失效
                    if(rc == SocketError.SYS_TOKEN_OUTTIME)
                    {
                        SocketError.loginReset(data);

                        //用户不存在或者token null

                    }else if(rc == SocketError.SYS_GOLD_NOT_ENOUGH)
                    {

                        SocketError.loginReset(Language.getString(3, 31)); //'本地数据已过期或被清理，请重新登录');

                    }
                    break;

                //-----通用弹窗-----
                default :

                    UIMgr.instance.show(PanelName.SOCKET_ERROR_PANEL,
                        null,
                        data,
                        null,
                        true,
                        function()
                        {

                            //如果是在新手引导中出错
                            GuideManager.getInstance().init();

                        }, {'buttonWidth':150});

                    break;
            }
            return;
        }

        console.log(action, data);
        switch(action)
        {
            case "User.login":
                if(Global.RC_USER_REG == rc)
                {//创建一个角色
                    var sdkUserData = GameUtils.getSdkUserData();
                    if(sdkUserData && sdkUserData.username)
                    {
                        //不显示创建角色面板,直接从localStorage中取值发送
                        UserController.createRole();
                        return;
                    }

                    //显示创建角色面板
                    var sexPanel:any = Lyrs.LYRS_UI.getChildByName('MainSexPanel');
                    if(null == sexPanel)
                    {
                        Loader.instance.loadGroups([GroupName.SEXPANEL_GROUP], ()=>
                        {
                            var v:game.MainSexPanel = new game.MainSexPanel();
                            v.name = 'MainSexPanel';
                            Lyrs.LYRS_UI.addChild(v);
                        }, this);
                    }
                }
                else if(Global.RC_SUCCESS == rc)
                {
                    if(data.user)
                    {
                        UserController.instance.init(data.user, data.userExtInfo);

                        var sexPanel:any = Lyrs.LYRS_UI.getChildByName('MainSexPanel');
                        if(null != sexPanel)
                        {
                            sexPanel.onClose();
                            Lyrs.LYRS_UI.removeChild(sexPanel);
                        }
                    }

                    if(null != data.userIdentify)
                    {
                        UserController.instance.initUserIdentify(data.userIdentify);
                    }

                    AntiAddictionController.indulgeFlag = data.indulgeFlag;
                    //仓库
                    if(data.items)
                    {

                        DepotController.instance.setData(data.items);
                        //道具更新类初始化
                        DepotMgr.getInstance();

                    }

                    //登录奖励
                    GameSystemController.instance.init(data);

                    GTimer.getInstance().setTime(data.systemDate);

                    //新手引导初始化
                    GuideManager.getInstance().setData(data.userExtInfo);


                    if(null != data.buildings)
                    {
                        //Game.start(data.buildings, data.userVillagers);
                        Game.instance.startup(data.buildings, data.userVillagers, data.userRubbish, data.userLivestock);
                    }
                    if(null != data.tasks)
                    {
                        model.UserTask.initTaskList(data.tasks);
                    }
                    if(null != data.userTrophies)
                    {
                        model.UserTrophy.initUserTrophies(data.userTrophies);
                    }
                }
                break;
            case "User.create":
                UserController.Login();
                break;

            case "User.nickName":
                //修改昵称
                UserController.instance.updateNickName(data);
                break;

            //登录奖励
            case "Activity.weekLoginReward":
                GameSystemController.instance.updateLoginReward(data);
                break;

            //签到奖励
            case "Activity.monthLoginReward":
                GameSystemController.instance.updateSignReward(data);
                break;

            //购买金币
            case "Item.coinExchange":
                UserController.instance.updataBuyCoin(data);
                break;

            case "Building.buy":
                BuildingController.getInstance().buy_cb(data);
                break;
            case "Building.changePosition":
                BuildingController.getInstance().move_cb();
                break;

            //仓库----
            case "Item.getItems":
                //粮仓 货仓 (用户登录后直接在数据中返回)
                break;
            case "Item.expand":
                //仓库扩建
                DepotExtendController.getInstance().updateExpendDataObject(data);
                break;
            case "Item.buyGoods":
                //购买物品
                DepotExtendController.getInstance().updateDisplayObject(data);
                break;
            case "Item.buyItems":
                //批量购买物品
                DepotExtendController.getInstance().updateDisplayObjects(data);
                BuyGoodsView.getInstance().callBack();
                break;




            //主动推送----+++=++++++++++++++++++++++++++++++++++
            case "Push.addItem":
                //主动推送物品
                DepotController.instance.pushItem(data);
                break;
            case "Push.addMoney":
                //主动推送金币或钻石
                UserController.instance.pushAddMoney(data);
                break;
            case "Push.topUp":
                //购买钻石推送
                UserController.instance.pushAddDiamond(data);
                break;
            case "Push.addLevel":
                UserController.instance.pushAddLevel(data);
                break;
            case "Push.taskUpdate":
                model.UserTask.updateTaskList(data['userTasks']);
                break;
            case "Push.newTask":
                model.UserTask.updateTaskList(data['userTasks']);
                break;
            case "Push.trophyUpdate":
                model.UserTrophy.updateUserTrophies(data['userTrophies']);
                break;




            //农田种植----
            case "Building.grow":
                FarmController.getInstance().plant_cb(data);
                break;
            case "Building.harvestCrop":
                //FarmController.getInstance().harvest_cb(data);
                break;

            //果树和灌木-----
            case "Building.harvestTree":
                //TreeController.getInstance().harvest_cb(data);
                break;
            case "Building.cutTree":
                TreeController.getInstance().fell_cb(data);
                break;

            //生产建筑-----
            case "Building.produce":
                //添加生产后
                ProcessFactoryController.getInstance().addBuildProduct(data);
                break;
            case "Building.harvestProduct":
                //收获
                BuildingController.onHarvestProduct(data);
                break;


            //===================================================
            case "Building.speedUp":
                //加速
                if(data.moduleType == SpeedupType.SPEEDUP_PRODUCT)
                {
                    ProcessFactoryController.getInstance().updateSpeedUp(data);
                }
                else if(data.moduleType == SpeedupType.SPEEDUP_FARM)
                {
                    FarmController.getInstance().speed_cb(data);
                }
                else if(data.moduleType == SpeedupType.SPEEDUP_TREE)
                {
                    TreeController.getInstance().speed_cb(data);
                }
                else if(data.moduleType == SpeedupType.SPEEDUP_ANIMAL)
                {
                    AnimalController.getInstance().speed_cb(data);
                }
                else if(data.moduleType == SpeedupType.SPEEDUP_RESTORE)
                {
                    RestoreBuildTimeBarContainer.instance.speedComplateBuild(data);
                }
                break;
            case "Building.expand":
                //扩充
                ProcessFactoryController.getInstance().updateExpend(data, rc);
                break;

            case "Building.repair":
                //修建或建造所花的金币
                //BuildingController.getInstance().startRestoreBuild(data);
                break;

            case "Building.getTravelOrder":
                //获取旅行商人订单数据
                MerchantPersonController.getInstance().setTravelOrders(data);
                break;

            case "Building.buyTravelOrder":
                //购买旅行商人订单数据
                MerchantPersonController.getInstance().updatePanelItemRender(data);
                break;

            //养动物-----
            case "Building.addAnimal":
                AnimalController.getInstance().add_cb(data);
                break;
            case "Building.feedAnimal":
                AnimalController.getInstance().feed_cb(data);
                break;
            case "Building.harvestAnimal":
                AnimalController.getInstance().hAnimal_cb(data);
                break;
            case "Building.getCarOrder":
                model.UserCarOrder.init(data);
                var building = GetBuildingUtils.getInstance().getBuilding(BuildingID.ORDER_CAR);
                if(null != building)
                {
                    building.update();
                }
                break;
            case "Building.completeCarOrder":
                model.UserCarOrder.refreshCarOrder(data, false);
                break;
            case "Building.refreshCarOrder":
                model.UserCarOrder.refreshCarOrder(data);
                break;
            case "Building.abandonCarOrder":
                model.UserCarOrder.abandonCarOrder(data);
                break;
            case "Building.recieveCarOrderReward":
                model.UserCarOrder.recieveCarOrderReward(data);
                break;
            case "Task.recieve":
                TaskController.recieve(data['drop']);
                break;
            case "Building.digMine":
                view.MineBuilding.instance.showItems(data['userProducts']);
                break;
            case "Trophy.getUserTrophies":
                model.UserTrophy.updateAllTrophies(data.userTrophies);
                break;
            case "Trophy.receive":
                AchieveController.onRecieve(data);
                break;

            //===================================================村民卖东西
            case "User.buyVillager":
                VillagerSellController.getInstance().sell_cb(data);
                break;
            case "User.refuseVillager":
                VillagerSellController.getInstance().refuse_cb();
                break;
            case "Push.newVillager":
                VillagerSellController.getInstance().addVillager(data);
                break;
            case "User.verify":
                UserController.instance.setVerifyStatus(data.verify);
                break;
            //===================================================Guide
            case "User.addGuideStep":
                break;
            //收地图垃圾
            case "Building.cleanRubbish":
                RubbishController.getInstance().pickup_cb(data);
                break;
            case "Building.getElfShip":
                AirshipController.onGetElfShip(data);
                break;
            case "Building.elfShipTakeOff":
                AirshipController.onElfShipTakeOff(data);
                break;
            case "Building.pack":
                AirshipController.onPack(data);
                break;
            case "Building.elfShipSpeed":
                AirshipController.onElfShipSpeed(data);
                break;
            case "Building.sell":
                DecoController.getInstance().sell_cb(data);
                break;
        }
    }

    public send(data:any, lockScreen:boolean = true):void
    {
        if(!this.isConnected)
        {
            return;
        }
        if(lockScreen)
        {
            MaskFactory.getInstance().addMask(Global.MASK_TYPE_RECT);
        }
        this.ws.send(data);
    }

    public get isConnected():boolean
    {
        return WebSocket.OPEN == this.ws.readyState;
    }

    //===========================================================================
    private onOpen(e:any):void
    {
        console.log("socket open");

        //拿到sdk的token，先 socket发 login
        UserController.Login();

        //this.send('{"act":"User.login","dt":{"token":"73a21611c32a45da844b82e8edfe7049"}}"');


    }

    private onError(e:any):void
    {
        console.log("socket error", e);

        //重新连接
        SocketError.loginReset('服务器连接失败，请重新连接');
    }

    private onClose(e:CloseEvent):void
    {
        console.log("socket close");

        if(this.rc == SocketError.SYS_KICK_OFF)
        {

            return;
        }

        //新手引导服务器断开处理
        GuideManager.getInstance().clear();
        //重新连接
        SocketError.resetOpenSocket();

    }

    //===========================================================================
    //getter
    public getAction(all:any):string
    {
        return all['act'];
    }

    public getRC(all:any):number
    {
        return all['rc'];
    }

    public getData(all:any):any
    {
        return all['dt'];
    }

    //===========================================================================
    private static _instance:SocketManager;

    public static get instance():SocketManager
    {
        return SocketManager.getInstance();
    }

    public static getInstance():SocketManager
    {
        if(!SocketManager._instance)
        {
            SocketManager._instance = new SocketManager();
        }
        return SocketManager._instance;
    }
}