/**
 * Created by rodey on 15/3/3.
 */

class RestoreBuildLogic extends egret.EventDispatcher implements IGTimer{

    public cnt: number;
    public totalCnt: number;
    public building: BuildingIso;
    public controller: any;

    constructor(building: BuildingIso){
        super();
        this.building = building;
    }

    public second(): void{
        this.cnt--;

        if(RestoreBuildTimeBarContainer.instance.isOpen){
            RestoreBuildTimeBarContainer.instance.updateTimeBar();
            //console.log(this.building.model.name + " ==================", this.cnt)
        }

        //console.log(this.building.model.name + " ==================", this.cnt)
        if(this.cnt <= 0){

            this.stopCnt();
            this.timeOver();

            return;
        }

    }

    public startCnt(cnt:number, totalCnt?: number):void
    {

        GTimer.getInstance().register(this);
        this.cnt = cnt;
        this.totalCnt = totalCnt;
        this.isRestoring = true;
    }

    public stopCnt():void
    {
        this.isRestoring = false;
        GTimer.getInstance().unRegister(this);
        this.cnt = 0;
    }

    //处理时间完成
    private timeOver(): void{

        //这里处理完成
        this.stopRestoreBuild(this.building);
    }


    public isRestoring: boolean = false; //是否正在修建或者建造
    public restoreBG: egret.Bitmap; //修建动画背景
    public restoreMC: egret.MovieClip;  //修建动画
    public robotWalkBackMC: egret.MovieClip; //修建人物动画（后）
    public robotWalkFixMC: egret.MovieClip; //修建人物动画（敲打）
    public robotWalkFrontMC: egret.MovieClip; //修建人物动画（前）

    public sendRestorBuild(userBuildingId?: number): void{
        if(!userBuildingId) return;
        var sdata: any = {
            "act": "Building.repair",
            "dt": {
                "userBuildingId": userBuildingId || this.building.data.userBuildingId,
                "moduleType": this.building
            }
        };
        SocketManager.instance.send(JSON.stringify(sdata));
    }

    public restoreBuild(building?: BuildingIso): void{

        var self = this;

        if(this.building.model.needTime <= 0){
            return;
        }

        this.building.setImageVisible(false);
        if(this.building.imgMC){
            this.building.delImgMC_BG();
            this.building.delImgMC();
        }

        this.isRestoring = true;
        // 动画 bg
        this.restoreBG = new egret.Bitmap( RES.getRes(Global.RESTORE_BUILD_MC_BG) );
        this.restoreBG.anchorX = this.restoreBG.anchorY = .5;
        // 动画 mc
        this.restoreMC = MovieClipMgr.createRestoreBuildMC( Global.RESTORE_BUILD_MC_NAME );
        // 人物动画 敲打
        this.robotWalkFixMC = MovieClipMgr.createRestoreBuildMC( Global.RESTORE_BUILD_MC_FIX );
        this.robotWalkFixMC.visible = true;
        // 人物动画 前
        this.robotWalkFrontMC = MovieClipMgr.createRestoreBuildMC( Global.RESTORE_BUILD_MC_FRONT );
        this.robotWalkFrontMC.visible = false;
        // 人物动画 后
        this.robotWalkBackMC = MovieClipMgr.createRestoreBuildMC( Global.RESTORE_BUILD_MC_BACK );
        this.robotWalkBackMC.visible = false;

        this.building.addChild(this.restoreBG);
        this.building.addChild(this.restoreMC);
        this.building.addChild(this.robotWalkFixMC);
        this.building.addChild(this.robotWalkBackMC);
        this.building.addChild(this.robotWalkFrontMC);

        var stim: any = window.setTimeout( function(){

            window.clearTimeout(stim);
            if(!self.restoreMC) return;

            //MovieClipMgr.stopMC( self.restoreBGMC );
            MovieClipMgr.playMC( self.restoreMC );
            MovieClipMgr.playMC( self.robotWalkFixMC );

            self.robotWalk();

        }, Math.random() * 1000 + 500);


    }

    //人物修建动画
    public robotWalk(): void{

        var self = this;
        if(!this.restoreMC) return;

        self.robotWalkFixMC.scaleX = 1;
        self.robotWalkFrontMC.scaleX = 1;
        self.robotWalkBackMC.scaleX = 1;

        var stim: any = window.setTimeout( function(){

            window.clearTimeout(stim);
            if(!self.restoreMC) return;

            MovieClipMgr.hideMC(self.robotWalkFixMC);
            MovieClipMgr.showMC(self.robotWalkFrontMC);
            self.robotWalkFrontMC.x = self.robotWalkFixMC.x;
            self.robotWalkFrontMC.y = self.robotWalkFixMC.y;
            MovieClipMgr.playMC( self.robotWalkFrontMC );

            self.toRobotWalkFront(self.robotWalkFrontMC, { x: 62, y: 40 });

        }, 2100);

    }

