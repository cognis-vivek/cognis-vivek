export class NameOfFee{
    nameOfFeeId: any;
    nameOfFee: any;

    constructor(
        nameOfFeeId: any,
        nameOfFee: any
    ){
        this.nameOfFeeId = nameOfFeeId;
        this.nameOfFee = nameOfFee;
    }

    // Getters
    public getNameOfFeeId(): any{
        return this.nameOfFeeId;
    }

    public getNameOfFee(): any{
        return this.nameOfFee;
    }
}