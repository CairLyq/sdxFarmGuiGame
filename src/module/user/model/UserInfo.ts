/**
 * on 2014-12-10
 * by leo
 */
class UserInfo
{
    public diamond:number;
    public exp:number;
    public gold:number;
    public imgUrl:string;
    public level:number;
    public name:string;
    public sign:string;
    /**
     * 总经验 - 当前等级经验值
     */
    public expGap:number;
    /**
     * 下一等级经验值
     */
    public nextExp:number;
    /**
     * 0代表男；1代表女。
     */
    public sex:number;

    //100001577

    public userId:number;
    public vipLevel:number;

    /**
     * 	int	沉迷程度 0:表示0~3小时（ 10800 秒）, 1：表示3~5小时(18000秒）,2：超过5小时
     */
    indulge:number;
    /**
     * 	int	在线时间秒
     * 	沉迷程度 0:0~3小时（ 10800 秒）, 1：3~5小时(18000秒）,2：超过5小时
     */
    onlineTime:number;

    public constructor(obj:Object)
    {
        for( var key in obj )
        {
            this[key] = obj[key];
        }
    }

    public reset( obj:Object ):void
    {
        for( var key in obj )
        {
            this[key] = obj[key];
        }
    }
}