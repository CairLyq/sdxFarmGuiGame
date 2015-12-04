/**
 * Created by rodey on 15/3/25.
 */

/**
 * on 2015-03-04
 * by leo
 */

class GuideModel
{
    public guideId: number;

    public step:number;
    public promptType:number;
    public npcPos:string;
    public promptTxt:string;
    //1--click 2--drag
    public fingerType:number;
    public fingerTrack:string[];
    public time:string[];
    public circlePos:string;
    public rewindStep:number;


    public constructor(data:any)
    {
        this.guideId = data.guideId;

        this.step = data.step;
        this.promptType = data.promptType;
        this.npcPos = data.npcPos;
        this.promptTxt = data.promptTxt;
        this.fingerType = data.fingerType;

        var str:string = data.fingerTrack;
        this.fingerTrack = str.split(";");

        str = data.time;
        this.time = str.split(";");

        this.circlePos = data.circlePos;
        this.rewindStep = data.rewindStep;

    }

    //===================================================
    public static getModelByStep(guideId: number, step:number):GuideModel
    {
        var i:number;
        var mm:GuideModel;
        var re:GuideModel;
        for(i = 0; i < this.itemList.length; i++)
        {
            mm = this.itemList[i];
            if(mm.guideId == guideId && mm.step == step)
            {
                re = mm;
            }
        }

        return re;
    }


    //===================================================
    public static itemList:Array<GuideModel> = [];

    public static init(data:any):void
    {
        var i:number;
        var mm:GuideModel;
        for(i = 0; i < data.length; i++)
        {
            mm = new GuideModel(data[i]);
            GuideModel.itemList.push(mm);
        }
    }
}
