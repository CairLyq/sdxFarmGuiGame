/**
 * Created by rodey on 15/3/12.
 */

module game{

    export class NoticeItemRender extends egret.gui.ItemRenderer{

        public contentLabel: egret.gui.Label;
        public newButton: egret.gui.Button;
        public goButton: egret.gui.Button;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Main.NoticeItemSkin;
        }

        public dataChanged(){
            super.dataChanged();

            if(this.data){

                this.label = this.data.title || '';
                this.contentLabel.text = this.data.content || '';
                this.newButton.visible = Boolean(Number(this.data.status));

                this.goButton.visible = (!this.data.action || '' == this.data.action) ? false : true;

            }

            var offsetTop: number = (!this.data.action || '' == this.data.action) ? 0 : 60;
            var height: number = 200;

            if(this.contentLabel.text.match(/\n/gi).length !== 0){
                //console.log(this.contentLabel.text.match(/\n/gi).length);
                height = Math.ceil(this.contentLabel.text.length / 21) * 31 + offsetTop;
                height += this.contentLabel.text.match(/\n/gi).length * 15;
            }else{
                height = Math.ceil(this.contentLabel.text.length / 21) * 31 + offsetTop;
            }

            if(height <= 200){
                height = 200;
            }

            this.height = height;

            //console.log(this.height);

        }

        public childrenCreated(): void{
            super.childrenCreated();

            if(this.goButton){
                this.goButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoPanel, this);
            }

        }

        public partAdded(partName: string, instance: any): void{
            super.partAdded(partName, instance);
        }

        public gotoPanel(evt: egret.TouchEvent): void{

            var target: egret.gui.UIAsset = evt.currentTarget || evt.target,
                self = this;

            TweenIt.tweenBigThenNormal(target, function(){

                UIMgr.instance.closeCurrentPanel(function(){

                    GameEvent.watcher.dispatchEventWith(GameEvent.NOTIVE_GOTO, true, self.data.action);
                });

            });
            console.log(this.data.action);

        }


    }

}
