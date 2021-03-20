import { timeStamp } from "console";

export class FeeConfig{
    configId: any;
    value: any;
    status: any;

    constructor(
        configId: any,
        value: any,
        status: any
    ){
        this.configId = configId;
        this.value = value;
        this.status = status;
    }

    // Getters 
    public getConfigId(): any{
        return this.configId;
    }

    public getValue(): any{
        return this.value;
    }

    public getStatus(): any{
        return this.status;
    }

}