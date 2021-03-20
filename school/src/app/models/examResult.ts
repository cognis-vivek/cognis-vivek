import { ExamSubjectDetails } from "./examSubject";
import { Subject } from 'rxjs';

export class ExamResult{
    index: any;
    typeOfExamId: any;
    classId: any;
    studentName: any;
    regdNo: any;
    classname: any;
    typeofExamName: any;
    studentId: any;
    examresultId: any;
    percentage: any;
    totalMarks: any;
    scoredMarks: any;
    grade: any;
    passmarks: any;
    examSubjectArr: ExamSubjectDetails[] = [];
    examSubjectArrChanged = new Subject<ExamSubjectDetails[]>();


    constructor(
        index: any,
        typeOfExamId: any,
        classId: any,
        studentName: any,
        regdNo: any,
        classname: any,
        typeofExamName: any,
        studentId: any,
        examresultId: any,
        percentage: any,
        totalMarks: any,
        scoredMarks: any,
        grade: any,
        passmarks: any,
        examSubjectArr: any
    ){
        this.index = index;
        this.typeOfExamId = typeOfExamId;
        this.classId = classId;
        this.studentName = studentName;
        this.regdNo = regdNo;
        this.classname = classname;
        this.typeofExamName = typeofExamName;
        this.studentId = studentId;
        this.examresultId = examresultId;
        this.percentage = percentage;
        this.totalMarks = totalMarks;
        this.scoredMarks = scoredMarks;
        this.grade = grade;
        this.passmarks = passmarks;
        this.examSubjectArr = examSubjectArr;
    }

    // Getters
    public getIndex(): any{
        return this.index;
    }
    public getTypeOfExamId(): any{
        return this.typeOfExamId;
    }
    public getClassId(): any{
        return this.classId;
    }
    public getStudentName(): any{
        return this.studentName;
    }
    public getRegdNo(): any{
        return this.regdNo;
    }
    public getClassName(): any{
        return this.classname;
    }
    public getTypeOfExamName(): any{
        return this.typeofExamName;
    }
    public getStudentId(): any{
        return this.studentId;
    }
    public getExamResultId(): any{
        return this.examresultId;
    }
    public getPercentage(): any{
        return this.percentage;
    }
    public getTotalMarks(): any{
        return this.totalMarks;
    }
    public getScoredMarks(): any{
        return this.scoredMarks;
    }
    public getGrade(): any{
        return this.grade;
    }
    public getPassMarks(): any{
        return this.passmarks;
    }
    public getExamSubjectArr(): any{
        this.examSubjectArrChanged.next(this.examSubjectArr);
        return [...this.examSubjectArr];
    }
}