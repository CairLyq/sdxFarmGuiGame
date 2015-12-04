/**
 * Created by rodey on 14/11/20.
 *
 * 游戏 主UI管理单例类
 */
class GameUI extends egret.gui.SkinnableComponent
{
    private static _instance:GameUI;

    /**
     * 主线任务开放等级
     * @type {number}
     */
    private mainTaskLevel:number = 5;
    /**
    * 每日（日常）任务开放等级
    * @type {number}
    */
    private everyTaskLevel:number = 7;

    private topIcons:egret.gui.UIAsset;
    public idenButton: egret.gui.Button;
    private idenData: any;
    private idenDataLength:number;

    /**
     * 头像
     */
    private avatar:egret.gui.UIAsset;
    private avatarArea:Object = {x:0, y:0, endX:76, endY:76};

    /**
     * 经验值
     */
    public expLabel:egret.gui.Label;
    private expArea:Object = {x:76, y:0, endX:200, endY:38};
    private progress:egret.gui.UIAsset;
    private progressWidth:number = 77;
    private expMask:egret.Rectangle;
    public expIcon:egret.gui.UIAsset;

    /**
     * 钻石数量
     */
    public diamondLabel:egret.gui.Label;
    private diamondArea:Object = {x:200, y:0, endX:347, endY:38};
    public diamondIcon:egret.gui.UIAsset;

    /**
     * 金币数量
     */
    public goldLabel:egret.gui.Label;
    private goldArea:Object = {x:347, y:0, endX:480, endY:38};
    public goldIcon:egret.gui.UIAsset;

    /**
     * 用户名
     */
    public userNameLabel:egret.gui.Label;
    private userNameArea:Object = {x:76, y:38, endX:193, endY:76};

    /**
     * 商店
     */
    public shop:egret.gui.UIAsset;

    /**
     * 任务系统图标
     */
    private mainStatus:egret.gui.Button;
    public mainTaskBg:egret.gui.UIAsset;
    /**
     * 每日任务系统图标
     */
    private everyTaskStatus:egret.gui.Button;
    private everyTaskBg:egret.gui.UIAsset;
    /**
     * 好友图标
     */
    private friend:egret.gui.UIAsset;

    /**
     * 地图放大缩小图标
     */
    private zoom:egret.gui.UIAsset;
    private zoomGray:egret.gui.UIAsset;

    /**
     * 图标上下、左右间隔
     */
    private gap:number = 10;

    constructor()
    {
        super();
        this.skinName = skins.uicompenet.Main.GameUISkin;

        //侦听升级后新标识
        GameEvent.watcher.addEventListener(GameEvent.UPGRADE_NEW_ITEMS, this.upgradeNewItems, this);
        GameEvent.watcher.addEventListener(GameEvent.UPGRADE_NEW_ITEMS_CHANGE, this.upgradeNewItemsChange, this);
    }

    public static get instance():GameUI
    {
        if(null == GameUI._instance)
        {
            GameUI._instance = new GameUI();
        }
        return GameUI._instance;
    }

    public childrenCreated():void
    {
        super.childrenCreated();

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);

