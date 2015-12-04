/**
 * on 2015-03-18
 * by leo
 */

class LaterLoad extends egret.EventDispatcher
{
    private groupName:string;
    public isLoaded:boolean;

    public constructor()
    {
        super();

        this.isLoaded = false;

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onProgress, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onLoadError, this);
    }

    public load(groupName:string, resArr:string[]):void
    {
        this.groupName = groupName;

        RES.createGroup(groupName, resArr);

        RES.loadGroup(groupName);
    }

    private onLoadError(e:RES.ResourceEvent):void
    {
        console.log("==========================加载资源组失败:", e.groupName);
    }


    private onProgress(e:RES.ResourceEvent):void
    {
        //console.log(e.itemsLoaded, e.itemsTotal);
    }

    private onComplete(e:RES.ResourceEvent):void
    {
        if(this.groupName == e.groupName)
        {
            this.isLoaded = true;

            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onProgress, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onLoadError, this);

            this.dispatchEvent(new LaterLoadEvent(this.groupName));
        }
    }
}