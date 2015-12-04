/**
 * Created by rodey on 15/3/3.
 */

module MovieClipMgr{

    export function createMC(json: any, png: string, mcName: string): egret.MovieClip{

        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory( RES.getRes(json), RES.getRes(png) );
        var mcDisplay: egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData(mcName) );
        //mcDisplay.stop();

        return mcDisplay;

    }

    export function playMC( mc: egret.MovieClip, playTimes: number = -1 ): void{
        if(!mc) return;

        mc.play(playTimes);
    }

    export function stopMC( mc: egret.MovieClip ): void{
        if(!mc) return;

        mc.stop();
    }

    export function gotoAndPlayMC( mc: egret.MovieClip, frame: any = null ): void {
        if(!mc) return;

        mc.gotoAndPlay(frame);
    }

    export function gotoAndStopMC( mc: egret.MovieClip, frame: any = null ): void{
        if(!mc) return;

        mc.gotoAndStop(frame);

    }

    export function createRestoreBuildMC( mcName: string ): egret.MovieClip{

        return MovieClipMgr.createMC(  Global.RESTORE_BUILD_JSON, Global.RESTORE_BUILD_PNG, mcName );

    }

    export function hideMC( mc: egret.MovieClip ): void{
        if(!mc) return;

        mc.stop();
        mc.visible = false;

    }

    export function showMC( mc: egret.MovieClip ): void{
        if(!mc) return;

        mc.visible = true;
        MovieClipMgr.playMC(mc);

    }


}
