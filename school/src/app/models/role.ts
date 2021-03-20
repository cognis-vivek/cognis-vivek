export class Role{
    roleId: any;
    constructor(roleId: any){
        this.roleId = roleId;
    }
    // Getters 
    public getRoleId(): any{
        return this.roleId;
    }
    // Setters
    public setRoleId(roleId: any){
        this.roleId = roleId;
    }
    
}