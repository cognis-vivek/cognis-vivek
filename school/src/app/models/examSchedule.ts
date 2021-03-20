export class ExamSchedule{
    index: any;
    examId: any;
    examDate: any;
    startTime: any;
    endTime: any;
    subjectId: any;
    subjectName: any;
    classId: any;
    class_Name: any;
    sectionId: any;
    sectionHouseName: any;
    examTypeId: any;
    examTypeName: any;
    totalMarks: any;
    passMarks: any;

    constructor(
        index: any,
        examId: any,
        examDate: any,
        startTime: any,
        endTime: any,
        subjectId: any,
        subjectName: any,
        classId: any,
        class_Name: any,
        examTypeId: any,
        examTypeName: any
    ){
        this.index = index;
        this.examId = examId;
        this.examDate = examDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.classId = classId;
        this.class_Name = class_Name;
        this.examTypeId = examTypeId;
        this.examTypeName = examTypeName;
    }

    // Getters
    public getIndex(): any{
        return this.index;
    }

    public getExamId(): any{
        return this.examId;
    }

    public getExamDate(): any{
        return this.examDate;
    }

    public getStartTime(): any{
        return this.startTime;
    }

    public getEndTime(): any{
        return this.endTime;
    }

    public getSubjectId(): any{
        return this.subjectId;
    }

    public getSubjectName(): any{
        return this.subjectName;
    }

    public getClassId(): any{
        return this.classId;
    }

    public getClassName(): any{
        return this.class_Name;
    }

    // public getSectionId(): any{
    //     return this.sectionId;
    // }

    // public getSectionHouseName(): any{
    //     return this.sectionHouseName;
    // }

    public getExamTypeId(): any{
        return this.examTypeId;
    }

    public getExamTypeName(): any{
        return this.examTypeName;
    }

    public getTotalMarks(): any{
        return this.totalMarks;
    }

    public getPassMarks(): any{
        return this.passMarks;
    }

}