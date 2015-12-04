/**
 * by Rodey
 *
 * 这个是为了在TypeScript中可以直接调用而准备的d.ts接口文件
 * 第三方类库可以参照tsd （http://definitelytyped.org/tsd/）
 */

interface templateStatic{
    version?: number;
    cache?: any;

    config(name?: string, value?: any): any;
    render(source: string, options?: any): string;
    renderFile(filename: string, data?: any): string;
    get(filename: string): any;
    helper(name: string, helper: Function): any;
    compile(source: string, options?: any): Function;

}
//NodeJS中可用
declare module 'template'{
    export = templateStatic;
}
declare var template: templateStatic;

/**
 * utils 接口定义
 */
interface utils{
    trim(val: string): string;
    strimHtmlTag(val?: string): string;
    getItem(key: string, flagInt?: number): any;
    setItem(key: string, value?: any, flagInt?: number): any;
    hasItem(key: string, flagInt?: number): any;
    removeItem(key: string, flagInt?: number): any;
    removeAll(flagInt?: number): any;
    doRequest(url: string, postData: any, su?: Function, fail?: Function, options?: any): any;
    doAjax(url: string, postData: any, su?: Function, fail?: Function, options?: any): any;
    isEmail(val: string): boolean;
    isURL(val: string): boolean;
    isTel(val: string): boolean;
    isMobile(val: string): boolean;
    isZip(val: any): boolean;
    getParams(name: string): any;
    Cookie(key: string, value?: any, options?: any): any;
    generateChars(len?: number): string;
    dateFm(n: number): any;
    setDateFormat(timestamp: string, flag?: boolean): any;
}

/**
 * Payaccount 接口定义
 * 当以module的形式定义
 *
 *  tipDialog
 *  uitls
 *  checkAccount
 */

declare module PayAccount{

    /**
     * Zepto || jQuery
     */
    var $: ZeptoStatic;
    var Zepto: ZeptoStatic;

    /**
     * Payaccount.utils 接口定义
     */
    var utils: utils;

    /**
     * Payaccount.tipDialog 接口定义
     */

    function tipDialog(options?: any): void;

    /**
     *
     * @param content
     * @param options
     */

    function simpScroller(content: any, options?: any): void;

    /**
     * 主体 checkAccount类定义
     */
    class checkAccount{
        //constructor
        constructor(config?: any);

        /*== props ==*/
        config: any;
        isInit: boolean;
        isAuthoration: boolean;
        buyReturn: boolean;
        token: string;
        payCatetorys: any;
        goodsData: any;
        sm_balance: number;
        money_balance: number;

        isPost: boolean;
        balance: number;

        sdkUserID: string;
        isPayaccount: boolean;
        payCategory: string;    //默认支付宝充值
        payType: string; //如果是充值卡；默认 电信充值卡
        payMoney: number;



        //_getWebServer(name: string): string;
        //_queryBalance(dom: any, cb: Function): number;

        init(): any;
        render(): any;
        appendToMainContiner(dom: any): any;
        appendCss(cssfile: string): any;
        hideORremoveDom(id: any, cb: Function, flag: boolean): any;
        showDomAStimeout(id: any, time: number, cb: Function): any;
        transformTo(id: any, x: number, y: number, z: number, flag: boolean): any;

        setGameUserData(data:any): any;
        insertItemFormUserData(key: string, value: any): any;
        queryItemFormUserData(key: string): any;

        tokener(token?: string): any;
        getToken(): string;
        setToken(token: string): any;
        userid(userid?: number): any;
        getUserId(): any;
        setUserId(userid: any): any;

        setBindPhoneStatus(isBindPhone: number): any;
        getBindPhoneStatus(): number;

        getWebServerUrl(name: string): string;
        loginAgainAsToken(): any;

        //初始化 检查账号是否存在
        initCheckPayaccount(id?: any): any;
        checkPayaccount(): any;
        showCheckPayaccount(): any;
        removeRegisterOrSign(): any;
        payaccountAction(): any;

        //初始化 登录 ====
        initLoginPayaccount(id?: any): any;
        loginAction(): any;
        showSign(): any;
        showLoginAccountInfo(username: any): any;
        removeLoginAccountInfo(): any;
        postLoginServer(evr: Event): any;

        //初始化 自动注册账号 =
        initRegsterPayaccount(id?: any): any;
        registerAction(): any;
        showRegister(): any;
        postRegisterServer(url?: string, postData?: any): any;
        removeRegisterLoginCheck(types?: string, res?: any): any;
        showRegisterAccountInfo(res: any): any;
        removeAccountInfo(indent: string, cb?: Function): any;

        //初始化手机绑定 ===
        initBindMobile(id: any): any;
        unBindMobile(evt: Event): any;
        bindMobile(evt?: Event, type?: string): any;
        showBindMobile(): any;
        getMScode(evt: Event, type?: string): any;
        bindSubmit(evt: Event): any;
        removeBindMobile(evt: Event, cb?: Function): any;

        //+++ 找回密码 ++++
        initRepeatPassword(id: any): any;
        repeatPasswordAction(): any;
        showRepeatPassword(): any;
        removeRepeatPassword(): any;
        repeatPasswordPostSever(evt: Event): any;

        //+账号管理 模板+
        initManagerAccount(id: any): any;
        managerAction(): any;
        showManagerAccount(): any;
        removeManagerAccount(evt?: Event): any;
        openManagerAccountOther(id: string): any;

        //初始化修改密码层 =
        initModPassword(id?: any): any;
        modPassword(evt?: Event, type?: string): any;
        showModPwdAccount(type?: string): any;
        postModPwdServer(evt?: Event, type?: string): any;
        removeModPwdAccount(evt?: Event): any;

        //初始化 切换账号 ===
        initSwitchAccount(id?: any): any;
        switchAccout(evt?: Event): any;

        //+购买++
        buyDiamond(diamondNum: number, diamondMoney: number, goodsid: any, goodsname: string, goodsnum: number): any;
        showBuyDiamond(diamondNum: number, diamondMoney: number, goodsid: any, goodsname: string, goodsnum: number): any;
        buyDiamondAsBalance(evt?: Event): any;
        removeBuyDiamond(): any;
        postBuyDiamondServer(body: any): any;

        //+支付相关+=
        initPay(id: any): any;
        payAction(evt: Event, typeSTR?: string): any;
        showPay(): any;
        selectTab(evt: Event): any;
        selectCard(evt: Event): any;
        selectItem(evt: Event): any;
        postPayServer(evt: Event): any;
        removePay(evt: Event): any;
        resetTransformTo(dom: any): any;
        postAlipayServer(type: string, money: number): any;
        payIframeAction(url: string): any;
        showPayIframe(url: string): any;
        removePayIframe(cb?: Function): any;
        getChargeStatus(cb?: Function): any;

        /*=======充值卡充值=======*/
        showCardPay(type: string, money: number): any;
        returnPay(evt?: Event): any;
        postCardPayServer(evt?: Event): any;
        showPayCardSubmit(): any;
        showPaySuccess(res: any): any;
        returnGame(): any;
    }

}




