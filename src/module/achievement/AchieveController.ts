/**
 * Created by Gordon on 10/March/15.
 */
class AchieveController
{
    private static point:egret.Point;

    public static recieve( id:number, point:egret.Point ):void
    {
        AchieveController.point = point;
        var data:Object = {"act":"Trophy.receive", "dt":{"id":id}};
        SocketManager.instance.send( JSON.stringify( data ), false );
    }
    public static onRecieve( data:Object ):void
    {
        model.UserTrophy.updateUserTrophy( data[ 'userTrophy' ] );
        GameEvent.watcher.dispatchEventWith( GameEvent.RES_CHANGE, true, new ResChange( 0, data[ 'diamond' ], data[ 'exp' ], AchieveController.point ) );
    }
    public static getUserTrophies():void
    {
        var data:Object = { "act":"Trophy.getUserTrophies" };
        SocketManager.instance.send( JSON.stringify( data ), false );
    }
}