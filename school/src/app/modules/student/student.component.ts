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
import { DatePipe } from '@angular/common';
import { StudentDetails } from 'src/app/models/studentDetails';
import { Parent } from 'src/app/models/parent';
import { Address } from 'src/app/models/address';
import { StudentRowData } from 'src/app/models/studentRowData';
import { StudentCreateComponent } from './student-create/student-create.component';
import { moment } from 'ngx-bootstrap/chronos/test/chain';



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
  form!: FormGroup;
  picker1: any;
  sectionArr: Section[] = [];
  classSectionArr: ClassSection[] = [];
  filterSectionArr: Section[] = [];
  currentDate = '';
  data: any;
  error: any;
  urllink:string ="assets/img/image.jpg";
  panelOpenState = false;
  addressInfoPannel = false;
  hide = true;
  // options: FormGroup;
  colorControl = new FormControl('primary');
  fontSizeControl = new FormControl(16, Validators.min(10));
  // Email Error message
  // fatherEmail = new FormControl('',[Validators.required, Validators.email]);
  dataSource!: MatTableDataSource<StudentRowData>;
  posts!: Ipost[];
  // column: string[] = ['id', 'regdNo', 'firstName', 'middleName', 'lastName','dob','email','religion', 'actions'];
  dataColumns: string[] = ['index', 'regdNo', 'firstName', 'middleName', 'lastName','dob','email','religion', 
                           'nationality', 'gender', 'studentPhoneNo','bloodGrp', 'address1', 'address2', 'district', 'city',
                           'postalcode', 'location','state','country','fatherName','motherName','guardianName',
                           'guardianPhoneNo','className','sectionHouseName','actions'];
  // For Create student details
  firstName: any; middleName: any; lastName: any; fatherName: any; fatherPhoneNo=''; fatherEmail: any;
  motherName: any; motherPhoneNo=''; matherEmail: any; studentPhoneNo: any; localAddress: any; district: any;
  location: any; state: any; city: any; postalCode: any; nationality: any; country: any;
  gender: any; religion=''; bloodGrp: any; classId: any; sectionId=''; dob: any; schoolId ='1';
  className=''; sectionName= '';
  genderArr: string[] = ['Male','Female','Other'];
  relegionArr: string[] = ['Hindu','Muslim','Christian','Other'];
  bloodGroupArr: string[] = ['O+','O-','A+','A-','B+','B-','AB+','AB-'];
  studentGeneralInfoArr: StudentGeneralInfo[] = [];
  studentRowDataArr: StudentRowData[] = [];
  request = 0;
  // updateStdGenIn?: StudentGeneralInfo;
  updateIndex = 0;



