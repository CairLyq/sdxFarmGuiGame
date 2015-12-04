/**
 * Created by Gordon on 09/January/15.
 */
class CookieUtil
{
    public static setCookie( cookie_name, value )
    {
        var cookieValue = cookie_name + '=' + value;
        var cookie = CookieUtil.getCookie( cookie_name );
        if( cookie )
        {
            var allcookies = document.cookie;
            var cookie_pos = allcookies.indexOf(cookie_name);
            var cookie_end = allcookies.indexOf(";", cookie_pos + cookie_name.length ) - 1;

            var begin = allcookies.substring( 0, cookie_pos );
            var end = allcookies.substring( cookie_end, allcookies.length );

            if( 0 == cookie_pos )
            {//第一个位置
                if( -1 == cookie_end )
                {//只有一个
                    document.cookie = cookieValue;
                    return;
                }
                document.cookie = cookieValue + end;
            }
            else
            {
                if( -1 == cookie_end )
                {//是最后一个
                    document.cookie = begin + cookieValue;
                    return;
                }
                document.cookie = begin + cookieValue + end;
            }
        }
        else if( document.cookie && document.cookie.length > 0 )
        {
            document.cookie = document.cookie + ';' + cookieValue;
        }
        else
        {
            document.cookie = cookieValue;
        }
    }

    public static getCookie(cookie_name)
    {
        var allcookies = document.cookie;
        var cookie_pos = allcookies.indexOf(cookie_name);
        if( cookie_pos == -1 )
        {
            return;
        }
        cookie_pos += cookie_name.length + 1;
        var cookie_end = allcookies.indexOf(";", cookie_pos);
        if( cookie_end == -1 )
        {
            return decodeURI(allcookies.substring(cookie_pos, allcookies.length));
        }
        return decodeURI(allcookies.substring(cookie_pos, cookie_end));
    }
}