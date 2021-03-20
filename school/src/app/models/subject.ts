export class SchoolSubject{
    subjectId: any;
    subjectName: any;
    classId: any;

    constructor(
        subjectId: any,
        subjectName: any,
        classId: any
    ){
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.classId = classId;
    }

    // Getters
    public getSubjectId(): any{
        return this.subjectId;
    }
    public getSubjectName(): any{
        return this.subjectName;
    }
    public getClassId(): any{
        return this.classId;
    }
}