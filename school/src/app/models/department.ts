export class Department{
    roleId: any;
    departmentId: any;
    department: any

    constructor(
        roleId: any,
        departmentId: any,
        department: any
    ){
        this.roleId = roleId;
        this.departmentId = departmentId;
        this.department = department;
    }

    // Getters
    public getRoleId(): any{
        return this.roleId;
    }

    public getDepartmentId(): any{
        return this.departmentId;
    }

    public getDepartment(): any{
        return this.department;
    }
}