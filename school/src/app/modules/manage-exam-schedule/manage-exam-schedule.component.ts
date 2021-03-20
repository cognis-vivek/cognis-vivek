import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion} from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { StudentService } from 'src/app/services/student.service';
import { HttpClient } from '@angular/common/http'
import { Section } from 'src/app/models/section';
import { ClassSection } from 'src/app/models/classSection';
import { TypeOfExam } from 'src/app/models/typeOfExam';
import { SubjectSyllabus } from '../../models/subjectSyllabus';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ExamSchedule } from 'src/app/models/examSchedule';
import { SchoolSubject } from 'src/app/models/subject';

interface Ipost{
  id: string;
  typeOfExam?: string;
  section?: string;
  subjectName?: string;
  className?: string;
  date?: string;
  time?:string;

}



@Component({
  selector: 'app-manage-exam-schedule',
  templateUrl: './manage-exam-schedule.component.html',
  styleUrls: ['./manage-exam-schedule.component.css']
})
export class ManageExamScheduleComponent implements OnInit {

dataSource!: MatTableDataSource<ExamSchedule>;
posts!: Ipost[];
column: string[] = ['id', 'typeOfExam','className','subjectName', 'date','time', 'actions'];
dataColumns: string[] = ['index', 'class_Name','examTypeName','examDate','subjectName',
                          'startTime','endTime','actions'];

  panelOpenState = false;
  data: any;
  error: any;
  sectionArr: Section[] = [];
  classSectionArr: ClassSection[] = [];
  filterSectionArr: Section[] = [];
  typeOfExamArr: TypeOfExam[] = [];
  subjectSyllabusArr: SubjectSyllabus[] = [];
  filterSubSyllabusArr: SubjectSyllabus[] = [];
  filterSubSyllabusArrChanged = new Subject<SubjectSyllabus[]>();
  examScheduleArr: ExamSchedule[] = [];
  schoolSubjectArr: SchoolSubject[] = [];
  
  examTypeId: any; schoolId='1'; classId: any; sectionId: any; subjectId: any;
  examType: any; examDate: any; startTime: any; endTime: any; totalMarks: any; passmarks: any;
  duration = '3 Hrs';
  


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild( MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor( 
    private http: HttpClient,
    private student: StudentService,
    private dataExchangeService: DataExchangeService,
    private datePipe: DatePipe
) {

    this.student = new StudentService(this.http);
    this.data = '';
    this.error = '';
    // This data should be coming from an API using Angular Service
 this.posts = [{
  id: '1',
  section:'B',
  typeOfExam: 'Pre-Test',
  subjectName: 'History',
  className: '3',
  date: '30-12-2020 ',
  time:'10AM - 1PM'
},
 {
id: '2',
section:'A',
typeOfExam: 'Half Yearly Test',
subjectName: 'Mathematics',
className: '4',
date: '03-01-2021 ',
time:'10AM - 1PM'
 },
 {
id: '3',
section:'C',
typeOfExam: 'Annual Test',
subjectName: 'English',
className: '5',
date: '03-01-2021 ',
time:'10AM - 1PM'
}];

  }

  ngOnInit() {
    this.getTypeOfExamList();
    this.sectionArr = this.dataExchangeService.getAllSections();
    this.classSectionArr = this.dataExchangeService.getClassSection();
    this.schoolSubjectArr = this.dataExchangeService.getSchoolSubjects();
    this.subjectSyllabusArr = this.dataExchangeService.getAllSubjectSyllabus();
    console.log('Sub', this.subjectSyllabusArr);
  }
  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  // Getting Type of Exam list
  getTypeOfExamList(){
    this.student.getTypeOfExam(this.student.examTypeURL,1).subscribe((resData) =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      console.log('Type Of Exam Data => ', this.data);
      JSON.parse(this.data, (key,value) =>{
          if(typeof key === 'string'){
            if(key === 'examlist'){
              this.dataExchangeService.typeOfExamArr = [];
              for(let i = 0; i < parsed.examlist.length; i++){
                this.dataExchangeService.saveExamType(new TypeOfExam(
                  parsed.examlist[i].examresultId,
                  parsed.examlist[i].examType
                ));
              }
              this.typeOfExamArr = this.dataExchangeService.getAllTypeOfExam();
            }
          }
      });
      this.getExamSchedule();
    },
    err =>{
      this.error = 'An error occurred, Status:' + err.status, + ' Message:' + err.statusText;
      console.log('ErrorRes', this.error);
    });
  }

