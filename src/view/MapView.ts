/**
 * Created by rodey on 14/11/25.
 * 地图类
 */

class MapView extends egret.Sprite{

    private static _instance: MapView;

    // 行数 和 列数
    public row: number = 10;
    public col: number = 40;
    //存储地图数据
    public mapData: Array<egret.Sprite>;
    //存储的地图坐标
    public mapRange: Array<egret.Point>;


    constructor(row?: number, col?: number){
        super();

        //初始化对象属性
        //this.row = row;
        //this.col = col;
        //顶一个地图数组
        this.mapData = new Array<egret.Sprite>();
        this.mapRange = new Array<egret.Point>();

        //创建地图
        this.createMap(this.row, this.col);
    }

    /**
     * 获取单例, 这里不能用单例模式，因为需要查看好友页面
     * @returns {MapView}
     */
    public static getInstance(): MapView{
        if(MapView._instance){
            MapView._instance = new MapView();
        }
        return MapView._instance;
    }

    /**
     * 生成地图
     * @param row
     * @param col
     */
    public createMap(row: number, col: number): void{
        var self = this;
        //self.cacheAsBitmap = true;
        //行数
        var row: number = row || 10;
        //列数
        var col: number = col || 40;

        for(var i = 0; i < row; ++i){
            for(var j = 0; j < col; ++j){
                var map: MapGridView = new MapGridView();
                map.name = 'map_grid_' + (i ^ 0) + '_' + (j ^ 0);
                //console.log(map.name);
                if(j % 2 == 0){
                    //map.x = (map.width + 2) * i + (map.width * .5);
                    map.x = (map.width) * i;
                    map.y = map.height * Math.round(j/2);
                }else{
                    //map.x = (map.width + 2) * i + map.width;
                    map.x = (map.width) * i + map.width * .5;
                    map.y = map.height * Math.round(j/2) - map.height * .5;
                }

                //加载
                /*if(map.x >= -map.width
                    && map.x <= egret.MainContext.instance.stage.stageWidth + 100
                    && map.y >= -map.height
                    && map.y <= egret.MainContext.instance.stage.stageHeight
                    ){
                    self.addChild(map);
                    self.mapCurrData.push(map);
                    self.mapCurrRange.push(new egret.Point(map.x, map.y));
                }*/
                self.addChild(map);
                self.mapData.push(map);
                self.mapRange.push(new egret.Point(map.x, map.y));
            }
        }
        //console.log(self.mapData.length);


        //事件侦听
        //self.initEvent(self.mapCurrData);
        self.initEvent(self.mapData);
    }

    /**
     * 获取地图数据
     * @returns {Array<egret.Sprite>}
     */
    public getMapData(): any{
        return this.mapData;
    }

    /**
     * 获取每个格子的坐标
     * @returns {Array<egret.Point>}
     */
    public getMapRange(): any{
        return this.mapRange;
    }

    private initEvent(mapData: any): void{
        var self = this;
        ([].slice.call(mapData).forEach(function(item, index){
            item.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.toTouchStart, this);
            item.addEventListener(egret.TouchEvent.TOUCH_MOVE, self.toTouchMove, this);
            item.addEventListener(egret.TouchEvent.TOUCH_END, self.toTouchEnd, this);
            item.addEventListener(egret.TouchEvent.TOUCH_TAP, self.toTouchTap, this);
        }));
    }

    /**
     * 事件回调
     * @param evt
     */
    private toTouchStart(evt: egret.TouchEvent): void{
        evt.preventDefault();
        evt.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toTouchStart, this);
        //evt.target.setStatus('tap');
    }

    private toTouchMove(evt: egret.TouchEvent): void{
        evt.preventDefault();
        evt.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.toTouchMove, this);
        //evt.target.setStatus('none');
    }

    private toTouchEnd(evt: egret.TouchEvent): void{
        evt.preventDefault();
        evt.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_END, this.toTouchEnd, this);
        //evt.target.setStatus('none');
    }

    private toTouchTap(evt: egret.TouchEvent): void{
        evt.preventDefault();
        evt.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toTouchEnd, this);
        evt.currentTarget.alpha = 0;
        //evt.currentTarget.dispatchEventWith(GameEvent.MGP_TAP, true, evt.currentTarget);
    }


}