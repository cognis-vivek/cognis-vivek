export class DailyClass{
    index: any;
    timeTableId: any;
    daysId: any;
    day: any;
    subjectId: any;
    subjectName: any;
    startTime: any;
    endTime: any;
    staffId: any;
    teacherName: any;
    classId: any;
    className: any;
    sectionId: any;
    sectionHouseName: any;
           
    constructor(
        index: any,
        timeTableId: any,
        daysId: any,
        day: any,
        subjectId: any,
        subjectName: any,
        startTime: any,
        endTime: any,
        staffId: any,
        teacherName: any,
        classId: any,
        className: any,
        sectionId: any,
        sectionHouseName: any
    ){
        this.index = index;
        this.timeTableId = timeTableId;
        this.daysId = daysId;
        this.day = day;
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.staffId = staffId;
        this.teacherName = teacherName;
        this.classId = classId;
        this.className = className;
        this.sectionId = sectionId;
        this.sectionHouseName = sectionHouseName;
    }

    // Getters
    public getIndex(): any{
        return this.index;
    }
    
    public getTimeTableId(): any{
        return this.timeTableId;
    }

    public getDaysId(): any{
        return this.daysId;
    }

    public getDay(): any{
        return this.day;
    }

    public getSubjectId(): any{
        return this.subjectId;
    }

    public getSujectName(): any{
        return this.subjectName;
    }

    public getStartTime(): any{
        return this.startTime;
    }

    public getEndTime(): any{
        return this.endTime;
    }

    public getStaffId(): any{
        return this.staffId;
    }

    public getTeacherName(): any{
        return this.teacherName;
    }

    public getClassId(): any{
        return this.classId;
    }

    public getClassName(): any{
        return this.className;
    }

    public getSectionId(): any{
        return this.sectionId;
    }

    public getSectionHouseName(): any{
        return this.sectionHouseName;
    }


}