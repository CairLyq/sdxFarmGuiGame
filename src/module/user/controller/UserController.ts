/**
 * on 2014-12-10
 * by leo
 */

class UserController
{
    private static _instance:UserController;
    private userInfo:UserInfo;
    public userUpgradePanel:game.UserUpgradePanelV2;
    public bgLayer:egret.Sprite;
    public srcpos:any;
    public resChange:ResChange;

    private centerPoint:egret.Point;

    private _userIdentify:model.UserIdentify;

    public constructor()
    {
        this.centerPoint = new egret.Point(Lyrs.SW * .5, Lyrs.SH * .5);

        GameEvent.watcher.addEventListener(GameEvent.RES_CHANGE, this.updateRes, this);
    }

    public initUserIdentify(data:Object):void
    {
        if(null == this._userIdentify)
        {
            this._userIdentify = new model.UserIdentify(data);
        }
        else
        {
            this._userIdentify.reset(data);
        }
    }

    public get isIndulge():boolean
    {
        return ( 0 == this._userIdentify.status || 2 == this._userIdentify.status || 4 == this._userIdentify.status );
    }

    public setVerifyStatus(verify:number):void
    {
        this._userIdentify.status = verify;
    }

    public get userIdentify():model.UserIdentify
    {
        return this._userIdentify;
    }

    //更新用户金币 钻石数据
    public updateRes(e:egret.Event):void
    {
        if(!e.data) return;
        this.srcpos = null;
        this.resChange = e.data;
        this.srcpos = this.resChange.srcPos;

        this.diamond = this.userInfo.diamond + this.resChange.diamondChange;
        this.gold = this.userInfo.gold + this.resChange.goldChange;
        this.exp = this.userInfo.exp + this.resChange.expChange;
        console.log("==========================当前的总经验：", this.exp);
    }

    /**
     * 系统推送-----主动推送----------------------------------------
     * @param data
     */
    public pushAddMoney(data:any):void
    {
        if(!data) return;
        var type:number = data['type'] || 0;
        var money:number = data['money'] || 0;

        if(type == 0)
        {
            //this.gold += money;
            GameEvent.watcher.dispatchEventWith(GameEvent.RES_CHANGE, true, new ResChange(money, 0, 0, this.centerPoint));
        }else if(type == 1)
        {
            //this.diamond += money;
            GameEvent.watcher.dispatchEventWith(GameEvent.RES_CHANGE, true, new ResChange(0, money, 0, this.centerPoint));
        }
    }

    public pushAddLevel(data:any):void
    {
        if(null == data)
        {
            return;
        }
        this.exp = data['exp'] || this.userInfo.exp;
        if( null == data['exp'] )
        {
            this.level = data['level'] || this.userInfo.level;
        }
    }

    public pushAddDiamond(data: any): void{
        if(!data){
            return;
        }
        //this.diamond += data['diamond'];

        UIMgr.instance.show(
            PanelName.SOCKET_ERROR_PANEL,
            { direction: Direction.CENTER },
            Language.getString( 3, 36 ),
            Language.getString( 3, 32 ), //'确认',
            'ok',
            function(){  },
            { 'buttonWidth': 150 });

        GameEvent.watcher.dispatchEventWith(GameEvent.RES_CHANGE, true, new ResChange(0, data['diamond'], 0, this.centerPoint));
    }


    //-----------------------
    public static get instance():UserController
    {
        if(!UserController._instance)
        {
            UserController._instance = new UserController();
        }
        return UserController._instance;
    }

    public init(userData:any, userExtData:any):void
    {
        this.setUserData(userData);
        UserExtendInfo.instance.setData(userExtData);
    }

    public setUserData(data:any):void
    {
        if(null == this.userInfo)
        {
            this.userInfo = new UserInfo(data);
        }
        else
        {
            this.userInfo.reset(data);
        }

        if(null == data)
        {
            return;
        }
        var str:string;
        if(typeof data === 'object')
        {
            str = JSON.stringify(data);
        }
        window.localStorage.setItem('gameUser', str);
        localStorage.setItem('userId', String(this.userInfo.userId));
    }

    public getUserData():UserInfo
    {
        return this.userInfo;
    }

    public getUserId():number
    {
        return this.userInfo.userId;
    }

    public getUserName():string
    {
        return this.name;
    }

    public getUserHead():string
    {
        //玩家头像
        if(this.userInfo.imgUrl && '' != this.userInfo.imgUrl)
        {
            return this.userInfo.imgUrl;
        }else
        {
            return UserController.instance.isMale?'ZJM_4':'ZJM_5';
        }
    }

