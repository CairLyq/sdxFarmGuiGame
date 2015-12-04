/**
 * Created by rodey on 15/1/28.
 */

class ProductionAnimateModel{

    private static _instance: ProductionAnimateModel;
    public static getInstance(): ProductionAnimateModel{
        if(!ProductionAnimateModel._instance){
            ProductionAnimateModel._instance = new ProductionAnimateModel();
        }
        return ProductionAnimateModel._instance;
    }

    public static init(): void{
        ProductionAnimateModel.initProductionAnimation('building_201_208');
        ProductionAnimateModel.initProductionAnimation('building_209_216');
        //ProductionAnimateModel.initProductionAnimation('smoke');
    }

    /**
     * ====================== 生产建筑 动画 相关 ======================
     */
    public static productionAnimation: any[] = [];

    public static initProductionAnimation (sourceName: string): void{

        ProductionAnimateModel.productionAnimation.push({
            sourceName: sourceName,
            config: RES.getRes(sourceName + '_json'),
            texture: RES.getRes(sourceName + '_png')
        });

    }

}
