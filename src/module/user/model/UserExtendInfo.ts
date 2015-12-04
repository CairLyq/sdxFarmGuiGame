/**
 * Created by rodey on 15/2/4.
 */

class UserExtendInfo{

    private static _instance: UserExtendInfo;
    public sign: string;
    public guideStep: any;

    //===Guide===
    public farmStep: number = 0;
    public breedStep: number = 0;
    public produceStep: number = 0;
    public plasticStep: number = 0;
    public villagerStep: number = 0;
    public orderStep: number = 0;
    public taskStep: number = 0;

    constructor(){
        this.sign = '';
        this.guideStep = null;

    }

    public setData( data: any ): void
    {
        if( null == data )
        {
            return;
        }
        this.sign = data.sign;
        this.guideStep = data.guideStep;

        this.setGuideStep();

    }

    //新手引导  设置步骤
    private setGuideStep(): void{

        var step:number = 0;
        //种植
        if(this.guideStep <= FarmGuideController.BASE + FarmGuideController.LAST_STEP)
        {
            this.guideStep = Math.max(this.guideStep, FarmGuideController.BASE);
            step = this.guideStep - FarmGuideController.BASE;
            this.farmStep = step;
            return;
        }
        else
        {
            this.farmStep = FarmGuideController.LAST_STEP + 1;
        }
        //养殖
        if(this.guideStep <= BreedGuideController.BASE + BreedGuideController.LAST_STEP)
        {
            this.guideStep = Math.max(this.guideStep, BreedGuideController.BASE);
            step = this.guideStep - BreedGuideController.BASE;
            this.breedStep = step;
            return;
        }
        else
        {
            this.breedStep = BreedGuideController.LAST_STEP + 1;
        }
        //生产面包
        if(this.guideStep <= ProductGuideController.BASE + ProductGuideController.LAST_STEP)
        {
            this.guideStep = Math.max(this.guideStep, ProductGuideController.BASE);
            step = this.guideStep - ProductGuideController.BASE;
            this.produceStep = step;
            return;
        }
        else
        {
            this.produceStep = (ProductGuideController.LAST_STEP + 1);
        }
        //饲料机
        if(this.guideStep <= PlasticGuideController.BASE + PlasticGuideController.LAST_STEP)
        {
            this.guideStep = Math.max(this.guideStep, PlasticGuideController.BASE);
            step = this.guideStep - PlasticGuideController.BASE;
            this.plasticStep = step;
            return;
        }
        else
        {
            this.plasticStep = (PlasticGuideController.LAST_STEP + 1);
        }
        //村民
        if(this.guideStep <= VillagerGuideController.BASE + VillagerGuideController.LAST_STEP)
        {
            this.guideStep = Math.max(this.guideStep, VillagerGuideController.BASE);
            step = this.guideStep - VillagerGuideController.BASE;
            this.villagerStep = step;
            return;
        }
        else
        {
            this.villagerStep = (VillagerGuideController.LAST_STEP + 1);
        }
        //订单
        if(this.guideStep <= OrderGuideController.BASE + OrderGuideController.LAST_STEP)
        {
            this.guideStep = Math.max(this.guideStep, OrderGuideController.BASE);
            step = this.guideStep - OrderGuideController.BASE;
            this.orderStep = step;
            return;
        }
        else
        {
            this.orderStep = (OrderGuideController.LAST_STEP + 1);
        }

        //任务
        if(this.guideStep <= TaskGuideController.BASE + TaskGuideController.LAST_STEP)
        {
            this.guideStep = Math.max(this.guideStep, TaskGuideController.BASE);
            step = this.guideStep - TaskGuideController.BASE;
            this.taskStep = step;
            return;
        }
        else
        {
            this.taskStep = (TaskGuideController.LAST_STEP + 1);
        }


    }


    public static getInstance(): UserExtendInfo{
        if(!UserExtendInfo._instance){
            UserExtendInfo._instance = new UserExtendInfo();
        }
        return UserExtendInfo._instance;
    }

    public static get instance(): UserExtendInfo{
        return UserExtendInfo.getInstance();
    }

}
