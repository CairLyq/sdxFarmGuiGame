/**
 * Created by rodey on 15/1/12.
 */

class UserModel{

    private static _instance:UserModel;

    public static getInstance():UserModel
    {
        if(!UserModel._instance)
        {
            UserModel._instance = new UserModel();
        }
        return UserModel._instance;
    }

    public static fmItemList:Array<UserModel> = [];
    public static frItemList_woman:Array<UserModel> = [];
    public static frItemList_man:Array<UserModel> = [];
    public static mgcItemList: any[] = [];

    private familyName:string;
    private firstName:string;
    private sex:number;

    constructor(){

        this.familyName = '';
        this.firstName = '';
        this.sex = 1;

    }

    private setFMData(data: any): void{
        this.familyName = data.familyName;
    }

    private setFRData(data: any): void{
        this.firstName = data.firstName;
        this.sex = data.sex;
    }

    public static init(): void{
        //加载配置
        UserModel.initFamilyNames(RES.getRes("CfgFamilyname"));
        UserModel.initFirstNames(RES.getRes("CfgWomanName"), 1);
        UserModel.initFirstNames(RES.getRes("CfgManName"), 0);
        UserModel.initMgc(RES.getRes("CfgMgc"));

    }

    public static initMgc(data: any[]): void{
        this.mgcItemList = data;
    }

    public static initFamilyNames(data:any[])
    {
        var i:number = 0,
            len:number = data.length;
        var item:UserModel;
        if(data && len)
        {
            for(; i < len; ++i)
            {
                item = new UserModel();
                item.setFMData(data[i]);
                UserModel.fmItemList.push(item);
            }
        }
    }

    public static initFirstNames(data:any[], sex: number = 1)
    {

        var i:number = 0,
            len:number = data.length;
        var item:UserModel;
        if(data && len)
        {
            for(; i < len; ++i)
            {
                item = new UserModel();
                item.setFRData(data[i]);
                if(sex == 1)
                    UserModel.frItemList_woman.push(item);
                else
                    UserModel.frItemList_man.push(item);
            }
        }
    }




    /**
     * 获取随机昵称配置
     * @param len
     * @returns {any}
     */
    public static getRandomName(len: number = 8, sex: number = 1): any{


        var fa_item: string = UserModel.getFamilyName();
        var fr_item: any = UserModel.getFirstName(sex);
        var object: any = {
            name: fr_item.firstName + ' ' + fa_item,
            sex: fr_item.sex
        };
        //console.log('[ UserModel ] ---> getRandomName: ', object);
        if(object.name.length > len){
            object.name = object.name.substr(0, len);
        }
        return object;
    }

    public static getFamilyName(): string{
        //姓
        var family_names: any[] = UserModel.fmItemList;
        return family_names[(Math.floor(Math.random() * (family_names.length)))].familyName;
    }

    public static getFirstName(sex: number = 1): any{
        //名
        if(sex == 1){
            return UserModel.frItemList_woman[(Math.floor(Math.random() * (UserModel.frItemList_woman.length)))];
        }else{
            return UserModel.frItemList_man[(Math.floor(Math.random() * (UserModel.frItemList_man.length)))];
        }
    }


    public static videMgcName(name: string): boolean{

        for(var i = 0, len = this.mgcItemList.length; i < len; ++i){
            if(this.mgcItemList[i]['minganci'].indexOf(GameUtils.trim(name)) !== -1){
                return true;
            }
        }
        return false;
    }

}