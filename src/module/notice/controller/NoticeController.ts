/**
 * Created by rodey on 15/3/12.
 */

class NoticeController{

    private url: string;
    private channelId: number;
    private loader: egret.URLLoader;
    private request: egret.URLRequest;
    private data: any;
    public isOpened: boolean = false;

    constructor(){

        this.getChannelId();
        this.url = Global.NOTICE_URL + '?channelId=' + this.channelId;

        //公告跳转
        GameEvent.watcher.addEventListener(GameEvent.NOTIVE_GOTO, this.gotoAndPanel, this);

    }

    public init(): void{

        if(GuideManager.getInstance().isInGuide())
        {
            return;
        }

        if(this.isOpened){
            return;
        }

        this.isOpened = true;

        this.loadNotice();

    }

    private loadNotice(): void{

        this.request = new egret.URLRequest(this.url);
        this.request.method = egret.URLRequestMethod.POST;

        this.loader = new egret.URLLoader();
        this.loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        this.loader.load(this.request);
        this.loader.addEventListener(egret.Event.COMPLETE, this.loadComplateHandler, this);

    }

    private loadComplateHandler(evt: egret.Event): void{

        //console.log(this.loader.data);
        this.data = this.loader.data;
        try{

            this.data = JSON.parse(this.loader.data);
            this.formatData();

        }catch (e){}

    }

    private formatData(): void{

        //console.log('公告列表(过滤前): ', this.data['notices']);

        for( var i: number = 0; i < this.data['notices'].length; ++i ){

            if(Date.now() >= this.data['notices'][i].beginDate && Date.now() < this.data['notices'][i].endDate){
                continue;
            }else{
                this.data['notices'].splice(i, 1);
            }

        }

        //console.log('公告列表(过滤后): ', this.data['notices']);

        this.open();

    }

    private open(): void{

        UIMgr.instance.show( PanelName.NOTICE_PANEL, { 'direction': Direction.CENTER }, this.data['notices']);

    }

    public getNotices(): any{
        return this.data.notices;
    }

    private getChannelId(): void{

        var sdkData: any = window.localStorage.getItem('sdkUserData');

        try{
            sdkData = JSON.parse(sdkData);

        }catch (e){}

        if(sdkData && sdkData['channelid']){
            this.channelId = sdkData['channelid'];
        }

    }

    private gotoAndPanel(evt: egret.Event): void{

        var action: string = evt.data;
        if(!action) return;

        if( action === 'buyCoin' ){

            //购买金币
            UIMgr.instance.show(PanelName.BUY_JB_PANEL, { 'direction': Direction.CENTER }, 0);

        } else if( action === 'buyDiamond' ){

            //购买金币
            UIMgr.instance.show( PanelName.BUY_ZS_PANEL, { 'direction': Direction.CENTER }, 0 );

        }

    }

    //---
    private static _instance: NoticeController;
    public static getInstance(): NoticeController{
        if(!NoticeController._instance){
            NoticeController._instance = new NoticeController();
        }
        return NoticeController._instance;
    }
    public static get instance(): NoticeController{ return NoticeController.getInstance(); }

}
