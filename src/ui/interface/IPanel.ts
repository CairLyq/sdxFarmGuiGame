/**
 * Created by rodey on 14/12/22.
 */
declare module game
{
    export interface IPanel
    {
        onShow( ...args: any[] ):void;
        onClose( ...args: any[] ):void;
        onUpdate( ...args: any[] ):void;
    }
}


