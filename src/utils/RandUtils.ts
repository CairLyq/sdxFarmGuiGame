/**
 * on 2015-03-10
 * by leo
 */

class RandUtils
{
    public static getValInRange(min:number, max:number):number
    {
        return Math.floor(min + Math.random() * (max - min + 1));
    }

    public static getVal(range:number):number
    {
        return Math.floor(Math.random() * range);
    }
}