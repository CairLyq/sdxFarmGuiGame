/**
 * on 2015-01-21
 * by leo
 */

class HashDS
{
    private data:Array<any>;

    public constructor()
    {
        this.data = new Array<any>(1000);
    }

    public getValue(key:string):string
    {
        return this.data[this.RSHash(key)];
    }

    public setValue(key:string, value:any):void
    {
        var idx:number = this.RSHash(key);

        if(this.data[idx])
        {
            console.log("==========================collision");
        }
        else
        {
            this.data[idx] = value;
        }
    }

    private RSHash(str:string):number
    {
        var b:number = 378551;
        var a:number = 63689;
        var hash:number = 0;

        var char:string = "";
        var i:number = 0;

        for(i = 0; i < str.length; i++)
        {
            char = str.charAt(0);
            hash = hash * a + char.charCodeAt(0);
            a *= b;
        }

        return (hash & 1000);
    }
}