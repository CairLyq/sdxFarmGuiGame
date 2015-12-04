/**
 * on 2014-12-11
 * by leo
 */

class BuildingIso extends ItemIso
{
    /**
     * 用户建筑GUID
     */
    public buildingId:number;
    /**
     * 用户配制ID
     */
    public cfgBuildingId:number;
    /**
     * model.UserBuilding 数据类型
     */
    public data:model.UserBuilding;

    /**
     * 建筑类型
     * */
    public type:number;
    //===================================================
    /**
     * 建筑外观图片
     */
    public image:egret.Bitmap;
    public imageLyr:egret.DisplayObjectContainer;
    /**
     * 编辑底框
     */
    private edge:egret.Shape;

    public bottom:egret.DisplayObjectContainer;
    private tiles:BitmapEx[];

    public bLogic:BuildingLogic;
    public restoreLogic:RestoreBuildLogic;


    //动画相关
    public imgMC:ProductMC;
    //public animationId: string;

    public currentNumber:number = 0;
    public totalNumber:number = 0;
    public unLockLevel:number = 0;
    public maxUnlockLevel:number = 0;

    public constructor(pos:Point3D, paramModel:BuildingModel)
    {
        super(pos, paramModel);

        //当前值和总数（用于生产建筑中解锁）---rodey
        this.currentNumber = GetBuildingUtils.getInstance().getBuildingNumByBuildingId(this.model.buildingId);
        this.totalNumber = BuildingModel.getMax(this.model.buildingId, UserController.instance.level);
        this.unLockLevel = BuildingModel.getUnlockLevel(this.model.buildingId);
        this.maxUnlockLevel = BuildingModel.getMaxUnlockLevel(this.model.buildingId);

        //this.model = <BuildingModel>this.model;

        this.edge = new egret.Shape();
        this.addChild(this.edge);
        this.drawEdge();
        this.setEdgeVisible(false);

        //this.border = new egret.Bitmap(RES.getRes(paramModel.borderImgIdYes));
        //this.addChild(this.border);
        ////this.border.x = this.model.borderOffsetX * Constant.scale;
        ////this.border.y = this.model.borderOffsetY * Constant.scale;
        //this.border.anchorX = NumberUtils.decimal_K(Math.abs(this.model.borderOffsetX / this.border.width), 1);
        //this.border.anchorY = NumberUtils.decimal_K(Math.abs(this.model.borderOffsetY / this.border.height), 1);
        //this.border.scaleX = this.border.scaleY = Constant.scale;

        this.bottom = new egret.DisplayObjectContainer();
        this.addChild(this.bottom);
        this.addTiles();

        //创建图片
        this.createImage();

        this.bLogic = new BuildingLogic(this);


    }

    private drawEdge():void
    {
        var g:egret.Graphics = this.edge.graphics;
        g.clear();
        g.lineStyle(2, 0xffffff, 1);
        g.moveTo(0, -16 - 2);
        g.lineTo(MapConst.CONST_TILE_W * .5 * this.model.col + 2, MapConst.CONST_TILE_H * .5 * (this.model.col - 1));
        g.lineTo(MapConst.CONST_TILE_W * .5 * (this.model.col - this.model.row), MapConst.CONST_TILE_H * .5 * (this.model.col + this.model.row - 1) + 2);
        g.lineTo(-MapConst.CONST_TILE_W * .5 * this.model.row - 2, MapConst.CONST_TILE_H * .5 * (this.model.row - 1));
        g.lineTo(0, -16 - 2);
    }


    public createImage():void
    {
        //var container:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        //this.image = new BitmapEx(paramModel.imgId, false, false);
        ////this.image = new BitmapEx("8_mine_33", false, false);
        //container.addChild(this.image);
        ////this.image.x = this.model.offsetX;
        ////this.image.y = this.model.offsetY;
        //
        //var rtex:egret.RenderTexture = new egret.RenderTexture();
        //rtex.drawToTexture(container);
        //this.hitArea = new egret.Bitmap(rtex);
        //this.addChild(this.hitArea);
        //this.hitArea.x = this.model.offsetX;
        //this.hitArea.y = this.model.offsetY;

        //this.image = new BitmapEx(paramModel.imgId, false, false);
        this.imageLyr = new egret.DisplayObjectContainer();
        this.addChild(this.imageLyr);
        this.image = new egret.Bitmap();
        //this.image.cacheAsBitmap = true;
        this.imageLyr.addChild(this.image);
        this.setImage(this.model.imgId);

        this.image.alpha = 0;
        this.image.x = this.model.offsetX;// * ZoomLogic.scale;
        this.image.y = this.model.offsetY;// * ZoomLogic.scale;
        //this.image.anchorX = NumberUtils.decimal_K(Math.abs(this.model.offsetX / this.image.width), 1);
        //this.image.anchorY = NumberUtils.decimal_K(Math.abs(this.model.offsetY / this.image.height), 1);
        //this.image.scaleX = this.image.scaleY = Variable.scale;

        egret.Tween.removeTweens(this.image);
        egret.Tween.get(this.image).to({alpha:1}, 100);

    }

