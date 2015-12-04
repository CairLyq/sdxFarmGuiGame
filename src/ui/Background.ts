/**
 * Created by Gordon on 15/January/15.
 * UI 基类
 * 继承 egret.BitMap
 */
class Background
{

    public static BLOCK_W:number = 60;
    public static BLOCK_H:number = 60;

    private blocks:egret.Bitmap[][];
    private preCol:number;
    private preRow:number;
    /**
     * 屏幕能显示的列数
     */
    private cols:number;
    /**
     * 屏幕能显示的行数
     */
    private rows:number;
    /**
     * 背景图总列数
     */
    private totalCols:number;
    /**
     * 背景图总行数
     */
    private totalRows:number;

    private bg:BitmapExV2;

    constructor()
    {
        //先用容量小的地图
        this.bg = new BitmapExV2("bg_small", 0, 0, false);

        var texture:egret.Texture = RES.getRes('bg_small');
        ZoomLogic.BG_WIDTH = texture.textureWidth;
        ZoomLogic.BG_HEIGHT = texture.textureHeight;
        RES.getResAsync( 'bg', ()=>{
            this.bg.texture = RES.getRes( 'bg' );
            var texture:egret.Texture = RES.getRes('bg');
            ZoomLogic.BG_WIDTH = texture.textureWidth;
            ZoomLogic.BG_HEIGHT = texture.textureHeight;
        }, this );

        this.preCol = 0;
        this.preRow = 0;
        this.cols = Math.ceil(480 / Background.BLOCK_W);
        this.rows = Math.ceil(800 / Background.BLOCK_H);
        this.totalCols = Math.ceil(ZoomLogic.BG_WIDTH / Background.BLOCK_W);
        this.totalRows = Math.ceil(ZoomLogic.BG_HEIGHT / Background.BLOCK_H);

        this.blocks = [];
        var i:number;
        for(i = 0; i < this.totalRows; i++)
        {
            this.blocks[i] = [];
        }
    }

    public init():void
    {
        if(!MapConst.IS_BG_BLOCKS_PLAN)
        {
            Lyrs.LYRS_SCENE.addChildAt(this.bg, 0);
            return;
        }

        var blockNum:number = this.totalCols * this.totalRows;
        var nullNum:number = 0;
        for(var i:number = 0; i < blockNum; i++)
        {
            var texture:egret.Texture = RES.getRes("bg_" + i);
            if(null == texture)
            {
                nullNum++;
            }
            var block:egret.Bitmap = new egret.Bitmap(texture);

            var columnIndex:number = i % this.totalCols;
            var rowIndex:number = Math.floor(i / this.totalCols);

            block.x = columnIndex * Background.BLOCK_W;
            block.y = rowIndex * Background.BLOCK_H;

            block.visible = false;
            Lyrs.LYRS_SCENE.addChildAt(block, 0);

            this.blocks[columnIndex][rowIndex] = block;
        }
        console.log(nullNum + '/' + blockNum);

        this.showBlocks(true);
    }

    private showBlocks(isForce:boolean = false):void
    {
        var columnIndex = Math.floor(-Lyrs.LYRS_SCENE.x / Background.BLOCK_W);
        var rowIndex = Math.floor(-Lyrs.LYRS_SCENE.y / Background.BLOCK_H);

        if(columnIndex == this.preCol && rowIndex == this.preRow && !isForce)
        {
            return;
        }

        this.preCol = columnIndex;
        this.preRow = rowIndex;

        var columnLastIndex:number = columnIndex + this.cols;
        columnLastIndex = columnLastIndex > this.totalCols?this.totalCols:columnLastIndex;

        var rowLastIndex:number = rowIndex + this.rows;
        rowLastIndex = rowLastIndex > this.totalRows?this.totalRows:rowLastIndex;

        for(; columnIndex < columnLastIndex; columnIndex++)
        {
            for(var rowIdx:number = rowIndex; rowIdx < rowLastIndex; rowIdx++)
            {
                this.blocks[columnIndex][rowIdx].visible = true;
            }
        }
    }

    public onMove():void
    {


        if(!MapConst.IS_BG_BLOCKS_PLAN)
        {
            return;
        }

        var column:number = this.preCol + this.cols * 2;
        column = column > this.totalCols?this.totalCols:column;

        var row:number = this.preRow + this.rows * 2;
        row = row > this.totalRows?this.totalRows:row;

        var i:number = this.preCol - this.cols;
        i = i < 0?0:i;

        var j:number = this.preRow - this.rows;
        j = j < 0?0:j;

        for(; i < column; i++)
        {
            for(; j < row; j++)
            {
                this.blocks[i][j].visible = false;
            }
        }
        this.showBlocks();
    }

    //===============================================================
    private static _instance:Background;

    public static get instance():Background
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new Background();
        }
        return this._instance;
    }
}