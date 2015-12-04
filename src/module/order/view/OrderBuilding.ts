/**
 * Created by Gordon on 08/01/15.
 * 订单面板
 */
class OrderBuilding extends BuildingIso
{
    public static OrderCarBuildingID:number;
    public static DeliveringOrder:boolean = false;

    private bird_fly_in:egret.MovieClip;
    private bird_fly_out:egret.MovieClip;
    private bird_stand:egret.MovieClip;

    /**
     * 金币背影发光
     */
    private shineIcon:BitmapEx;
    /**
     * 金币图片
     */
    private goldCoin:BitmapEx;
    /**
     * 满足完成状态图片
     */
    private readyIcon:BitmapEx;
    private birdY:number = -90;
    private flyToY:number = -1600;


    public constructor( pos:Point3D, paramModel:BuildingModel )
    {
        super(pos, paramModel);
        var data = RES.getRes("bird_json");
        var txtr = RES.getRes("bird_png");
        var mcFactory = new egret.MovieClipDataFactory( data, txtr );

        this.bird_fly_in = new egret.MovieClip( mcFactory.generateMovieClipData( "bird_fly_in" ) );
        this.bird_fly_out = new egret.MovieClip( mcFactory.generateMovieClipData( "bird_fly_out" ) );
        this.bird_stand = new egret.MovieClip( mcFactory.generateMovieClipData( "bird_stand" ) );

        this.addChild( this.bird_fly_in );
        this.addChild( this.bird_fly_out );
        this.addChild( this.bird_stand );
        this.bird_fly_in.visible = false;
        this.bird_fly_out.visible = false;
        this.bird_stand.play( -1 );
        this.bird_stand.y = this.birdY;
        this.bird_fly_in.x = this.bird_fly_out.x = this.bird_stand.x = 24;

        this.shineIcon = new BitmapEx( 'SCJZ_shanliang' );
        this.addChild( this.shineIcon );
        this.shineIcon.visible = false;

        this.goldCoin = new BitmapEx( 'ZJMER-jinbi' );
        this.addChild( this.goldCoin );
        this.goldCoin.visible = false;

        this.readyIcon = new BitmapEx( 'DD_22' );
        this.addChild( this.readyIcon );
        this.readyIcon.visible = false;

        this.goldCoin.y = -60;
        this.goldCoin.x = -10;
        this.shineIcon.anchorX = this.shineIcon.anchorY = 0.5;
        this.readyIcon.anchorX = this.readyIcon.anchorY = 0.5;
        this.shineIcon.y = this.goldCoin.y + this.goldCoin.height / 2;
        this.shineIcon.x = this.goldCoin.x + this.goldCoin.width / 2;

        this.readyIcon.x = this.shineIcon.x;
        this.readyIcon.y = this.shineIcon.y;

        if( UserController.instance.level < 4 )
        {
            return;
        }
        OrderController.instance.getCarOrder();
    }
    public show( posX:number = 0, posY:number = 0 ):void
    {
        super.show( posX, posY );

        GuideManager.getInstance().addForbiden();

        if( UserController.instance.level < 4 )
        {
           return;
        }

        //1、是否在送货状态
        if( OrderBuilding.DeliveringOrder )
        {
            TipText.instace.play( Language.getString( 1, 0 ) );
            return;
        }

        //2、是否已有完成订单收获，有则收取已完成订单收获
        var itemList:Array<model.UserCarOrder> = model.UserCarOrder.userCarOrders;
        for( var idx:number = 0, length = itemList.length; idx < length; idx++ )
        {
            if( 1 == itemList[ idx ].status )
            {
                itemList[ idx ].status = 0;
                OrderController.instance.recieveCarOrderReward( itemList[ idx ].orderId );
                OrderGuideController.getInstance().nextStep();
                return;
            }
        }

        //3、显示定单面板
        if( model.UserCarOrder.userCarOrders.length > 0 )
        {
            //
            Loader.instance.load( GroupName.NPC_GROUP, null, ()=>{
                UIMgr.instance.show(PanelName.ORDER_PANEL, { 'direction': Direction.CENTER } );
            }, this);
        }
        else
        {
            model.UserCarOrder.SHOW_PANEL = true;
            OrderController.instance.getCarOrder();
        }
    }
    public updateData( data:any ):void
    {
        super.updateData( data );
        OrderBuilding.OrderCarBuildingID = this.data.userBuildingId;
    }
    /**
     * 是否可以领取定单奖励
     */
    private rewardOrderId():number
    {
        var itemList:Array<model.UserCarOrder> = model.UserCarOrder.userCarOrders;
        for( var idx:number = 0, length = itemList.length; idx < length; idx++ )
        {
            if( 1 == itemList[ idx ].status )
            {
                return itemList[ idx ].orderId;
            }
        }
        return -1;
    }
    private readyState():void
    {
        var orders:Array<model.UserCarOrder> = model.UserCarOrder.userCarOrders;
        var ordersLength = orders.length;
        for( var i:number = 0; i < ordersLength; i++ )
        {
            var userCarOrder = orders[ i ];
            var achieve:boolean = false;
            var items:string[] = userCarOrder.items.split( ';' );
            var length:number = items.length;
            for( var idx:number = 0; idx < length; idx++ )
            {
                var itemStr:string[] = items[ idx ].split( "*" );
                achieve = DepotController.instance.isEnoughItem( Number( itemStr[ 0 ] ), Number( itemStr[ 1 ] ) );
                if( !achieve )
                {
                    break;
                }
            }

            if( achieve )
            {
                this.shineIcon.visible = true;
                this.goldCoin.visible = false;
                this.readyIcon.visible = true;
                TweenIt.loopTween( this.shineIcon, { scaleX:2, scaleY:2 }, { scaleX:0, scaleY:0 } );
                return;
            }
        }
        this.shineIcon.visible = false;
        this.goldCoin.visible = false;
        this.readyIcon.visible = false;
    }

