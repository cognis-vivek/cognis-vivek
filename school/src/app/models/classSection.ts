import { Section } from "./section";
import { Subject } from 'rxjs';

export class ClassSection{
    classId: any;
    className: any;
    sectionArr: Section[] = [];
    sectionArrChanged = new Subject<Section[]>();
    constructor(
        classId: any,
        className: any,
        sectionArr: Section[]
    ){
        this.classId = classId;
        this.className = className;
        this.sectionArr = sectionArr;
    }

    // Setters
    public setClassId(classId: any){
        this.classId = classId;
    }

    public setClassName(className: any){
        this.className = className;
    }

    public setSectionArr(sectionArr: Section[]){
        this.sectionArr = sectionArr;
    }

    // Getters 
    public getClassId(): any{
        return this.classId;
    }

    public getClassName(): any{
        return this.className;
    }

    public getSectionArr(): any{
        this.sectionArrChanged.next(this.sectionArr);
        return [...this.sectionArr];
    }

    
}