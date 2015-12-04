/**
 * Created by rodey on 14/11/19.
 */

class LoadGroupView extends egret.EventDispatcher{

    private groupName: any;
    private static _instance: LoadGroupView;

    constructor(groupName: any){
        super();
        this.groupName = groupName;

        //RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplate, this);
        //RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onProgess, this);
        if(typeof groupName === 'string'){
            RES.loadGroup(groupName);
        }else if(Object.prototype.toString.call(groupName) === '[object Array]' && groupName.length && groupName.length > 0){
            for(var i = 0; i < groupName.length; ++i){
                RES.loadGroup(groupName[i]);
            }
        }

    }

    /*public static getInstance(groupName: any){
        if(!this._instance){
            this._instance = new LoadGroupView(groupName);
        }
        return this._instance;
    }*/

    /*public onComplate(evt: RES.ResourceEvent): void{
        this.dispatchEvent(RES.ResourceEvent.GROUP_COMPLETE);
    }

    public onProgess(evt: RES.ResourceEvent): void{
        this.dispatchEvent(RES.ResourceEvent.GROUP_PROGRESS);
    }*/

}
