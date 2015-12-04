/**
 * Created by rodey on 14/11/17.
 */

class GameUtils{

    constructor(){}

    /**
     * 将字符串转换成二进制
     * @param str
     * @returns {Array}
     * @constructor
     */
    public static StringToArray(str: string): any{
        var rs = [];
        ([].slice.call(str)).forEach(function(c){
            rs.push(c.charCodeAt(0).toString(2));
        });
        return rs;
    }

    /**
     * 将进制数据转换成字符串
     * @param bins
     * @returns {string}
     */
    public static binToString(bs: string, byteCode?: number): string{
        var bins: string[] = bs.split(',');
        var rs: string = '';
        for(var i = 0; i < bins.length; ++i){
            var charCode: number = this.formatBin(bins[i], byteCode);
            rs += String.fromCharCode(charCode);
        }
        return rs;
    }

    /**
     * 将json字符串转换成对象
     * @param bs
     * @returns {Object}
     */
    public static binToObject(bs: string, byteCode?: number): any{
        var rs: any;
        rs = GameUtils.binToString(bs, byteCode);
        try{
            rs = JSON.parse(rs);
        }catch(e){}
        return rs;
    }

    /**
     * 解析单个字节流
     * @param bin
     * @returns {number}
     */
    public static formatBin(bin: string, byteCode?: number): number{
        var ds: number = 0;
        var byteCode: number = byteCode || 2;   //默认为二进制
        for(var i = bin.length - 1; i >= 0; --i){
            ds += parseInt(bin[i], 10) * Math.pow(byteCode, bin.length - 1 - i);
        }
        return ds;
    }

    /**
     * 根据 名称取得对应的 行和列
     * @param name   map_grid_1_2; 1行2列这个位置
     * @returns {{row: number, col: number}}
     */
    public static getRowAndColByName(name: string): any{
        var grid = { row: 0, col: 0};
        var ma: any = name.match(/\d/ig);
        if(ma){
            grid = { row: ma[0], col: ma[1]};
        }
        return grid;
    }

    /**
     * 根据屏幕尺寸获取当前地图格子的总行和总列数
     * @param stage egret.MainContext.instance.stage
     * @returns {{row: number, col: number}}
     */
    public static getRowAndColByWindow(stage: any = egret.MainContext.instance.stage): any{
        var sw = stage.stageWidth,
            sh = stage.stageHeight;
        var grid = { row: 0, col: 0 };
        grid.row = Math.floor(sw / 100);
        grid.col = Math.floor(sh / 50);
        return grid;
    }

    /**
     * 根据下标删除数组元素
     * @param array
     * @param index
     * @returns {any}
     */
    public static removeArrayByIndex(array: any, index: number): any{
        var index: number = index;
        var data: any = array;
        var n: number = 1, len: number = data.length;
        data.splice(index, n);
        return data;
    }

    /**
     * 删除数组中指定的元素
     * @param array
     * @param item
     */
    public static removeArrayByItem(array: any[], item: any): void{
        for(var i: number = 0; i < array.length; ++i){
            if(array[i] == item){
                array.splice(i, 1);
            }
        }
    }

    /**
     * 随机生产汉字
     * @param len
     * @returns {string}
     */
    public static getRandomString(len?: number): string{
        var len: number = len || 6;
        var i: number = 0;
        var chars: string = 'abcdefghjkmnpqrstuvwsyABCDEFGHJKMNPQRSTUVWSY23456789';
        var name: string = '';
        while(i < len){
            ++i;
            name += chars[Math.round(Math.random() * (chars.length - 1))];
        }
        return name;
    }


