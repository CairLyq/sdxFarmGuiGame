/**
 * Created by Gordon on 30/12/14.
 */
class NPCModel extends ItemIsoModel
{
    public static itemList:Array<NPCModel> = [];

    public npcId:number;
    public npcName:string;
    public standFront:string;
    public standBack:string;
    public walkFront:string;
    public walkBack:string;

    /**
     * NPC头像图片url
     */
    public head:string;
    /**
     * NPC立身图片url
     */
    public body:string;

    public minStandTime:number;
    public maxStandTime:number;
    public minStep:number;
    public maxStep:number;
    public vx:number;
    public vy:number;

    /**
     * 状态提示
     */
    public emotionSatisfied:string;
    public emotionWalking:string;
    public emotionRejected:string;

    public constructor(data:any)
    {
        super(data);

        this.npcId = data.npcId;
        this.npcName = data.npcName;
        this.standFront = data.standFront;
        this.standBack = data.standBack;
        this.walkFront = data.walkFront;
        this.walkBack = data.walkBack;
        this.head = data.head;
        this.body = data.body;

        this.minStandTime = data.minStandTime;
        this.maxStandTime = data.maxStandTime;
        this.minStep = data.minStep;
        this.maxStep = data.maxStep;
        this.vx = data.vx;
        this.vy = data.vy;

        this.emotionRejected = data.emotionRejected;
        this.emotionWalking = data.emotionWalking;
        this.emotionSatisfied = data.emotionSatisfied;

        this.row = 1;
        this.col = 1;
    }

    public static init(data:any):void
    {
        var i:number;
        var mm:NPCModel;
        for(i = 0; i < data.length; i++)
        {
            mm = new NPCModel(data[i]);
            NPCModel.itemList.push(mm);
        }
    }

    public static getNPCById(id:number):NPCModel
    {
        var i:number;
        var one:NPCModel;
        for(i = 0; i < NPCModel.itemList.length; i++)
        {
            one = NPCModel.itemList[i];
            if(one.npcId == id)
            {
                return one;
            }
        }
        return null;
    }

    /*public static getNPCByBuildingId(id:number):NPCModel
     {
     var i:number;
     var one:NPCModel;
     for(i = 0; i < NPCModel.itemList.length; i++)
     {
     one = NPCModel.itemList[i];
     if( one.buildingId == id )
     {
     return one;
     }
     }
     return null;
     }*/

    public static START_NPC_IDX:number = 2;
    public static END_NPC_IDX:number = 11;

    public static getModelInRange():NPCModel
    {
        return this.itemList[RandUtils.getValInRange(this.START_NPC_IDX, this.END_NPC_IDX)];
    }

    public static getModels(num:number):NPCModel[]
    {
        var i:number;
        var idx:number;
        var tmp:NPCModel;
        var re:NPCModel[] = [];

        for(i = 0; i < num; i++)
        {
            idx = RandUtils.getValInRange(this.START_NPC_IDX + i, this.END_NPC_IDX);
            re.push(this.itemList[idx]);

            tmp = this.itemList[this.START_NPC_IDX + i];
            this.itemList[this.START_NPC_IDX + i] = this.itemList[idx];
            this.itemList[idx] = tmp;
        }

        return re;
    }

    public static getRandomNPC():string
    {
        return this.itemList[Math.floor(Math.random() * this.itemList.length)]['npcName'];
    }
}
