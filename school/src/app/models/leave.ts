export class Leave{
    index: any;
    adminStaffId: any;
    classTeacherId: any;
    userId: any;
    typeOfLeavesId: any;
    name: any;
    startDate: any;
    endDate: any;
    totalDays: any;
    reason: any;
    leaveStatus: any;
    typeOfLeave: any;
    leavesId: any;

    constructor(
        index: any,
        adminStaffId: any,
        classTeacherId: any,
        userId: any,
        typeOfLeavesId: any,
        name: any,
        startDate: any,
        endDate: any,
        totalDays: any,
        reason: any,
        leaveStatus: any,
        typeOfLeave: any,
        leavesId: any
    ){
        this.index = index;
        this.adminStaffId = adminStaffId;
        this.classTeacherId = classTeacherId;
        this.userId = userId;
        this.typeOfLeavesId = typeOfLeavesId;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalDays = totalDays;
        this.reason = reason;
        this.leaveStatus = leaveStatus;
        this.typeOfLeave = typeOfLeave;
        this.leavesId = leavesId;
    }
}