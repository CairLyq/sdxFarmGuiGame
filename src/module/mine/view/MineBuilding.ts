/**
 * Created by Gordon on 03/March/15.
 * @class MineBuilding
 * @constructor
 **/
module view
{
    export class MineBuilding extends BuildingIso
    {
        private mc:egret.MovieClip;
        public static instance:MineBuilding;
        /**
         * 金币背影发光
         */
        private shineIcon:BitmapEx;

        public constructor( pos:Point3D, paramModel:BuildingModel )
        {
            super( pos, paramModel );
            this.init();

            MineBuilding.instance = this;
        }

        /**
         * 初始化
         **/
        private init()
        {
            var data = RES.getRes("fixing_mine_json");
            var txtr = RES.getRes("fixing_mine_png");
            var mcFactory = new egret.MovieClipDataFactory( data, txtr );

            this.mc = new egret.MovieClip( mcFactory.generateMovieClipData( "mine" ) );

            this.addChild( this.mc );
            this.mc.stop();

            this.shineIcon = new BitmapEx( 'SCJZ_shanliang' );
            this.addChild( this.shineIcon );
            this.shineIcon.visible = false;
            this.shineIcon.anchorX = this.shineIcon.anchorY = 0.5;
        }
        public updateData(data:any):void
        {
            super.updateData( data );
            this.showItems( this.data.products );
        }

        public show( posX:number = 0, posY:number = 0 ):void
        {
            super.show( posX, posY );
            if( UserController.instance.level < 24 )
            {
                return;
            }
            if( this.product.length > 0 )
            {
                this.onTouch( null );
                return;
            }
            UIMgr.instance.show( PanelName.MINE_TOOL_PANEL, { "direction":Direction.NONE, alpha:0 } );
        }
        public produce( itemId:number ):void
        {
            this.mc.gotoAndPlay( 1, 1 );
            MineController.instance.digMine( this.buildingId, itemId );
        }
        private bitmapList:Array<egret.Bitmap> = [];
        private bitmapCache:Array<egret.Bitmap> = [];
        private getBitmap():egret.Bitmap
        {
            if( 0 == this.bitmapCache.length )
            {
                var bitmap:egret.Bitmap = new egret.Bitmap();
                return bitmap;
            }
            return this.bitmapCache.pop();
        }
        private product:Array<UserProduct> = [];
        public showItems( data:Object[] ):void
        {
            if( null == data )
            {
                return;
            }
            if( 0 == data.length )
            {
                AntiAddictionController.showPanel();
                return;
            }
            var length:number = data.length;
            for( var index:number = 0; index < length; index++ )
            {
                var userProduct:UserProduct = new UserProduct( data[ 0 ] );
                this.product.push( userProduct );
                var model:DepotModel = DepotModel.getModelById( userProduct.itemId );
                var bitmap:egret.Bitmap = this.getBitmap();
                bitmap.texture = RES.getRes( model.imgId );
                this.addChild( bitmap );
                bitmap.x = -90 + Math.random() * 100;
                bitmap.y = Math.random() * 50;
                this.bitmapList.push( bitmap );
            }
            this.shineIcon.visible = true;
            this.setShinePosition();
            TweenIt.loopTween( this.shineIcon, { scaleX:2, scaleY:2 }, { scaleX:0, scaleY:0 } );
        }
        public onHarvestProduct( data:Object ):void
        {
            var bitmap:egret.Bitmap = this.bitmapList.shift();
            var userProduct:UserProduct = this.product.shift();
            var point:egret.Point;
            point = bitmap.localToGlobal( 0, 0, point );
            GameEvent.watcher.dispatchEventWith(GameEvent.RES_CHANGE, true, new ResChange( 0, 0, data['exp'], point ) );
            GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_CHANGE, true, new ItemChange( userProduct.itemId, userProduct.itemNum, point ) );
            this.removeChild( bitmap );
            this.bitmapCache.push( bitmap );

            if( 0 == this.bitmapList.length )
            {
                egret.Tween.removeTweens( this.shineIcon );
                this.shineIcon.visible = false;
                return;
            }

            this.setShinePosition();
        }
        private setShinePosition():void
        {
            var bitmap:egret.Bitmap = this.bitmapList[ 0 ];
            this.shineIcon.x = bitmap.x + bitmap.width / 2;
            this.shineIcon.y = bitmap.y + bitmap.height / 2;
        }

        private onTouch( e:egret.TouchEvent ):void
        {
            BuildingController.harvestProduct( this.buildingId );
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
}