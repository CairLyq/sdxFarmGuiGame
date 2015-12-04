class Main extends egret.DisplayObjectContainer
{
    /**
     * 加载进度条
     */
    private loadingUIView:LoadingUIView;

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

        //打印版权
        Logger.startGame();

        //注入本地缓存
        this.createApplictionCache();

    }

    private onAddToStage(evt:egret.Event):void
    {
        Lyrs.init(this);
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

        //开启调式
        //if( Global.DEBUG )
        {
            egret.Profiler.getInstance().run();
        }
        //注入自定义的素材解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        egret.gui.Theme.load("resource/theme.thm");


        //首先判断 本地token数据是否存在
        if(!window.localStorage.getItem('token')){
            window.location.href = ( Global.DEBUG ? 'launcher/' : '../' ) + 'sxdlogin.html';
        }

        RenderUtils.renderWhole();
        this.initUser();
    }

    private createApplictionCache(): void
    {
        /*if( window.localStorage.getItem('_cache_') )
        {
            this.checkUpdate();
            return;
        }*/
        var iframe = document.createElement("iframe");
        iframe.setAttribute("id", "appcache-iframe");
        iframe.setAttribute("src", Global.CACHE_URL);
        iframe.setAttribute("style","position:absolute;top:0;left:0;width:1px;height:1px;visibility:hidden;");
        document.body.appendChild(iframe);
        window.localStorage.setItem('_cache_', 'true');
    }

    private checkUpdate(): void{
        window.addEventListener('load', (e)=> {
            window.applicationCache.addEventListener('updateready', (e)=>{
                if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                    window.applicationCache.swapCache();
                    window.parent.location.reload();
                }
            }, false);
        }, false);
    }

    private initUser():void
    {
        //先创建sdk实例对象
        var sdUser:any = new PayAccount.checkAccount(game.config.getConfig());
        Global.sdUserClass = sdUser;

        var sdkUserData = GameUtils.getSdkUserData();
        if( null != sdkUserData )
        {
            Global.PLATFORM = Number(sdkUserData.channelid);
        }

        //登录  !GameUtils.getToken() &&
        if(Global.PLATFORM !== Platform.WX)
        {
            this.loadResConfig();
            return;
        }

        this.loadResConfig();
    }

    private loseToken():void
    {
        PayAccount.tipDialog({
            msg: Language.getString( 3, 0 ), //登录失败，请您重试
            type:'error',
            autoClose:false,
            btnOk:{
                val: Language.getString( 3, 1 ), //重新登录
                call: ()=>
                {
                    Global.sdUserClass.isAutoLogin = false;
                    Global.sdUserClass.initCheckPayaccount();
                    Global.sdUserClass.isPost = false;
                    Global.sdUserClass.callback = this.loadResConfig;
                }
            },
            btnCancel:{val: Language.getString( 3, 2 )} //取消
        });
    }

    /**
     *
     * 加载资源配置文件
     */
    private loadResConfig(res?:any):void
    {
        if(res && res.code && res.code != '1')
        {
            this.loseToken();
        }
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onLoadResConfig, this );
        RES.loadConfig("resource/resource.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onLoadResConfig(event:RES.ResourceEvent):void
    {
        Loader.instance.load( 'preLoadBG', null, this.enterLoad, this, false );
    }

    private isShowed:boolean = false;
    private enterLoad( e:RES.ResourceEvent = null ):void
    {
        Language.initLanguage();

        this.loadingUIView = new LoadingUIView();
        this.loadingUIView.x = Lyrs.SW * .5;
        this.loadingUIView.y = 110;

        this.addChild(this.loadingUIView);
        this.loadingUIView.addEventListener(GameEvent.PRE_LOAD_GAME, this.readyToEnterGame, this);

        var self = this;
        var intervelId:number = setInterval( removeLogo, 100 );
        function removeLogo()
        {
            if( true == window[ 'alpha100' ] )
            {
                window['removeLogo']();
                clearInterval( intervelId );
                //在游戏初始化之前
                self.setImages();
                self.isShowed = true;
            }
        }
        removeLogo();
    }

    private readyToEnterGame(evt:egret.Event):void
    {
        this.loadingUIView.removeEventListener(GameEvent.PRE_LOAD_GAME, this.readyToEnterGame, this);

        this.removeChild(this.loadingUIView);
        this.loadingUIView.destroy();
        this.loadingUIView = null;

        var self = this;
        var intervelId:number = setInterval( startSockedt, 100 );
        function startSockedt()
        {
            if( self.isShowed )
            {
                clearInterval( intervelId );
                self.initSocketManager();
            }
        }

        startSockedt();
    }

    /**
     * 获取所有image标签(替换默认头像)
     */
    private setImages():void
    {
        var imgs:any = document.getElementsByTagName('img');
        for(var i = 0; i < imgs.length; ++i)
        {
            imgs[i].src = game.config.getLocalHerf() + 'images/avatar.jpg';
        }
    }
    private initSocketManager():void
    {
        if(!Global.sdToken)
        {
            Global.sdToken = Global.sdUserClass.getToken();
        }
        console.log('NO --- 当前用户Token：', Global.sdToken);
        Global.sdUserClass.callback = null;

        SocketManager.instance.init();
    }
}