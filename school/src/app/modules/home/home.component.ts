import { Component, OnInit } from '@angular/core';
import { StaffRow } from '../../models/staffRowData';
import { ClassSection } from '../../models/classSection';
import { Section } from '../../models/section';
import { SchoolSubject } from '../../models/subject';
import { SubjectSyllabus } from '../../models/subjectSyllabus';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { StudentService } from 'src/app/services/student.service';
import { HttpClient } from '@angular/common/http';
import { ClassSectioDisplay } from 'src/app/models/classSectionDisplay';
import { Subject } from 'rxjs';
import { StaffGeneralInfo } from '../../models/staffGeneralInfo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  staffArr: StaffRow[] = [];
  classArr: ClassSection[] = [];
  sectionArr: Section[] = [];
  subjectArr: SchoolSubject[] = [];
  subjectSyllabusArr: SubjectSyllabus[] = [];
  data: any;
  error: any;

  sectionString = '';
  filterSectionArr: Section[] = [];
  classSectionDisplayArr: ClassSectioDisplay[] = [];
  classSectionDisplayArrChanged = new Subject<ClassSectioDisplay[]>();
  staffGeneralInfoArr: StaffGeneralInfo[] = [];

  constructor(private http: HttpClient,
    private student: StudentService,
    private dataExchangeService: DataExchangeService
  ) { 
    this.student = new StudentService(this.http);
    this.data = '';
    this.error = '';
  }
  ngOnInit() {
    this.getAllSectionCall();
    this.getAllClasses();
    this.getAllStaff();
    this.getSyllabusSubject();
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
            this.classArr = this.dataExchangeService.getClassSection();
            
            let localSectionArr: Section[] = [];
            for(let j = 0; j<this.classArr.length; j++){
              let sections = '';
              localSectionArr = this.classArr[j].getSectionArr();
              for(let k = 0; k < localSectionArr.length;k++){
                  sections = localSectionArr[k].getSectionHouseName() +","+ sections
              }
              this.classSectionDisplayArr.push(new ClassSectioDisplay(
                this.classArr[j].classId,
                this.classArr[j].className,
                sections
              ));
              this.classSectionDisplayArrChanged.next(this.classSectionDisplayArr);
            }
            console.log('All classes', this.classSectionDisplayArr);
          }
        }
      });
      // console.log('All classes', this.data);
    },err =>{
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
              this.staffArr = this.dataExchangeService.getStaffRowData();
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


}
