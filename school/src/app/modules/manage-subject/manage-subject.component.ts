import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../../services/student.service';
import { DataExchangeService } from '../../services/data-exchange.service';
import { SubjectSyllabus } from 'src/app/models/subjectSyllabus';
import { SchoolSubject } from 'src/app/models/subject';

interface Ipost{
  class: string;
  subjectName:string;
  subjectContent:string;
  writterName?: string;
  Optional?:string;
  date?: string;

}


@Component({
  selector: 'app-manage-subject',
  templateUrl: './manage-subject.component.html',
  styleUrls: ['./manage-subject.component.css']
})
export class ManageSubjectComponent implements OnInit {

dataSource!: MatTableDataSource<SubjectSyllabus>;
posts!: Ipost[];
column: string[] = ['subjectId', 'subjectName','classId','subjectContent','optional', 'actions'];
subjectSyllabusArr: SubjectSyllabus[] = [];


  syllabusFile: any;
  panelOpenState = false;
  data: any;
  error: any;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild( MatPaginator, { static: true }) paginator!: MatPaginator;

  selectedFiles: any;


  constructor(private http: HttpClient,
    private student: StudentService,
    private dataExchangeService: DataExchangeService
) {

    this.student = new StudentService(this.http);
    this.data = '';
    this.error = '';
    // This data should be coming from an API using Angu
 this.posts = [{
class: '4',
subjectName:'Biology',
subjectContent:'Medi',
writterName: 'Shibu dhar',
Optional:'No',
date: '16-12-2020'

}];

}

  ngOnInit(): void {
    
    this.getSyllabusSubject();
  }
  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  selectFile(event:any) {
    this.selectedFiles = event.target.files;
    console.log("file", this.selectedFiles);
  }
  
  // Getting Subjects with syllabus
  getSyllabusSubject(){
    this.student.getSubjectSyllabus(this.student.subjectSyllabus,1).subscribe((resData) =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      // console.log('subjects', this.data);
      JSON.parse(this.data, (key, value) =>{
            if(typeof key === 'string'){
              if(key === 'syllabusModel'){
                this.dataExchangeService.subjectSyllabusArr = [];
                this.dataExchangeService.schoolSubjectArr = [];
                for(let i = 0; i<parsed.syllabusModel.length; i++){
                  this.dataExchangeService.saveSchoolSubject(new SchoolSubject(
                    parsed.syllabusModel[i].subjectId,
                    parsed.syllabusModel[i].subjectName,
                    parsed.syllabusModel[i].classId
                  ));
                  this.dataExchangeService.saveSubjectSyllabus(new SubjectSyllabus(
                    parsed.syllabusModel[i].subjectId,
                    parsed.syllabusModel[i].subjectName,
                    parsed.syllabusModel[i].classId,
                    parsed.syllabusModel[i].subjectContent,
                    parsed.syllabusModel[i].optional,
                    parsed.syllabusModel[i].syllabusFile
                  ));
                }
                this.subjectSyllabusArr = this.dataExchangeService.getAllSubjectSyllabus();
                this.dataSource = new MatTableDataSource(this.subjectSyllabusArr);
                this.dataSource.sort =  this.sort;
                this.dataSource.paginator = this.paginator;
                console.log('data', this.subjectSyllabusArr);
              }
            }
      });
    },
    err =>{
      this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
      console.log('ErrorRes', this.error);
    });
  }
  
  openPdf(){
    const body={
      classId: '2',
      subjectName: 'Maths',
      subjectContent:'Logical',
      writterName:'Amit Dhar',
      optional:'no',
      file: this.selectedFiles[0],
      schoolId:'1'
    };
    console.log('body', body);
    this.student.postSubjectSyllabus(this.student.postSubjectSyllabusURL,body).subscribe((resData)=>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      console.log('success', this.data);
    },
    err =>{
      this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
      console.log('ErrorRes', this.error);
    });
    // let b64Data: any = '';
    // b64Data = b64Data.replace(/^[^,]+,/, '');
    // b64Data = b64Data.replace(/\s/g, '');
    // let file = new Blob([this.subjectSyllabusArr[0].getSyllabusFile()], { type: 'application/pdf' });            
    // var fileURL = URL.createObjectURL(file);
    // window.open(fileURL);
    // this.downloadPdf(this.subjectSyllabusArr[0].getSyllabusFile(),"sample");
  }  


  downloadPdf(base64String: any, fileName: any) {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`
    link.click();
    // let byteChar = atob(base64String);
    // let byteArray = new Array(byteChar.length);
    // for(let i = 0; i < byteChar.length; i++){
    //   byteArray[i] = byteChar.charCodeAt(i);
    // }
    // let uIntArray = new Uint8Array(byteArray);
    // let blob = new Blob([uIntArray], {type : 'application/pdf'});
    // window.navigator.msSaveOrOpenBlob(blob, `${fileName}.pdf`);
  }
  onClickDownloadPdf(){
    // let base64String = "your-base64-string";
    this.downloadPdf(this.subjectSyllabusArr[0].getSyllabusFile(), this.subjectSyllabusArr[0].getSubjectName() + "_sample");
  }
}