    /**
     * 更新定单车领取状态
     */
    update():void
    {
        egret.Tween.removeTweens( this.shineIcon );
        var rewardOrderId:number = this.rewardOrderId();
        if( -1 != rewardOrderId )
        {
            this.shineIcon.visible = true;
            this.goldCoin.visible = true;
            this.readyIcon.visible = false;
            TweenIt.loopTween( this.shineIcon, { scaleX:2, scaleY:2 }, { scaleX:0, scaleY:0 } );
            return;
        }
        this.readyState();
    }
    /**
     * 发送定单货物
     */
    flyOut():void
    {
        this.bird_stand.visible = false;
        this.bird_stand.stop();

        this.bird_fly_out.y = this.birdY;
        this.bird_fly_out.visible = true;
        this.bird_fly_out.play( -1 );
        var state1:Object = { "y":this.flyToY };
        OrderBuilding.DeliveringOrder = true;
        egret.Tween.get( this.bird_fly_out ).to( state1, 4000 ).call( this.complete, this ).call( this.flyBack, this );
    }
    private complete():void
    {
        var rewardOrderId:number = this.rewardOrderId();
        if( -1 != rewardOrderId )
        {
            OrderController.instance.completeCarOrder( rewardOrderId );

            //前端 自动 扣除消耗道具数量
            var items:string[] = String( model.UserCarOrder.getOrderById( rewardOrderId ).items ).split( ';' );
            for( var idx:number = 0; idx < items.length; idx++ )
            {
                var itemStr:any[] = items[ idx ].split( "*" );
                var item = DepotController.instance.searchLocalDataAsItemId( Number( itemStr[ 0 ] ) );
                item.itemNum -= Number( itemStr[ 1 ] );
            }
        }
        this.bird_fly_out.stop();
        this.bird_fly_out.visible = false;
    }
    private flyBack():void
    {
        this.bird_fly_out.visible = false;
        this.bird_fly_in.y = this.flyToY;
        this.bird_fly_in.visible = true;
        this.bird_fly_in.play( -1 );
        var state2:Object = { "y":this.birdY };
        egret.Tween.get( this.bird_fly_in ).to( state2, 4000 ).call( this.stop, this );
    }
    private stop():void
    {
        OrderBuilding.DeliveringOrder = false;
        this.bird_fly_in.stop();
        this.bird_fly_in.visible = false;

        this.bird_stand.visible = true;
        this.bird_stand.play( -1 );
        this.update();

        OrderGuideController.getInstance().nextStep();
    }
    /**
     * 发送定单货物
     */
    recieveReward( exp:number, gold:number ):void
    {
        var point:egret.Point = this.localToGlobal( 0, 0 );
        GameEvent.watcher.dispatchEventWith(GameEvent.RES_CHANGE, true, new ResChange( gold, 0, exp, point ));
        this.update();
    }
    public playOrStopAnimation( isPlayAnimation:boolean ):void
    {
        super.playOrStopAnimation( isPlayAnimation );

        if( isPlayAnimation )
        {

        }
        else
        {

        }
    }
}