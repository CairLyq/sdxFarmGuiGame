/**
 * Created by rodey on 14/12/16.
 *
 * 创建任务奖励列表
 *
 */

module game{

    export class AwardAsList extends egret.gui.Group{

        private _list: any;

        constructor(list?: any){
            super();

            this._list = list;

            this.render();

        }

        private render(): void{
            var i: number = 0;
            var len: number = this._list.length;
            for(; i < len; ++i){
                var item: any = this._list[i];
                var itemAward: egret.gui.Button = new egret.gui.Button();
                itemAward.skinName = skins.uicompenet.Npc.NpcAwardSkin;
                itemAward.icon = (this.getType(item.type) );
                itemAward.label = String(item.number);
                this.addElement(itemAward);
                itemAward.x = i * (100 + 20);
                itemAward.y = 0;
            }
        }


        private getType(type: number): string{
            if(type == 0){
                return 'ZJMER-jinyan'; //经验
            }else if(type == 1){
                return 'MRRW-jinbi';     //金币
            }else if(type == 2){
                return 'zhuanshi';  //钻石
            }
        }


    }

}
