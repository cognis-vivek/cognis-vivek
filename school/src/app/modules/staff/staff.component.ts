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
                  this.dataExchangeService.saveStaffRowData(new StaffRow(
                    (i+1),
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
                    parsed.getAllStaffList[i].staff.motherName
                  ));
              }
              this.staffRowArr = this.dataExchangeService.getStaffRowData();
              this.dataSource = new MatTableDataSource(this.staffRowArr);
              this.dataSource.sort =  this.sort;
              this.dataSource.paginator = this.paginator;
             
            } 
            this.staffGeneralInfoArr = this.dataExchangeService.getStaffGenInfoList();
            console.log('Staff List', this.staffGeneralInfoArr); 
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
    const body = new StaffGeneralInfo(
        this.phoneNo,
        '12345',
        new Role('2'),
        this.firstName,
        this.middleName,
        this.lastName,
        this.gender,
        this.bloodGrp,
        this.religion,
        this.dob,
        this.email,
        this.nationality,
        this.education,
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
        new StaffDetails(
          this.schoolId,
          this.departmentId+'',
          '',
          this.experience,
          this.joiningDate,
          this.fatherName,
          this.motherName
        )
    );
    console.log('body', JSON.stringify(body));

    this.student.postStaffCreationData(this.student.staffRegistrationURL,body).subscribe((resData) =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      console.log('Staff Res', this.data);
    },
    err =>{
      this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
      console.log('Error', this.error);
    });
  }

}
