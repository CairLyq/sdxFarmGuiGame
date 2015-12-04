/**
 * Created by Gordon on 22/12/14.
 */
class PanelName
{
    public static ORDER_PANEL:number = Enum.start();
    public static PERSONAL_PANEL:number = Enum.next();
    public static PRODUCTION_PANEL:number = Enum.next();
    public static TASK_PANEL:number = Enum.next();

    public static ROADSITE_PANAEL:number = Enum.next();
    public static DEPOT_PANEL:number = Enum.next();
    public static DEPOT_EXTEND_PANEL:number = Enum.next();
    public static BUY_JB_PANEL:number = Enum.next();
    public static BUY_ZS_PANEL:number = Enum.next();

    public static EVERY_TASK_PANEL:number = Enum.next();
    public static NPC_PANEL:number = Enum.next();
    public static NPC2_PANEL:number = Enum.next();
    public static SHOPPING_PANEL:number = Enum.next();
    public static SETTING_PANEL:number = Enum.next();

    public static SOLD_DOWN_PANEL:number = Enum.next();
    public static SOLDUP_PANEL:number = Enum.next();
    public static FRIEND_PANEL:number = Enum.next();
    public static CONFIRM_PANEL:number = Enum.next();
    public static BUY_GODDS_CONFIRM_PANEL:number = Enum.next();
    public static BOAT_PANEL:number = Enum.next();

    //商店通用面板
    public static SHOP_CATE_PANEL:number = Enum.next();


    //收取物品面板
    public static DEPOT_HARVEST_PANEL:number = Enum.next();

    //升级面板
    public static USER_UPGRADE_PANEL: number = Enum.next();

    //播种面板
    public static SEED_PANEL:number = Enum.next();
    public static TOOLS_PANEL:number = Enum.next();
    public static PROGRESS_PANEL:number = Enum.next();


    //养殖
    //public static BREEDING_PLANT_PANEL:number = Enum.next();
    public static TIME_PROGRESS:number = Enum.next();


    //养殖v2
    //public static BREEDING_PANEL_V2:number = Enum.next();

    //SocketErrorPanel
    public static SOCKET_ERROR_PANEL:number = Enum.next();

    //旅行商人
    public static MERCHANT_PERSON_PANEL: number = Enum.next();
    //即将用掉最后一份提示
    public static SHOW_ITEM_TIPS_PANEL: number = Enum.next();

    public static MINE_TOOL_PANEL: number = Enum.next();

    public static ACHIEVEMENT_PANEL: number = Enum.next();
    public static ACHIEVE_OPEN_PANEL: number = Enum.next();

    //村民卖东西
    public static VILLAGER_SELL_PANEL: number = Enum.next();
    //公告
    public static NOTICE_PANEL: number = Enum.next();
    public static ANTIADDICTION_PANEL: number = Enum.next();
    //修改昵称
    public static MODIFY_NICK_NAME_PANEL: number = Enum.next();

    public static AIRSHIP_PANEL:number = Enum.next();
    public static AIRSHIP_WAIT_PANEL:number = Enum.next();

    //签到奖励
    public static SIGNIN_REWARD_PANEL: number = Enum.next();
    public static LOGIN_REWARD_PANEL: number = Enum.next();


    public static ANIMAL_PANEL: number = Enum.next();




