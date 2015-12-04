/**
 * Created by rodey on 15/1/5.
 */

class DepotBuilding extends BuildingIso{

    public controller: DepotController;
    public logic: DepotLogic;

    constructor(pos:Point3D, paramModel:any){
        super(pos, paramModel);

        this.controller = DepotController.instance;
        this.logic = new DepotLogic(this);
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
        DepotController.instance.init(type, this);

    }

}