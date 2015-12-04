/**
 * on 2015-03-18
 * by leo
 */

class LaterLoadEvent extends egret.Event
{
    public static GUIDE_LATER_LOAD: string = 'guide_later_load';
    public static VILLAGER_LATER_LOAD: string = 'villager_later_load';

    constructor(type:string, bubble:boolean = false, cancelable:boolean = false)
    {
        super(type, bubble, cancelable);
    }
}