    /** 所有面板个数*/
    public static PANEL_NUM:number = Enum.next();
    public static PANEL_CLASS:any[] = [];
    public static init():void
    {
        PanelName.PANEL_CLASS[ PanelName.ORDER_PANEL] = game.OrderPanel;
        PanelName.PANEL_CLASS[ PanelName.PERSONAL_PANEL ] = game.PersonalPanel;
        PanelName.PANEL_CLASS[ PanelName.PRODUCTION_PANEL ] = game.ProductionPanel;
        PanelName.PANEL_CLASS[ PanelName.TASK_PANEL ] = game.MainTask;

        PanelName.PANEL_CLASS[ PanelName.ROADSITE_PANAEL ] = game.RoadsitePanael;
        PanelName.PANEL_CLASS[ PanelName.DEPOT_PANEL ] = game.DepotPanel;
        PanelName.PANEL_CLASS[ PanelName.DEPOT_EXTEND_PANEL ] = game.DepotExtendPanel;
        PanelName.PANEL_CLASS[ PanelName.BUY_JB_PANEL ] = game.BuyJBPanel;
        PanelName.PANEL_CLASS[ PanelName.BUY_ZS_PANEL ] = game.BuyZSPanel;

        PanelName.PANEL_CLASS[ PanelName.EVERY_TASK_PANEL ] = game.EveryTaskPanel;
        PanelName.PANEL_CLASS[ PanelName.NPC_PANEL ] = game.NpcPanel;
        PanelName.PANEL_CLASS[ PanelName.NPC2_PANEL ] = game.Npc2Panel;
        PanelName.PANEL_CLASS[ PanelName.SHOPPING_PANEL ] = game.ShoppingPanel;
        PanelName.PANEL_CLASS[ PanelName.SETTING_PANEL ] = game.SettingPanel;

        PanelName.PANEL_CLASS[ PanelName.SOLD_DOWN_PANEL ] = game.SoldDownPanel;
        PanelName.PANEL_CLASS[ PanelName.SOLDUP_PANEL ] = game.SoldUpPanel;
        PanelName.PANEL_CLASS[ PanelName.FRIEND_PANEL ] = game.FriendPanel;
        PanelName.PANEL_CLASS[ PanelName.CONFIRM_PANEL ] = game.ConfirmPanel;
        PanelName.PANEL_CLASS[ PanelName.BUY_GODDS_CONFIRM_PANEL ] = game.BuyGoodsConfirmPanel;
        PanelName.PANEL_CLASS[ PanelName.BOAT_PANEL ] = game.BoatPanel;

        PanelName.PANEL_CLASS[ PanelName.SEED_PANEL ] = game.SeedPanel;
        PanelName.PANEL_CLASS[ PanelName.TOOLS_PANEL ] = game.ToolsPanel;

        //PanelName.PANEL_CLASS[ PanelName.TIME_PROGRESS ] = game.TimeProgress;

        PanelName.PANEL_CLASS[ PanelName.USER_UPGRADE_PANEL ] = game.UserUpgradePanelV2;
        PanelName.PANEL_CLASS[ PanelName.DEPOT_HARVEST_PANEL ] = game.DepotHarvest;
        PanelName.PANEL_CLASS[ PanelName.SHOP_CATE_PANEL ] = game.ShopCatePanel;
        PanelName.PANEL_CLASS[ PanelName.SOCKET_ERROR_PANEL ] = game.SocketErrorPanel;
        PanelName.PANEL_CLASS[ PanelName.MERCHANT_PERSON_PANEL ] = game.MerchantPersonPanel;
        PanelName.PANEL_CLASS[ PanelName.SHOW_ITEM_TIPS_PANEL ] = game.ShowItemTipsPanel;

        PanelName.PANEL_CLASS[ PanelName.MINE_TOOL_PANEL ] = game.MineToolPanel;
        PanelName.PANEL_CLASS[ PanelName.ACHIEVEMENT_PANEL ] = view.AchievementPanel;
        PanelName.PANEL_CLASS[ PanelName.ACHIEVE_OPEN_PANEL ] = view.AchievementOpenPanel;


        PanelName.PANEL_CLASS[ PanelName.VILLAGER_SELL_PANEL ] = game.VillagerSellPanel;


        PanelName.PANEL_CLASS[ PanelName.NOTICE_PANEL ] = game.NoticePanel;
        PanelName.PANEL_CLASS[ PanelName.ANTIADDICTION_PANEL ] = view.AntiAddictionPanel;

        PanelName.PANEL_CLASS[ PanelName.MODIFY_NICK_NAME_PANEL ] = game.ModifyNickNamePanel;
        PanelName.PANEL_CLASS[ PanelName.AIRSHIP_PANEL ] = view.AirshipPanel;
        PanelName.PANEL_CLASS[ PanelName.AIRSHIP_WAIT_PANEL ] = view.AirshipWaitPanel;

        PanelName.PANEL_CLASS[ PanelName.SIGNIN_REWARD_PANEL ] = game.SignInRewardPanel;
        PanelName.PANEL_CLASS[ PanelName.LOGIN_REWARD_PANEL ] = game.LoginRewardPanel;

        PanelName.PANEL_CLASS[ PanelName.ANIMAL_PANEL ] = game.AnimalPanel;

    }
}