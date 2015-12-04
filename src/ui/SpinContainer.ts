/**
 * Created by Gordon on 30/12/14.
 */
declare module game
{
    export class SpinContainer extends egret.gui.DataGroup
    {
        public data:any;
        private next():void
        {
            egret.Tween.get( this ).to( { scaleX:0, scaleY:0, alpha:0 }, 200 ).call( this.changeData, this ).
                to( { scaleX:1, scaleY:1, alpha:1 }, 200 );

        }
        private changeData():void
        {

        }
        private previous():void
        {
            egret.Tween.get( this ).to( { scaleX:0, scaleY:0, alpha:0 }, 200 ).
                to( { scaleX:1, scaleY:1, alpha:1 }, 200 );
        }
    }
}