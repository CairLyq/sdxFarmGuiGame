/**
 * Created by rodey on 14/12/31.
 */

class PersonController{

    private static _instance: PersonController;
    public static getInstance(): PersonController{
        if(!PersonController._instance){
            PersonController._instance = new PersonController();
        }
        return PersonController._instance;
    }

    private dataObject: any = {
        title: '个人信息',
        message: '每天都感觉自己萌萌哒',
        data: {
            user: null,
            avatar: RES.getRes('touxiang'),
            sign: '每天都感觉自己萌萌哒!',
            list: [
                {label: '名称不要太长哦1', info: '偷走了我的农产品1', date: '2014-12-04 8:53', avatar: 'touxiang'},
                {label: '名称不要太长哦2', info: '偷走了我的农产品2', date: '2014-12-05 9:53', avatar: 'touxiang'},
                {label: '名称不要太长哦3', info: '偷走了我的农产品3', date: '2014-12-06 10:53', avatar: 'touxiang'},
                {label: '名称不要太长哦4', info: '偷走了我的农产品4', date: '2014-12-07 11:53', avatar: 'touxiang'},
                {label: '名称不要太长哦5', info: '偷走了我的农产品5', date: '2014-12-08 12:53', avatar: 'touxiang'}
            ]
        }
    };

    public userController: UserController;
    private _data: any;

    constructor(){
        if(!this.userController){
            this.userController = UserController.instance;
            this._data = this.userController.getUserData();
            this.dataObject.data.user = this._data;
        }
    }

    public init(): void{

        this.open();
    }

    public open(){
        //console.log('点击了用户头像......');
        UIMgr.instance.show( PanelName.PERSONAL_PANEL, { "direction":Direction.CENTER } );
    }

    /**
     * 获取NPC
     * @returns {{title: any, message: any}}
     */
    public getNpc(): any{
        return {
            title: this.dataObject.title,
            message: this.dataObject.message
        }
    }


    public recomData(): any{

        return this.dataObject;
    }

}