    public toRobotWalkFront(target: egret.MovieClip, to: any, time: number = 1000): void{

        var self = this;
        if(!this.restoreMC) return;

        egret.Tween.get(target).wait(500).to(to, time).call( () => {

            if(!self.restoreMC) return;
            MovieClipMgr.hideMC(self.robotWalkFrontMC);
            MovieClipMgr.showMC(self.robotWalkBackMC);
            self.robotWalkBackMC.x = self.robotWalkFrontMC.x;
            self.robotWalkBackMC.y = self.robotWalkFrontMC.y;
            MovieClipMgr.playMC( self.robotWalkBackMC );

            self.toRobotWalkBack(self.robotWalkBackMC, {x: 116, y: 15});

        });

    }

    public toRobotWalkBack(target: egret.MovieClip, to: any, time: number = 1000): void{

        var self = this;
        if(!this.restoreMC) return;

        egret.Tween.get(target).wait(500).to(to, time).call( () => {
            if(!self.restoreMC) return;
            MovieClipMgr.hideMC(target);
            MovieClipMgr.showMC(self.robotWalkFixMC);
            self.robotWalkFixMC.x = 0;
            self.robotWalkFixMC.y = 15;
            self.robotWalkFixMC.scaleX = -1;
            MovieClipMgr.playMC( self.robotWalkFixMC );

            //console.log('toRobotWalkBack -- 终点敲打...', self.robotWalkFixMC.x, self.robotWalkFixMC.y)

            var stim: any = window.setTimeout(function(){

                window.clearTimeout(stim);
                if(!self.restoreMC) return;

                MovieClipMgr.hideMC(self.robotWalkFixMC);
                MovieClipMgr.showMC(self.robotWalkFrontMC);
                self.robotWalkFrontMC.x = 0;
                self.robotWalkFrontMC.y = 15;
                self.robotWalkFrontMC.scaleX = -1;
                MovieClipMgr.playMC( self.robotWalkFrontMC );

                self.toRestRobotWalkBack(self.robotWalkFrontMC, { x: -62, y: 40 });

            }, 2100);

        });

    }

    public toRestRobotWalkBack(target: egret.MovieClip, to: any, time: number = 1000): void{

        var self = this;
        if(!this.restoreMC) return;

        egret.Tween.get(target).wait(500).to(to, time).call( () => {

            if(!self.restoreMC) return;
            MovieClipMgr.hideMC(target);
            MovieClipMgr.showMC(self.robotWalkBackMC);
            self.robotWalkBackMC.x = -62;
            self.robotWalkBackMC.y = 40;
            self.robotWalkBackMC.scaleX = -1;
            MovieClipMgr.playMC( self.robotWalkBackMC );

            self.toRestRobotWalkFront(self.robotWalkBackMC, { x: -116, y: 15 });

        });
    }

    public toRestRobotWalkFront(target: egret.MovieClip, to: any, time: number = 1000): void{

        var self = this;
        if(!this.restoreMC) return;

        egret.Tween.get(target).wait(500).to(to, time).call( () => {

            if(!self.restoreMC) return;
            MovieClipMgr.hideMC(target);
            MovieClipMgr.showMC(self.robotWalkFixMC);
            self.robotWalkFixMC.x = 0;
            self.robotWalkFixMC.y = 0;
            self.robotWalkFixMC.scaleX = 1;
            MovieClipMgr.playMC( self.robotWalkFixMC );

            self.toRestRobotWalkFix(self.robotWalkFixMC, { x: 0, y: 0 });

        });

    }

    public toRestRobotWalkFix(target: egret.MovieClip, to: any, time: number = 1000): void{

        var self = this;
        if(!this.restoreMC) return;

        var stim: any = window.setTimeout(function(){
            window.clearTimeout(stim);
            if(!self.restoreMC) return;

            self.robotWalk();

        }, 500);
    }


