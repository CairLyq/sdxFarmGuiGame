/**
 * Created by rodey on 15/1/4.
 */

module game{

    export class UserUpgradePanelV2 extends egret.gui.SkinnableComponent implements IPanel{

        public growAsset: egret.gui.UIAsset;
        public levelAsset: egret.gui.Group;
        public levelLabel: egret.gui.Label;
        private _level: number;
        public gainGroup: egret.gui.Group;
        public newGroup: egret.gui.Group;
        public gainBG: egret.gui.UIAsset;
        public newsBG: egret.gui.UIAsset;
        public AffirmButton: egret.gui.Button;

        public newScroller: egret.gui.Scroller;
        public gainScroller: egret.gui.Scroller;
        public contentGroup: egret.gui.Group;
        public praticleSystem: particle.GravityParticleSystem;

        private gainStim: any;
        private itemStim: any;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Main.UserUpgradePanelV2Skin;

        }

        public get level(): number{
            return this._level;
        }
        public set level(value: number){
            if(this._level == value || !value) return;
            this._level = value;

            if(this.gainGroup){
                //升级获得
                this.getUpgradeGain(value);
            }
            if(this.newGroup){
                //升级新增
                this.getUpgradeNews(value);
            }
            if(this.levelLabel){
                this.levelLabel.text = 'Level ' + value;
            }

            this.createParticle();
        }

        public partAdded(partName: string, instance: any): void{
            super.partAdded(partName, instance);
            if(instance == this.levelLabel)
            {
                this.levelLabel.text = 'Level ' + this._level;
            }
            else if(instance == this.AffirmButton)
            {
                this.AffirmButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
            }
        }

        private closePanel(evt: egret.TouchEvent): void{
            var self = this;
            var target: egret.gui.Button = evt.currentTarget || evt.target;
            TweenIt.tweenBigThenNormal(target, function(){
                GameEvent.watcher.dispatchEventWith(GameEvent.USER_UPGRADE, true);
            });
        }

        private getUpgradeGain(level?: number): void{

            var self = this;
            var level: number = level || this._level;
            var datas: any[] = [];
            var levelModel: UserLevelModel = UserLevelModel.getModelByLevel(level);

            //获取 升级获得的金币或钻石
            var gold: number = levelModel['gold'];
            var diamond: number = levelModel['diamond'];
            if(gold > 0){
                var goldItem: any = {
                    imgId: 'ZJMER-jinbi',
                    itemNum: '+' + String(gold),
                    itemRes: true,
                    itemName: 'gold'
                };
                datas.push(goldItem);
            }
            if(diamond > 0){
                var diamondItem: any = {
                    imgId: 'ZJMER-zuanshi',
                    itemNum: '+' + String(diamond),
                    itemRes: true,
                    itemName: 'diamond'
                };
                datas.push(diamondItem);
            }

            //获取 升级获得的物品
            if('' !== levelModel['items']){

                var items: any[] = levelModel['items'].split(/\s*;\s*/gi);
                items.pop();
                if(items && items.length){
                    var i: number = 0,
                        len: number = items.length;
                    for( ; i < len; ++i){
                        var sis: any[] = items[i].split(/\s*\*\s*/gi);
                        //console.log(sis);
                        if(sis && sis.length){
                            var itemId: number = parseInt(sis[0], 10);
                            var itemNum: number = parseInt(sis[1], 10);
                            var item: any = GameUtils.copyData(DepotModel.getGoodsById(itemId));

                            item['itemNew'] = false;
                            if(item['unlockLv'] == UserController.instance.level){
                                item['itemNew'] = true;
                            }
                            item['itemNum'] = '+' + itemNum;
                            item['itemRes'] = false;
                            datas.push(item);

                            //更新本地物品数据
                            DepotController.instance.updateLocalItemNum(itemId, itemNum);
                        }
                    }
                }
            }

            if(datas && datas.length > 0){
                if(this.gainBG){
                    this.gainBG.visible = true;
                }

                self.createGainItem(datas);

            }else{
                if(this.gainBG){
                    this.gainBG.visible = false;
                }
            }

        }

        private createGainItem(data: Array<DepotModel>): void{
            var self = this;

            this.gainGroup.removeAllElements();
            var i: number = 0,
                len: number = data.length;

            for( ; i < len; ++i){

                var item: game.UserUpgradeGainItem = new game.UserUpgradeGainItem();
                item.data = data[i];

                data[i].name && ( item.label = '(' + data[i].name + ') ' + data[i].desc );
                item.alpha = 0;
                item.touchChildren = false;
                item.touchEnabled = false;
                this.gainGroup.addElement(item);
                egret.Tween.get(item).wait(200).to({ alpha: 1 }, 300);
                if('' !== item.label || item.label){
                    item.touchChildren = true;
                    item.touchEnabled = true;
                    item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapItem, this);
                }
                //添加资源动画
                if(data[i]['itemRes']){
                    var point: egret.Point = item.localToGlobal(item.parent.width * .5, item.parent.height * .5);
                    var resChange: ResChange;
                    var itemNum: number = Number(data[i]['itemNum']);
                    if(data[i]['itemName'] === 'gold'){
                        resChange = new ResChange(itemNum, 0, 0, point);
                    } else if(data[i]['itemName'] === 'diamond'){
                        resChange = new ResChange(0, itemNum, 0, point);
                    }
                    GameEvent.watcher.dispatchEventWith(GameEvent.RES_CHANGE, true, resChange);
                }

            }

