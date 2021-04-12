export class HolidayData{
    private holidayId: any;
    private nameOfHoliday: any;
    private date: any;
    private notes: any;

    constructor(
        holidayId: any,
        nameOfHoliday: any,
        date: any,
        notes: any){
     this.holidayId = holidayId;
     this.nameOfHoliday = nameOfHoliday;
     this.date = date;
     this.notes = notes;
    }

    // GETTERS
    public getHolidayId(): any{
        return this.holidayId;
    }
    public getNameOfHoliday(): any{
        return this.nameOfHoliday;
    }
    public getHolidayDate(): any{
        return this.date;
    }
    public getHolidayNote(): any{
        return this.notes;
    }
}
