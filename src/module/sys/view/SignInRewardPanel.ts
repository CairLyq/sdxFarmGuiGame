/**
 * Created by rodey on 15/4/21.
 */

module game{

    export class SignInRewardPanel extends egret.gui.SkinnableComponent implements IPanel{

        public scrollerDisplay: egret.gui.Scroller;
        public dataGroup: egret.gui.Group;
        public dataLayout: egret.gui.TileLayout;
        public arrowLeft: egret.gui.UIAsset;
        public arrowRight: egret.gui.UIAsset;
        public closeBtn: egret.gui.UIAsset;
        public totalDayLabel: egret.gui.Label;

        private _data: any[] = [];

        constructor(){
            super();
            this.skinName = skins.uicompenet.System.SignInRewardPanelSkin;

            this._data = MonthBonusModel.itemList;

        }

        public init(): void{
            var signInReward: any = GameSystemController.instance.getSignInReward();
            var total: number = 0;

            if(this.totalDayLabel){
                if(signInReward['status'] !== 0){
                    total = signInReward['day'];
                }else{
                    total = signInReward['day'] - 1;
                }
                this.totalDayLabel.text = String(total) + '天';
            }

            if(this.dataGroup){
                this.createItems();
            }

        }

        public onShow( ...args: any[] ): void{

            this.init();

            GameSystemController.instance.setWin( PanelName.SIGNIN_REWARD_PANEL );

        }

        public onUpdate( ...args: any[] ): void{
            var data: any = args[0], self = this;
            var signRewardData: any = args[1];

            if(!this.dataGroup){
                return;
            }

            if(this.totalDayLabel){
                this.totalDayLabel.text = signRewardData['day'] + '天';
            }

            var nums: number = this.dataGroup.numElements;
            var i: number = 0;
            for( ; i < nums; ++i ){
                if(i == Number(signRewardData.day) - 1 && this.dataGroup.getElementAt(i)){
                    var itemRender: game.SignInRewardItemRender = <game.SignInRewardItemRender>this.dataGroup.getElementAt(i);
                    itemRender.lockBgAsset.visible = true;
                    itemRender.lockIconAsset.alpha = 0;
                    itemRender.lockIconAsset.visible = true;
                    itemRender.lockIconAsset.alpha = 0;
                    itemRender.bgAsset.visible = true;
                    itemRender.bgAsset.alpha = 0;

                    egret.Tween.get(itemRender.currentAsset).to({ alpha: 0 }, 200).call(()=>{
                        egret.Tween.removeTweens(itemRender.currentAsset);
                        itemRender.currentAsset.visible = false;
                    });
                    egret.Tween.get(itemRender.lockBgAsset).to({ alpha: 1 }, 200).call(()=>{
                        egret.Tween.removeTweens(itemRender.lockBgAsset);
                    });
                    egret.Tween.get(itemRender.lockIconAsset).to({ alpha: 1 }, 200).call(()=>{
                        egret.Tween.removeTweens(itemRender.lockIconAsset);
                    });

                    //播放获取动画
                    var point: egret.Point = itemRender.localToGlobal();
                    //如果奖励的是金币或者钻石
                    if(data['gold'] !== 0 || data['diamond'] !== 0){
                        GameEvent.watcher.dispatchEventWith(GameEvent.RES_CHANGE, true, new ResChange(data['gold'], data['diamond'], null, point));
                    }

                    //如果奖励的是物品, 奖励不提示爆仓
                    if(data['items']){
                        GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_CHANGE, true, new ItemChange(data['items'][0]['itemId'], data['items'][0]['itemNum'], point, { isBlash: false }));
                    }

                    //文本提示
                    TipText.instace.play( Language.getString( 3, 44) );

                }
            }

            var stim: any = window.setTimeout( ()=>{
                window.clearTimeout(stim);

                //自动切换到 公告页面
                UIMgr.instance.closeCurrentPanel( ()=>{
                    //公告
                    NoticeController.instance.init();
                }, 2, { callCloseFunc: false } );

                self.destroy();

                stim = null;
            }, 600);

        }

        public onClose( ...args: any[] ): void{}

        private destroy(): void{

            if(this.dataGroup){
                this.dataGroup.removeAllElements();
                this.dataGroup = null;
                delete this.dataGroup;
            }

            /*try{
                if(this.parent.getChildIndex(this) !== -1){
                    this.parent.removeChild(this);
                }
            }catch (e){}*/

            delete GameSystemController.instance;

        }

        public childrenCreated(): void{
            super.childrenCreated();

            if(this.scrollerDisplay){

            }

            if(this.dataGroup){
                this.scrollerDisplay.viewport = this.dataGroup;
            }

            if(this.closeBtn){
                this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
            }

        }

        private closeHandler(evt: egret.TouchEvent): void{

            var target: any = evt.currentTarget || evt.target;
            TweenIt.tweenBigThenNormal(target, ()=> {
                //关闭自动领取
                GameSystemController.instance.sendSignInReward();
            }, this);

        }

        private createItems(): void{

            this.dataGroup.removeAllElements();

            var data: any[] = this._data,
                i: number = 0,
                len: number = data.length,
                itemRender: game.SignInRewardItemRender,
                signInReward: any = GameSystemController.instance.getSignInReward();

            for(var i: number = 0, len: number = 30; i < len; ++i){
                itemRender = new game.SignInRewardItemRender( i + 1, signInReward );
                itemRender.data = data[i];
                this.dataGroup.addElement(itemRender);
            }

            this.scrollerDisplay.viewport = this.dataGroup;

        }


    }


}
