/**
 * Created by rodey on 15/4/14.
 */

class Logger{

    constructor(){}


    public static startGame(): void{
        console.log('%c\n','padding:100px 100px 100px 100px;line-height:180px;background: url(' + game.config.getConsoleImg() + ') no-repeat center center;');
    }

    public static trice( ...args: any[] ): void{
        if(!Global.DEBUG) return;
        console.dir(args[0])
    }

    /**
     * debugger模式下输出
     * @param args
     */
    public static log( ...args: any[] ): void{
        if(!Global.DEBUG) return;
        var ar: any[] = [];
        console.log('\n');
        for(var i: number = 0, len: number = args.length; i < len; ++i ){
            console.log(args[i] + '  ');
            //ar.push(args[i]);
        }
        //console.log(ar);
        console.log('%c End Linner-------- \n','padding:5px 50% 5px 0;text-indent:45%;line-height:20px;background-color:rgba(0,204,204,.2);color:rgba(0,0,0,.5);font:\'microsoft yahei\' 13px bold;');
        //console.log('\n');

    }

    /**
     * 打印
     * @param args
     */
    public static print( ...args: any[] ): void{
        for(var i: number = 0, len: number = args.length; i < len; ++i ){
            console.log(args[i] + '  ');
        }
    }

    public static error(msg: any): void{
        if(!Global.DEBUG) return;
        console.log(msg + '  \n');
    }

}