    /**
     *
     */
    public get sign():string
    {
        return UserExtendInfo.instance.sign;
    }

    public set sign(value:string)
    {
        if(value == UserExtendInfo.instance.sign) return;
        UserExtendInfo.instance.sign = value;
    }

    /**
     * 玩家名字
     * @returns {string}
     */
    public get name():string
    {
        return this.userInfo.name;
    }

    /**
     * 是否男性玩家
     * @returns {boolean}
     */
    public get isMale():boolean
    {
        return ( this.userInfo.sex == 0 );
    }

    public set name(value:string)
    {
        if(value == this.userInfo.name) return;
        this.userInfo.name = value;
        GameUI.instance.userNameLabel.text = value;
    }

    public get level():number
    {
        return this.userInfo.level;
    }

    public set level(value:number)
    {
        if(value > this.userInfo.level)
        {
            this.userInfo.level = value;
            this.upgradeLevel(value);
        }
    }

    //当前的经验值
    public get exp():number
    {
        return this.userInfo.exp;
    }

    public set exp(value:number)
    {
        if(this.exp == value)
            return;
        this.userInfo.exp = value;
        //处理收入动画
        if(this.resChange && (this.resChange.expChange > 0 && this.srcpos))
        {
            this.havertAnimate('exp', this.resChange.expChange);
        }

        var nextExpModel:UserLevelModel = UserLevelModel.getModelByLevel(this.level + 1);
        if(value >= nextExpModel.exp)
        {
            this.level += 1;
        }

        GameUI.instance.updateExp();
    }

    public get diamond():number
    {
        return this.userInfo.diamond;
    }

    public set diamond(value:number)
    {
        //console.log('传递: ', value)
        //console.log('当前: ', this.userInfo.diamond)
        if(value == this.userInfo.diamond)
            return;
        this.userInfo.diamond = value;
        GameUI.instance.diamondLabel.text = String(value);
        //处理收入动画
        if(this.resChange && (this.resChange.diamondChange > 0 && this.srcpos))
        {
            this.havertAnimate('diamond', this.resChange.diamondChange);
        }
    }

    public get gold():number
    {
        return this.userInfo.gold;
    }

    public set gold(value:number)
    {
        if(value == this.userInfo.gold) return;
        this.userInfo.gold = value;
        GameUI.instance.goldLabel.text = String(value);
        //处理收入动画
        if(this.resChange && (this.resChange.goldChange > 0 && this.srcpos))
        {
            this.havertAnimate('gold', this.resChange.goldChange);
        }
    }



    //收获飞入动画
    public havertAnimate(type:string, num:number, cb?:Function):void
    {

        var self = this;
        var imgId:string;
        var target:egret.DisplayObject;

        if(num === 0){ return; }

        if(type == 'exp')
        {
            //经验值
            imgId = UIPosition.JYZ_POSITION.imgId;
            target = GameUI.instance.expIcon;
        }else if(type == 'gold')
        {
            //金币
            imgId = UIPosition.JB_POSITION.imgId;
            target = GameUI.instance.goldIcon;

        }else if(type == 'diamond')
        {
            //钻石
            imgId = UIPosition.ZS_POSITION.imgId;
            target = GameUI.instance.diamondIcon;

        }

        var asset:ChangeItemButton = new ChangeItemButton(imgId, String(num < 0?'-':'+' + num));
        asset.x = this.srcpos.x - 10;
        asset.y = this.srcpos.y - 5;
        Lyrs.LYRS_ICON_PARENT.addChild(asset);
        Icon.moveTo(asset, target, (begin, target)=>
        {
            target.visible = true;
            TweenIt.tweenBigThenNormal(target, ()=>
            {
                target.visible = false;
                cb && cb.call(self);
            });

            //清空上一次位置
            self.srcpos = null;

            //播放音效
            if(type == 'exp')
            {
                SoundMgr.instance.playAudio(SoundName.EXP_GET);
            }
            else if(type == 'gold')
            {
                SoundMgr.instance.playAudio(SoundName.COIN_GET);
            }
            else if(type == 'diamond')
            {
                SoundMgr.instance.playAudio(SoundName.DIAMOND_GET);
            }

        });

    }

    /**
     * 升级 ( 处理升级动画之类的 )
     */
    private upgradeLevel(level:number):void
    {
        UIMgr.instance.closeCurrentPanel();

        Loader.instance.loadGroups([
            GroupName.UPGRADE_GROUP,
            GroupName.GOODS_GROUP,
            GroupName.MAPS_GROUP,
            GroupName.FONTS_GROUP
        ], ()=>{
            this.loadUpgradeResComplate(level);
        }, this);

    }

