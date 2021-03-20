export class HoliDay{
    holidayId: any;
    nameOfHoliday: any;
    fromDate: any;
    toDate: any;

    constructor(
        holidayId: any,
        nameOfHoliday: any,
        fromDate: any,
        toDate: any
    ){
        this.holidayId = holidayId;
        this.nameOfHoliday = nameOfHoliday;
        this.fromDate = fromDate;
        this.toDate = toDate;
    }

    // Getters 
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