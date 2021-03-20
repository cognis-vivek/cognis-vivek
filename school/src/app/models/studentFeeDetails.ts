export class StudentFeeDetails{
    index: any;
    className: any;
    classId: any;
    totalAmount: any;
    paymentFinalDate: any;
    dueAmount: any;
    studentId: any;
    studentName: any;
    regdNo: any;

    constructor(
        index: any,
        className: any,
        classId: any,
        totalAmount: any,
        paymentFinalDate: any,
        dueAmount: any,
        studentId: any,
        studentName: any,
        regdNo: any
    ){
        this.index = index;
        this.className = className;
        this.classId = classId;
        this.totalAmount = totalAmount;
        this.paymentFinalDate = paymentFinalDate;
        this.dueAmount = dueAmount;
        this.studentId = studentId;
        this.studentName = studentName;
        this.regdNo = regdNo;
    }

    // Getters
    public getIndex(): any{
        return this.index;
    }

    public getClassName(): any{
        return this.className;
    }
    public getClassId(): any{
        return this.classId;
    }
    public getTotalAmount(): any{
        return this.totalAmount;
    }
    public getPaymentFinalDate(): any{
        return this.paymentFinalDate;
    }
    public getDueAmount(): any{
        return this.dueAmount;
    }
    public getStudentId(): any{
        return this.studentId;
    }
    public getStudentName(): any{
        return this.studentName;
    }
    public getStudentRegdNo(): any{
        return this.regdNo;
    }

}