@ViewChild(MatSort, { static: true }) sort!: MatSort;
@ViewChild( MatPaginator, { static: true }) paginator!: MatPaginator;

    sfirstName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
    sMiddleName = new FormControl('', [Validators.pattern('[a-zA-Z ]*')]);
    sLastName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
    sFatherName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
    sMotherName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
    sGuardianName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
    sGuardianPhone = new FormControl('', [Validators.required, Validators.minLength(10),Validators.pattern('^[0-9]*$')]);
    sGuardianEmail = new FormControl('', [Validators.required,Validators.email]);
    sStudentPhoneNo = new FormControl('', [Validators.required,Validators.minLength(10),Validators.pattern('^[0-9]*$')]);
    sDateOfBirth = new FormControl('', [Validators.required]);
    sBloodGroup = new FormControl('', [Validators.required]);
    sGender = new FormControl('', [Validators.required]);
    sReligion = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]);
    sClass = new FormControl('', [Validators.required]);
    sSection = new FormControl('', [Validators.pattern('[a-zA-Z ]*')]);
    sEmergencyPhone = new FormControl('', [Validators.required, Validators.minLength(10),Validators.pattern('^[0-9]*$')]);
    sAddress = new FormControl('', [Validators.required]);
    sDist = new FormControl('', [Validators.required]);
    sLocation = new FormControl('', [Validators.required]);
    sState = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
    sCity = new FormControl('', [Validators.required]);
    sPostalCode = new FormControl('', [Validators.required, Validators.minLength(6),Validators.pattern('^[0-9]*$')]);
    sNationality = new FormControl('', [Validators.required]);
    sCountry = new FormControl('', [Validators.required]);
    step = 0;


  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
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
    this.dob = "2021-04-07";
    // this.sDateOfBirth.setValue("2021-04-07");
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
    this.addressInfoPannel = true;
    
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

  
  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter an email';
  //   }
  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

  // For Phone
  // keyPress(event: any) {
  //   const pattern = /[0-9]/;
  //   let inputChar = String.fromCharCode(event.charCode);
  //     if (!pattern.test(inputChar)) {
  //         event.preventDefault();
  //     }
  //   }

  

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    // this.step++;
    if(!this.sfirstName.valid){
      console.log('First Name not valid');
    }else if(!this.sLastName.valid){
      console.log('Last Name not valid');
    }else if(!this.sFatherName.valid){
      console.log('Last Name not valid');
    }else if(!this.sMotherName.valid){
      console.log('Mother Name not valid');
    }else if(!this.sGuardianName.valid){
      console.log('Guardian Name not valid');
    }else if(!this.sGuardianPhone.valid){
      console.log('Guardian Phone not valid');
    }else if(!this.sGuardianEmail.valid){
      console.log('Guardian Phone not valid');
    }else if(!this.sStudentPhoneNo.valid){
      console.log('Student Phone not valid');
    }else if(!this.sBloodGroup.valid){
      console.log('Blood does not exist');
    }else if(!this.sGender.valid){
      console.log('Gender does not exist');
    }else if(!this.sClass.valid){
      console.log('Class not exist');
    }else if(!this.sEmergencyPhone.valid){
      console.log("Emergency number not exist");
    }else{
      this.step++;
    }

    // if(this.sfirstName.con === null){
    //   console.log('err occured')
    // }else{
    //   this.step++;
    // }
    
  }

  prevStep() {
    if(this.step < 0){
      this.setStep(0);
    }else{
      this.step--;
    }
  }

  // First Name Error 
  getFirstNameError(){
    // this.sfirstName.setValue("Vu");
    if (this.sfirstName.hasError('required')) {
      return 'You must enter first name';
    }
    return this.sfirstName.hasError('sfirstName') ? 'Not valid first name' : '';
  }

  // Middle name error
  getMiddleNameError(){
    // return this.sMiddleName.hasError('sMiddleName') ? 'Not valid middle name' : '';
    if (this.sMiddleName.hasError('sMiddleName')) {
      return 'You must enter Character';
    }
  }
  // Last Name Error
  getLastNameError(){
    if (this.sLastName.hasError('required')) {
      return 'You must enter last name';
    }
    return this.sLastName.hasError('sLastName') ? 'Not valid last name' : '';
  }
  // Father Name Error
  getFatherNameError(){
    if (this.sFatherName.hasError('required')) {
      return 'You must enter Father name';
    }
    return this.sFatherName.hasError('sFatherName') ? 'Not valid Father name' : '';
  }
  // Mother Name Error
  getMotherNameError(){
    if (this.sMotherName.hasError('required')) {
      return 'You must enter Mother name';
    }
    return this.sMotherName.hasError('sMotherName') ? 'Not valid Mother name' : '';
  }
  // Getting Guardian Name Error
  getGurdianNameError(){
    if (this.sGuardianName.hasError('required')) {
      return 'You must enter Guardian name';
    }
    return this.sGuardianName.hasError('sGuardianName') ? 'Not valid Guardian name' : '';
  }
  // Getting Guardian Phone Error
  getGuardianPhoneError(){
    if (this.sGuardianPhone.hasError('required')) {
      return 'You must enter Guardian phone';
    }
    return this.sGuardianPhone.hasError('sGuardianPhone') ? 'Not valid Guardian phone' : '';
  }
  // Getting Guardian Email Error
  getGUardianEmailError(){
    if (this.sGuardianEmail.hasError('required')) {
      return 'You must enter an email';
    }
    return this.sGuardianEmail.hasError('sGuardianEmail') ? 'Not valid Guardian email' : '';
  }
  // Getting Student phone Error
  getStudentPhoneError(){
    if (this.sStudentPhoneNo.hasError('required')) {
      return 'You must enter different phone number';
    }
    return this.sStudentPhoneNo.hasError('sStudentPhoneNo') ? 'Not valid Student phone' : '';
  }
  // Getting Date of birth error
  getDateOfBirthError(){
    if (this.sDateOfBirth.hasError('required')) {
      return 'You must enter Date of birth';
    }
  }
  // Getting Blood Group Error
  getBloodGroupError(){
    if (this.sBloodGroup.hasError('required')) {
      return 'You must enter Blood group';
    }
  }
  // Getting Gender Error
  getGenderError(){
    if (this.sGender.hasError('required')) {
      return 'You must enter gender';
    }
  }
  // Getting Class Error
  getClassError(){
    if (this.sClass.hasError('required')) {
      return 'You must enter class';
    }
  }
  // Getting Religion Error
  getReligionMessageError(){
    if (this.sReligion.hasError('sReligion')) {
      return 'You must enter Character';
    }
    return this.sReligion.hasError('sReligion') ? 'Not valid Religion' : '';
  }
  // Getting Emergency Phone Error
  getEmergencyPhone(){
    if (this.sEmergencyPhone.hasError('required')) {
      return 'You must enter Emergency phone';
    }
    return this.sEmergencyPhone.hasError('sEmergencyPhone') ? 'Not valid Emergency phone' : '';
  }

  // Getting Address Error
  getAddressError(){
    if (this.sAddress.hasError('required')) {
      return 'You must enter Address';
    }
  }
  // Getting Dist Error 
  getDistError(){
    if (this.sDist.hasError('required')) {
      return 'You must enter District';
    }
  }
  // Getting State Error
  getStateError(){
    if (this.sState.hasError('required')) {
      return 'You must enter State';
    }
  }
  // Getting City Error
  getCityError(){
    if (this.sCity.hasError('required')) {
      return 'You must enter City';
    }
  }

  // Getting Postal Code Error
  getPostalCodeError(){
    if (this.sPostalCode.hasError('required')) {
      return 'You must enter Postal code';
    }
    return this.sPostalCode.hasError('sPostalCode') ? 'Not valid' : '';
  }
  // Getting Nationality
  getNationalityError(){
    if (this.sNationality.hasError('required')) {
      return 'You must enter Nationality';
    }
  }
  // Getting Country Error
  getCountryError(){
    if (this.sCountry.hasError('required')) {
      return 'You must enter Country';
    }
  }

  // Saving General Info
  saveGenInfo(){
    this.nextStep();
  }

  // Saving Address
  saveAddress(){
    
  }


  
  
  
  
  // // Phone Error Message
  // getPhoneError(){
  //   if (this.phone.hasError('required')) {
  //     return 'You must enter a phone number';
  //   }
  //   return this.email.hasError('phone') ? 'Not a valid number' : '';
  // }


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
    console.log('Date1', date);
    this.dob = this.datePipe.transform(date, 'yyyy-MM-dd');
    console.log('Date2', this.dob);
  }

  // Saving Student
  saveStudent(){
    if(this.request === 1){
          this.sStudentPhoneNo.setValue('');
          const body = new StudentGeneralInfo(
            '',
            this.studentRowDataArr[this.updateIndex].studentUserId,
            this.sStudentPhoneNo.value,
            '',
            new Role('1'),
            this.sfirstName.value,
            this.sMiddleName.value,
            this.sLastName.value,
            this.sGender.value,
            this.sBloodGroup.value,
            this.sReligion.value,
            this.datePipe.transform(this.sDateOfBirth.value, 'yyyy-MM-dd'),
            this.sGuardianEmail.value, // Instead of Student Email
            this.sNationality.value,
            this.sEmergencyPhone.value,
            new Address(
              this.studentRowDataArr[this.updateIndex].addressUserId,
              this.sAddress.value,
              this.sAddress.value,
              this.sCity.value,
              this.sDist.value,
              this.sCountry.value,
              this.sState.value,
              this.sLocation.value,
              this.sPostalCode.value
            ),
            new StudentDetails(
              this.studentRowDataArr[this.updateIndex].studentUserId,
              this.schoolId,
              '',
              this.sClass.value,
              '',
              this.sSection.value
            ),
            new Parent(
              new Role('3'),
              this.studentRowDataArr[this.updateIndex].parentUserID,
              this.sGuardianName.value,
              this.sGuardianPhone.value,
              this.fatherPhoneNo,
              this.motherPhoneNo,
              this.sFatherName.value,
              this.sMotherName.value,
              ""
            )
      );
          
      
      console.log("Update Data", JSON.stringify(body));
      // break;
      // }
      // }
      this.student.postStudentDetails(this.student.updateStudentURL, body).subscribe((resData) => {
        let parsed = JSON.parse(JSON.stringify(resData));
        // parsed.childList
        this.data = JSON.stringify(resData);
        console.log('Res', this.data);
        this.request = 0;
        this.getStudentList();
      }, err =>{
        this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
        console.log('Error', this.error);
      });
    }else{
      console.log('First Name ', this.sfirstName.value);
      const body = new StudentGeneralInfo(
            '',
            '',
            this.sStudentPhoneNo.value,
            '',
            new Role('1'),
            this.sfirstName.value,
            this.sMiddleName.value,
            this.sLastName.value,
            this.sGender.value,
            this.sBloodGroup.value,
            this.sReligion.value,
            this.datePipe.transform(this.sDateOfBirth.value, 'yyyy-MM-dd'),
            this.sGuardianEmail.value, // Instead of Student Email
            this.sNationality.value,
            this.sEmergencyPhone.value,
            new Address(
              '',
              this.sAddress.value,
              this.sAddress.value,
              this.sCity.value,
              this.sDist.value,
              this.sCountry.value,
              this.sState.value,
              this.sLocation.value,
              this.sPostalCode.value
            ),
            new StudentDetails(
              '',
              this.schoolId,
              '',
              this.sClass.value,
              '',
              this.sSection.value
              // this.sectionId
            ),
            new Parent(
              new Role('3'),
              '',
              this.sGuardianName.value,
              this.sGuardianPhone.value,
              this.fatherPhoneNo,
              this.motherPhoneNo,
              this.sFatherName.value,
              this.sMotherName.value,
              ""
            )
      );
      console.log('body', JSON.stringify(body));
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
    // this.prevStep();
    
  }

  // Getting Student List
  getStudentList(){
    console.log('date of ', this.sDateOfBirth.value);
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
                  parsed.allStudentList[i].userId,
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
                  parsed.allStudentList[i].studentPhoneNo,
                  parsed.allStudentList[i].emergencyNumber,
                  parsed.allStudentList[i].address.userId,
                  parsed.allStudentList[i].address.address1,
                  parsed.allStudentList[i].address.address2,
                  parsed.allStudentList[i].address.district,
                  parsed.allStudentList[i].address.city,
                  parsed.allStudentList[i].address.postalcode,
                  parsed.allStudentList[i].address.location,
                  parsed.allStudentList[i].address.state,
                  parsed.allStudentList[i].address.country,
                  parsed.allStudentList[i].parentModel.userId,
                  parsed.allStudentList[i].parentModel.guardianName,
                  parsed.allStudentList[i].parentModel.guardianPhoneNo,
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

  // Updating Student
        updateStudent(index: any){
    
          // this.updateIndex = index;
          for(let i = 0; i < this.studentRowDataArr.length;i++){
            if(index === this.studentRowDataArr[i].index){
              this.updateIndex = i;
              this.request = 1;
              break;
            }
          }
          this.sfirstName.setValue(this.studentRowDataArr[this.updateIndex].firstName);
          this.sMiddleName.setValue(this.studentRowDataArr[this.updateIndex].middleName);
          this.sLastName.setValue(this.studentRowDataArr[this.updateIndex].lastName);
          this.sFatherName.setValue(this.studentRowDataArr[this.updateIndex].fatherName);
          this.sMotherName.setValue(this.studentRowDataArr[this.updateIndex].motherName);
          this.sGuardianName.setValue(this.studentRowDataArr[this.updateIndex].guardianName);
          this.sGuardianPhone.setValue(this.studentRowDataArr[this.updateIndex].guardianPhoneNo);
          this.sGuardianEmail.setValue(this.studentRowDataArr[this.updateIndex].email);
          this.sStudentPhoneNo.setValue(this.studentRowDataArr[this.updateIndex].studentPhoneNo);
          this.dob = this.studentRowDataArr[this.updateIndex].dob;
          this.sDateOfBirth.setValue(this.datePipe.transform(this.studentRowDataArr[this.updateIndex].dob, 'yyyy-MM-dd'));
          this.sBloodGroup.setValue(this.studentRowDataArr[this.updateIndex].bloodGrp);
          this.sGender.setValue(this.studentRowDataArr[this.updateIndex].gender);
          this.sReligion.setValue(this.studentRowDataArr[this.updateIndex].religion);
          this.sClass.setValue(this.studentRowDataArr[this.updateIndex].classId);
          this.sSection.setValue(this.studentRowDataArr[this.updateIndex].sectionId);
          this.sEmergencyPhone.setValue(this.studentRowDataArr[this.updateIndex].emergencyNo);
          this.sAddress.setValue(this.studentRowDataArr[this.updateIndex].address1);
          this.sDist.setValue(this.studentRowDataArr[this.updateIndex].district);
          this.sLocation.setValue(this.studentRowDataArr[this.updateIndex].location);
          this.sState.setValue(this.studentRowDataArr[this.updateIndex].state);
          this.sCity.setValue(this.studentRowDataArr[this.updateIndex].city);
          this.sPostalCode.setValue(this.studentRowDataArr[this.updateIndex].postalcode);
          this.sNationality.setValue(this.studentRowDataArr[this.updateIndex].nationality);
          this.sCountry.setValue(this.studentRowDataArr[this.updateIndex].country);
          this.setStep(0);
  }

  // Deleting Student
  deleteStudent(index: any){
    for(let i = 0; i < this.studentRowDataArr.length;i++){
      if(index === this.studentRowDataArr[i].index){
        // this.updateIndex = i;
        // this.request = 1;
        const body = {
              userId: this.studentRowDataArr[i].studentUserId,
              userActiveInactiveStatus: 'I'
        };

        console.log('Body3', body);
        this.student.deleteUser(this.student.deleteUserURL,body).subscribe((resData)=>{
          let parsed = JSON.parse(JSON.stringify(resData));
          // parsed.childList
          this.data = JSON.stringify(resData);
          console.log('Updated Status', this.data);
          this.getStudentList();
        }, err =>{
          this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
          console.log('Error', this.error);
        });
        break;
      }
    }
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


