import { Role } from "./role";

export class Parent{
    role: any;
    userId: any;
    guardianName: any;
    guardianPhoneNo: any;
    fatherPhoneNO: any;
    motherPhoneNO: any;
    fatherName: any;
    motherName: any;
    password: any;


    constructor(
        role: any,
        userId: any,
        guardianName: any,
        guardianPhoneNo: any,
        fatherPhoneNO: any,
        motherPhoneNO: any,
        fatherName: any,
        motherName: any,
        password: any
    ){
        this.role = role;
        this.userId = userId;
        this.guardianName = guardianName;
        this.guardianPhoneNo = guardianPhoneNo;
        this.fatherPhoneNO = fatherPhoneNO;
        this.motherPhoneNO = motherPhoneNO;
        this.fatherName = fatherName;
        this.motherName = motherName;
        this.password = password;
    }

    // Getters
    public getRole(): any{
        return this.role;
    }

    public getGuardianName(): any{
        return this.guardianName;
    }

    public getGuardianPhoneNo(): any{
        return this.guardianPhoneNo;
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

    public getPassword(): any{
        return this.password;
    }
}