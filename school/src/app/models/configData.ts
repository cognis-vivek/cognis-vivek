export class ConfigData{
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
    public getConfigID(): any{
        return this.configId;
    }

    public getValue(): any{
        return this.value;
    }

    public getSytatus(): any{
        return this.status;
    }

    
}