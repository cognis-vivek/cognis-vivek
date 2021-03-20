import { Role } from "./role";

export class Parent{
    role: any;
    fatherPhoneNO: any;
    motherPhoneNO: any;
    fatherName: any;
    motherName: any;


    constructor(
        role: any,
        fatherPhoneNO: any,
        motherPhoneNO: any,
        fatherName: any,
        motherName: any
    ){
        this.role = role;
        this.fatherPhoneNO = fatherPhoneNO;
        this.motherPhoneNO = motherPhoneNO;
        this.fatherName = fatherName;
        this.motherName = motherName;
    }

    // Getters
    public getRole(): any{
        return this.role;
    }

    public getFatherPhoneNo(): any{
        return this.fatherPhoneNO;
    }

    public getMotherPhoneNo(): any{
        return this.motherPhoneNO;
    }

    public getFatherName(): any{
        return this.fatherName;
    }

    public getMotherName(): any{
        return this.motherName;
    }
}