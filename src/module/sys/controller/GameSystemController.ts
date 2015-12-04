/**
 * Created by rodey on 14/12/26.
 */

//sys controller

class GameSystemController{

    public static _instance: GameSystemController;

    constructor(){}

    public static getInstance(): GameSystemController{
        if(!GameSystemController._instance)
            GameSystemController._instance = new GameSystemController();
        return GameSystemController._instance;
    }
    public static get instance(): GameSystemController{
        return GameSystemController.getInstance();
    }
    //---------------end------------------

    private signInRewardData: any;
    private loginRewardData: any;
    private win: any;

    /**
     * 初始化数据
     * @param data
     */
    public init(data: any): void{
        this.signInRewardData = data['userMonthLogin'];
        this.loginRewardData = data['userWeekLogin'];
    }

    /**
     * 签到奖励
     * @returns {any}
     */

    public getSignInReward(): any{
        return this.signInRewardData;
    }

    /**
     * 登录奖励
     * @returns {any}
     */
    public getLoginReward(): any{
        return this.loginRewardData;
    }

    public openLoginRewardPanel(): void{
        if(GuideManager.getInstance().isInGuide()){
            return;
        }
        if(this.loginRewardData['status'] !== 0){
            this.openSignRewardPanel();
            return;
        }
        UIMgr.instance.show( PanelName.LOGIN_REWARD_PANEL, { direction: Direction.CENTER, touchLayer: false } );

    }

    public openSignRewardPanel(): void{
        if(GuideManager.getInstance().isInGuide()){
            return;
        }
        if(this.signInRewardData['status'] !== 0){
            NoticeController.instance.init();
            return;
        }
        UIMgr.instance.show( PanelName.SIGNIN_REWARD_PANEL, { direction: Direction.CENTER, touchLayer: false } );
    }

    public setWin(panelName: number): void{
        this.win = UIMgr.instance.getPanel( panelName );
    }

    private isBlashStroge(item: string, param?: any): boolean{

        return DepotController.instance.isBlast(item['itemId'], item['itemNum'], param);

    }


    //------sends---

    public sendLoginReward(): void{

        if(this.loginRewardData['status'] !== 0){
            return;
        }

        var sdata:Object = {
            "act":"Activity.weekLoginReward",
            "dt":{"day": this.loginRewardData['day']}
        };
        SocketManager.instance.send(JSON.stringify(sdata));
    }

    public sendSignInReward(): void{

        if(this.signInRewardData['status'] !== 0){
            return;
        }

        var sdata:Object = {
            "act":"Activity.monthLoginReward",
            "dt":{"day": this.signInRewardData['day']}
        };
        SocketManager.instance.send(JSON.stringify(sdata));
    }

    //------update---

    public updateLoginReward(data: any): void{
        //更新本地状态
        this.loginRewardData['status'] = 1;
        if(this.win){
            this.win.onUpdate(data, this.loginRewardData);
        }
    }

    public updateSignReward(data: any): void{
        //更新本地状态
        this.signInRewardData['status'] = 1;
        if(this.win){
            this.win.onUpdate(data, this.signInRewardData);
        }
    }

}