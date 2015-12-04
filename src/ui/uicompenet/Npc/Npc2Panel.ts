/**
 * Created by rodey on 14/12/3.
 *
 * 购买金币面板
 */

module game{

    export class Npc2Panel extends egret.gui.SkinnableComponent implements IPanel
    {
        private contentGroup:egret.gui.Group;
        private titleDisplay:egret.gui.Label;
        //追加一个 经验的 Label
        public jingYanLabel: egret.gui.Label;
        private _jy: number;

        //追加一个任务进度
        public taskProgressLabel: egret.gui.Label;
        //追加一个 任务说明
        public explainLabel: egret.gui.Label;

        //追加一个 Npc对话内容
        private _message: string;
        //一个打字显示对象
        private typeFont: game.TypeFont;

        private _data: any = {
            title: 'NPC2',
            message: 'Hi小姑娘，我需要一些牛奶高价收购你可以卖给我吗？',
            data: {
                current: 10,
                total: 25,
                exp: '任务完成后，将收取牛奶25瓶',
                list: [
                    //0：经验；1：金币；2：钻石
                    { type: 0, number: 2000 },
                    { type: 2, number: 50 }
                ]
            }
        };

        constructor(title?: string, message?: string, data?: any){
            super();
            this.skinName = skins.uicompenet.Npc.NpcPanelSkin;

            this._message = this._data.message;
        }
        public onShow( ...args: any[] ):void
        {

        }
        public onClose( ...args: any[] ):void
        {
            this.typeFont.stop();
        }
        public onUpdate( ...args: any[] ):void
        {

        }

        public get message(): string{
            return this._message;
        }
        public set message(value: string){
            if(value == this._message)
                return;
            this._message = value;
            if(this.typeFont){
                this.typeFont.update(value);
            }else{
                this.createTypeFont(value);
            }
        }


        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
            if(instance == this.contentGroup){
                //创建任务奖励列表
                this.createAwardList(this._data.data.list);
                //添加一个大小显示对象
                this.createTypeFont(this._message);
                //创建一个领取奖励的按钮
                this.showPullButton(this._data.data.current, this._data.data.total);
            }else if(instance == this.taskProgressLabel){
                //显示当前进度
                this.showProgress(this._data.data.current, this._data.data.total);

            }else if(instance == this.explainLabel){
                //显示任务说明
                this.showExplain(this._data.data.exp);
            }
            else if( instance == this.titleDisplay )
            {
                this.titleDisplay.text = this._data.title;
            }
        }

        /**
         * 显示 任务说明
         * @param text
         */
        private showExplain(text?: string){
            this.explainLabel.text = text || this._data.data.exp;
        }

        /**
         * 显示 任务进度
         * @param current
         * @param total
         */
        private showProgress(current?: number, total?: number){
            var current: number = current || this._data.data.current;
            var total: number = total || this._data.data.total;
            this.taskProgressLabel.text = String(current) + ' / ' + String(total);
        }

        /**
         * 创建 任务完成 「领取奖励」 按钮
         * @param current
         * @param total
         */
        private showPullButton(current?: number, total?: number): void{
            var current: number = current || this._data.data.current;
            var total: number = total || this._data.data.total;
            if(current >= total){
                var pull: egret.gui.Button = new egret.gui.Button();
                pull.skinName = skins.uicompenet.Buttons.NpcButtonSkin;
                pull.label = '领取奖励';
                pull.x = 480;
                pull.y = 452;
                console.log(pull)
                this.contentGroup.addElement(pull);
                pull.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pullAwards, this);
            }
        }

        /**
         * 领取奖励按钮事件 回调
         * @param evt
         */
        private pullAwards(evt: egret.TouchEvent): void{
            GameEvent.BubbEvent(evt);
            console.log('...领取奖励咯...');
        }

        /**
         * 创建 任务奖励 列表
         * @param data
         */
        private createAwardList(data: any): void{
            var awardList: game.AwardAsList = new game.AwardAsList(data);
            this.contentGroup.addElement(awardList);
            awardList.x = 200;
            awardList.y = 458;
        }

        /**
         * 创建 npc 对话
         * @param message
         */
        private createTypeFont(message?: string): void{
            console.log(this._message)
            this.typeFont = new game.TypeFont(message || this._message);
            this.typeFont.x = 17;
            this.typeFont.y = 535;
            this.contentGroup.addElement(new egret.gui.UIAsset(this.typeFont));
        }


    }


}
