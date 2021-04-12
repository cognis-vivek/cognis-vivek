import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion} from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ClassSection } from 'src/app/models/classSection';
import { Section } from 'src/app/models/section';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { StudentService } from 'src/app/services/student.service';
import { HttpClient } from '@angular/common/http';
import { ClassSectioDisplay } from 'src/app/models/classSectionDisplay';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Leave } from '../../models/leave';

interface Ipost{
  id: string;
  author?: string;
  title?: string;
  category?: string;
  date?: string;
}
@Component({
  selector: 'app-manage-class',
  templateUrl: './manage-class.component.html',
  styleUrls: ['./manage-class.component.css']
})
export class ManageClassComponent implements OnInit {

  dataSource!: MatTableDataSource<ClassSectioDisplay>;
  posts!: Ipost[];
  column: string[] = ['classId', 'className', 'sections', 'actions'];


  panelOpenState = false;
  classSectionArr: ClassSection[] = [];
  filterSectionArr: Section[] = [];
  classSectionDisplayArr: ClassSectioDisplay[] = [];
  classSectionDisplayArrChanged = new Subject<ClassSectioDisplay[]>();

  sectionSelect: any;
  sectionList = ["A", "B","C","D"];
  
  sectionArr: Section[] = [];
  sectionStringArr: string[] = [];
  sectionStringArrChanged = new Subject<string[]>();
  sectionString = '';
  className: any;
  issued: any;

  data: any;
  error: any;
  isClose: boolean | undefined;
  valueSelected: string | undefined;
  
  request = 0;
  updatedIndex = 0;
  step = 0;



  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild( MatPaginator, { static: true }) paginator!: MatPaginator;

