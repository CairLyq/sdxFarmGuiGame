/**
 * Created by Gordon on 03/February/15.
 * @class UserTask
 * @constructor
 **/
module model
{
    export class UserTask
    {
        static taskList:Array<UserTask> = [];

        /**
         * 普通(主线)任务
         * @type {Array}
         */
        static mainTask:UserTask;

        /**
         * 系统任务ID
         */
        taskId:number;
        /**
         * int 系统类型 0 普通(主线)任务 1 日常任务
         */
        taskType:number;
        /**
         * int 任务状态 0 新任务 1 已完成 2 已领取
         */
        status:number;
        /**
         * int 完成次数
         */
        finishTimes:number;

        public constructor( obj:Object )
        {
            for( var key in obj )
            {
                this[ key ] = obj[ key ];
            }
        }
        public reset( obj:Object ):void
        {
            for( var key in obj )
            {
                this[ key ] = obj[ key ];
            }
        }

        static initTaskList( data:Object[] ):void
        {
            if( null == data )
            {
                return;
            }
            var index:number = -1;//data里面主线任务的索引位置
            var length:number = data.length;
            UserTask.taskList.length = length;
            for( var i:number = 0; i < length; i++ )
            {
                var task:UserTask = UserTask.taskList[ i ];
                if( data[ i ][ 'taskType' ] == 0 )
                {
                    index = i;
                    if( null == UserTask.mainTask )
                    {
                        UserTask.mainTask = new UserTask( data[ i ] );
                    }
                    else
                    {
                        UserTask.mainTask.reset( data[ i ] );
                    }
                    continue;
                }

                if( null == task )
                {
                    UserTask.taskList[ i ] = new UserTask( data[ i ] );
                }
                else
                {
                    task.reset( data[ i ] );
                }
            }
            if( -1 != index )
            {
                UserTask.taskList.splice( index, 1 );
            }
        }
        static taskUpdate( data:Object ):void
        {
            var length:number = UserTask.taskList.length;
            for( var i:number = 0; i < length; i++ )
            {
                var userTask:UserTask = UserTask.taskList[ i ];
                if( userTask.taskId != data[ 'taskId' ] )
                {
                    continue;
                }
                for( var key in data )
                {
                    userTask[ key ] = data[ key ];
                }
                GameUI.instance.refreshTaskIcon();
                var panel:game.IPanel = UIMgr.instance.getPanel( PanelName.EVERY_TASK_PANEL );
                panel.onUpdate( userTask.taskId );
                return;
            }

            if( UserTask.mainTask.taskType == data[ 'taskType' ] )
            {
                for( var key in data )
                {
                    UserTask.mainTask[ key ] = data[ key ];
                }
                GameUI.instance.refreshMainTaskIcon();
                var panel:game.IPanel = UIMgr.instance.getPanel( PanelName.TASK_PANEL );
                panel.onUpdate();
            }
            else
            {
                UserTask.taskList.push( new UserTask( data ) );
            }
        }
        static getTaskById( id:number ):UserTask
        {
            var length:number = UserTask.taskList.length;
            for( var i:number = 0; i < length; i++ )
            {
                var userTask:UserTask = UserTask.taskList[ i ];
                if( userTask.taskId == id )
                {
                    return userTask;
                }
            }
        }

        /**
         * 更新、替换任务列表
         * @param data
         */
        static updateTaskList( data:Object[] ):void
        {
            var length:number = data.length;
            for( var i:number = 0; i < length; i++ )
            {
                UserTask.taskUpdate( data[ i ] );
            }
        }
    }
}