    /**
     * 获取本地游戏用户信息
     * @returns {any}
     */
    public static getSdkUserData():any
    {
        var user: any;
        var data = window.localStorage.getItem('sdkUserData');
        try
        {
            user = JSON.parse(data);
        }
        catch(e){}
        return user;
    }
    public static getToken():string
    {
        var token:string = window.localStorage.getItem('token');
        if( null != token )
        {
            return token;
        }
        var sdkUserData = GameUtils.getSdkUserData();
        if( null != sdkUserData && null != sdkUserData.token )
        {
            return sdkUserData.token;
        }
        return null;
    }
    public static getUserId(): number{
        var user: any = GameUtils.getSdkUserData();
        return (user && user.userid);
    }
    /**
     * 获取本地游戏帐号信息
     * @param value
     * @returns {string}
     */
    public static getGameUserData():any{
        var user:string = window.localStorage.getItem('gameUser');
        try
        {
            user = JSON.parse(user);
        }
        catch(e){}
        return user;
    }

    /**
     * 查找指定的值是否存在list中
     * @param id
     * @param list
     * @param key
     * @returns {boolean}
     */
    public static isItemAsList(item: any, list: any[], key?: string): boolean{
        if(!item || !list) return false;
        var key: string = key || 'itemId';
        var i: number = 0, len: number = list.length;
        for( ; i < len; ++i){
            if(item[key] == list[i][key]){
                return true;
            }
        }
        return false;
    }

    /**
     * 更新list的指定元素
     * @param item
     * @param list
     * @param key
     * @returns {any[]}
     */
    public static updateItemAsList(item: any, list: any[], key?: string): any[]{
        if(!item || !list) return;
        var key: string = key || 'itemId';
        var list: any[] = list;
        var i: number = 0, len: number = list.length;
        for( ; i < len; ++i){
            if(item[key] == list[i][key]){
                list[i] = GameUtils.copyData(item);
            }
        }
        return list;
    }

    /**
     * 在指定的一组数据中通过每隔key来获取key所对应的对象
     * @param id
     * @param lists
     * @returns {*}
     */
    public static getModelById(key: string, id:any, lists: any[]):any{
        var i:number = 0, len:number = lists.length;
        var one:any;
        for(i = 0; i < len; ++i)
        {
            one = lists[i];
            if(one[key] == id)
            {
                return one;
            }
        }
        return null;
    }

    /**
     * 根据字符串或者正则分割字符串
     * @param str
     * @param space
     * @returns {string[]}
     */
    public static getListBySpace(str: string, space: any): any[]{
        return str.split(space);
    }

    public static copyData(value: any, data?: any): any{
        var data: any = data || {};
        for(var key in value){
            if(value.hasOwnProperty(key)){
                data[key] = value[key];
            }
        }
        return data;
    }

    public static trim(value: string): string{
        return value.replace(/^\s*|\s*$/gi, '');
    }

    public static getItem(value: string): any{

        var result: string = window.localStorage.getItem(value);

        try{
            result = JSON.parse(result);
        }catch (e){}

        return result;

    }

    public static indexOf(arr: any[], value: any): boolean{
        for(var i: number = 0, len: number = arr.length; i < len; ++i ){
            if(value == arr[i]){
                return true;
            }
        }
        return false;
    }

    /**
     * 数据去重
     * @param data
     * @returns {any[]}
     */
    public static uniqueArray(data: any[]){
        var data: any[] = data || [];
        var a: any = {};
        for (var i: number = 0; i < data.length; ++i) {
            var v: any = data[i];
            if (typeof(a[v]) == 'undefined'){
                a[v] = 1;
            }
        }
        data.length = 0;
        for (var k in a){
            data[data.length] = k;
        }
        return data;
    }


    public static getListForArrayKey(arr: any[], key: string): any[]{

        if(!arr || !arr.length || arr.length === 0) return;

        var data: any[] = [],
            i: number = 0,
            len: number = arr.length;

        for( ; i < len; ++i ){
            data.push(arr[i][key]);
        }

        return data;

    }

    public static getBrowser(agent: string): boolean{

        var ua: string = navigator.userAgent.toUpperCase();
        if(ua.indexOf(agent.toUpperCase()) !== -1){
            return true;
        }
        return false;
    }


}
