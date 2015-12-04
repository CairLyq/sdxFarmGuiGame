/**
 * on 2014-12-08
 * by leo
 */

class MapDebug
{
    private static txtPos:egret.TextField;
    public static tiles:any;

    public static log(str:string):void
    {
        MapDebug.txtPos.text = str;
    }

    public static init():void
    {
        if(MapConst.DEBUG_MAP)
        {
            MapDebug.txtPos = new egret.TextField();
            MapDebug.txtPos.textColor = 0xffff00;
            Lyrs.LYRS_DEBUG.addChild(MapDebug.txtPos);
            MapDebug.txtPos.x = 0;
            MapDebug.txtPos.y = 300;
            MapDebug.txtPos.width = 300;
            MapDebug.txtPos.height = 600;
            MapDebug.txtPos.text = "地图坐标（mx, my）";
            MapDebug.txtPos.touchEnabled = false;

            Lyrs.LYRS_TILE_IN_SCENE.cacheAsBitmap = true;

            //1 hide or show tiles
            //var that:egret.TextField = MapDebug.txtPos;
            document.addEventListener("keydown", function(e:KeyboardEvent):void
            {
                //console.log("this:", this);
                //console.log("that:", that);
                //console.log(e.keyCode);
                switch(e.keyCode)
                {
                    case 49://1
                        Lyrs.LYRS_TILE_IN_SCENE.visible = true;
                        break;
                    case 50://2
                        Lyrs.LYRS_TILE_IN_SCENE.visible = false;
                        break;

                }
            });
            //2
            Lyrs.LYRS_TILE_IN_SCENE.touchEnabled = true;
            Lyrs.LYRS_TILE_IN_SCENE.addEventListener(egret.TouchEvent.TOUCH_TAP, MapDebug.onTraceLogicPos, this);


            //3 init Tile
            MapDebug.initTile();
            //this.initTile3();
            //this.initTile2();

        }
    }

    private static onTraceLogicPos(e:egret.TouchEvent):void
    {
        var pScreen:egret.Point = new egret.Point(e.localX, e.localY);
        var re:Point3D = TransUtils.screenToIso(pScreen);
        MapDebug.txtPos.text = "地图坐标（" + re.x + ", " + re.z + "）";
    }

    //diamond style

    private static initTile():void
    {
        var i:number = 0;
        var j:number = 0;
        var tile:TileIso;
        var pos:Point3D = new Point3D();

        MapDebug.tiles = [];
        for(j = 0; j < MapConst.MAP_SIZE; j++)
        {
            MapDebug.tiles[j] = [];
            for(i = 0; i < MapConst.MAP_SIZE; i++)
            {
                pos.x = j;
                pos.y = 0;
                pos.z = i;
                tile = new TileIso(pos);
                MapDebug.tiles[j][i] = tile;
                Lyrs.LYRS_TILE_IN_SCENE.addChild(tile);
                tile.setPosByIso(pos);
                tile.setPass()

                //console.log("*********", tile.x, tile.y)
            }
        }
    }

    //private initTile3():void
    //{
    //    var i:number = 0;
    //    var j:number = 0;
    //    var tile:TileIso;
    //    var pos:Point3D = new Point3D();
    //
    //    MapDebug.tiles = [];
    //    for(j = 0; j < Constant.MAP_SIZE; j++)
    //    {
    //        MapDebug.tiles[j] = [];
    //        for(i = 0; i < Constant.MAP_SIZE; i++)
    //        {
    //            pos.x = j;
    //            pos.y = 0;
    //            pos.z = i;
    //            tile = new TileIso(pos);
    //            MapDebug.tiles[j][i] = tile;
    //            Lyrs.LYRS_TILE_IN_SCENE.addChild(tile);
    //            var aa:egret.Point = TransUtils.iso2Screen(new egret.Point(j, i));
    //            tile.x = aa.x;
    //            tile.y = aa.y;
    //
    //            //console.log("*********", tile.x, tile.y)
    //        }
    //    }
    //}
    ////stragged style
    //private initTile2():void
    //{
    //    var i:number = 0;
    //    var j:number = 0;
    //    var tile:TileIso;
    //    var pScreen:egret.Point;
    //    var pIso:Point3D = new Point3D();
    //    var num:number = 1;
    //    var xStart:number = 0;
    //    var zStart:number = 0;
    //
    //    var mid:number = Math.floor(Constant.MAP_SIZE * .5);
    //
    //    for(i = 0; i < Constant.MAP_SIZE; i++)
    //    {
    //        if(0 == i)
    //        {
    //            xStart = 0;
    //            num = 1;
    //            zStart = -mid;
    //        }
    //        else
    //        {
    //
    //            if(i <= mid)
    //            {
    //                xStart--;
    //                num += 2;
    //            }
    //            else
    //            {
    //                xStart++;
    //                num -= 2;
    //            }
    //        }
    //        for(j = 0; j < num; j++)
    //        {
    //            pIso.x = xStart + j;
    //            pIso.y = 0;
    //            pIso.z = -mid + i;
    //            tile = new TileIso(pIso);
    //
    //            Lyrs.LYRS_TILE_IN_SCENE.addChild(tile);
    //
    //            tile.setPosition(pIso)
    //            //pScreen = TransUtils.isoShortToScreen(pIso);
    //            //tile.x = pScreen.x;
    //            //tile.y = pScreen.y;
    //            //console.log("pShort: ", pShort.x, pShort.z);
    //        }
    //    }
    //}
}