    private addTiles():void
    {
        this.tiles = [];

        var i:number, j:number;
        var tile:BitmapEx;
        for(i = 0; i < this.model.col; i++)
        {
            for(j = 0; j < this.model.row; j++)
            {
                tile = new BitmapEx("tile", true, false);
                this.bottom.addChild(tile);
                tile.x = MapConst.CONST_TILE_W * .5 * (i - j);
                tile.y = MapConst.CONST_TILE_H * .5 * (i + j);
                this.tiles.push(tile);
            }
        }
    }


    public setImage(res:string):void
    {
        Loader.setImageAsync(res, this.image);
    }

    public setImageVisible(bo:boolean):void
    {
        this.image.visible = bo;
        if(bo == true)
        {
            egret.Tween.removeTweens(this.image);
            egret.Tween.get(this.image).to({alpha:1}, 100);
        }

    }

    public getImage():egret.Bitmap
    {
        return this.image;
    }

    public isRestoreBuilding(building:BuildingIso):boolean
    {
        if(building.restoreLogic.cnt > 0 && building.model.needTime > 0 && building.restoreLogic.isRestoring)
        {
            return true;
        }
        return false;
    }

    /**
     * 控制动画
     */
    public playOrStopAnimation(isPlayAnimation:boolean):void
    {
        this.visible = isPlayAnimation;
    }

    /**
     * ======================修建 或 建造---=============================
     */
    public restoreBuild():void
    {

        this.restoreLogic.restoreBuild();

    }

    public clearnRestoreBuild():void
    {

        this.restoreLogic.clearnRestoreBuild();

    }

    public flip():void
    {
        if(this.model.flipable)
        {
            this.image.scaleX *= -1;
        }
    }

    public setEdgeVisible(bo:boolean):void
    {
        this.edge.visible = bo;
    }

    //此处明显应该是pos + offset，但是却是pos - offset，可能是egret bug
    //public hitTest(x: number, y: number, ignoreTouchEnabled?: boolean):egret.DisplayObject
    //{
    //    //return super.hitTest(x, y, ignoreTouchEnabled);
    //    console.log(x - this.model.offsetX, typeof (x - this.model.offsetX));
    //    var color:number[] = this.hitArea.texture.getPixel32(x - this.model.offsetX, y - this.model.offsetY);
    //    //var color:number[] = this.hitArea.texture.getPixel32(x + this.model.offsetX, y + this.model.offsetY);
    //    //console.log(x - this.model.offsetX, y - this.model.offsetY, color[3]);
    //    //console.log(x + this.model.offsetX, y + this.model.offsetY, color[3]);
    //    if(0 == color[3])
    //    {
    //        console.log("no hit")
    //        return null;
    //    }
    //    else
    //    {
    //        console.log(" hit")
    //       return this;
    //    }
    //}

    //update serverData
    public updateData(data:any):void
    {
        this.data = new model.UserBuilding(data);
        this.buildingId = this.data.userBuildingId;
        this.cfgBuildingId = this.model.buildingId;
        this.type = this.model.type;
    }

    public setImageMC():void
    {
    }

    public setImgMC_BG(imgId:string = null):void
    {
    }

    public delImgMC_BG():void
    {
    }

    public delImgMC():void
    {
    }

    public dispose():void
    {
        if(this.bLogic)
        {
            this.bLogic.dispose();
            this.bLogic = null;
        }
    }

    //===============================================================================
    //底框
    public updateBottom(bo:boolean):void
    {

        var i:number;
        var tile:BitmapEx;
        for(i = 0; i < this.tiles.length; i++)
        {
            tile = this.tiles[i];
            if(bo)
            {
                tile.texture = RES.getRes("tile");
            }
            else
            {
                tile.texture = RES.getRes("tile_warn");
            }
        }
    }

    public setBottomVisible(bo:boolean):void
    {
        //this.border.visible = flag;
        this.bottom.visible = bo;
    }


    //===============================================================================
    //case1: after buy
    //case2: init
    //public addController():void
    //{
    //    //this.touchEnabled = true;
    //    this.bLogic = new BuildingLogic(this);
    //    GTimer.getInstance().register(this.bLogic);
    //}

    //public addLogic():void
    //{
    //    this.bLogic = new BuildingLogic(this);
    //}
    /**
     * 此方法的覆盖需要写在try里
     * @param posX
     * @param posY
     * @param isFocus
     */
    public show(posX:number = 0, posY:number = 0, isFocus:boolean = true):void
    {
        var isLock:boolean = this.getIsLock();
        if(isLock)
        {
            return;
        }

        //播放音效
        SoundMgr.instance.playAudio(SoundName.ITEM_GET);

        //气泡效果

        TweenIt.tweenBubble(this, ()=>
        {
            if(isFocus)
            {
                Camera.getInstance().focus(this, ()=>
                {
                    this.afterFocus();
                });
            }
        });
    }

    public afterFocus():void
    {
    }

    public getIsLock():boolean
    {
        var currentLevel:number = UserController.instance.level;
        var unLockLevel:number = BuildingModel.getUnlockLevel(this.model.buildingId);

        if(currentLevel < unLockLevel)
        {
            TipText.instace.play(Language.getString(3, 20, this.model.name, unLockLevel) + '。' + this.model.desc, null, 3000);
            return true;
        }

        return false;
    }
}