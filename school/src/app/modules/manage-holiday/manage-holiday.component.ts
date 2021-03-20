import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {FormGroup, FormControl} from '@angular/forms';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { StudentService } from 'src/app/services/student.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { HoliDay } from '../../models/holiDay';

interface Ipost{
  serialNo: string;
  holidayName:string;
  startDate?:string;
  endDate?: string;

}

@Component({
  selector: 'app-manage-holiday',
  templateUrl: './manage-holiday.component.html',
  styleUrls: ['./manage-holiday.component.css']
})
export class ManageHolidayComponent implements OnInit {

dataSource!: MatTableDataSource<HoliDay>;
posts!: Ipost[];
column: string[] = ['holidayId', 'nameOfHoliday','fromDate', 'toDate', 'actions'];
holidayArr: HoliDay[] = [];

  panelOpenState = false;

@ViewChild(MatSort, { static: true }) sort!: MatSort;
@ViewChild( MatPaginator, { static: true }) paginator!: MatPaginator;
range = new FormGroup({
  start: new FormControl(),
  end: new FormControl()
});
data: any;
error: any;
holidayName: any;

  constructor(private http: HttpClient,
              private dataExchangeService: DataExchangeService,
              private student: StudentService,
              private datePipe: DatePipe) {

    this.student = new StudentService(this.http);
    this.data = '';
    this.error = '';
    this.posts = [
    {
    serialNo:'1',
    holidayName:'Ganesh Chaturthi',
    startDate:'10-09-2021',
    endDate: '11-09-2021'

    },
    {
      serialNo:'2',
      holidayName:'Navaratri',
      startDate:'07-10-2021',
      endDate: '14-10-2021'
      }
  ];
    // this.dataSource = new MatTableDataSource(this.posts)

   }

   // Saving Holiday
   saveHoliday(){
     console.log('Date Range', this.range.controls.start.value);
     const body = {
       schoolId: 1,
       nameOfHoliday : this.holidayName,
       fromDate: this.datePipe.transform(this.range.controls.start.value, 'yyyy-MM-dd'),
       toDate: this.datePipe.transform(this.range.controls.end.value, 'yyyy-MM-dd')
     }
     console.log("body", body);
     this.student.postHoliDay(this.student.saveHoliDayURL, body).subscribe((resData) =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed data
      this.data = JSON.stringify(resData);
      console.log('Res', this.data);
      this.getHoliday();
    },
    err =>{
      this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
      console.log('ErrorRes', this.error);
    });
   }

  ngOnInit(): void {
    this.getHoliday();
  }

  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Getting holiday
  getHoliday(){
    this.student.getHoliDay(this.student.saveHoliDayURL,1).subscribe((resData) =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      JSON.parse(this.data, (key, value) =>{
          if(typeof key === 'string'){
            if(key.toString() === 'holidayList'){
              this.dataExchangeService.holidayArr = [];
                for(let i = 0; i < parsed.holidayList.length;i++){
                  this.dataExchangeService.saveHoliday(new HoliDay(
                    parsed.holidayList[i].holidayId,
                    parsed.holidayList[i].nameOfHoliday,
                    parsed.holidayList[i].fromDate,
                    parsed.holidayList[i].toDate
                  ));
                }
                this.holidayArr = this.dataExchangeService.getAllHoliday();
                this.dataSource = new MatTableDataSource(this.holidayArr);
                this.dataSource.sort =  this.sort;
                this.dataSource.paginator = this.paginator;
            }
          }
        });
    },
    err =>{
      this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
      console.log('ErrorRes', this.error);
    });
  }

  

}