  // Getting Exam schedule List
  getExamSchedule(){
    this.student.getExamScheduleList(this.student.examScheduleURL,1).subscribe((resData) =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      console.log('exam schedule => ', this.data);
      JSON.parse(this.data, (key, value) =>{
        if(typeof key === 'string'){
          if(key === 'examSchedule'){
            this.dataExchangeService.examScheduleArr = [];
            for(let i = 0; i < parsed.examSchedule.length; i++){
              this.dataExchangeService.saveExamSchedule(new ExamSchedule(
                (i+1),
                parsed.examSchedule[i].examscheduleId,
                parsed.examSchedule[i].examDate,
                parsed.examSchedule[i].startTime,
                parsed.examSchedule[i].endTime,
                parsed.examSchedule[i].subjectId,
                parsed.examSchedule[i].subjectName,
                parsed.examSchedule[i].classId,
                parsed.examSchedule[i].class_Name,
                parsed.examSchedule[i].examTypeId,
                parsed.examSchedule[i].examTypeName,
              ));
            }
            this.examScheduleArr = this.dataExchangeService.getExamScheduleList();
            this.dataSource = new MatTableDataSource(this.examScheduleArr);
            this.dataSource.sort =  this.sort;
            this.dataSource.paginator = this.paginator;
          }
        }
      });

    },
    err =>{
      this.error = 'An error occurred, Status:' + err.status, + ' Message:' + err.statusText;
      console.log('ErrorRes', this.error);
    });
  }

  // Changing the class 
  onChangeClass(event: any){
    this.classId = event.value;
    for(let i=0; i < this.classSectionArr.length; i++){
      if(this.classId === this.classSectionArr[i].getClassId()){
        this.filterSectionArr = this.classSectionArr[i].getSectionArr();
        break;
      }
    }
    for(let i=0; i < this.subjectSyllabusArr.length; i++){
      if(this.classId === this.subjectSyllabusArr[i].getClassId()){
          this.filterSubSyllabusArr.push(this.subjectSyllabusArr[i]);
          this.filterSubSyllabusArrChanged.next(this.filterSubSyllabusArr);
      }
    }
    
  }
  // Changing Sections
  onChangeSection(event: any){
    this.sectionId = event.value;
  }

  // Changing type of exam
  onChangeExamType(event: any){
    this.examTypeId = event.value;
  }

  // Changing Subject
  onChangeSubject(event: any){
    this.subjectId = event.value;
  }

  // Changing Exam Date 
  onExamDateChanged(event: any){
    const date = event.value;
    this.examDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    console.log('Date1', this.examDate);
  }

  // Adding Exam schedule
  addExamSchedule(){
    const body = {
      examTypeId: this.examTypeId+'',
      schoolId: this.schoolId,
      classId: this.classId,
      subjectId: this.subjectId,
      examType: this.examType,
      examDate: this.examDate,
      startTime: this.startTime,
      endTime: this.endTime,
      duration: '3 hours',
      totalMarks: this.totalMarks,
      passmarks: this.passmarks
    }
    console.log('exam', body);
    this.student.postExamSchedule(this.student.examScheduleURL,body).subscribe((resData) =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      this.data = JSON.stringify(resData);
      this.getExamSchedule();
    },
    err =>{
      this.error = 'An error occurred, Status:' + err.status, + ' Message:' + err.statusText;
      console.log('ErrorRes', this.error);
    });
  }

  

}
