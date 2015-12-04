/**
 * Created by rodey on 15/2/11.
 */

class PagetionPanel extends egret.gui.SkinnableComponent{


    public pageScroller: egret.gui.Scroller;
    public pageDataGroup: egret.gui.Group;

    private _data: any[];
    private _container: egret.DisplayObject;

    constructor( data: any[], displayObject?: egret.DisplayObject ){
        super();
        this.skinName = skins.uicompenet.Commons.PagetionPanelSkin;

        this._data = data;
        this._container = displayObject;

        //this.render();

    }


    public render(): void{

        if(!this._data || !this._data.length || this._data.length == 0){
            return;
        }

        this.createItemList();

    }

    public createItemList(): void{

        this.pageDataGroup.removeAllElements();

        var i: number = 0,
            len: number = this._data.length,
            item: PagetionItem;

        for( ; i < len; ++i ){

            item = new PagetionItem();
            this.pageDataGroup.addElement(item);
            console.log(item.width, item.height)
            item.x = 80 * i;
            item.data = this._data[i];

            item.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toItemBegin, this);
        }

        this.pageScroller.viewport = this.pageDataGroup;

    }


    public childrenCreated(): void{

        super.childrenCreated();

        if(this.pageDataGroup){
            this.render();
        }
    }

    public partAdded(partName:string, instance:any): void{
        super.partAdded(partName, instance);
        if(instance == this.pageScroller){
            this.pageScroller.verticalScrollPolicy = egret.gui.ScrollPolicy.OFF;
            this.pageScroller.horizontalScrollPolicy = egret.gui.ScrollPolicy.OFF;

            this.pageScroller.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toBegin, this);

        }
        else if(instance == this.pageDataGroup){

            //this.render();
        }
    }


    private asset: egret.Bitmap;
    private toItemBegin(evt: egret.TouchEvent): void{

        console.log('itemBegin.......')
        var target: any = evt.currentTarget || evt.target;

        var point: egret.Point = target.localToGlobal(evt.stageX, evt.stageY);

        this.asset = new egret.Bitmap(RES.getRes(target.data.imgId));
        this.asset.x = point.x;
        this.asset.y = point.y;
        egret.MainContext.instance.stage.addChild(this.asset);
        TweenIt.tweenBigThenNormal(this.asset);

        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.toItemMove, this);
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.toItemEnd, this);

    }

    private toItemMove(evt: egret.TouchEvent): void{
        if(this.asset){
            this.asset.x = evt.stageX;
            this.asset.y = evt.stageY;
        }

    }

    private toItemEnd(evt: egret.TouchEvent): void{
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.toItemMove, this);
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.toItemEnd, this);

        try{
            egret.MainContext.instance.stage.removeChild(this.asset);
            this.asset = null;
        }catch (e){}

    }




    private point: egret.Point;
    private target: any;
    private toBegin(evt: egret.TouchEvent): void{

        this.target = evt.currentTarget || evt.target;
        this.point = this.target.localToGlobal(evt.stageX, evt.stageY);

        this.pageScroller.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMove, this);
        this.pageScroller.addEventListener(egret.TouchEvent.TOUCH_END, this.toEnd, this);

    }

    private toMove(evt: egret.TouchEvent): void{
        var self = this;
        //this.point = this.target.localToGlobal(evt.stageX, evt.stageY);
        console.log('this.point...  ', this.point.x , this.point.y)
        console.log('evt.stage...   ', evt.stageX, evt.stageY)

        if( this.point.x !== evt.stageX && (Math.abs(evt.stageX - this.point.x) > 20) ){
            console.log('...滑动...')
            for(var i: number = 0, len: number = this.pageDataGroup.numElements; i < len; ++i){
                var item: any = this.pageDataGroup.getElementAt(i);
                try{
                    item.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.toItemMove, this);
                    item.removeEventListener(egret.TouchEvent.TOUCH_END, this.toItemEnd, this);
                }catch (e){}
            }

            try{
                egret.MainContext.instance.stage.removeChild(this.asset);
                this.asset = null;
            }catch (e){}


        }else{
            this.pageScroller.addEventListener(egret.TouchEvent.TOUCH_END, function(){
                self.pageScroller.removeEventListener(egret.TouchEvent.TOUCH_MOVE, self.toMove, self);
                self.pageScroller.removeEventListener(egret.TouchEvent.TOUCH_END, self.toEnd, self);
                self.target = null;
                self.point = null;
            }, this);
            console.log('...拖动...')

            for(var i: number = 0, len: number = this.pageDataGroup.numElements; i < len; ++i){
                var item: any = this.pageDataGroup.getElementAt(i);
                try{
                    item.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.toItemBegin, this);
                }catch (e){}
            }
        }

    }

    private toEnd(evt: egret.TouchEvent): void{
        this.pageScroller.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMove, this);
        this.pageScroller.removeEventListener(egret.TouchEvent.TOUCH_END, this.toEnd, this);
        this.target = null;
        this.point = null;
    }


}