    public clearnRestoreBuild(): void{
        try{

            //this.restoreBGMC.stop();
            this.restoreMC.stop();
            this.robotWalkBackMC.stop();
            this.robotWalkFixMC.stop();
            this.robotWalkFrontMC.stop();

            this.building.removeChild(this.restoreBG);
            this.building.removeChild(this.restoreMC);
            this.building.removeChild(this.robotWalkBackMC);
            this.building.removeChild(this.robotWalkFixMC);
            this.building.removeChild(this.robotWalkFrontMC);

            this.restoreBG = null;
            this.restoreMC = null;
            this.robotWalkBackMC = null;
            this.robotWalkFixMC = null;
            this.robotWalkFrontMC = null;

        }catch (e){}
    }


    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    //是否正在建造中...
    /*public restoreBuild(building: BuildingIso): void{

        var time: number = Math.floor(GTimer.getInstance().serverTime - building.data.updateDate * .001);
        var totalTime: number = building.model.needTime;
        //if(totalTime > 0 && Constant.REPAIR_NO == this.data.status && time < 0){
        if(MapConst.REPAIR_NO == building.data.status && totalTime > 0 && time < 0){

            building.restoreLogic.isRestoring = true;
            building.restoreLogic.startCnt(Math.abs(time), totalTime);

            return;
        }else{

            building.restoreLogic.isRestoring = false;
            building.restoreLogic.stopCnt();

            return;
        }
    }*/

    //显示维修或建造
    public showRestoreBuild(building: BuildingIso): void{

        var self = this;

        this.building.setImageVisible(false);

        //新手引导
        GuideManager.getInstance().addForbiden();
        if(GuideManager.getInstance().isInGuide()){
            return;
        }

        //在这里显示加速维修
        RestoreBuildTimeBarContainer.instance.updateTimeBar(this.building.restoreLogic.cnt);
        RestoreBuildTimeBarContainer.instance.setTimeBarName(this.building.model.name);

        //当建筑移动到中心后再弹
        var stim: any = window.setTimeout(function(){
            window.clearTimeout(stim);

            if(!self.building.restoreLogic.restoreBG || !self.building.restoreLogic.restoreBG.parent){
                return;
            }
            var point: egret.Point = self.building.restoreLogic.restoreBG.parent.localToGlobal(self.building.restoreLogic.restoreBG.x, self.building.restoreLogic.restoreBG.y);
            point.x = point.x - self.building.restoreLogic.restoreBG.width * .5;
            point.y = point.y + self.building.restoreLogic.restoreBG.height * .5;

            RestoreBuildTimeBarContainer.instance.onShow({
                    data: self.building.data,
                    building: self.building },
                point);

            stim = null;
            delete stim;

        }, 600);

    }


    //是否正在建造中...
    public startRestoreBuild(building: BuildingIso): boolean{

        //首个养殖场不需要建造
        /*if(Constant.REPAIR_OK == building.data.status || !building.data.updateDate){
         return;
         }*/

        var time: number = Math.floor(GTimer.getInstance().serverTime - this.building.data.updateDate * .001);
        var totalTime: number = this.building.model.needTime;
        //console.log('服务端返回 建筑建造的 剩余时间：', time)
        //console.log('客户端返回 建筑建造的 需要时间：', totalTime)

        if(MapConst.REPAIR_NO == this.building.data.status && totalTime > 0 && time < 0){
            this.isRestoring = true;
            this.startCnt(Math.abs(time), totalTime);
            this.restoreBuild(this.building);
            return true;
        }

        return false;

    }

    //停止建造
    public stopRestoreBuild(building: BuildingIso, data?: any): void{

        //先保存位置
        if(this.restoreBG && this.restoreBG.parent){

            var point: egret.Point = this.restoreBG.parent.localToGlobal(this.restoreBG.x, this.restoreBG.y);

        }

        this.isRestoring = false;
        this.building.data.status = MapConst.REPAIR_OK;
        this.stopCnt();
        this.clearnRestoreBuild();

        //判断建筑类型
        if(BuildingID.PROCESS_FACTORY.indexOf(this.building.model.buildingId) !== -1){
            this.building['setImageMC'] && this.building.setImageMC();
            console.log(this.building.model);
        }
        else if(MapConst.FARM_IDS.indexOf(this.building.model.buildingId) !== -1 && this.building.model.buildingId !== 101){
            this.building['setImageVisible'] && this.building.setImageVisible(true);
        }

        if(data && data.money){
            GameEvent.watcher.dispatchEventWith(GameEvent.RES_CHANGE_REMOVE, true, new ResChange(0, data.money, 0, point));
        }

        RestoreBuildTimeBarContainer.instance.onClose();

    }



}

