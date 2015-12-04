/**
 * Created by Gordon on 13/April/15.
 * @class Pay
 * @constructor
 **/
class Pay
{
    public static createOrder( cent:number = 1 ):void
    {
        window[ 'pay' ]( cent, UserController.instance.getUserId() );
    }
}