/**
 * on 2015-04-14
 * by leo
 */

class UserRubbish
{
    public userRubbishId:number;
    public rubbishId:number;
    public position:string;

    public constructor(data:any)
    {
        this.userRubbishId = data.userRubbishId;
        this.rubbishId = data.rubbishId;
        this.position = data.position;
    }
}