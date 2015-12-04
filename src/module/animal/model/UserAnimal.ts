/**
 * on 2015-04-17
 * by leo
 */

class UserAnimal
{
    public userLivestockId:number;
    public animalId:number;
    public status:number;
    public startDate:number;
    public endDate:number;

    public constructor(data?:any)
    {
        if(data)
        {
            this.userLivestockId = data.userLivestockId;
            this.animalId = data.animalId;
            this.status = data.status;
            this.startDate = data.startDate;
            this.endDate = data.endDate;
        }
        else
        {
            this.userLivestockId = 0;
            this.animalId = 0;
            this.status = 0;
            this.startDate = 0;
            this.endDate = 0;
        }

    }
}