  sClassName = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]);
  sections = new FormControl();
  // sSection = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]);
  // sMessageSubject = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]);
  constructor(
              private http: HttpClient,
              private student: StudentService,
              private dataExchangeService: DataExchangeService
  ) {

    this.student = new StudentService(this.http);
    this.data = '';
    this.error = '';
    this.issued = "Student Reg No"

// This data should be coming from an API using Angular Service
//  this.posts = [{
//             id: '1',
//             author: 'Kamalakanta Parida',
//             title: 'First Post',
//             category: 'Uncategory',
//             date: '30-11-2020 01:01:01'
//         },
//         {
//             id: '2',
//             author: 'Kamal Parida',
//             title: 'Second Post',
//             category: 'Uncategory',
//             date: '30-11-2020 01:01:01'
//         },
//         {
//             id: '3',
//             author: 'B. Kumal Parida',
//             title: 'Thired Post',
//             category: 'Uncategory',
//             date: '01-12-2020 01:01:01'
//         }];
            // this.dataSource = new MatTableDataSource(this.posts);
  }

  ngOnInit(): void {
    
    this.getAllSectionCall();
    // this.sectionArr = this.dataExchangeService.getAllSections();
    // console.log('Sections', this.sectionArr);
  }

  // Setting Steps
  setStep(index: number){
    this.step = index;
  }



  // Getting Class Error
  getClassError(){
    if (this.sClassName.hasError('required')) {
      return 'You must enter class';
    }
    return this.sClassName.hasError('sClassName') ? 'Not valid Class name' : '';
  }

  // Getting Section Error
  // getSectionError(){
  //   return this.sSection.hasError('sSection') ? 'Not valid Section name' : '';
  // }

  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onChange(event: any) {
    console.log(event)
  }

  sectionChange(event: any){
    this.issued = "employee Id"
    this.isClose = false;
    if(!event) {
      this.isClose = true;
      console.log('dropdown is closed');
      this.valueSelected = this.sections.value; //& this.sections.value.toString();
    }
    console.log("section", this.valueSelected);
    this.separateSectionValue(this.valueSelected);
  }

  // getting class Section display
  getClassSectionDisplay(): any{
    this.classSectionDisplayArrChanged.next(this.classSectionDisplayArr);
    return [...this.classSectionDisplayArr];
  }


  // Adding class
  async addClass(){

    if(this.request !==1){
      const body = {
        className: this.sClassName.value,
        classSection: this.sections.value,
        schoolId: 1
      }
      console.log("class 1", body);
      this.student.postClassDetails(this.student.classesDetailsURL, body).subscribe(resData => {
        let parsed = JSON.parse(JSON.stringify(resData));
        // parsed.childList
        this.data = JSON.stringify(resData);
        console.log('Classess', this.data);
        this.getAllClasses();
      },
      err =>{
        this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
        console.log('ErrorRes', this.error);
      });
    }else{
      const body = {
        classId: this.classSectionArr[this.updatedIndex].classId,
        className: this.sClassName.value,
        classSection: this.sections.value,
        schoolId: 1
      }
      console.log("class 2", body);
      this.student.postClassDetails(this.student.updateClassURL, body).subscribe(resData => {
        let parsed = JSON.parse(JSON.stringify(resData));
        // parsed.childList
        this.data = JSON.stringify(resData);
        console.log('Classess', this.data);
        this.getAllClasses();
      },
      err =>{
        this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
        console.log('ErrorRes', this.error);
      });
    }

    
  }

  // Getting All the sectionas
  getAllSectionCall(){
    this.student.getSections(this.student.sectionURLGet,1).subscribe(resData =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      JSON.parse(this.data, (key, value) =>{
          if(typeof key === 'string'){
            if(key.toString() === 'sectionList'){
              this.dataExchangeService.sectionArr = [];
              for(let i = 0; i<parsed.sectionList.length; i++){
                this.dataExchangeService.saveSection(new Section(
                  parsed.sectionList[i].sectionId,
                  parsed.sectionList[i].sectionHouseName
                ));
              }
              this.sectionArr = this.dataExchangeService.getAllSections();
              // this.posts = this.sectionArr;
              console.log('All Sections', this.sectionArr);
              this.getAllClasses();
            }
          }
      });
      // console.log('Data', this.data);
    },
    err =>{
      this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
      console.log('Error', this.error);
    });
  }

  // Seperating values from object
  separateSectionValue(values:any){
    this.sectionString = '';
    for(let i = 0; i<values.length; i++){
      if(i === values.length - 1){
        this.sectionString = values[i] + ',' + this.sectionString
      }else{
        this.sectionString = values[i] + this.sectionString
      }
    }
    // this.sectionStringArrChanged.next(this.sectionStringArr);
    console.log('SectionString', this.sectionString);
  }

  // Getting Classes with Sections
  getAllClasses(){
    this.student.getClasses(this.student.classesDetailsURL,1).subscribe(resData =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      JSON.parse(this.data, (key, value) =>{
        if(typeof key === 'string'){
          if(key.toString() === 'classList'){
            this.classSectionArr = [];
            this.dataExchangeService.classSectionArr = [];
            for(let i = 0; i < parsed.classList.length; i++){
                for(let j = 0; j <parsed.classList[i].sectionList.length; j++){
                  for (let k = 0; k < this.sectionArr.length; k++){
                    if(this.sectionArr[k].getSectionId() === parsed.classList[i].sectionList[j].classSection)
                      this.filterSectionArr.push(this.sectionArr[k]);
                  }
                }
              this.dataExchangeService.saveClassSection(new ClassSection(
                parsed.classList[i].classId,
                parsed.classList[i].className,
                this.filterSectionArr
              ));
              this.filterSectionArr = [];
            }
            this.classSectionArr = this.dataExchangeService.getClassSection();
            
            let localSectionArr: Section[] = [];
            for(let j = 0; j<this.classSectionArr.length; j++){
              let sections = '';
              localSectionArr = this.classSectionArr[j].getSectionArr();
              for(let k = 0; k < localSectionArr.length;k++){
                  sections = localSectionArr[k].getSectionHouseName() +"  "+ sections
              }
              this.classSectionDisplayArr.push(new ClassSectioDisplay(
                this.classSectionArr[j].classId,
                this.classSectionArr[j].className,
                sections
              ));
              this.classSectionDisplayArrChanged.next(this.classSectionDisplayArr);
            }
            console.log('All classes', this.classSectionDisplayArr);
          }
          this.dataSource = new MatTableDataSource(this.classSectionDisplayArr);
          this.dataSource.sort =  this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
      // console.log('All classes', this.data);
    },err =>{
      this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
      console.log('Error', this.error);
    });
  }

  // Updating Class
  updateClass(index: number){
    for(let i = 0; i < this.classSectionArr.length; i++){
      if(index === this.classSectionArr[i].classId){
        this.updatedIndex = i;
        this.request = 1;
        this.setStep(0);
        break;
      }
    }

    this.sClassName.setValue(this.classSectionArr[this.updatedIndex].className);
    this.sectionStringArr = [];
    for(let i = 0; i< this.classSectionArr[this.updatedIndex].getSectionArr().length;i++){
      this.sectionStringArr.push(this.classSectionArr[this.updatedIndex].getSectionArr()[i].sectionId);
    }
    this.sections.setValue(this.sectionStringArr);
    // this.sec
  }
}
