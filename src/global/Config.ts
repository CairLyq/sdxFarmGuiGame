/**
 * on 2014-12-18
 * by leo
 */

module game.config{

    export function getConfig(): any{


        //定义全局配置
        var config = {
            DEBUG: false, //是否开启debug
            XHR_TYPE: 'POST',   //接口http的请求方式 POST 、GET
            //是否开启自动检查(开启后，页面打开将会去检查当前账号是否存在)
            //若不存在，则会请求后台自动注册一个账号
            CHECK_ACCOUNT: false,
            BASE: 'http://api.server.com',  //后台接口地址
            PATH: 'Payaccount',             //后台项目名称
            _STURL_: game.config.getLocalHerf(),  //模板和css文件域地址(默认不需要配置)
            TEMPLATE: 'templates/viewTemplate.html',    //html模板文件地址(默认不需要配置)
            CSS: 'css/app.min.css',              //css样式文件地址(默认不需要配置)
            //本地调试接口地址
            WEB_SERVER_URL: {
                //注册---自动生成账号
                'register': 'data/reg.json',
                //登录
                'login': 'data/login.json',
                //获取短信验证码
                'sendMScode': 'data/sendMScode.json',
                //绑定手机号
                'bindPhone': 'data/bindPhone.json',
                //判断手机号是否已经绑定过了
                'phoneIsBind': 'data/phoneIsBind.json',
                //修改密码
                'modPwd': 'data/modPwd.json',
                //设置密码
                'setPwd': 'data/setPwd.json',
                //通过绑定的手机号找回密码
                'findPwdByPhone': 'data/findPasswprdByPhone.json',
                //充值
                topUp: 'data/topUp.json',
                //获取充值类型
                'chargeStatus': 'data/topUp.json',
                //查询余额
                queryBalance: 'data/balance.json',
                //购买商品，创建订单
                buyDiamond: 'data/bugDiamond.json'

            }
        };


        var urls = {
            //注册---自动生成账号
            'register': 'payaccount/fastreg',
            //登录
            'login': 'payaccount/login',
            //获取短信验证码
            'sendMScode': 'payaccount/sendphonecode',
            //绑定手机号
            'bindPhone': 'payaccount/bindphone',
            //判断手机号是否已经绑定过了
            'phoneIsBind': 'payaccount/phoneIsBind',
            //修改密码
            'modPwd': 'payaccount/resetpwd',
            //设置密码
            'setPwd': 'payaccount/setpwd',
            //通过手机找回密码
            'findPwdByPhone': 'payaccount/findPasswprdByPhone',
            //充值
            'topUp': 'payaccount/topup',
            //获取充值类型
            'chargeStatus': 'payaccount/chargeStatus',
            //查询余额
            queryBalance: 'payaccount/querybalance',
            //购买商品，创建订单
            buyDiamond: 'payaccount/buygoods'
        };

        config.BASE = "http://" + Global.IP + Global.WEB_PORT;
//        config.BASE = "http://" + Global.IP + ":8080";
//        config.BASE = 'http://192.168.1.22:8080';
        config.PATH = 'farm-web';
        config.WEB_SERVER_URL = urls;

        return config;
    }


    export function getLocalHerf(): string{
        var s: string = '';
        var herf: string = window.location.href;
        var port: string = window.location.port;
        var protocol: string = window.location.protocol;
        var host: string = window.location.host;
        var path: string = window.location.pathname;

        s = protocol + '//' + host;
//        return s = 'http://farm.gamexun.com/farm-web/sdxFarmGuiGame/resource/assets/otherLibs/Payaccount/';
//        return s = 'http://farm.gz.1251113881.clb.myqcloud.com/html5/resource/assets/otherLibs/Payaccount/';
        return s = 'http://farm.gz.1251113881.clb.myqcloud.com/net/html5/resource/assets/otherLibs/Payaccount/';
//      return s = 'http://www.rodey.me/Game/sdxFarmGuiGame/resource/assets/gamexunLogin/Payaccount/';
    }

    export function getConsoleImg(): string {
        return 'http://farm.gz.1251113881.clb.myqcloud.com/net/html5/launcher/logo.png';
    }

}