            this.gainScroller.viewport = this.gainGroup;

            if(len > 3){
                console.log('自动滑动', this.gainGroup.measuredWidth);
                this.gainStim = window.setTimeout(()=>{
                    window.clearTimeout(this.gainStim);
                    this.gainScroller.throwHorizontally((len - 3) * 100 + 20, 3000);
                    //delete this.gainStim;
                }, 1200);
            }

        }

        //获取 最新的物品或建筑
        private getUpgradeNews(level?: number): void{

            var self = this;
            var level: number = level || this._level;
            var datas: any[] = [];
            var levelModel = UserLevelModel.getModelByLevel(level);

            if(levelModel.newBuildingIds.length > 0){
                var i: number = 0,
                    len: number = levelModel.newBuildingIds.length;
                for( ; i < len; ++i){
                    var buildingId: number = levelModel.newBuildingIds[i];
                    var buildingItem: any;
                    if(BuildingID.ANIMAL_IDS.indexOf(buildingId) !== -1){
                        buildingItem = AnimalModel.getModelByAnimalId(buildingId);
                    }else{
                        buildingItem = BuildingModel.getModelById(buildingId);
                        if( (buildingItem.type === 8) && !Global.SYS_BUILDING_SWITCH ){
                            continue;
                        }
                    }
                    datas.push(buildingItem);

                }

                self.createNewItems(datas);

            }else{
                if(this.newsBG){
                    this.newsBG.visible = false;
                }
            }

        }

        private createNewItems(data: any[]): void{
            var self = this;
            this.newGroup.removeAllElements();
            var i: number = 0,
                len: number = data.length;
            for( ; i < len; ++i){
                var item: egret.gui.Button = new egret.gui.Button();
                item.skinName = skins.uicompenet.Main.UseruUpgradeNewItemSkin;

                item.icon = data[i]['imgId'];
                item.label = data[i]['name'];
                item.alpha = 0;
                item.scaleX = item.scaleY = .8;
                this.newGroup.addElement(item);
                egret.Tween.get(item).wait(200).to({ alpha: 1 }, 300);
                item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapItem, this);
            }

            this.newScroller.viewport = this.newGroup;

            //自动滑动显示更多
            if(len > 3){
                console.log('自动滑动', this.newGroup.measuredWidth);
                this.itemStim = window.setTimeout(()=>{
                    window.clearTimeout(this.itemStim);
                    this.newScroller.throwHorizontally((len - 3) * 140, 3000);
                    //delete this.itemStim;
                }, 1200);
            }


            //将新解锁的建筑标识存在本地，Iden=== 累加
            var pdata: any[] = [];
            var newItems: any[] = UserLevelModel.getItemNews();
            if(newItems && newItems.length && newItems.length > 0){
                pdata = this.filterItems(data);
                pdata = GameUtils.getListForArrayKey( pdata, 'imgId' );
                pdata = GameUtils.uniqueArray(newItems.concat( pdata || []));
            }else{
                pdata = this.filterItems(data);
                pdata = GameUtils.getListForArrayKey( pdata, 'imgId' );
            }

            egret.localStorage.setItem(Global.NEW_ITEMS, JSON.stringify(pdata));

            GameEvent.watcher.dispatchEventWith(GameEvent.UPGRADE_NEW_ITEMS, true, pdata);

        }

        //商店标识 过滤掉 系统建筑
        private filterItems(data: any[]): Array<BuildingModel>{

            var i: number = 0,
                len: number = data.length,
                rs: any[] = [];

            for( ; i < len; ++i ){
                if(data[i].type && (data[i].type === 1 || data[i].type === 8)){
                    continue
                }
                rs.push(data[i]);
            }

            return rs;

        }

        private tapItem(evt: egret.TouchEvent): void{

            var target: egret.gui.Button = evt.currentTarget || evt.target;
            TipText.instace.play(target.label);

        }

        private createParticle():void
        {
            if( !this.praticleSystem )
            {
                this.praticleSystem = new particle.GravityParticleSystem(RES.getRes(GroupName.STAR_YELLOW_KEYS[ 0 ] ), RES.getRes(GroupName.STAR_YELLOW_KEYS[ 1 ]));
                this.praticleSystem.visible = false;

            }
            Lyrs.LYRS_UI_2.addChild( this.praticleSystem );
            this.praticleSystem.visible = true;
            this.praticleSystem.start(3000);
        }

        public onShow(...args: any[]): void{
            if(args[0]){
                this.level = args[0];
            }
        }
        public onClose(...args: any[]): void{
            this.gainGroup.removeAllElements();
            this.newGroup.removeAllElements();
            this.gainScroller.throwHorizontally(0, 1);
            this.newScroller.throwHorizontally(0, 1);

            this.gainStim && window.clearTimeout(this.gainStim);
            this.itemStim && window.clearTimeout(this.itemStim);

        }
        public onUpdate(...args: any[]): void{}
    }


}
