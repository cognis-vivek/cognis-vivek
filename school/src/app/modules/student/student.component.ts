import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Subject } from 'rxjs';
import { ClassSection } from 'src/app/models/classSection';
import { Section } from 'src/app/models/section';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { StudentService } from 'src/app/services/student.service';
import { HttpClient } from '@angular/common/http';
import { StudentGeneralInfo } from '../../models/student_gen_info';
import { Role } from 'src/app/models/role';
import { DatePipe } from '@angular/common'
import { StudentDetails } from 'src/app/models/studentDetails';
import { Parent } from 'src/app/models/parent';
import { Address } from 'src/app/models/address';
import { StudentRowData } from 'src/app/models/studentRowData';
import { StudentCreateComponent } from './student-create/student-create.component';


interface Ipost{
  id: string;
  name?: string;
  phoneNo?: string;
  gender?: string;
  fatherName?: string;
  motherName?: string;
  email?: string;
  adress?: string;
}


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  picker1: any;
  sectionArr: Section[] = [];
  classSectionArr: ClassSection[] = [];
  filterSectionArr: Section[] = [];
  currentDate = '';
  data: any;
  error: any;
  urllink:string ="assets/img/image.jpg";
  panelOpenState = false;
  hide = true;
  // options: FormGroup;
  colorControl = new FormControl('primary');
  fontSizeControl = new FormControl(16, Validators.min(10));
  dataSource!: MatTableDataSource<StudentRowData>;
  posts!: Ipost[];
  // column: string[] = ['id', 'regdNo', 'firstName', 'middleName', 'lastName','dob','email','religion', 'actions'];
  dataColumns: string[] = ['index', 'regdNo', 'firstName', 'middleName', 'lastName','dob','email','religion', 
                           'nationality', 'gender', 'bloodGrp', 'address1', 'address2', 'district', 'city',
                           'postalcode', 'location','state','country','fatherName','motherName','fatherPhoneNO',
                           'motherPhoneNO','className','sectionHouseName','actions'];
  // For Create student details
  firstName: any; middleName: any; lastName: any; fatherName: any; fatherPhoneNo: any; fatherEmail: any;
  motherName: any; motherPhoneNo: any; matherEmail: any; studentPhoneNo: any; localAddress: any; district: any;
  location: any; state: any; city: any; postalCode: any; nationality: any; country: any;
  gender: any; religion: any; bloodGrp: any; classId: any; sectionId: any; dob: any; schoolId ='1';
  genderArr: string[] = ['Male','Female','Other'];
  relegionArr: string[] = ['Hindu','Muslim','Christian','Other'];
  bloodGroupArr: string[] = ['O+','O-','A+','A-','B+','B-','AB+','AB-'];
  studentGeneralInfoArr: StudentGeneralInfo[] = [];
  studentRowDataArr: StudentRowData[] = [];


