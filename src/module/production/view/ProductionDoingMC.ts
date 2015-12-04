/**
 * Created by rodey on 15/3/23.
 */


module game{

    export class ProductionDoingMC extends egret.DisplayObjectContainer{

        //配置文件
        private mcJson: string;
        //文理
        private mcPng: string;
        private mcFactory: egret.MovieClipDataFactory;
        private mcDisplay_1: egret.MovieClip;
        private mcDisplay_2: egret.MovieClip;
        private mcName: string;

        private particleJson: string;
        private particlePng: string;
        private particleSystem: particle.GravityParticleSystem;

        constructor(){
            super();

            //尺寸按照 『 SCJZ_dikuanglan.png 』的尺寸
            this.width = 147;
            this.height = 149;

            this.initData();

        }

        private initData(): void{

            //创建粒子
            this.initParticle();

            //创建mc
            this.initMC();

        }

        private initMC(): void{
            this.mcJson = 'fixing_mine_json';
            this.mcPng = 'fixing_mine_png';
            this.mcName = 'producing_elf';

            this.initFactory();
            this.createMC();
        }

        private initParticle(): void{
            this.particleJson = 'product_particle_json';
            this.particlePng = 'product_particle_png';
            this.praticleStart();
        }

        private initFactory(): void{

            this.mcFactory = new egret.MovieClipDataFactory( RES.getRes(this.mcJson), RES.getRes(this.mcPng) );

        }

        private createMC(): void{

            this.mcDisplay_1 = new egret.MovieClip( this.mcFactory.generateMovieClipData(this.mcName) );
            this.addChild(this.mcDisplay_1);
            this.mcDisplay_1.scaleX = 1;
            this.mcDisplay_1.x = 95 + this.mcDisplay_1.width * .5;
            this.mcDisplay_1.y = this.mcDisplay_1.height * .7;


            //this.mcFactory = new egret.MovieClipDataFactory( RES.getRes(this.mcJson), RES.getRes(this.mcPng) );
            this.mcDisplay_2 = new egret.MovieClip( this.mcFactory.generateMovieClipData(this.mcName) );
            this.addChild(this.mcDisplay_2);
            this.mcDisplay_2.anchorX = .5;
            this.mcDisplay_2.scaleX = -1;
            //this.mcDisplay_2.x = 0;
            this.mcDisplay_2.y = this.mcDisplay_2.height * .7;

        }

        private mcTween(): void{

            this.mcDisplay_1.play(-1);
            this.mcDisplay_2.play(-1);
            TweenIt.loopTween( this.mcDisplay_1, { y: this.mcDisplay_1.height * .7 }, { y: 60 }, Math.random() * 500 + 1000 );
            TweenIt.loopTween( this.mcDisplay_2, { y: this.mcDisplay_2.height * .7 }, { y: 60 }, Math.random() * 500 + 1000 );

        }

        public removeTween(): void{
            egret.Tween.removeTweens(this.mcDisplay_1);
            egret.Tween.removeTweens(this.mcDisplay_2);
        }

        //粒子
        private praticleStart(): void{
            if(!this.particleSystem){
                this.particleSystem = new particle.GravityParticleSystem( RES.getRes(this.particlePng), RES.getRes(this.particleJson) );
            }
            this.addChild(this.particleSystem);
            this.particleSystem.anchorOffsetX = this.particleSystem.anchorOffsetY = .5;
            //this.particleSystem.anchorOffsetY = .5;
            this.particleSystem.x = this.width * .5;
            this.particleSystem.y = this.height * .8;

            this.particleSystem.visible = true;
            this.particleSystem.start();
        }

        public removeParticle(): void{
            if(this.particleSystem){
                this.particleSystem.stop();
                this.particleSystem.visible = false;
            }
        }

        //播放
        public play(): void{
            //this.praticleStart();
            this.mcTween();
        }

        public stop(): void{
            this.removeTween();
            //this.removeParticle();
        }


    }

}
