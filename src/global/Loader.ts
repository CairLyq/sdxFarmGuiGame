/**
 * Created by Gordon on 28/March/15.
 * @class Loader
 * @constructor
 **/
class Loader
{
    private static _instance:Loader = null;

    private groupsDictionary:Array<any> = [];
    private groupDictionary:Object;
    private loadingGroupNum:number = 0;

    public static get instance():Loader
    {
        if( null == Loader._instance )
        {
            Loader._instance = new Loader();
        }

        return Loader._instance;
    }

    constructor()
    {
        this.groupsDictionary = [];
        this.groupDictionary = {};
    }

    loadGroups( groupNames:Array<string>, func:Function, thisObject:any, showMask:boolean = true ):void
    {
        var loadList:Array<string> = [];

        var length:number = groupNames.length;
        var i:number = 0;
        for( ; i < length; i++ )
        {
            if( RES.isGroupLoaded( groupNames[ i ] ) )
            {
                continue;
            }
            if( 0 == this.loadingGroupNum )
            {
                RES.addEventListener( RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this );
                RES.addEventListener( RES.ResourceEvent.GROUP_LOAD_ERROR, this.onLoadError, this );
            }
            this.loadingGroupNum++;
            loadList.push( groupNames[ i ] );
            //Logger.log( '加载组：', groupNames[ i ] );
        }
        if( 0 == loadList.length )
        {
            func.apply( thisObject );
            return;
        }
        this.groupsDictionary.push( [ loadList, func, thisObject ] );
        if( showMask )
        {
            MaskFactory.getInstance().addMask();
        }
        for( i = 0, length = loadList.length ; i < length; i++ )
        {
            RES.loadGroup( loadList[ i ] );
        }
    }

    load( groupName:string, keys:Array<string>, func:Function, thisObject:any, showMask:boolean = true ):void
    {
        if( RES.isGroupLoaded( groupName ) )
        {
            func.apply( thisObject );
            return;
        }
        if( null != keys )
        {
            RES.createGroup( groupName, keys );
        }
        this.loadGroups( [ groupName ], func, thisObject, showMask );
    }

    private onComplete( e:RES.ResourceEvent ):void
    {
        var arr:Array<any> = this.groupDictionary[ e.groupName ];
        if( null != arr )
        {
            var length:number = arr.length;
            for( var i:number = 0; i < length; i++ )
            {
                var func:Function = arr[ i ][ 0 ];
                func.apply( arr[ i ][ 1 ] );
            }
            this.groupDictionary[ e.groupName ].length = 0;
        }

        var groupsLength:number = this.groupsDictionary.length;
        for( var idx:number = groupsLength - 1; idx >= 0; idx-- )
        {
            var groups:Array<any> = this.groupsDictionary[ idx ];
            var itemIndex:number = groups[ 0 ].indexOf( e.groupName );
            if( -1 != itemIndex )
            {
                groups[ 0 ].splice( itemIndex, 1 );
                this.loadingGroupNum--;
            }
            if( 0 == this.groupsDictionary[ idx ][ 0 ].length )
            {
                var func:Function = groups[ 1 ];
                func.apply( groups[ 2 ] );
                this.groupsDictionary.splice( idx, 1 );
            }
        }
        //Logger.log( e.groupName, 'Loader.onComplete', this.loadingGroupNum );
        if( 0 == this.loadingGroupNum )
        {
            RES.removeEventListener( RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this );
            RES.removeEventListener( RES.ResourceEvent.GROUP_LOAD_ERROR, this.onLoadError, this );
            MaskFactory.getInstance().removeMask();
        }
    }
    /**
     * 加载资源组失败
     */
    private onLoadError(e:RES.ResourceEvent):void
    {
        Logger.log( "加载资源组[ " + e.groupName + " ]失败:" );
    }

    static setImageAsync( key:string, bitMap:egret.Bitmap, cb?: Function ):void
    {
        RES.getResAsync( key, (e)=>{
            bitMap.texture = RES.getRes( key );
            cb && cb.apply(this);
        }, null );
    }
    static setUIAssetAsync( key:string, uiAsset:egret.gui.UIAsset ):void
    {
        RES.getResAsync( key, (e)=>{
            uiAsset.source = key;
        }, null );
    }

    static loadSound( key:string, cb?: Function, targetObject: any = null):void
    {
        RES.getResAsync( key, (e)=>{
            cb && cb.apply(this);
        }, targetObject );
    }
}