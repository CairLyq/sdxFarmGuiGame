/**
 * Created by rodey on 15/1/5.
 */

class DepotItem extends BuildingIso{

    public depotController: DepotController;

    constructor(pos:Point3D, paramModel:any){
        super(pos, paramModel);

        this.depotController = DepotController.instance;
    }

    public show(): void{
        super.show();
        var type: number;
        if(this.model.buildingId == 2){
            //粮仓
            type = 1;
        }else if(this.model.buildingId == 3){
            //货仓
            type = 2;
        }
        DepotController.instance.init(type);
    }

}