    private loadUpgradeResComplate(level: number):void {

        //显示升级面板
        if(!this.bgLayer)
        {
            this.bgLayer = this.createBGLayer();
        }

        if(Lyrs.LYRS_UI_2.getChildIndex(this.bgLayer) === -1){
            Lyrs.LYRS_UI_2.addChild(this.bgLayer);
        }

        if(!this.userUpgradePanel){

            this.userUpgradePanel = new game.UserUpgradePanelV2();
            this.userUpgradePanel.x = 0;
            this.userUpgradePanel.y = (Lyrs.SH - 500) * .5 - 50;
        }

        if(this.bgLayer.getChildIndex(this.userUpgradePanel) === -1){
            this.bgLayer.addChild(this.userUpgradePanel);
        }

        this.bgLayer.visible = true;
        this.userUpgradePanel.level = level;

        GameEvent.watcher.addEventListener(GameEvent.USER_UPGRADE, this.userUpGradeHandler, this);

        egret.Tween.get(this.bgLayer).wait(100).to({alpha:1}, 100, egret.Ease.elasticOut);

        //播放音效
        SoundMgr.instance.playAudio(SoundName.LEVEL_UP);


    }

    private userUpGradeHandler(e:egret.Event):void
    {
        var self = this;
        egret.Tween.get(self.bgLayer).to({alpha:0}, 100).call(function()
        {
            egret.Tween.removeTweens(self.bgLayer);
            //停止动画
            self.userUpgradePanel.onClose();
            self.userUpgradePanel.praticleSystem.stop(true);
            self.userUpgradePanel.praticleSystem.visible = false;

            if(Lyrs.LYRS_UI_2.getChildIndex(self.userUpgradePanel.praticleSystem) !== -1){
                Lyrs.LYRS_UI_2.removeChild(self.userUpgradePanel.praticleSystem);
            }

            if(self.bgLayer.getChildIndex(self.userUpgradePanel) !== -1){
                self.bgLayer.removeChild(self.userUpgradePanel);
            }

            self.bgLayer.visible = false;
            self.srcpos = null;
            self.resChange = null;

            if(Lyrs.LYRS_UI_2.getChildIndex(self.bgLayer) !== -1){
                Lyrs.LYRS_UI_2.removeChild(self.bgLayer);
            }

            //开始生产建筑引导
            //面包机
            if(ProductGuideController.getInstance().isInProductGuide()) {
                ProductGuideController.getInstance().startGuide();
            }
            //饲料机
            else if(PlasticGuideController.getInstance().isInPlasticGuide()) {
                PlasticGuideController.getInstance().startGuide();
            }
            else if(VillagerGuideController.getInstance().isInVillagerGuide()) {
                VillagerGuideController.getInstance().startGuide();
            }
            else if(OrderGuideController.getInstance().isInOrderGuide()) {
                OrderGuideController.getInstance().startGuide();
            }
            else {
                //公告
                //NoticeController.instance.init();

                //登录奖励
                GameSystemController.instance.openLoginRewardPanel();

            }
        });
    }

    private createBGLayer(parent:egret.DisplayObjectContainer = Lyrs.LYRS_UI_2, alpha:number = .5):egret.Sprite
    {
        var bgLayer:egret.Sprite = new egret.Sprite();
        //parent.addChild(bgLayer);
        bgLayer.name = 'BGLayer';
        bgLayer.graphics.clear();
        bgLayer.graphics.beginFill(0x000000, alpha);
        bgLayer.graphics.drawRect(0, 0, Lyrs.SW, Lyrs.SH);
        bgLayer.graphics.endFill();
        //bgLayer.touchChildren = false;
        bgLayer.touchEnabled = true;
        return bgLayer;
    }

    public static Login():void
    {
        //拿到sdk的token，先 socket发 login
        var token = GameUtils.getToken();
        var sdata:any = {
            act:'User.login',
            dt:{
                token:token
            }
        };
        sdata = JSON.stringify(sdata);
        SocketManager.instance.send(sdata);
    }

    public static createRole():void
    {

        //清空新标识
        window.localStorage.removeItem(Global.NEW_ITEMS);

        var sdkUserData = GameUtils.getSdkUserData();
        var sdata:any = {
            act:'User.create',
            dt:{
                token:Global.sdToken,
                name:sdkUserData.username,
                sex:sdkUserData.sex,
                head:sdkUserData.head || '',
                country:sdkUserData.country || '',
                city:sdkUserData.city || '',
                province:sdkUserData.province || ''
            }
        };
        sdata = JSON.stringify(sdata);
        SocketManager.instance.send(sdata);
    }

