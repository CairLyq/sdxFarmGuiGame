/**
 * Created by Gordon on 13/March/15.
 * @class AntiAddictionController
 * @constructor
 **/
class AntiAddictionController implements IGTimer
{
    /**
     * 防沉迷系统
     * true 开启,false 关闭
     */
    static indulgeFlag:boolean;

    private userInfo:UserInfo;
    /**
     * 玩家在线3小时以内（不包含3小时），每隔45分钟(2700秒)提示一次
     * @type {number}
     */
    private indulgeSecond0:number = 10800;
    //private indulgeSecond0:number = 600;//10分钟
    /**
     * 玩家累积在线3~5小时，每隔30分钟(1800秒)提示一次
     * @type {number}
     */
    private indulgeSecond1:number = 18000;
    //private indulgeSecond1:number = 1800;//30分钟

    private timeoutId0:number = 0;
    private timeoutId1:number = 0;

    private stim: any;


    public constructor()
    {
        this.userInfo = UserController.instance.getUserData();

        if( !Global.DEBUG )
        {
            GTimer.getInstance().register( this );
        }
    }

    public second():void
    {
        var sec:number = this.userInfo.onlineTime + GTimer.getInstance().serverTime - GTimer.getInstance().loginTime;
        var s:string = '';
        var h:number = Math.floor(sec%86400/3600);//小时 hour
        s += h<10?"0"+h:h;
        var m:number = Math.floor(sec%86400%3600/60);//分minite
        s += (":"+(m<10?"0"+m:m));
        var se:number = Math.floor(sec%86400%3600%60);//秒second
        s += (":"+(se<10?"0"+se:se));
        Lyrs.bebugText( '今天在线时间：' + s );
    }

    public start():void
    {
        if( !UserController.instance.isIndulge )
        {
            return;
        }
        var todayOnlineTime:number = this.userInfo.onlineTime + GTimer.getInstance().serverTime - GTimer.getInstance().loginTime;
        var time:number = 0;
        if( todayOnlineTime < this.indulgeSecond0 )
        {
            time = 2700000;//45分钟
            //time = 180000;//三分钟
            this.userInfo.indulge = 0;

            if( 0 == this.timeoutId0 )
            {
                this.timeoutId0 = setTimeout( this.setIndulge, ( this.indulgeSecond0 - todayOnlineTime ) * 1000, this );
            }
        }
        else if( todayOnlineTime < this.indulgeSecond1 )
        {
            time = 1800000;//30分钟
            //time = 120000;//2分钟
            this.userInfo.indulge = 1;
            if( 0 == this.timeoutId1 )
            {
                this.timeoutId1 = setTimeout( this.setIndulge, ( this.indulgeSecond1 - todayOnlineTime ) * 1000, this );
            }
        }
        else
        {
            time = 900000;//15分钟
            //time = 60000;//1分钟
            this.userInfo.indulge = 2;
        }
        this.stim = setTimeout( this.show, time, this );
    }
    private setIndulge( self:AntiAddictionController ):void
    {
        self.userInfo.indulge++;
        self.updateIndulge( self.userInfo.indulge );
    }
    private updateIndulge( indulge:number ):void
    {
        var data:Object = { "act":"User.updateIndulge", "dt":{ "indulge":indulge } };
        SocketManager.instance.send( JSON.stringify( data ), false );
    }
    private show( self:AntiAddictionController ):void
    {
        clearTimeout(this.stim);
        self.start();

        if( !UserController.instance.isIndulge )
        {
            return;
        }

        if( GuideManager.getInstance().isInGuide() )
        {
            return;
        }
        AntiAddictionTip.instace.show();

        var status:number = UserController.instance.userIdentify.status;

        if( 0 == status )
        {
            AntiAddictionController.showPanel();
        }
    }

    public static verify( cardName:string, cardNo:string ):void
    {
        var data:Object = { "act":"User.verify", "dt":{ "cardNo":cardNo, cardName:cardName } };
        SocketManager.instance.send( JSON.stringify( data ), false );
    }

    /**
     * 防沉迷无奖励时，显示防沉迷注册面板或者防沉迷收益为零提示。
     */
    public static showPanel():void
    {
        if( !UserController.instance.isIndulge )
        {
            return;
        }
        if( !AntiAddictionController.indulgeFlag )
        {
            return;
        }

        if( view.AntiAddictionPanel.isShow )
        {
            return;
        }
        if( GuideManager.getInstance().isInGuide() )
        {
            return;
        }
        var status:number = UserController.instance.userIdentify.status;
        if( 2 == status || 4 == status )
        {
            TipText.instace.play( Language.getString( 2, 4 ) );//您已进入不健康游戏时间，收益已降为零，第二天才能恢复正常，请下线休息。
            return;
        }
        if( !SocketManager.instance.isConnected )
        {
            return;
        }
        UIMgr.instance.show( PanelName.ANTIADDICTION_PANEL, { "direction":Direction.CENTER } );
    }

    private static _instance:AntiAddictionController;
    public static get instance():AntiAddictionController
    {
        if( null == AntiAddictionController._instance )
        {
            AntiAddictionController._instance = new AntiAddictionController();
        }
        return AntiAddictionController._instance;
    }
}