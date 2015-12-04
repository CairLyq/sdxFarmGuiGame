/**
 * Created by Gordon on 4/Feb/2015.
 */
module model
{
    export class CfgTask
    {
        private static list:Array<CfgTask> = [];

        taskId:number;
        taskType:number;
        postTask:number;
        npcId:number;
        taskName:string;
        taskDesc:string;
        needFinishTimes:number;
        /**
         * 任务类型
         */
        target:number;
        /**
         * 对应任务类型物品的id
         */
        param:number;
        gold:number;
        diamond:number;
        exp:number;
        items:string;
        iconId:string;

        public constructor( obj:any )
        {
            for( var key in obj )
            {
                this[ key ] = obj[ key ];
            }
        }

        public static init(data:any):void
        {
            for( var i:number = 0; i < data.length; i++ )
            {
                var task:CfgTask = new CfgTask(data[i]);
                CfgTask.list.push( task );
            }
        }

        public static getTaskById( id:number ):CfgTask
        {
            var length:number = CfgTask.list.length;
            for( var i:number = 0; i < length; i++ )
            {
                var task:CfgTask = CfgTask.list[i];
                if( task.taskId == id )
                {
                    return task;
                }
            }
            return null;
        }
    }
}