/**
 * Created by rodey on 15/3/3.
 */


class RestoreBuildTimeBarContainer extends egret.DisplayObjectContainer{

    private bg: egret.Sprite;
    public timeBar: RestoreBuildTimeBar;
    public building: BuildingIso;
    public isOpen: boolean = false;

    constructor(){
        super();

        this.createBG();
    }

    public createBG(): void{
        this.bg = new egret.Sprite();
        var g:egret.Graphics = this.bg.graphics;
        g.clear();
        g.beginFill(0x000000, 0);
        g.drawRect(0, 0, Lyrs.SW, Lyrs.SH);
        g.endFill();
        this.bg.width = Lyrs.SW;
        this.bg.height = Lyrs.SH;
        this.bg.touchEnabled = true;

        this.timeBar = new RestoreBuildTimeBar();

        this.addChild(this.bg);
        this.addChild(this.timeBar);

        this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);

        //维修加速
        GameEvent.watcher.addEventListener(GameEvent.RESTORE_BUILD_SPEED, this.speedRestoreBuild, this);

    }

    public speedRestoreBuild(evt: egret.Event): void{
        console.log(evt.data)
        console.log(evt.data.building.model.name)

        this.building = evt.data.building;

        this.sendSpeedUp();

    }

    //加速建造
    public sendSpeedUp(userBuildingId?: number): void{
        if(!this.building || !this.building.data || !this.building.data.userBuildingId) return;
        var sdata: any = {
            "act": "Building.speedUp",
            "dt": {
                "userBuildingId": userBuildingId || this.building.data.userBuildingId,
                "userProductId": 0,
                "moduleType": SpeedupType.SPEEDUP_RESTORE
            }
        };
        SocketManager.instance.send(JSON.stringify(sdata));
    }

    //加速完成
    public speedComplateBuild(data: any): void{
        //this.onClose(null);
        //this.building.restoreLogic.stopCnt();
        this.building.restoreLogic.stopRestoreBuild(this.building, data);
        console.log('当前加速的对象：', this.building.model.buildingId, this.building.model.name)

    }

    public onClose(evt?: egret.TouchEvent): void{
        this.dispose();
    }

    public setTimeBarPos(x, y): void{
        this.timeBar.x = x;
        this.timeBar.y = y;
    }

    public setData(data: any): void{
        if(data && data['data']){
            this.timeBar.data = data;
        }
        if(data && data['building']){
            this.building = data['building'];
        }
        if(data && data['time']){
            this.timeBar.time = data['time'];
        }
    }

    public updateTimeBar(time?: number): void{
        this.timeBar.time = time || this.building.restoreLogic.cnt || 0;
    }

    public setTimeBarName(name: string): void{
        this.timeBar.name = name;
    }

    public onShow( ...args: any[] ): void{

        //this.dispose();
        this.isOpen = true;

        if(args[0]){
            this.setData(args[0]);
        }

        if(args[1] && args[1] instanceof egret.Point){
            this.setTimeBarPos(args[1].x, args[1].y);
        }

        if(Lyrs.LYRS_UI.getChildIndex(this) === -1){
            Lyrs.LYRS_UI.addChild(this);
        }

    }

    private dispose(): void{
        this.isOpen = false;
        if(this.parent && this.parent.getChildIndex(this) !== -1){

            this.parent.removeChild(this);
        }
    }

    //----instanec
    private static _instance: RestoreBuildTimeBarContainer;
    public static getInstance(): RestoreBuildTimeBarContainer{
        if(!RestoreBuildTimeBarContainer._instance){
            RestoreBuildTimeBarContainer._instance = new RestoreBuildTimeBarContainer();
        }
        return RestoreBuildTimeBarContainer._instance;
    }
    public static get instance(): RestoreBuildTimeBarContainer{
        return RestoreBuildTimeBarContainer.getInstance();
    }

}