@ViewChild(MatSort, { static: true }) sort!: MatSort;
@ViewChild( MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    fb: FormBuilder,
    private http: HttpClient,
    private student: StudentService,
    private dataExchangeService: DataExchangeService,
    private datePipe: DatePipe) {
    // this.options = fb.group({
    //   color: this.colorControl,
    //   fontSize: this.fontSizeControl,
    // });

    this.student = new StudentService(this.http);
    this.data = '';
    this.error = '';
     // This data should be coming from an API using Angular Service
 


}

  ngOnInit(): void {
    this.getStudentList();
    this.getAllSectionCall();
  }
  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onSearchClear(){
   this.dataSource.filter = "";
  }

  openPanel(){
    console.log('click !')
    this.panelOpenState = true;
    
  }


  // image upload concept
  selectFile(event: any){
    if(event.target.files){
      var reader = new FileReader()
      reader.readAsDataURL(event.target.file[0])
      reader.onload = (event:any)=>{
        this.urllink = event.target.result
      }
    }
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getFontSize() {
    return Math.max(10, this.fontSizeControl.value);
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

  // Getting all the classes
  getAllClasses(){
    this.student.getClasses(this.student.classesDetailsURL,1).subscribe(resData =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      JSON.parse(this.data, (key, value) =>{
        if(typeof key === 'string'){
          if(key.toString() === 'classList'){
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
            console.log('All classes', this.classSectionArr);
          }
        }
      });
      // console.log('All classes', this.data);
    },err =>{
      this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
      console.log('Error', this.error);
    });
  }

  // Changing Gender
  onChangeGender(event: any){
      this.gender = event.value;
      console.log('val', event.value);
  }

  // Changing Religion
  onChangeReligion(event: any){
    this.religion = event.value;
    console.log('Rel', event.value);
  }

  // Changing Blood Group
  onChangeBlood(event: any){
    this.bloodGrp = event.value;
    console.log('Blood', event.value);
  }

  // Changing the class
  onChangeClass(event: any){
    this.classId = event.value;
    console.log('class',event.value);
    for(let i = 0; i < this.classSectionArr.length; i++){
      if(this.classSectionArr[i].getClassId() === event.value){
        this.filterSectionArr = this.classSectionArr[i].getSectionArr();
        break;
      }
    }
  }

  // Changing Section
  onChangeSection(event: any){
    this.sectionId = event.value;
    console.log('Section', event.value);
  }

  // Changing date
  onDateChange(event: any){
    const date = event.value;
    this.dob = this.datePipe.transform(date, 'yyyy-MM-dd');
    console.log('Date1', this.dob);
  }

  // Saving Student
  saveStudent(){
    const body = new StudentGeneralInfo(
          '',
          this.studentPhoneNo,
          '',
          new Role('1'),
          this.firstName,
          this.middleName,
          this.lastName,
          this.gender,
          this.bloodGrp,
          this.religion,
          this.dob,
          this.fatherEmail, // Instead of Student Email
          this.nationality,
          new Address(
            this.localAddress,
            this.localAddress,
            this.city,
            this.district,
            this.country,
            this.state,
            this.location,
            this.postalCode
          ),
          new StudentDetails(
            this.schoolId,
            '',
            this.classId,
            '',
            this.sectionId
          ),
          new Parent(
            new Role('3'),
            this.fatherPhoneNo,
            this.motherPhoneNo,
            this.fatherName,
            this.motherName,
            ""
          )
    );
    console.log('body', body);
    this.student.postStudentDetails(this.student.saveStudentURL, body).subscribe((resData) => {
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      
      console.log('Res', this.data);
      this.getStudentList();
    }, err =>{
      this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
      console.log('Error', this.error);
    });
  }

  // Getting Student List
  getStudentList(){
    this.student.getStudentList(this.student.getStudentListURL,1).subscribe((resData) =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      console.log('Student List', this.data);
      JSON.parse(this.data, (key, value) => {
        if(typeof key === 'string'){
          if(key === 'allStudentList'){
            this.studentRowDataArr = [];
            this.dataExchangeService.studentGeneralInfoArr = [];
            for(let i = 0; i < parsed.allStudentList.length; i++){
              this.dataExchangeService.saveStudentRowData(new StudentRowData(
                  (i+1),
                  parsed.allStudentList[i].studentId,
                  parsed.allStudentList[i].regdNo,
                  parsed.allStudentList[i].firstName,
                  parsed.allStudentList[i].middleName,
                  parsed.allStudentList[i].lastName,
                  parsed.allStudentList[i].dob,
                  parsed.allStudentList[i].email,
                  parsed.allStudentList[i].religion,
                  parsed.allStudentList[i].nationality,
                  parsed.allStudentList[i].gender,
                  parsed.allStudentList[i].bloodGrp,
                  parsed.allStudentList[i].address.address1,
                  parsed.allStudentList[i].address.address2,
                  parsed.allStudentList[i].address.district,
                  parsed.allStudentList[i].address.city,
                  parsed.allStudentList[i].address.postalcode,
                  parsed.allStudentList[i].address.location,
                  parsed.allStudentList[i].address.state,
                  parsed.allStudentList[i].address.country,
                  parsed.allStudentList[i].parentModel.fatherName,
                  parsed.allStudentList[i].parentModel.motherName,
                  parsed.allStudentList[i].parentModel.fatherPhoneNO,
                  parsed.allStudentList[i].parentModel.motherPhoneNO,
                  parsed.allStudentList[i].classModel.classId,
                  parsed.allStudentList[i].classModel.className,
                  parsed.allStudentList[i].sectionModel.sectionId,
                  parsed.allStudentList[i].sectionModel.sectionHouseName
              ));
              this.studentRowDataArr = this.dataExchangeService.getStudentRowDataList();
              this.dataSource = new MatTableDataSource(this.studentRowDataArr);
              this.dataSource.sort =  this.sort;
              this.dataSource.paginator = this.paginator;
              console.log("Row Data =>", this.studentRowDataArr);

              
            }
            this.studentGeneralInfoArr = this.dataExchangeService.getStudentList();
            // this.dataSource = new MatTableDataSource(this.studentGeneralInfoArr);
            // this.dataSource.sort =  this.sort;
            // this.dataSource.paginator = this.paginator;
            console.log("Student Arr", this.studentGeneralInfoArr);
          }
        }
    });
    }, err =>{
      this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
      console.log('Error', this.error);
    });
  }

  opencommon(){
    const dialogRef = this.dialog.open(StudentCreateComponent, {
    width: '50%',
    height:'40%',
    });

    dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    });
    }
}


