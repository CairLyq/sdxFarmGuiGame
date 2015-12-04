/**
 * Created by Gordon on 30/12/14.
 */
module model
{
    export class NpcDialog
    {
        private static itemList:Array<NpcDialog> = [];

        public id:number;
        public npcId:number;
        public dialog:string;
        public face:number;
        public triggerType:number;
        public param:number;

        public constructor( obj:any )
        {
            for( var key in obj )
            {
                this[ key ] = obj[ key ];
            }
        }

        public static init(data:any):void
        {
            var i:number;
            var mm:NpcDialog;
            for(i = 0; i < data.length; i++)
            {
                mm = new NpcDialog(data[i]);
                NpcDialog.itemList.push(mm);
            }
        }

        public static getNpcDialogById(id:number):NpcDialog[]
        {
            var i:number;
            var list:NpcDialog[] = [];
            for(i = 0; i < NpcDialog.itemList.length; i++)
            {
                var one = NpcDialog.itemList[i];
                if( one.npcId == id )
                {
                    list.push( one );
                }
            }
            return list;
        }


        public static getDialogById(id:number):string
        {
            var i:number;
            var len:number = NpcDialog.itemList.length;
            var one:NpcDialog;
            var re:string;

            for(i = 0; i < len; i++)
            {
                one = NpcDialog.itemList[i];
                if( one.id == id )
                {
                    re = one.dialog;
                }
            }

            return re;
        }
    }
}