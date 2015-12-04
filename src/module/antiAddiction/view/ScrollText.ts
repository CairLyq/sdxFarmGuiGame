/**
 * Created by Gordon on 16/March/15.
 * @class ScrollText
 * @constructor
 **/
class ScrollText extends egret.DisplayObjectContainer
{
    private tf:egret.TextField;
    private rect:egret.Rectangle;
    private userInfo:UserInfo;

    private count:number = 0;

    public constructor( w:number, h:number )
    {
        super();
        this.userInfo = UserController.instance.getUserData();
        this.tf = new egret.TextField();
        this.addChild( this.tf );
        this.tf.size = 24;
        this.tf.y = 4;


        this.rect = new egret.Rectangle( 0, 0, w, h );
        this.mask = this.rect;
    }

    public stop():void
    {
        this.count = 0;
        egret.Tween.removeTweens( this.tf );
    }

    public sroll():void
    {
        if( this.count >= 3 )
        {
            this.count = 0;
            AntiAddictionTip.instace.hide();
            return;
        }
        this.count++;
        var status:number = UserController.instance.userIdentify.status;
        var str:string;
        if( 0 == this.userInfo.indulge )
        {
            if( 0 == status )
            {
                str = Language.getString( 1, 3 );
            }
            else
            {
                str = Language.getString( 2, 2 );
            }
        }
        else if( 1 == this.userInfo.indulge )
        {
            if( 0 == status )
            {
                str = Language.getString( 1, 4 );
            }
            else
            {
                str = Language.getString( 2, 3 );
            }
        }
        else if( 2 == this.userInfo.indulge )
        {
            if( 0 == status )
            {
                str = Language.getString( 2, 0 );
            }
            else
            {
                str = Language.getString( 2, 4 );
            }
        }

        var title:string = Language.getString( 2, 1 )
        this.tf.textFlow = <Array<egret.ITextElement>>[
            { text:title , style: {"textColor": Color.RED} },
            { text: str }
        ];
        this.tf.x = 0;

        var xx:number = ( this.tf.width / str.length ) * ( str.length + title.length ) - this.rect.width - this.rect.width / 2;

        egret.Tween.get( this.tf ).to( { x:-xx }, 400 * ( str.length + title.length ) ).call( this.sroll, this );
    }
}