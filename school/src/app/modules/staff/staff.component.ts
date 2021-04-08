import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { StudentService } from 'src/app/services/student.service';
import { HttpClient } from '@angular/common/http';
import { Role } from 'src/app/models/role';
import { DatePipe } from '@angular/common';
import { Address } from 'src/app/models/address';
import { Department } from 'src/app/models/department';
import { StaffGeneralInfo } from '../../models/staffGeneralInfo';
import { StaffDetails } from 'src/app/models/staffDetails';
import { StaffRow } from 'src/app/models/staffRowData';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
interface Ipost{
  id: string;
  author?: string;
  title?: string;
  category?: string;
  date?: string;
}


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  panelOpenState = false;
  data: any;
  error: any;
  dataSource!: MatTableDataSource<StaffRow>;
  posts!: Ipost[];
  column: string[] = ['id', 'author', 'title', 'category', 'date', 'actions'];
  dataColumns: string[] = ['index','staffId','department','firstName','middleName','lastName','gender','bloodGrp',
                            'qualification','dob','email','phoneNo','religion','nationality','address1','address2',
                            'district','city','postalcode','location','state','country','joiningDate','experience',
                            'fatherName','motherName','actions'
                          ];
  departmentArr: Department[] = [];
  genderArr: string[] = ['Male','Female','Other'];
  relegionArr: string[] = ['Hindu','Muslim','Christian','Other'];
  bloodGroupArr: string[] = ['O+','O-','A+','A-','B+','B-','AB+','AB-'];
  firstName: any; middleName: any; lastName: any; fatherName: any; email: any;
  motherName: any; phoneNo: any; education: any; experience: any; localAddress: any; district: any;
  location: any; state: any; city: any; postalCode: any; nationality: any; country: any;
  gender: any; religion: any; bloodGrp: any; departmentId: any; joiningDate: any; dob: any; schoolId ='1';
  staffGeneralInfoArr: StaffGeneralInfo[] = [];
  staffRowArr: StaffRow[] = [];
  step = 0;
  request = 0;
  updateIndex = 0;

      @ViewChild(MatSort, { static: true }) sort!: MatSort;
      @ViewChild( MatPaginator, { static: true }) paginator!: MatPaginator;

      tFirstName = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]);
      tMiddleName = new FormControl('', [Validators.pattern('[a-zA-Z ]*')]);
      tLastName = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]);
      tFatherName = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]);
      tMotherName = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]);
      tEmail = new FormControl('', [Validators.required,Validators.email]);
      tMobileNo =  new FormControl('', [Validators.required, Validators.minLength(10),Validators.pattern('^[0-9]*$')]);
      tExperiance = new FormControl('', [Validators.required]);
      tEducation = new FormControl('', [Validators.required]);
      tGender = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]);
      tReligion = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]);
      tBloodGroup = new FormControl('', [Validators.required]);
      tDepartment = new FormControl('', [Validators.required]);
      tDateOfJoining = new FormControl('', [Validators.required]);
      tDateOfBirth = new FormControl('', [Validators.required]);
      tEmergencyNo = new FormControl('', [Validators.required, Validators.minLength(10),Validators.pattern('^[0-9]*$')]);
      tAddress = new FormControl('', [Validators.required]);
      tDistrict = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]);
      tState = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]);
      tCity = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]);
      tLocation = new FormControl('', [Validators.required]);
      tPostalCode = new FormControl('', [Validators.required, Validators.minLength(6),Validators.pattern('^[0-9]*$')]);
      tNationality = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]);
      tCountry = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]);


  constructor(
    private http: HttpClient,
    private student: StudentService,
    private dataExchangeService: DataExchangeService,
    private datePipe: DatePipe
  ) {

    this.student = new StudentService(this.http);
    this.data = '';
    this.error = '';

    this.posts = [{
      id: '1',
      author: 'Kamalakanta Parida',
      title: 'First Post',
      category: 'Uncategory',
      date: '30-11-2020'
    },
  {
    id: '2',
    author: 'Kamalakanta Parida',
    title: 'Second Post',
    category: 'Uncategory',
    date: '30-11-2020'
  }];
  }

  // For Drop down
  setStep(index: number){
    this.step = index;
  }

  nextStep(){
    this.step++;
  }

  prevStep(){
    this.step--;
  }



  // Error Messages 
  getFirstNameError(){
     // this.sfirstName.setValue("Vu");
     if (this.tFirstName.hasError('required')) {
      return 'You must enter first name';
    }
    return this.tFirstName.hasError('tFirstName') ? 'Not valid first name' : '';
  }

  getMiddleNameError(){
    // this.sfirstName.setValue("Vu");
   return this.tMiddleName.hasError('tMiddleName') ? 'Not valid middle name' : '';
 }

  getLastNameError(){
    // this.sfirstName.setValue("Vu");
    if (this.tLastName.hasError('required')) {
      return 'You must enter last name';
    }
    return this.tLastName.hasError('tLastName') ? 'Not valid last name' : '';
  }

  getFatherNameError(){
    if (this.tFatherName.hasError('required')) {
      return 'You must enter father name';
    }
    return this.tFatherName.hasError('tFatherName') ? 'Not valid father name' : '';
  }

  getMotherNameError(){
    if (this.tMotherName.hasError('required')) {
      return 'You must enter mother name';
    }
    return this.tMotherName.hasError('tMotherName') ? 'Not valid mother name' : '';
  }

  getEmailError(){
    if (this.tEmail.hasError('required')) {
      return 'You must enter valid email';
    }
    return this.tEmail.hasError('tEmail') ? 'Not valid email' : '';
  }

  getMobileNoError(){
    if (this.tMobileNo.hasError('required')) {
      return 'You must enter valid number';
    }
    return this.tMobileNo.hasError('tMobileNo') ? 'Not valid number' : '';
  }

  getEducationError(){
    if (this.tEducation.hasError('required')) {
      return 'You must enter education';
    }
  }

  getGenderError(){
    if (this.tGender.hasError('required')) {
      return 'You must enter gender';
    }
  }

  getReligionError(){
    if (this.tReligion.hasError('required')) {
      return 'You must enter religion';
    }
  }
  getBloodGroupError(){
    if (this.tBloodGroup.hasError('required')) {
      return 'You must enter blood group';
    }
  }
  getEmergencyError(){
    if (this.tEmergencyNo.hasError('required')) {
      return 'You must enter valid number';
    }
    return this.tEmergencyNo.hasError('tEmergencyNo') ? 'Not valid number' : '';
  }
  getDateOfJoining(){
    if (this.tDateOfJoining.hasError('required')) {
      return 'You must select date';
    }
    return this.tDateOfJoining.hasError('tDateOfJoining') ? 'Not valid date' : '';
  }

  getBirthDayError(){
    if (this.tDateOfBirth.hasError('required')) {
      return 'You must select date';
    }
    return this.tDateOfBirth.hasError('tDateOfBirth') ? 'Not valid date' : '';
  }

  getAddressError(){
    if (this.tAddress.hasError('required')) {
      return 'You must enter address';
    }
  }

  getDistrictError(){
    if (this.tDistrict.hasError('required')) {
      return 'You must enter district';
    }
    return this.tDistrict.hasError('tDistrict') ? 'Not valid district' : '';
  }

  getStateError(){
    if (this.tState.hasError('required')) {
      return 'You must enter state';
    }
    return this.tState.hasError('tState') ? 'Not valid state' : '';
  }
  getCityError(){
    if (this.tCity.hasError('required')) {
      return 'You must enter city';
    }
    return this.tCity.hasError('tCity') ? 'Not valid city' : '';
  }

 // Getting Postal Code Error
 getPostalCodeError(){
  if (this.tPostalCode.hasError('required')) {
    return 'You must enter Postal code';
  }
  return this.tPostalCode.hasError('tPostalCode') ? 'Not valid' : '';
}
// Getting Nationality
getNationalityError(){
  if (this.tNationality.hasError('required')) {
    return 'You must enter Nationality';
  }
}
// Getting Country Error
getCountryError(){
  if (this.tCountry.hasError('required')) {
    return 'You must enter Country';
  }
}
  ngOnInit(): void {  
    this.getDepartMent();
    this.getAllStaff();
  }
  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Getting All the depart ment call
  getDepartMent(){
    this.student.getAllDepartment(this.student.departmentURL, 1).subscribe((resData) =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      console.log('Department List', this.data);

      JSON.parse(this.data, (key, value) =>{
          if(typeof key === 'string'){
            if(key === 'departmentList'){
              this.dataExchangeService.departmentArr = [];
              for(let i = 0; i < parsed.departmentList.length; i++){
                if(parsed.departmentList[i].roleId === 2){
                  this.dataExchangeService.saveDepartment(new Department(
                    parsed.departmentList[i].roleId,
                    parsed.departmentList[i].departmentId,
                    parsed.departmentList[i].department
                  ));
                }
              }
              this.departmentArr = this.dataExchangeService.getAllDepartment();
              console.log('DepartmentList ', this.departmentArr);
            }
          }
      });
    },
    err =>{
      this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
      console.log('Error', this.error);
    });
  }

  // Getting all the Staff
  getAllStaff(){
    this.student.getAllStaff(this.student.getAllStaffURL,1).subscribe((resData) =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      // console.log('Staff List', this.data);
      JSON.parse(this.data, (key, value) =>{
          if(typeof key === 'string'){
            if(key === 'getAllStaffList'){
              this.dataExchangeService.staffDeneralInfoArr = [];
              this.dataExchangeService.staffRowArr = [];
              
              for(let i=0; i<parsed.getAllStaffList.length; i++){
                if(parsed.getAllStaffList[i].department.roleId===2){
                  this.dataExchangeService.saveStaffRowData(new StaffRow(
                    (i+1),
                    parsed.getAllStaffList[i].generalInfo.userId,
                    parsed.getAllStaffList[i].staff.staffId,
                    parsed.getAllStaffList[i].staff.phoneNo,
                    parsed.getAllStaffList[i].department.roleId,
                    parsed.getAllStaffList[i].department.departmentId,
                    parsed.getAllStaffList[i].department.department,
                    parsed.getAllStaffList[i].generalInfo.firstName,
                    parsed.getAllStaffList[i].generalInfo.middleName,
                    parsed.getAllStaffList[i].generalInfo.lastName,
                    parsed.getAllStaffList[i].generalInfo.gender,
                    parsed.getAllStaffList[i].generalInfo.bloodGrp,
                    parsed.getAllStaffList[i].generalInfo.qualification,
                    parsed.getAllStaffList[i].generalInfo.dob,
                    parsed.getAllStaffList[i].generalInfo.email,
                    parsed.getAllStaffList[i].generalInfo.religion,
                    parsed.getAllStaffList[i].generalInfo.nationality,
                    parsed.getAllStaffList[i].address.address1,
                    parsed.getAllStaffList[i].address.address2,
                    parsed.getAllStaffList[i].address.district,
                    parsed.getAllStaffList[i].address.city,
                    parsed.getAllStaffList[i].address.postalcode,
                    parsed.getAllStaffList[i].address.location,
                    parsed.getAllStaffList[i].address.state,
                    parsed.getAllStaffList[i].address.country,
                    parsed.getAllStaffList[i].staff.joiningDate,
                    parsed.getAllStaffList[i].staff.experience,
                    parsed.getAllStaffList[i].staff.fatherName,
                    parsed.getAllStaffList[i].staff.motherName,
                    parsed.getAllStaffList[i].generalInfo.emergencyNo
                  ));
                }
                 
              }
              this.staffRowArr = this.dataExchangeService.getStaffRowData();
              this.dataSource = new MatTableDataSource(this.staffRowArr);
              this.dataSource.sort =  this.sort;
              this.dataSource.paginator = this.paginator;
             
            } 
            this.staffGeneralInfoArr = this.dataExchangeService.getStaffGenInfoList();
            console.log('Staff List', this.staffRowArr); 
          } 
      });
    },
    err =>{
      this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
      console.log('Error', this.error);
    });
  }

  // Changing Department
  departmentChange(event: any){
    this.departmentId = event.value;
    console.log('depart ment ID', this.departmentId);
  }

  // Changing Gender
  onChangeGender(event: any){
    this.gender = event.value;
  }

  // Chinging Religion
  onChangeReligion(event: any){
    this.religion = event.value;
  }

  // Chinging blood group
  onChangeBlood(event: any){
      this.bloodGrp = event.value;
  }

  // Changing Joining date change
  onJoiningDateChange(event: any){
    const date = event.value;
    this.joiningDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    console.log('Date1', this.joiningDate);
  }

  // Changing Date of birth
  onDateOfBirthChange(event: any){
    const date = event.value;
    this.dob = this.datePipe.transform(date, 'yyyy-MM-dd');
    console.log('Date2', this.dob);
  }

  // Adding teacher
  addTeacher(){
    if(this.request !==0){
      this.tMobileNo.setValue('');
      const body = new StaffGeneralInfo(
        this.staffRowArr[this.updateIndex].userId,
        this.tMobileNo.value,
        '',
        new Role('2'),
        this.tFirstName.value,
        this.tMiddleName.value,
        this.tLastName.value,
        this.tGender.value,
        this.tBloodGroup.value,
        this.tEmergencyNo.value,
        this.tReligion.value,
        this.datePipe.transform(this.tDateOfBirth.value, 'yyyy-MM-dd'),
        this.tEmail.value,
        this.tNationality.value,
        this.tEducation.value,
        new Address(
          this.staffRowArr[this.updateIndex].userId,
          this.tAddress.value,
          this.tAddress.value,
          this.tCity.value,
          this.tDistrict.value,
          this.tCountry.value,
          this.tState.value,
          this.tLocation.value,
          this.tPostalCode.value
        ),
        new StaffDetails(
          this.staffRowArr[this.updateIndex].userId,
          this.schoolId,
          this.tDepartment.value,
          this.tExperiance.value,
          this.datePipe.transform(this.tDateOfJoining.value, 'yyyy-MM-dd'),
          this.tFatherName.value,
          this.tMotherName.value
        )
    );

      console.log('body1', JSON.stringify(body));
      this.student.postStaffCreationData(this.student.staffUpdateURL,body).subscribe((resData) =>{
        let parsed = JSON.parse(JSON.stringify(resData));
        // parsed.childList
        this.data = JSON.stringify(resData);
        console.log('Staff Res', this.data);
        this.getAllStaff();
        this.request = 0;
      },
      err =>{
        this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
        console.log('Error', this.error);
      });
    }else{
      const body = new StaffGeneralInfo(
        '',
        this.tMobileNo.value,
        '',
        new Role('2'),
        this.tFirstName.value,
        this.tMiddleName.value,
        this.tLastName.value,
        this.tGender.value,
        this.tBloodGroup.value,
        this.tEmergencyNo.value,
        this.tReligion.value,
        this.datePipe.transform(this.tDateOfBirth.value, 'yyyy-MM-dd'),
        this.tEmail.value,
        this.tNationality.value,
        this.tEducation.value,
        new Address(
          '',
          this.tAddress.value,
          this.tAddress.value,
          this.tCity.value,
          this.tDistrict.value,
          this.tCountry.value,
          this.tState.value,
          this.tLocation.value,
          this.tPostalCode.value
        ),
        new StaffDetails(
          '',
          this.schoolId,
          this.tDepartment.value,
          this.tExperiance.value,
          this.datePipe.transform(this.tDateOfJoining.value, 'yyyy-MM-dd'),
          this.tFatherName.value,
          this.tMotherName.value
        )
    );
      console.log('body2', JSON.stringify(body));
      this.student.postStaffCreationData(this.student.staffRegistrationURL,body).subscribe((resData) =>{
        let parsed = JSON.parse(JSON.stringify(resData));
        // parsed.childList
        this.data = JSON.stringify(resData);
        console.log('Staff Res', this.data);
        this.getAllStaff();
      },
      err =>{
        this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
        console.log('Error', this.error);
      });
    }
    // const body = new StaffGeneralInfo(
    //     this.phoneNo,
    //     '',
    //     new Role('2'),
    //     this.firstName,
    //     this.middleName,
    //     this.lastName,
    //     this.gender,
    //     this.bloodGrp,
    //     this.religion,
    //     this.dob,
    //     this.email,
    //     this.nationality,
    //     this.education,
    //     new Address(
    //       '',
    //       this.localAddress,
    //       this.localAddress,
    //       this.city,
    //       this.district,
    //       this.country,
    //       this.state,
    //       this.location,
    //       this.postalCode
    //     ),
    //     new StaffDetails(
    //       this.schoolId,
    //       this.departmentId+'',
    //       this.experience,
    //       this.joiningDate,
    //       this.fatherName,
    //       this.motherName
    //     )
    // );
    
  }

  // Updating Teaching Staff
  updateStaff(index: any){
    for(let i = 0; i < this.staffRowArr.length; i++){
      if(index === this.staffRowArr[i].index){
        this.updateIndex = i;
        this.request = 1;
        break;
      }
    }
    this.tFirstName.setValue(this.staffRowArr[this.updateIndex].firstName);
    this.tMiddleName.setValue(this.staffRowArr[this.updateIndex].middleName);
    this.tLastName.setValue(this.staffRowArr[this.updateIndex].lastName);
    this.tFatherName.setValue(this.staffRowArr[this.updateIndex].fatherName);
    this.tMotherName.setValue(this.staffRowArr[this.updateIndex].motherName);
    this.tEmail.setValue(this.staffRowArr[this.updateIndex].email);
    this.tMobileNo.setValue(this.staffRowArr[this.updateIndex].phoneNo);
    this.tExperiance.setValue(this.staffRowArr[this.updateIndex].experience);
    this.tEducation.setValue(this.staffRowArr[this.updateIndex].qualification);
    this.tGender.setValue(this.staffRowArr[this.updateIndex].gender);
    this.tReligion.setValue(this.staffRowArr[this.updateIndex].religion);
    this.tBloodGroup.setValue(this.staffRowArr[this.updateIndex].bloodGrp);
    this.tDepartment.setValue(this.staffRowArr[this.updateIndex].departmentId);
    this.tDateOfJoining.setValue(this.staffRowArr[this.updateIndex].joiningDate);
    this.tDateOfBirth.setValue(this.staffRowArr[this.updateIndex].dob);
    this.dob = this.staffRowArr[this.updateIndex].dob;  // For checking purpose
    this.tEmergencyNo.setValue(this.staffRowArr[this.updateIndex].emergencyNo);
    this.tAddress.setValue(this.staffRowArr[this.updateIndex].address1);
    this.tDistrict.setValue(this.staffRowArr[this.updateIndex].district);
    this.tState.setValue(this.staffRowArr[this.updateIndex].state);
    this.tCity.setValue(this.staffRowArr[this.updateIndex].city);
    this.tLocation.setValue(this.staffRowArr[this.updateIndex].location);
    this.tPostalCode.setValue(this.staffRowArr[this.updateIndex].postalcode);
    this.tNationality.setValue(this.staffRowArr[this.updateIndex].nationality);
    this.tCountry.setValue(this.staffRowArr[this.updateIndex].country);
    this.setStep(0);
  }

}
