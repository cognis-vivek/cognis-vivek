import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion} from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { StudentService } from 'src/app/services/student.service';
import { HttpClient } from '@angular/common/http';
import { StaffRow } from '../../models/staffRowData';
import { ClassSection } from '../../models/classSection';
import { Section } from '../../models/section';
import { SchoolSubject } from '../../models/subject';
import { DailyClass } from '../../models/dailyClass';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


interface Ipost{
  id: string;
  day?: string;
  teacherName?: string;
  class?: string;
  section?: string;
  subject?: string;
  startTime?: string;
  endTime?: string;
}

@Component({
  selector: 'app-daily-class',
  templateUrl: './daily-class.component.html',
  styleUrls: ['./daily-class.component.css']
})
export class DailyClassComponent implements OnInit {

  dataSource!: MatTableDataSource<DailyClass>;

  dataColumns: string[] = ['index','day','subjectName','teacherName','className','sectionHouseName','startTime','endTime','actions'];
  data: any;
  error: any;
  panelOpenState = false;
  selectedFiles: any;
  staffArr: StaffRow[] = [];
  classArr: ClassSection[] = [];
  sectionArr: Section[] = [];
  subjectArr: SchoolSubject[] = [];
  
  dailyClassArr: DailyClass[] = [];
  daysId: any; staffId: any; classId: any; sectionId: any; subjectId: any; startTime: any; endTime: any;

  
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild( MatPaginator, { static: true }) paginator!: MatPaginator;
  dayArray = [
    {
      id : '1',
      day : 'Monday'
    },
    {
      id : '2',
      day : 'Tuesday'
    },
    {
      id : '3',
      day : 'Wednesday'
    },
    {
      id : '4',
      day : 'Thursday'
    },
    {
      id : '5',
      day : 'Friday'
    },
    {
      id : '6',
      day : 'Saturday'
    }
  ];

  sDay = new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z]*')]);
  sTeacher = new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z]*')]);
  sClass = new FormControl('',[Validators.required]);
  sSection = new FormControl('',[Validators.required]);
  sSubject = new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z]*')]);
  sStartTime = new FormControl('',[Validators.required]);
  sEndTime = new FormControl('',[Validators.required]);
  constructor(
    private http: HttpClient,
    private student: StudentService,
    private dataExchangeService: DataExchangeService
  ) { 
    this.student = new StudentService(this.http);
    this.data = '';
    this.error = '';
  }

  ngOnInit(): void {
    
    this.getDailyClass();
    this.staffArr = this.dataExchangeService.getStaffRowData();
    this.classArr = this.dataExchangeService.getClassSection();
    this.sectionArr = this.dataExchangeService.getAllSections();
    this.subjectArr = this.dataExchangeService.getSchoolSubjects();
  }

  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Getting Day Error
  getDayError(){

  }

  // Getting daily class data
  getDailyClass(){
    this.student.getDailyClass(this.student.timeTableURL,1,1).subscribe((resData) =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      console.log('Time table => ', this.data);
      JSON.parse(this.data, (key, value) => {
        if(typeof key === 'string'){
          if(key === 'subjects'){
            this.dataExchangeService.dailyClassArr = [];
            for(let i = 0; i < parsed.subjects.length; i++){
              this.dataExchangeService.saveTimeTable(new DailyClass(
                (i+1),
                parsed.subjects[i].timeTableId,
                parsed.subjects[i].daysId,
                parsed.subjects[i].day,
                parsed.subjects[i].subjectId,
                parsed.subjects[i].subjectName,
                parsed.subjects[i].startTime,
                parsed.subjects[i].endTime,
                parsed.subjects[i].staffId,
                parsed.subjects[i].teacherName,
                parsed.subjects[i].classId,
                parsed.subjects[i].className,
                parsed.subjects[i].sectionId,
                parsed.subjects[i].sectionHouseName
              ));
            }
            this.dailyClassArr = this.dataExchangeService.getDailyClassTimeTable();
            this.dataSource = new MatTableDataSource(this.dailyClassArr);
            this.dataSource.sort =  this.sort;
            this.dataSource.paginator = this.paginator;
          }
        }
      })
    },
    err =>{
      this.error = 'An error occurred, Status:' + err.status, + ' Message:' + err.statusText;
      console.log('ErrorRes', this.error);
    });
  }

  // Changing the day
  onChangeDay(event: any){
    this.daysId = event.value;
  }
  // Changing Teacher
  onChangeTeacher(event : any){
    this.staffId = event.value;
  }

  // Changing the class 
  onChangeClass(event : any){
     this.classId = event.value;
  }

  // Changing Sections
  onChangeSection(event: any){
    this.sectionId = event.value;
  }

  // Changing Subject
  onChangeSubject(event: any){
    this.subjectId = event.value;
  }

  // Adding Time table
  addTimeTable(){
    const body = {
      daysId: this.daysId,
      staffId: this.staffId,
      classId: this.classId,
      sectionId: this.sectionId,
      subjectId: this.subjectId,
      startTime: this.startTime,
      endTime: this.endTime
    }
    console.log("Body Data => ", body);
    this.student.postDailyClass(this.student.timeTableURL,body).subscribe((resData) =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      console.log('Success Report => ', this.data);
      this.getDailyClass();
    },
    err =>{
      this.error = 'An error occurred, Status:' + err.status, + ' Message:' + err.statusText;
      console.log('ErrorRes', this.error);
    });
  }

}
