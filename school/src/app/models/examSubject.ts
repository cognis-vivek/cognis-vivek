export class ExamSubjectDetails{
    subjectId: any;
    subjectName: any;
    totalMarks: any;
    scoredMarks: any;
    passmarks: any;

    constructor(
        subjectId: any,
        subjectName: any,
        totalMarks: any,
        scoredMarks: any,
        passmarks: any
    ){
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.totalMarks = totalMarks;
        this.scoredMarks = scoredMarks;
        this.passmarks = passmarks;
    }
}