export class SubjectSyllabus{
    subjectId: any;
    subjectName: any;
    classId: any;
    subjectContent: any;
    optional: any;
    syllabusFile: any;

    constructor(
        subjectId: any,
        subjectName: any,
        classId: any,
        subjectContent: any,
        optional: any,
        syllabusFile: any
    ){
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.classId = classId;
        this.subjectContent = subjectContent;
        this.optional = optional;
        this.syllabusFile = syllabusFile;
    }

    // getters
    public getSubjectId(): any{
        return this.subjectId;
    }
    public getSubjectName(): any{
        return this.subjectName;
    }
    public getClassId(): any{
        return this.classId;
    }
    public getSubjectContent(): any{
        return this.subjectContent;
    }
    public getOptional(){
        return this.optional;
    }
    public getSyllabusFile(): any{
        return this.syllabusFile;
    }
    

}