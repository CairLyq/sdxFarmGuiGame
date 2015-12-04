/**
 * Created by Gordon on 30/12/14.
 */
module game
{
    export class Spin
    {
        private index:number;
        private pageNum:number;
        private source:any[];
        private container:SpinContainer;
        constructor( preBtn:egret.DisplayObject, nextBtn:egret.DisplayObject, container:SpinContainer,
                     source:any[], pageNum:number, indexLable:egret.gui.Label )
        {
            this.container = container;
            this.source = source;
            this.pageNum = pageNum;
            this.index = 1;
        }

        public next():void
        {
            var idx = this.index * this.pageNum - 1;
            this.container.data = this.source.slice( idx , this.pageNum );
        }
    }
}
