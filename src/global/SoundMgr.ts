/**
 * Created by rodey on 15/2/3.
 */

class SoundMgr{

    private static _instance: SoundMgr;

    //背景音乐
    public bgSound: egret.Sound;
    public bgVolume: number;

    //音效
    public audioSound: egret.Sound;
    public audioVolume: number;

    public audioCache:Object = {};


    constructor()
    {
        var self = this;

    }

    public static get instance(): SoundMgr{
        if(!SoundMgr._instance){
            SoundMgr._instance = new SoundMgr();
        }
        return SoundMgr._instance;
    }

    public init(): void{

        this.bgSound = RES.getRes(SoundName.BG_SOUND);
        this.playBGSound( true );

        //this.audioSound = new egret.Sound();
        this.bgVolume = Global.BG_VOLUME;
        this.audioVolume = Global.AU_VOLUME;

    }

    public playBGSound(loop: boolean = false):void
    {
        if( null == this.bgSound )
        {
            return;
        }
        this.bgSound.play(loop);
        this.bgSound.setVolume(Global.BG_VOLUME);
    }

    public get bgVol(): number{ return this.bgVolume; }
    public set bgVol(value: number){
        if(value == this.bgVolume)
            return;
        this.bgVolume = value / 100;
        this.bgSound.setVolume(value / 100);
        /*if(value == 0){
            this.bgSound.pause();
        }else{
            this.bgSound.setVolume(value / 100);
        }*/
    }

    public get audioVol(): number{ return this.audioVolume; }
    public set audioVol(value: number){
        if(value == this.audioVolume)
            return;
        this.audioVolume = value / 100;
        this.audioSound.setVolume(value / 100);
    }


    public playAudio(src: string, loop: boolean = false): void{
        var audio: egret.Sound;
        var self = this;

        if(Global.AU_VOLUME === 0){
            return;
        }

        if(this.audioCache[ src ]){
            audio = this.audioCache[ src ];
        }
        else
        {

            RES.getResAsync(src, function(){
                audio = RES.getRes( src );
                self.audioCache[ src ] = audio;
                try{
                    audio.setVolume(self.audioVol);
                    audio.pause();
                    audio.play(loop);
                }catch (e){}
            }, this);

            return;
        }

        try{
            audio.setVolume(this.audioVol);
            audio.pause();
            audio.play(loop);
        }catch (e){}
    }

    public stopAudio(src): void{
        var audio: egret.Sound;

        if(this.audioCache[ src ]){
            audio = this.audioCache[ src ];
            audio.pause();
        }
    }
}
