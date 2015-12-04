/**
 * Created by Gordon on 10/March/15.
 * @class UserTrophy
 * @constructor
 **/
module model
{
    export class UserTrophy
    {
        public static userTrophies:Array<UserTrophy> = [];

        /**
         * 	int	配置id
         */
        id:number;
        /**
         * 	int	完成次数
         */
        finishTimes:number;
        /**
         * 	int	状态,0未完成,1可领取
         */
        status:number;
        /**
         * 	int	等级0,1,2,3,4,5
         */
        level:number;
        public constructor( obj:Object )
        {
            for( var key in obj )
            {
                this[ key ] = obj[ key ];
            }
        }
        public static initUserTrophies( data:Object[] ):void
        {
            if( null == data || UserTrophy.userTrophies.length > 0 )
            {
                UserTrophy.updateUserTrophies( data );
                return;
            }
            var length:number = data.length;
            for( var i:number = 0; i < length; i++ )
            {
                UserTrophy.userTrophies.push( new UserTrophy( data[ i ] ) );
            }
            UserTrophy.hasAward();
        }
        /**
         * 每次打开面板请求数据更新,请到数据立即显示面板
         * */
        public static updateAllTrophies( data:Object[] ):void
        {
            UserTrophy.updateUserTrophies( data );

//            UIMgr.instance.show( PanelName.ACHIEVE_OPEN_PANEL, { "direction":Direction.CENTER } );//测试代码
            UIMgr.instance.show( PanelName.ACHIEVEMENT_PANEL, { "direction":Direction.CENTER } );
        }
        public static updateUserTrophies( data:Object[] ):void
        {
            if( null == data || UserTrophy.userTrophies.length == 0 )
            {
                return;
            }
            var length:number = data.length;
            for( var i:number = 0; i < length; i++ )
            {
                UserTrophy.updateUserTrophy( data[ i ], false );
            }

            var panel = UIMgr.instance.getPanel( PanelName.ACHIEVEMENT_PANEL );
            panel.refreshItems();

            UserTrophy.hasAward();
        }
        public static updateUserTrophy( data:Object, update:boolean = true ):void
        {
            if( null == data )
            {
                return;
            }
            if( update )
            {
                var panel = UIMgr.instance.getPanel( PanelName.ACHIEVEMENT_PANEL );
            }
            var list:Array<UserTrophy> = UserTrophy.userTrophies;
            var length:number = list.length;
            for( var i:number = 0; i < length; i++ )
            {
                if( data[ 'id' ] == list[ i ].id )
                {
                    for( var key in data )
                    {
                        list[ i ][ key ] = data[ key ];
                    }
                    if( update )
                    {
                        panel.refreshItems();
                        UserTrophy.hasAward();
                    }
                    return;
                }
            }
        }

        /**
         * 记录所有已经完成的成就，以便逐个显示成就开放面板PanelName.ACHIEVE_OPEN_PANEL
         * @type {Array}
         */
        public static showId:Array<number> = [];
        public static hasAward( showPanel:boolean = true ):void
        {
            var list:Array<UserTrophy> = UserTrophy.userTrophies;
            var length:number = list.length;
            for( var i:number = 0; i < length; i++ )
            {
                if( 1 != list[ i ].status )
                {
                    continue;
                }

                var building = GetBuildingUtils.getInstance().getBuildingByBuildingId( BuildingID.ACHIEVEMENT );
                if( null != building )
                {
                    building.showHasAward();
                }
                if( -1 == UserTrophy.showId.indexOf( list[ i ].id )  )
                {
                    UserTrophy.showId.push( list[ i ].id );
                    if( showPanel )
                    {
                        UIMgr.instance.show( PanelName.ACHIEVE_OPEN_PANEL, { "direction":Direction.CENTER } );
                    }
                    return;
                }
            }
        }
        public static getAwardData():UserTrophy
        {
            var list:Array<UserTrophy> = UserTrophy.userTrophies;
            var length:number = list.length;
            for( var i:number = 0; i < length; i++ )
            {
                if( 1 != list[ i ].status )
                {
                    continue;
                }
                if( UserTrophy.showId.length < 1 )
                {
                    return list[ i ];
                }
                else if( UserTrophy.showId[ UserTrophy.showId.length - 1 ] == list[ i ].id )
                {
                    return list[ i ];
                }
            }
            return null;
        }
    }
}