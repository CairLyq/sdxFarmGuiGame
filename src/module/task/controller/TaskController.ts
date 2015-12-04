/**
 * Created by Gordon on 03/February/15.
 * @class TaskController
 * @constructor
 **/
class TaskController
{
    private static point:egret.Point;
    private static func:Function;
    private static thisArg:any;
    /**
     * 接收领取获得物品
     **/
    public static recieve( drop:Object ):void
    {
        var dropBO:model.DropBO = new model.DropBO( drop );

        /*UserController.instance.diamond += dropBO.diamond;
        UserController.instance.exp += dropBO.exp;
        UserController.instance.gold += dropBO.gold;*/

        GameEvent.watcher.dispatchEventWith( GameEvent.RES_CHANGE, true, new ResChange( dropBO.gold, dropBO.diamond, dropBO.exp, TaskController.point ) );

        var items:Array<model.UserItem> = dropBO.items;
        var length:number = items.length;
        for( var i:number = 0; i < length; i++ )
        {
            DepotController.instance.updateLocalItemNum( items[ i ].itemId, items[ i ].itemNum );
        }
        TaskController.func.apply( TaskController.thisArg );
    }

    /**
     * 请求领取
     **/
    public static sendRecieve( taskId:number, point:egret.Point, func:Function, thisArg:any ):void
    {
        TaskController.point = point;
        var data:Object = { "act":"Task.recieve", "dt":{ "taskId":taskId } };
        SocketManager.instance.send(JSON.stringify(data), false);
        TaskController.func = func;
        TaskController.thisArg = thisArg;
    }
    /**
     * 获取日常任务进度
     **/
    public static getTaskProgress( taskId:number ):Array<egret.ITextElement>
    {
        var task:model.UserTask = model.UserTask.getTaskById( taskId );
        var cfgTask:model.CfgTask = model.CfgTask.getTaskById( taskId );
        return <Array<egret.ITextElement>>[
            { text: Language.getString( 0, 9 ),             style: {"textColor": 0x99938B} },
            { text: String(task.finishTimes),               style: {"textColor": 0xDA4605} },
            { text: '/' + String(cfgTask.needFinishTimes),  style: {"textColor": 0x6F3D10} }
        ];
    }
    /**
     * 判断日常任务是否有完成的
     **/
    public static getTaskFinish():boolean
    {
        var length:number = model.UserTask.taskList.length;
        for( var i = 0; i < length; i++ )
        {
            var task:model.UserTask = model.UserTask.taskList[ i ];
            var cfgTask:model.CfgTask = model.CfgTask.getTaskById( task.taskId );
            if( task.finishTimes >= cfgTask.needFinishTimes && task.status != 2 )
            {
                return true;
            }
        }
        return false;
    }

    /**
     * 日常任务图标是否单击过
     * @returns {boolean}
     */
    public static getTaskClicked():boolean
    {
        var isClicked = window.localStorage.getItem('TaskClicked');
        if( null != isClicked )
        {
            return true;
        }
        return false;
    }
    /**
     * 获取主线任务进度
     **/
    public static getMainTaskProgress():string
    {
        var task:model.UserTask = model.UserTask.mainTask;
        var cfgTask:model.CfgTask = model.CfgTask.getTaskById( task.taskId );
        return task.finishTimes + '/' + cfgTask.needFinishTimes;
    }
    /**
     * 判断主线任务是否完成
     **/
    public static getMainTaskFinish():boolean
    {
        var task:model.UserTask = model.UserTask.mainTask;
        var cfgTask:model.CfgTask = model.CfgTask.getTaskById( task.taskId );
        return task.finishTimes >= cfgTask.needFinishTimes;
    }

    /**
     * 主线任务图标是否单击过
     * @returns {boolean}
     */
    public static getMainTaskClicked():boolean
    {
        var isClicked = window.localStorage.getItem('MainTaskClicked');
        if( null != isClicked )
        {
            return true;
        }
        return false;
    }
}