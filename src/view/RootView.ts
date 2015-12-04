/**
 * Created by rodey on 14/11/19.
 */

class RootView extends egret.DisplayObjectContainer{

    private bgView: BitmapEx;
    public mapData: Array<egret.Sprite>;
    private mapContianer: egret.Sprite;
    private mapView: MapView;

    constructor(){
        super();
        this.name = 'root';

        //先创建一个背景图片
        this.bgView = new BitmapEx('bg2');
        this.addChild(this.bgView);


        /**
         * 创建地图
         */
        //this.createMapView();

    }

    /**
     * 创建地图
     */
    private createMapView(): void{
        var self = this;
        //创建地图
        self.mapView = new MapView(30, 30);
        self.addChild(self.mapView);
        /**
         * -----将多次创建缓存，然后一次Draw出来，可以减少渲染 *****
         * @type {boolean}
         */
        self.mapView.cacheAsBitmap = true;
        self.mapView.name = 'mapView';

    }

    public getMapView(): MapView{
        return this.mapView;
    }






}
