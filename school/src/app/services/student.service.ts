import { Injectable } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
// 3.17.165.248
  public baseUrl = 'http://3.17.165.248:8080/';
  public deleteUserURL = 'SchoolWebApp/rest/userService/updateUserStatus';
  public sectionURLGet = 'SchoolWebApp/rest/sectionService';
  public sectionURLPost = 'SchoolWebApp/rest/sectionService';
  public sectionURLPUT = this.sectionURLPost + '/updateSection';
  public classesDetailsURL = 'SchoolWebApp/rest/classService';
  public saveStudentURL = 'SchoolWebApp/rest/generalService';
  public updateStudentURL = this.saveStudentURL + '/updateGeneralService';
  public saveHoliDayURL = 'SchoolWebApp/rest/holidayService';
  public postSubjectSyllabusURL = 'SchoolWebApp/rest/subjectService';
  public examTypeURL = 'SchoolWebApp/rest/examresult/examtype';
  public circularURL = 'SchoolWebApp/rest/messageService';
  public updateCircularUrl = this.circularURL + '/updateMessage';
  public subjectSyllabus = 'SchoolWebApp/rest/syllabusService';
  public configDataURL = 'SchoolWebApp/rest/configFeeService';
  public feeMasterURL = 'SchoolWebApp/rest/configFeeService/getMasterFee';
  public posrFeeMasterURL = 'SchoolWebApp/rest/configFeeService/masterFee';
  public getStudentListURL = 'SchoolWebApp/rest/studentService/'; 
  public departmentURL = 'SchoolWebApp/rest/teacherService/getAllDepartment/';
  public getAllStaffURL = 'SchoolWebApp/rest/teacherService/getAllStaff';
  public staffRegistrationURL = 'SchoolWebApp/rest/generalService/staffRegistration/';
  public staffUpdateURL = 'SchoolWebApp/rest/generalService/staffUpdate';
  public examScheduleURL = 'SchoolWebApp/rest/examScheduleService';
  public nameOfFeeURL = 'SchoolWebApp/rest/configFeeService/getNameOfFee';
  public addStudentFeeURL ='SchoolWebApp/rest/feedetailsservice/';
  public getAllAssignmentURL = 'SchoolWebApp/rest/assignmentService/getAllAdmin';
  public getAllLeavesURL = 'SchoolWebApp/rest/leavesservice/allListForAdmin';
  public examResultURL = 'SchoolWebApp/rest/examresult/listOfStudent';
  public addStudentExamResult = 'SchoolWebApp/rest/examresult';
  public timeTableURL = 'SchoolWebApp/rest/timeTableService';
  constructor(public http: HttpClient) {
  }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('',Validators.email),
    mobile: new FormControl('',[Validators.required,Validators.minLength(10)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false)
  });
  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: 0,
      hireDate: '',
      isPermanent: false
    });
  }
 
      // deleting User
      public deleteUser(url: string, body: any): Observable<object>{
        return this.http.post<any>(this.baseUrl + url, body);
      }
      // Getting Section List
      public getSections(url: string, schoolId: any): Observable<object>{
        return this.http.get(this.baseUrl + url + '?schoolId=' + schoolId);
      }

      // Adding Section
      public postSection(url: string, body: any): Observable<object>{
        return this.http.post<any>(this.baseUrl + url, body);
      }

      // Updating Section
      public putSection(url: string, body: any): Observable<object>{
        return this.http.post<any>(this.baseUrl + url, body);
      }

      // Getting Classes details
      public getClasses(url: string, schoolId: any): Observable<object>{
        return this.http.get(this.baseUrl + url + '?schoolId=' + schoolId);
      }

      // Adding classes
      public postClassDetails(url: string, body: any): Observable<object>{
        return this.http.post<any>(this.baseUrl + url, body);
      }

      // Adding Student Details
      public postStudentDetails(url: string, body: any): Observable<object>{
        return this.http.post<any>(this.baseUrl + url, body);
      }

      // Adding Holiday
      public postHoliDay(url: string, body: any): Observable<object>{
        return this.http.post<any>(this.baseUrl + url, body);
      }

      // Getting Holiday
      public getHoliDay(url: string, schoolId: any): Observable<object>{
        return this.http.get(this.baseUrl + url + '?schoolId=' + schoolId);
      }

      // Adding Subject with syllabus
      public postSubjectSyllabus(url: string, body: any): Observable<object>{
        return this.http.post<any>(this.baseUrl + url, body);
      }

      // Getting All Subject Syllabus
      public getSubjectSyllabus(url: any, schoolId: any): Observable<object>{
        return this.http.get(this.baseUrl + url + '?schoolId=' + schoolId);
      }

      // Getting Type of exam
      public getTypeOfExam(url: string, schoolId: any): Observable<object>{
        return this.http.get(this.baseUrl + url + '?schoolId=' + schoolId);
      }

      // Posting Exam Schedule
      public postExamSchedule(url: any, body: any): Observable<object>{
        return this.http.post<any>(this.baseUrl + url, body);
      }

      // Getting List of exam schedule
      public getExamScheduleList(url: string, schoolId: any): Observable<object>{
        return this.http.get(this.baseUrl + url + '?schoolId=' + schoolId);
      }

      // Getting Circular
      public getCircular(url: string, schoolId: any): Observable<object>{
        return this.http.get(this.baseUrl + url + '?schoolId=' + schoolId);
      }

      // Posting Circular
      public postCircular(url: any, body: any): Observable<object>{
        return this.http.post<any>(this.baseUrl + url, body);
      }

      // Getting Configuration Data
      public getConfigData(url: any, schoolId: any): Observable<object>{
        return this.http.get(this.baseUrl + url + '?schoolId=' + schoolId);
      }

      // Getting All Fee Master Data
      public getFeeMasterData(url: any, schoolId: any): Observable<object>{
        return this.http.get(this.baseUrl + url + '?schoolId=' + schoolId);
      }

      // Posting Fee Master Data
      public postFeeMasterData(url: any, body: any): Observable<object>{
        return this.http.post<any>(this.baseUrl + url, body);
      }

      // getting Student list 
      public getStudentList(url: any, schoolId: any): Observable<object>{
        return this.http.get(this.baseUrl + url + '?schoolId=' + schoolId);
      }

      // Getting Department 
      public getAllDepartment(url: any, schoolId: any):Observable<object>{
        return this.http.get(this.baseUrl + url + '?schoolId=' + schoolId);
      }

      // Getting all staff
      public getAllStaff(url: any, schoolId: any):Observable<object>{
        return this.http.get(this.baseUrl + url + '?schoolId=' + schoolId);
      }

      // Posting Staff Data
      public postStaffCreationData(url: any, body: any): Observable<object>{
        return this.http.post<any>(this.baseUrl + url, body);
      }

      // getting Name Of fee
      public getNameOfFee(url: any, schoolId: any): Observable<object>{
        return this.http.get(this.baseUrl + url + '?schoolId=' + schoolId);
      }

      // Getting Student fee list
      public getStudentFeeList(url: any, schoolId: any): Observable<object>{
        return this.http.get(this.baseUrl + url + '?schoolId=' + schoolId);
      }

      // Adding Student Fee
      public postStudentFee(url: any, body: any): Observable<object>{
        return this.http.post<any>(this.baseUrl + url, body);
      }

      // Getting List of Assignments
      public getAllAssignment(url: string, schoolId: any): Observable<object>{
        return this.http.get(this.baseUrl + url + '?schoolId=' + schoolId);
      }

      // Getting List of user leaves
      public getAllLeaves(url: string, schoolId: any): Observable<object>{
        return this.http.get(this.baseUrl + url + '?schoolId=' + schoolId);
      }
      // Getting ExamResult
      public getExamResultByYear(url: string, schoolId: any, createdDate: any): Observable<object>{
        return this.http.get(this.baseUrl + url + '?schoolId=' + schoolId + '&createdDate=' + createdDate);
      }
      
      // Posting Student Exam Result by subject
      public postExamResult(url: any, body: any): Observable<object>{
        return this.http.post<any>(this.baseUrl + url, body);
      }

      // Getting daily Time table
      public getDailyClass(url: any, dayId: any, schoolId: any): Observable<object>{
        return this.http.get(this.baseUrl + url + '?daysId=' + dayId + '&schoolId=' + schoolId);
      } 

      // posting daily class model
      public postDailyClass(url: any, body: any): Observable<object>{
        return this.http.post<any>(this.baseUrl + url, body);
      }
}
