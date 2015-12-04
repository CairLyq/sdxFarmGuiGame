/**
 * Created by Gordon on 12/March/15.
 * @class AntiAddictionPanel
 * @constructor
 **/
module view
{
    export class AntiAddictionPanel extends egret.gui.SkinnableComponent implements game.IPanel
    {
        private isChildrenCreated:boolean = false;
        public static isShow:boolean = false;
        private closeBtn:egret.gui.UIAsset;
        private commitBtn:egret.gui.Group;
        private cancelBtn:egret.gui.Group;
        private nameLabel:egret.gui.EditableText;
        private idLabel:egret.gui.EditableText;

        public constructor()
        {
            super();
            this.skinName = skins.uicompenet.antiAddiction.AntiAddictionSkin;

            this.init();
        }

        /**
         * 初始化
         **/
        private init()
        {

        }

        public onShow( ...args:any[] ):void
        {
            if( !this.isChildrenCreated )
            {
                return;
            }
            this.closeBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.clickHandler, this );
            this.commitBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onCommit, this );
            this.cancelBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.clickHandler, this );

            AntiAddictionPanel.isShow = true;
        }

        public onClose( ...args:any[] ):void
        {
            this.closeBtn.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.clickHandler, this );
            this.commitBtn.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.onCommit, this );
            this.cancelBtn.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.clickHandler, this );

            AntiAddictionPanel.isShow = false;
        }

        public onUpdate( ...args:any[] ):void
        {

        }

        private clickHandler( e:egret.TouchEvent ):void
        {
            TweenIt.tweenBigThenNormal( e.target, ()=>{ UIMgr.instance.closeCurrentPanel(); } );
        }
        private onCommit( e:egret.TouchEvent ):void
        {
            var cardName:string = this.nameLabel.text;
            var id:string = this.idLabel.text;

            if( cardName.length < 2 )
            {
                TipText.instace.play( Language.getString( 2, 5 ) );
                return;
            }

            if( !this.isChinese( cardName ) )
            {
                TipText.instace.play( Language.getString( 1, 6 ) );
                return;
            }
            if( !this.isIdCardNo( id ) )
            {
                return;
            }
            if( cardName.length <= 0 )
            {
                TipText.instace.play( Language.getString( 1, 2 ) );
                return;
            }
            if( id.length <= 0 )
            {
                TipText.instace.play( Language.getString( 1, 2 ) );
                return;
            }
            this.clickHandler( e );
            AntiAddictionController.verify( cardName, id );
            AntiAddictionTip.instace.hide();

            TipText.instace.play( Language.getString( 1, 5 ) );
        }

        private isIdCardNo( num )
        {
            num = num.toUpperCase();
            //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
            if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)))
            {
                TipText.instace.play( Language.getString( 1, 7 ) );
                return false;
            }
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            //下面分别分析出生日期和校验位
            var len, re;
            len = num.length;

            if( len == 15 )
            {
                re = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
                var arrSplit = num.match(re);
                //检查生日日期是否正确
                var dtmBirth:Date = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
                var bGoodDay;
                bGoodDay = ( dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
                if (!bGoodDay)
                {
                    TipText.instace.play( Language.getString( 1, 8 ) );// '输入的身份证号里出生日期不对！'
                    return false;
                }
                else
                {
                    //将15位身份证转成18位
                    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                    var nTemp = 0, i;
                    num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                    for(i = 0; i < 17; i ++)
                    {
                        nTemp += num.substr(i, 1) * arrInt[i];
                    }

                    num += arrCh[nTemp % 11];

                    return num;
                }
            }
            if( len == 18 )
            {
                re = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
                var arrSplit = num.match(re);
                //检查生日日期是否正确
                var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
                var bGoodDay;
                bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));

                if (!bGoodDay)
                {
                    TipText.instace.play( Language.getString( 1, 8 ) + dtmBirth.getFullYear() + ';' + arrSplit[2] );
                    return false;
                }
                else
                {
                //检验18位身份证的校验码是否正确。
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                    var valnum;
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                    var nTemp = 0, i;
                    for(i = 0; i < 17; i ++)
                    {
                        nTemp += num.substr(i, 1) * arrInt[i];
                    }

                    valnum = arrCh[nTemp % 11];

                    if (valnum != num.substr(17, 1))
                    {
                        TipText.instace.play( Language.getString( 1, 9 ) + valnum );
                        return false;
                    }
                    return num;
                }
            }
            return false;
        }

        private isChinese( str:string ):boolean
        {
            return /^[\u4e00-\u9fa5]+$/.test( str );
        }

        public childrenCreated():void
        {
            this.isChildrenCreated = true;
            this.onShow();
        }
    }
}