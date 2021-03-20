import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion} from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { StudentService } from 'src/app/services/student.service';
import { HttpClient } from '@angular/common/http';
import { ExamSubjectDetails } from '../../models/examSubject';
import { ExamResult } from '../../models/examResult';
import { ClassSection } from '../../models/classSection';
import { SubjectSyllabus } from '../../models/subjectSyllabus';
import { TypeOfExam } from '../../models/typeOfExam';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


interface Ipost{
  id: string;
  name?: string;
  typeofexam?: string;
  class?: string;
  date?: string;
  status?: string;
}




@Component({
  selector: 'app-manage-exam-result',
  templateUrl: './manage-exam-result.component.html',
  styleUrls: ['./manage-exam-result.component.css']
})
export class ManageExamResultComponent implements OnInit {

dataSource!: MatTableDataSource<ExamResult>;
posts!: Ipost[];
// column: string[] = ['id', 'name','class', 'typeofexam',  'date','status', 'actions'];
dataColumns: string[] = ['index','studentName','regdNo','classname','typeofExamName',
                          'totalMarks','passmarks','scoredMarks','grade','percentage','actions'];
data: any;
error: any;
examResultArr: ExamResult[] = [];
classSectionArr: ClassSection[] = [];
subjectSylabusArr: SubjectSyllabus[] = [];
typeOfExamArr: TypeOfExam[] = [];


schoolId = '1'; scoredMarks: any; typeOfExamId=''; regdNo: any; subjectId='';
classId=''; createdDate='2021';


  panelOpenState = false;
  rowState = false;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private http: HttpClient,
    private student: StudentService,
    private dataExchangeService: DataExchangeService,
    private dialog: MatDialog
  ) {
    // This data should be coming from an API using Angular Service
    this.student = new StudentService(this.http);
    this.data = '';
    this.error = '';
 this.posts = [{
  id: '1',
  name: 'Kamalakanta Parida',
  typeofexam: 'Annual Test',
  class: '3',
  date: '30-11-2020 ',
  status:"Pass"
},
 {
id: '2',
name: 'Kamal Parida',
typeofexam: 'Annual Test',
  class: '4',
  date: '30-11-2020 ',
  status:"Pass"
 },
 {
id: '3',
name: 'B. Kumal Parida',
typeofexam: 'First Post',
  class: '5',
  date: '30-11-2020 ',
  status:"Fail"
}];
// this.dataSource = new MatTableDataSource(this.posts);
   }

  ngOnInit() {
    
    // this.dataSource = new MatTableDataSource(this.posts);
    // this.dataSource.sort =  this.sort;
    // this.dataSource.paginator = this.paginator;
    this.subjectSylabusArr = this.dataExchangeService.getAllSubjectSyllabus();
    this.classSectionArr = this.dataExchangeService.getClassSection();
    this.getTypeOfExamList();
    this.getExamResults();
  }
  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModal(regd_no: any){
    console.log(regd_no)
    // const dialogConfig = new MatDialogConfig();
    
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
    },
    err =>{
      this.error = 'An error occurred, Status:' + err.status, + ' Message:' + err.statusText;
      console.log('ErrorRes', this.error);
    });
  }

  // Getting Exam Results
  getExamResults(){
    this.student.getExamResultByYear(this.student.examResultURL,1,'2021',1).subscribe((resData) =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      console.log('Exam Results => ', this.data);
      JSON.parse(this.data,(key,value) =>{
        if(typeof key === 'string'){
          if(key === 'examResultList'){
            this.dataExchangeService.examResultArr = [];
            for(let i = 0; i < parsed.examResultList.length; i++){
              let examSubjectArr: ExamSubjectDetails[] = [];
              for(let j = 0; j<parsed.examResultList[i].examSubjectResultList.length; j++){
                examSubjectArr.push(new ExamSubjectDetails(
                  parsed.examResultList[i].examSubjectResultList[j].subjectId,
                  parsed.examResultList[i].examSubjectResultList[j].subjectName,
                  parsed.examResultList[i].examSubjectResultList[j].totalMarks,
                  parsed.examResultList[i].examSubjectResultList[j].scoredMarks,
                  parsed.examResultList[i].examSubjectResultList[j].passmarks
                ));
              }
              this.dataExchangeService.saveExamResult(new ExamResult(
                (i+1),
                parsed.examResultList[i].typeOfExamId,
                parsed.examResultList[i].classId,
                parsed.examResultList[i].studentName,
                parsed.examResultList[i].regdNo,
                parsed.examResultList[i].classname,
                parsed.examResultList[i].typeofExamName,
                parsed.examResultList[i].studentId,
                parsed.examResultList[i].examresultId,
                parsed.examResultList[i].percentage,
                parsed.examResultList[i].totalMarks,
                parsed.examResultList[i].scoredMarks,
                parsed.examResultList[i].grade,
                parsed.examResultList[i].passmarks,
                examSubjectArr
              ));
            }
            this.examResultArr = this.dataExchangeService.getExamResults();
            console.log('exam Results', this.examResultArr);
            this.dataSource = new MatTableDataSource(this.examResultArr);
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

  // Adding StudentExam Result
  addStudentExamResult(){
    const body = {
      schoolId: this.schoolId,
      scoredMarks: this.scoredMarks,
      examresultId: this.typeOfExamId,
      regdNo: this.regdNo,
      subjectId: this.subjectId,
      classId: this.classId,
      createdDate: this.createdDate
    }
    console.log('Add Exam Body => ',body);
    this.student.postExamResult(this.student.examResultURL,body).subscribe((resData) =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      console.log('Exam Results => ', this.data);
    },
    err =>{
      this.error = 'An error occurred, Status:' + err.status, + ' Message:' + err.statusText;
      console.log('ErrorRes', this.error);
    });
  }

  // Changing Class
  classChange(event: any){
    this.classId = event.value;
    console.log('class', this.classId);
  }

  // Changing type of exam
  typeOfExamChange(event: any){
    this.typeOfExamId = event.value;
    console.log('typeOfExamId', this.typeOfExamId);
  }

  // Changing Subject
  subjectChange(event: any){
    this.subjectId = event.value;
    console.log('subjectId', this.subjectId);
  }

}
