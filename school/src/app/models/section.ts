export class Section {
    sectionId: any;
    sectionHouseName: any;

    constructor(
        sectionId: any,
        sectionHouseName: any
    ){
        this.sectionId = sectionId;
        this.sectionHouseName = sectionHouseName;
    }

    // Setters
    public setSectionId(sectionId: any){
        this.sectionId = sectionId;
    }

    public setSectionHouseName(sectionHouseName: any){
        this.setSectionHouseName = sectionHouseName;
    }

    // Getters
    public getSectionId(): any{
        return this.sectionId;
    }

    public getSectionHouseName(): any{
        return this.sectionHouseName;
    }
}