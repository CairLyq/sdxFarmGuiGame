/**
 * Created by rodey on 14/12/29.
 */
class UserProduct
{
    public userProductId:number;
    public itemId:number;
    public itemNum:number;
    public startDate:number;
    public endDate:number;
    public status:number;

    public constructor( obj:Object )
    {
        for( var key in obj )
        {
            this[ key ] = obj[ key ];
        }
    }
}