export class Assignment{
    index: any;
    teacherId: any;
    classId: any;
    sectionId: any;
    assignDateTime: any;
    assignCompleteDateTime: any;
    description: any;
    completionStatus: any;
    assignmentId: any;
    subjectId: any;
    subjectName: any;
    className: any;
    sectionHouseName: any;
    title: any;

    constructor(
        index: any,
        teacherId: any,
        classId: any,
        sectionId: any,
        assignDateTime: any,
        assignCompleteDateTime: any,
        description: any,
        completionStatus: any,
        assignmentId: any,
        subjectId: any,
        subjectName: any,
        className: any,
        sectionHouseName: any,
        title: any
    ){
        this.index = index;
        this.teacherId = teacherId;
        this.classId = classId;
        this.sectionId = sectionId;
        this.assignDateTime = assignDateTime;
        this.assignCompleteDateTime = assignCompleteDateTime;
        this.description = description;
        this.completionStatus = completionStatus;
        this.assignmentId = assignmentId;
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.className = className;
        this.sectionHouseName = sectionHouseName;
        this.title = title;
    }


}