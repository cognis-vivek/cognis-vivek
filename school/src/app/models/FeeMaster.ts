export class FeeMaster{
    index: any;
    masterFeeId: any;
    configId: any;
    configValue: any;
    classId: any;
    className: any;
    nameOfFeeId: any;
    nameOfFee: any;
    amountOfFee: any;
    dueDate: any;

    constructor(
        index: any,
        masterFeeId: any,
        configId: any,
        configValue: any,
        classId: any,
        className: any,
        nameOfFeeId: any,
        nameOfFee: any,
        amountOfFee: any,
        dueDate: any
    ){
        this.index = index;
        this.masterFeeId = masterFeeId;
        this.configId = configId;
        this.configValue = configValue;
        this.classId = classId;
        this.className = className;
        this.nameOfFeeId = nameOfFeeId;
        this.nameOfFee = nameOfFee;
        this.amountOfFee = amountOfFee;
        this.dueDate = dueDate;
    }


    // Getters
    public getIndex(): any{
        return this.index;
    }
    public getMasterFeeId(): any{
        return this.masterFeeId;
    }

    public getConfigId(): any{
        return this.configId;
    }

    public getConfigValue(): any{
        return this.configValue;
    }

    public getClassId(): any{
        return this.classId;
    }

    public getClassName(): any{
        return this.className;
    }

    public getNameOfFeeId(): any{
        return this.nameOfFeeId;
    }

    public getNameOfFee(): any{
        return this.nameOfFee;
    }

    public getAmountOfFee(): any{
        return this.amountOfFee;
    }

    public getDueDate(): any{
        return this.dueDate;
    }

}