/**
 * Created by rodey on 15/4/21.
 */

module game{

    export class LoginRewardPanel extends egret.gui.SkinnableComponent implements IPanel{

        public scrollerDisplay: egret.gui.Scroller;
        public dataGroup: egret.gui.Group;
        public arrowLeft: egret.gui.UIAsset;
        public arrowRight: egret.gui.UIAsset;
        public closeBtn: egret.gui.UIAsset;

        constructor(){
            super();
            this.skinName = skins.uicompenet.System.LoginRewardPanelSkin;
        }

        public onShow( ...args: any[] ): void{

            if(this.dataGroup){
                this.createItems();
            }

            GameSystemController.instance.setWin( PanelName.LOGIN_REWARD_PANEL );

        }

        public onUpdate( ...args: any[] ): void{

            var data: any = args[0], self = this;
            var loginRewardData: any = args[1];

            var nums: number = this.dataGroup.numElements;
            var i: number = 0;
            for( ; i < nums; ++i ){
                if(i == Number(loginRewardData.day) - 1 && this.dataGroup.getElementAt(i)){
                    var itemRender: game.LoginRewardItemRender = <game.LoginRewardItemRender>this.dataGroup.getElementAt(i);
                    itemRender.acceptBtn.visible = false;
                    itemRender.lockAsset.visible = true;
                    itemRender.lockAsset.alpha = 0;
                    itemRender.lockIconAsset.visible = true;
                    itemRender.lockIconAsset.alpha = 0;
                    egret.Tween.get(itemRender.acceptBtn).to({ alpha: 0 }, 200).call(()=>{
                        egret.Tween.removeTweens(itemRender.acceptBtn);
                        itemRender.acceptBtn.visible = false;
                    });
                    egret.Tween.get(itemRender.lockAsset).to({ alpha: 1 }, 200).call(()=>{
                        egret.Tween.removeTweens(itemRender.lockAsset);
                    });
                    egret.Tween.get(itemRender.lockIconAsset).to({ alpha: 1 }, 200).call(()=>{
                        egret.Tween.removeTweens(itemRender.lockIconAsset);
                    });

                    //播放获取动画
                    var point: egret.Point = itemRender.localToGlobal();
                    GameEvent.watcher.dispatchEventWith(GameEvent.RES_CHANGE, true, new ResChange(data['gold'], data['diamond'], null, point));
                    GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_CHANGE, true, new ItemChange(data['items'][0]['itemId'], data['items'][0]['itemNum'], point, { isBlash: false }));

                    //文本提示
                    TipText.instace.play( Language.getString( 3, 44) );

                }
            }

            var stim: any = window.setTimeout( ()=>{
                window.clearTimeout(stim);

                //自动切换到 签到页面
                UIMgr.instance.closeCurrentPanel( ()=>{
                    //签到奖励
                    GameSystemController.instance.openSignRewardPanel();
                }, 2, {touchLayer: false} );

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

                //关闭后自动领取
                GameSystemController.instance.sendLoginReward();

            }, this);

        }

        private createItems(): void{

            this.dataGroup.removeAllElements();

            var data: Array<WeekBonusModel> = WeekBonusModel.itemList;
            var i: number = 0,
                len: number = data.length,
                itemRender: game.LoginRewardItemRender;
            var loginReward: any = GameSystemController.instance.getLoginReward();

            for(; i < len; ++i){
                itemRender = new game.LoginRewardItemRender(i + 1, loginReward);
                itemRender.data = data[i];
                this.dataGroup.addElement(itemRender);
            }

            this.scrollerDisplay.viewport = this.dataGroup;

        }


    }

}
