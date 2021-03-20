export class ClassSectioDisplay{
    classId: any;
    className: any;
    sections: any;

    constructor(
        classId: any,
        className: any,
        sections: any
    ){
        this.classId = classId;
        this.className = className;
        this.sections = sections;
    }

    // Getters
    public getClassId(): any{
        return this.classId;
    }

    public getClassName(): any{
        return this.className;
    }

    public getSections(): any{
        return this.sections;
    }
}