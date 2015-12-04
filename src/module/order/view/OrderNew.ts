/**
 * Created by Gordon on 14/12/19.
 *
 * 定单面板
 */
module game{

    export class OrderNew extends egret.gui.SkinnableComponent implements IGTimer
    {
        private userCarOrder:model.UserCarOrder;

        private orderId:number;

        private waitTime:egret.gui.Label;

        public refreshBtn:egret.gui.Group;

        constructor()
        {
            super();
            this.skinName = skins.uicompenet.Order.OrderNewSkin;
        }
        public onShow( ...args: any[] ):void
        {
            this.orderId = args[ 0 ];
            this.refreshBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onRefresh, this );

            this.userCarOrder = model.UserCarOrder.getOrderById( this.orderId );
            this.second();
            GTimer.getInstance().register( this );
        }
        public onClose( ...args: any[] ):void
        {
            GTimer.getInstance().unRegister( this );
        }
        public onUpdate( ...args: any[] ):void
        {

        }

        private onRefresh( e:egret.TouchEvent ):void
        {
            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_OK);

            if( UserController.instance.isDiamondEnough( 10 ) )
            {
                OrderController.instance.refreshCarOrder( this.orderId );
                this.userCarOrder.refreshEndDate = null;
                model.UserCarOrder.refreshCarOrder( this.userCarOrder );
            }
        }
        public second():void
        {
            var interval:number = this.userCarOrder.refreshEndDate / 1000 - GTimer.getInstance().serverTime;
            if( interval <= 0 )
            {
                this.userCarOrder.refreshEndDate = null;
                model.UserCarOrder.refreshCarOrder( this.userCarOrder );
            }
            var date:Date = new Date( interval * 1000 );
            this.waitTime.text = date.getMinutes() + '分' + date.getSeconds() + '秒';
        }
        public childrenCreated():void
        {

        }
        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void
        {
            super.partAdded(partName, instance);
        }
    }
}