    /**
     * 更新钻石
     * @param num  减少或者增加( 减少：-， 增加：+ )
     */
    public updateDiamond(num:number):void
    {
        if(!num) return;
        var poor:number = this.userInfo.diamond - (num < 0?-num:num);
        this.userInfo.diamond = poor;
        console.log('钻石改变...', poor);
        GameUI.instance.diamondLabel.text = String(poor);
    }

    public updateGold(num:number):void
    {
        if(!num) return;
        var poor:number = this.userInfo.gold - (num < 0?-num:num);
        this.userInfo.gold = poor;
        console.log('钻石改变...', poor);
        GameUI.instance.goldLabel.text = String(poor);
    }


    public isGoldEnough(gNum:number, panel?:number, parmas?:any):boolean
    {
        if(this.gold >= gNum)
        {
            return true;
        }
        else
        {
            //TipText.instace.play('金币不足');
            TipText.instace.play(Language.getString( 3, 34 ));
            UIMgr.instance.show(PanelName.BUY_JB_PANEL, {'direction':Direction.CENTER}, 0, (panel || null), parmas);
            return false;
        }
    }

    public isDiamondEnough(dNum:number, panel?:number, parmas?:any):boolean
    {

        if(this.diamond >= dNum)
        {
            return true;
        }
        else
        {
            if(UIMgr.instance.isShow)
            {
                UIMgr.instance.closeCurrentPanel(()=>
                {
                    //TipText.instace.play('钻石不足');
                    TipText.instace.play(Language.getString( 3, 35 ));
                    UIMgr.instance.show(PanelName.BUY_ZS_PANEL, {'direction':Direction.CENTER}, 0, (panel || null), parmas);
                });
            }
            else
            {
                Lyrs.LYRS_UI_2.removeChildren();
                TipText.instace.play(Language.getString( 3, 35 ));
                UIMgr.instance.show(PanelName.BUY_ZS_PANEL, {'direction':Direction.CENTER}, 0, (panel || null), parmas);
            }

            return false;
        }
    }

    public isLevelEnough(level:number):boolean
    {
        if(this.level >= level)
        {
            return true;
        }
        return false;
    }

    /*-----------------------购买金币-----------------------*/

    public currentBuyItem:any;

    public sendBuyCoin(data:any):void
    {
        console.log('--购买金币--', data)
        var sdata:any = {
            "act":"Item.coinExchange",
            "dt":{
                changeType:data['id']
            }
        };
        console.log(data, sdata)
        sdata = JSON.stringify(sdata);
        SocketManager.instance.send(sdata);
    }

    public updataBuyCoin(data:any):void
    {
        console.log(data);
        //TipText.instace.play('购买成功')
        TipText.instace.play(Language.getString( 3, 36 ));
        this.resChange = null;
        this.gold += data.gold;
        this.diamond -= data.diamond;

        if(this.currentBuyItem)
        {
            this.srcpos = this.currentBuyItem.localToGlobal(this.currentBuyItem.imgId.x, this.currentBuyItem.imgId.y);
            this.havertAnimate('gold', data.gold, ()=>
            {
                this.srcpos = null;
                this.currentBuyItem = null;
            });
        }
    }


    public isIndulgeState1():boolean
    {
        if(!AntiAddictionController.indulgeFlag)
        {
            return false;
        }
        if(1 != this.userInfo.indulge)
        {
            return false;
        }

        if(!this.isIndulge)
        {
            return false;
        }

        if(GuideManager.getInstance().isInGuide())
        {
            return false;
        }
        return true;
    }

    public isIndulgeState2():boolean
    {
        if(!AntiAddictionController.indulgeFlag)
        {
            return false;
        }
        if(2 != this.userInfo.indulge)
        {
            return false;
        }

        if(!this.isIndulge)
        {
            return false;
        }

        if(GuideManager.getInstance().isInGuide())
        {
            return false;
        }

        return true;
    }


    //=-=-=-=-=--=-=-=-=-=-=-=-=-=-修改昵称=-=-=-
    public sendModNickName(name: string): void{

        var data:Object = {
            "act":"User.nickName",
            "dt":{"name": name || ''}
        };
        SocketManager.instance.send(JSON.stringify(data));

    }

    public updateNickName(data:any): void{
        this.userInfo.name = data.name;
        GameUI.instance.userNameLabel.text = data.name;
        TipText.instace.play('昵称修改成功');
    }

}