        Loader.instance.load( GroupName.AVATAR, GroupName.AVATAR_KEYS, this.initUI, this );

    }

    private onTouchTap(e:egret.TouchEvent):void
    {
        if(ModeLogic.getInstance().isEditMode() || ModeLogic.getInstance().isBuyMode())
        {
            return;
        }

        if(e.localX > this.avatarArea['x'] && e.localY > this.avatarArea['y'] &&
            e.localX < this.avatarArea['endX'] && e.localY < this.avatarArea['endY'])
        {//显示个人信息面板
            Loader.instance.loadGroups([GroupName.SEXPANEL_GROUP], ()=>{

                UIMgr.instance.show( PanelName.SETTING_PANEL, { "direction":Direction.CENTER } );

            }, this);
            return;
        }

        if(e.localX > this.expArea['x'] && e.localY > this.expArea['y'] &&
            e.localX < this.expArea['endX'] && e.localY < this.expArea['endY'])
        {
            //UIMgr.instance.show( PanelName.USER_UPGRADE_PANEL, {direction:Direction.NONE}, UserController.instance.level );
            var data:Object = { "act":"Gm.addLevel", "dt":{ "userId":UserController.instance.getUserId(), level:UserController.instance.level + 1 } };
            SocketManager.instance.send(JSON.stringify(data), false);
            return;
        }

        if(e.localX > this.diamondArea['x'] && e.localY > this.diamondArea['y'] &&
            e.localX < this.diamondArea['endX'] && e.localY < this.diamondArea['endY'])
        {
            UIMgr.instance.show(PanelName.BUY_ZS_PANEL, {'direction':Direction.CENTER}, 0);
            return;
        }

        if(e.localX > this.goldArea['x'] && e.localY > this.goldArea['y'] &&
            e.localX < this.goldArea['endX'] && e.localY < this.goldArea['endY'])
        {
            UIMgr.instance.show(PanelName.BUY_JB_PANEL, {'direction':Direction.CENTER}, 0);
            return;
        }

        if(e.localX > this.userNameArea['x'] && e.localY > this.userNameArea['y'] &&
            e.localX < this.userNameArea['endX'] && e.localY < this.userNameArea['endY'])
        {
            //加载资源
            Loader.instance.loadGroups([GroupName.SEXPANEL_GROUP], ()=>{

                UIMgr.instance.show( PanelName.SETTING_PANEL, { "direction":Direction.CENTER } );

            }, this);

            return;
        }

        if(this.shop === e.target || this.idenButton === e.target)
        {
            GuideManager.getInstance().addForbiden();
            //加载资源
            Loader.instance.loadGroups([
                GroupName.FONTS_GROUP
            ], ()=>{

                TweenIt.tweenBigThenNormal( this.shop, ()=>{
                    UIMgr.instance.show(PanelName.SHOPPING_PANEL, {'direction':Direction.CENTER});
                } );

            }, this);

            return;
        }

        if( this.mainTaskBg === e.target || this.mainStatus === e.target )
        {
            TweenIt.tweenBigThenNormal( this.mainTaskBg, ()=>{
                window.localStorage.setItem( 'MainTaskClicked', 'MainTaskClicked' );
                this.refreshMainTaskIcon();
                UIMgr.instance.show(PanelName.TASK_PANEL, {direction:Direction.CENTER} );
            } );
            return;
        }

        if( this.everyTaskBg === e.target || this.everyTaskStatus === e.target )
        {
            TweenIt.tweenBigThenNormal( this.everyTaskBg, ()=>{
                window.localStorage.setItem( 'TaskClicked', 'TaskClicked' );
                this.refreshTaskIcon();
                UIMgr.instance.show(PanelName.EVERY_TASK_PANEL, {direction:Direction.CENTER} );
            } );
            return;
        }

        if(this.zoom === e.target)
        {
            if(e.localY < this.zoom.y + this.zoom.height / 2)
            {
                ZoomLogic.getInstance().zoomSmall();
                return;
            }
            ZoomLogic.getInstance().zoomBig();
            return;
        }
        if( this.friend === e.target )
        {
            TweenIt.tweenBigThenNormal( this.friend, ()=>{
                //UIMgr.instance.show(PanelName.FRIEND_PANEL, {direction:Direction.NONE});
            } );
            return;
        }
    }

    public create():void
    {
        Lyrs.LYRS_UI.addChild(this);
    }

    public updateExp():void
    {
        var level = UserController.instance.level;
        var currentLevelExp:number = UserLevelModel.getModelByLevel(level).exp;
        var nextLevelExp:number = UserLevelModel.getModelByLevel( level + 1 ).exp;
        var gap:number = nextLevelExp - currentLevelExp;
        var pecent:number = ( UserController.instance.exp - currentLevelExp ) / gap;
        this.expMask.width = this.progressWidth * pecent;
        this.expLabel.text = 'Lv ' + String(level);
    }

    private initUI():void
    {
        //玩家头像
        var avatarSrc:string = UserController.instance.isMale?'ZJM_4':'ZJM_5';
        this.avatar.source = avatarSrc;

        //玩家名字
        this.userNameLabel.text = UserController.instance.name;

        //玩家经验
        var expProgressBar:egret.Shape = new egret.Shape();
        expProgressBar.graphics.beginFill( Color.GREEN, 1 );
        //expProgressBar.graphics.drawRoundRect(0, 0, this.progressWidth, 18, 10, 10);
        expProgressBar.graphics.drawRect( 0, 0, this.progressWidth, 18 );
        expProgressBar.graphics.endFill();
        expProgressBar.graphics.beginFill( Color.WHITE, 0.3 );
        //expProgressBar.graphics.drawRoundRect( 2, 2, this.progressWidth - 4, 14, 10, 10 );
        expProgressBar.graphics.drawRect( 2, 2, this.progressWidth - 4, 14 );
        expProgressBar.graphics.endFill();
        expProgressBar.width = this.progressWidth;
        expProgressBar.height = 18;
        this.expMask = new egret.Rectangle(0, 0, this.progressWidth, 18);
        expProgressBar.mask = this.expMask;
        this.progress.source = expProgressBar;
        this.updateExp();

        //玩家钻石数
        this.diamondLabel.text = String(UserController.instance.diamond);

        //玩家金币数
        this.goldLabel.text = String(UserController.instance.gold);

        //商店
        this.shop.x = this.gap;
        this.shop.y = Lyrs.SH - this.shop.height - this.gap;

        //好友
        this.friend.x = Lyrs.SW - this.friend.width - this.gap;
        this.friend.y = Lyrs.SH - this.friend.height - this.gap;

        //zoom
        this.hideZoomGray();
        this.zoom.x = Lyrs.SW - this.zoom.width - this.gap;
        this.zoomGray.x = Lyrs.SW - this.zoomGray.width - this.gap;
        if( this.friend.visible )
        {
            this.zoom.y = this.friend.y - this.zoom.height - this.gap;
            this.zoomGray.y = this.friend.y;
        }
        else
        {
            this.zoom.y = Lyrs.SH - this.zoom.height - this.gap;
            this.zoomGray.y = Lyrs.SH - this.zoom.height - this.gap;
        }


        //主线任务
        this.mainTaskBg.x = this.gap;
        this.mainTaskBg.y = this.topIcons.height + this.gap;

        //每日任务
        this.everyTaskBg.x = this.gap;
        this.everyTaskBg.y = this.mainTaskBg.y + this.mainTaskBg.height + this.gap;

        this.refreshMainTaskIcon();
        this.refreshTaskIcon();

        if( UserController.instance.level < 10 )
        {
            GameEvent.watcher.addEventListener( GameEvent.USER_UPGRADE, this.userUpGradeHandler, this );
            this.userUpGradeHandler( null );
        }

        //新标识
        if(this.idenButton){
            if(this.getNewItems() > 0){
                this.idenButton.visible = true;
                this.idenButton.label = String(this.getNewItems());
                TweenIt.loopTween( this.idenButton, {"scaleX":0.8, "scaleY":0.8}, {"scaleX":1, "scaleY":1} );
            }else{
                this.idenButton.label = '';
                this.idenButton.visible = false;
            }
        }
    }
    private userUpGradeHandler( e:egret.Event ):void
    {
        var bool:boolean = ( UserController.instance.level >= this.mainTaskLevel );
        this.mainStatus.visible = this.mainTaskBg.visible = bool;
        this.refreshMainTaskIcon();
        bool = ( UserController.instance.level >= this.everyTaskLevel );
        this.everyTaskBg.visible = this.everyTaskStatus.visible = bool;
        if( bool )
        {
            GameEvent.watcher.removeEventListener( GameEvent.USER_UPGRADE, this.userUpGradeHandler, this );
            this.refreshTaskIcon();
        }
    }
    /**
     * 刷新主线任务系统 图标
     */
    public refreshMainTaskIcon():void
    {
        if( UserController.instance.level < this.mainTaskLevel )
        {
            return;
        }

        this.mainStatus.x = this.mainTaskBg.x + this.mainTaskBg.width;
        this.mainStatus.y = this.mainTaskBg.y;

        egret.Tween.removeTweens( this.mainStatus );
        if( TaskController.getMainTaskFinish() || !TaskController.getMainTaskClicked() )
        {
            this.mainStatus.visible = true;
            TweenIt.loopTween( this.mainStatus, {"scaleX":0.8, "scaleY":0.8}, {"scaleX":1, "scaleY":1} );
        }
        else
        {
            this.mainStatus.visible = false;
        }
    }

    /**
     * 刷新每日任务系统 图标
     */
    public refreshTaskIcon():void
    {
        if( UserController.instance.level < this.everyTaskLevel )
        {
            return;
        }
        this.everyTaskStatus.x = this.everyTaskBg.x + this.everyTaskBg.width;
        this.everyTaskStatus.y = this.everyTaskBg.y;
        egret.Tween.removeTweens( this.everyTaskStatus );
        if( TaskController.getTaskFinish() || !TaskController.getTaskClicked() )
        {
            this.everyTaskStatus.visible = true;
            TweenIt.loopTween( this.everyTaskStatus , {"scaleX":0.8, "scaleY":0.8}, {"scaleX":1, "scaleY":1} );
        }
        else
        {
            this.everyTaskStatus.visible = false;
        }
    }

    /**
     * 缩小图标变灰
     */
    public disableSmall():void
    {
        this.zoomGray.visible = true;
        this.zoomGray.y = this.zoom.y;
    }

    /**
     * 放大图标变灰
     */
    public disableBig():void
    {
        this.zoomGray.visible = true;
        this.zoomGray.y = this.zoom.y + this.zoom.height - this.zoomGray.height;
    }

    /**
     * 正常放大、缩小
     */
    public hideZoomGray():void
    {
        this.zoomGray.visible = false;
    }


    private upgradeNewItems(evt: egret.Event): void{

        this.idenData = UserLevelModel.getItemNews();
        if(this.idenData && this.idenData.length){
            this.updateIdenButton(this.idenData.length);
        }

    }

    private updateIdenButton(NewNum: number): void{
        if(NewNum > 0){
            this.idenDataLength = NewNum;
            this.idenButton.visible = true;
            this.idenButton.label = String(NewNum);
            TweenIt.loopTween( this.idenButton, {"scaleX":0.8, "scaleY":0.8}, {"scaleX":1, "scaleY":1} );
        }else{
            this.idenDataLength = 0;
            this.idenButton.label = '';
            this.idenButton.visible = false;
        }

    }

    private upgradeNewItemsChange(evt: egret.Event): void{

        if(!evt.data || '' == evt.data)
        {
            return;
        }
        var imgId: string = evt.data;
        var newItems: any = UserLevelModel.getItemNews();
        if(newItems && newItems.length && newItems.length > 0){

            for( var i: number = 0, len: number = newItems.length; i < len; ++i ){
                if(String(imgId) === newItems[i]){
                    newItems.splice(i, 1);
                    break;
                }
            }

            if(newItems.length > 0){
                window.localStorage.setItem(Global.NEW_ITEMS, JSON.stringify(newItems));
            }else{
                window.localStorage.removeItem(Global.NEW_ITEMS);
            }
            this.updateIdenButton(newItems.length);

        }

    }

    private getNewItems(): number{
        var newItems: any = GameUtils.getItem(Global.NEW_ITEMS);
        if(newItems && newItems.length && newItems.length > 0){
            return newItems.length;
        }
        return 0;
    }
}


