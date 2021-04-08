export class HoliDay{
    index: any;
    holidayId: any;
    nameOfHoliday: any;
    fromDate: any;
    toDate: any;

    constructor(
        index: any,
        holidayId: any,
        nameOfHoliday: any,
        fromDate: any,
        toDate: any
    ){
        this.index = index;
        this.holidayId = holidayId;
        this.nameOfHoliday = nameOfHoliday;
        this.fromDate = fromDate;
        this.toDate = toDate;
    }

    // Getters 
    public getIndex(): any{
        return this.index;
    }
    public getHolidayId(): any{
        return this.holidayId;
    }

    public getNameOfHoliday(): any{
        return this.nameOfHoliday;
    }

    public getFromDate(): any{
        return this.fromDate;
    }

    public getToDate(): any{
        return this.toDate;
    }
}