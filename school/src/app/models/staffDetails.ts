export class StaffDetails{
    schoolId: any;
    departmentId: any;
    staffId: any;
    experience: any;
    joiningDate: any;
    fatherName: any;
    motherName: any;

    constructor(
        schoolId: any,
        departmentId: any,
        staffId: any,
        experience: any,
        joiningDate: any,
        fatherName: any,
        motherName: any
    ){
        this.schoolId = schoolId;
        this.departmentId = departmentId;
        this.staffId = staffId;
        this.experience = experience;
        this.joiningDate = joiningDate;
        this.fatherName = fatherName;
        this.motherName = motherName;
    }

    // get school Id
    public getSchoolId(): any{
        return this.schoolId;
    }
    public getDepartmentId(): any{
        return this.departmentId;
    }

    public getStaffId(): any{
        return this.staffId;
    }

    public getExperience(): any{
        return this.experience;
    }

    public getJoiningDate(): any{
        return this.joiningDate;
    }

    public getFatherName(): any{
        return this.fatherName;
    }

    public getMotherName(): any{
        return this.motherName;
    }

}