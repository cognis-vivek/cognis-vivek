import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Section } from '../models/section';
import { ClassSection } from '../models/classSection';
import { HoliDay } from '../models/holiDay';
import { TypeOfExam } from '../models/typeOfExam';
import { Circular } from '../models/circular';
import { SubjectSyllabus } from '../models/subjectSyllabus';
import { ConfigData } from '../models/configData';
import { FeeMaster } from '../models/FeeMaster';
import { StudentGeneralInfo } from '../models/student_gen_info';
import { Department } from '../models/department';
import { StaffGeneralInfo } from '../models/staffGeneralInfo';
import { StaffRow } from '../models/staffRowData';
import { ExamSchedule } from '../models/examSchedule';
import { NameOfFee } from '../models/nameOfFee';
import { StudentRowData } from '../models/studentRowData';
import { StudentFeeDetails } from '../models/studentFeeDetails';
import { Assignment } from '../models/assignment';
import { Leave } from '../models/leave';
import { ExamResult } from '../models/examResult';
import { SchoolSubject } from '../models/subject';
import { DailyClass } from '../models/dailyClass';



@Injectable({
  providedIn: 'root'
})

export class DataExchangeService {
  sectionArr: Section[] = [];
  sectionArrChanged = new Subject<Section[]>();
  classSectionArr: ClassSection[] = [];
  classSectionArrChanged = new Subject<ClassSection[]>();
  holidayArr: HoliDay[] = [];
  holidayArrChanged = new Subject<HoliDay[]>();
  typeOfExamArr: TypeOfExam[] = [];
  typeOfExamArrChanged = new Subject<TypeOfExam[]>();
  circularArr: Circular[] = [];
  circularArrChanged = new Subject<Circular[]>();
  subjectSyllabusArr: SubjectSyllabus[] = [];
  subjectSyllabusArrChanged = new Subject<SubjectSyllabus[]>();
  configDataArr: ConfigData [] = [];
  configDataArrChanged = new Subject<ConfigData[]>();
  feeMasterArr: FeeMaster[] = [];
  feeMasterArrChanged = new Subject<FeeMaster[]>();
  studentGeneralInfoArr: StudentGeneralInfo[] = [];
  studentGeneralInfoArrChanged = new Subject<StudentGeneralInfo[]>();
  departmentArr: Department[] = [];
  departmentArrChanged = new Subject<Department[]>();
  staffDeneralInfoArr: StaffGeneralInfo[] = [];
  staffDeneralInfoArrChanged = new Subject<StaffGeneralInfo[]>();
  staffRowArr: StaffRow[] = [];
  staffRowArrChanged = new Subject<StaffRow[]>();
  examScheduleArr: ExamSchedule[] = [];
  examScheduleArrChanged = new Subject<ExamSchedule[]>();
  nameOfFeeArr: NameOfFee[] = [];
  nameOfFeeArrChanged = new Subject<NameOfFee[]>();
  studentRowDataArr: StudentRowData[] = [];
  studentRowDataArrChanged = new Subject<StudentRowData[]>();
  studentFeeDetailsArr: StudentFeeDetails[] = [];
  studentFeeDetailsArrChanged = new Subject<StudentFeeDetails[]>();
  assignmentArr: Assignment[] = [];
  assignmentArrChanged = new Subject<Assignment[]>();
  leavesArr: Leave[] = [];
  leavesArrChanged = new Subject<Leave[]>();
  examResultArr: ExamResult[] = [];
  examResultArrChanged = new Subject<ExamResult[]>();
  schoolSubjectArr: SchoolSubject[] = [];
  schoolSubjectArrChanged = new Subject<SchoolSubject[]>();
  dailyClassArr: DailyClass[] = [];
  dailyClassArrChanged = new Subject<DailyClass[]>();



  constructor() { }

  // Saving Section
  public saveSection(section: Section){
    this.sectionArr.push(section);
    this.sectionArrChanged.next(this.sectionArr);
    // return [...this.sectionArr];
  }
  // Getting All the Sections
  public getAllSections(): any{
    this.sectionArrChanged.next(this.sectionArr);
    return [...this.sectionArr];
  }
  // Saving class section 
  public saveClassSection(classSection: ClassSection){
    this.classSectionArr.push(classSection);
    this.classSectionArrChanged.next(this.classSectionArr);
  }
  // Getting Class Section details
  public getClassSection(): any{
    this.classSectionArrChanged.next(this.classSectionArr);
    return [...this.classSectionArr];
  }

  // Saving Holiday 
  public saveHoliday(holiDay: HoliDay){
    this.holidayArr.push(holiDay);
    this.holidayArrChanged.next(this.holidayArr);
  }

  // Getting All holiday list
  public getAllHoliday(): any{
    this.holidayArrChanged.next(this.holidayArr);
    return [...this.holidayArr];
  }

  // Saving Exam type
  public saveExamType(typeOfExam: TypeOfExam){
    this.typeOfExamArr.push(typeOfExam);
    this.typeOfExamArrChanged.next(this.typeOfExamArr);
  }

  // Geting all Type of exam
  public getAllTypeOfExam(): any{
    this.typeOfExamArrChanged.next(this.typeOfExamArr);
    return [...this.typeOfExamArr];
  }

  // Saving Circular
  public saveCircular(circular: Circular){
    this.circularArr.push(circular);
    this.circularArrChanged.next(this.circularArr);
  }

  // Getting all the circular
  public getAllCircular(): any{
    this.circularArrChanged.next(this.circularArr);
    return [...this.circularArr];
  }

  // Saving Subject Syllabus;
  public saveSubjectSyllabus(subjectSyllabus: SubjectSyllabus){
    this.subjectSyllabusArr.push(subjectSyllabus);
    this.subjectSyllabusArrChanged.next(this.subjectSyllabusArr);
  }

  // Getting All Subject Syllabus Data
  public getAllSubjectSyllabus(): any{
    this.subjectSyllabusArrChanged.next(this.subjectSyllabusArr);
    return [...this.subjectSyllabusArr];
  }

  // Saving All the Config Data
  public saveConfigData(configData: ConfigData){
    this.configDataArr.push(configData);
    this.configDataArrChanged.next(this.configDataArr);
  }

  // Getting Config Data
  public getConfigData(): any{
    this.configDataArrChanged.next(this.configDataArr);
    return [...this.configDataArr];
  }

  // Saving Fee Master
  public saveFeeMasterData(feeMaster: FeeMaster){
    this.feeMasterArr.push(feeMaster);
    this.feeMasterArrChanged.next(this.feeMasterArr);
  }

  // Getting Fee Master Data
  public getFeeMasterData(): any{
    this.feeMasterArrChanged.next(this.feeMasterArr);
    return [...this.feeMasterArr];
  }

  // Saving Student general Info data
  public saveStudentData(studentGeneralInfo: StudentGeneralInfo){
    this.studentGeneralInfoArr.push(studentGeneralInfo);
    this.studentGeneralInfoArrChanged.next(this.studentGeneralInfoArr);
  } 

  // Getting Student List
  public getStudentList(): any{
    this.studentGeneralInfoArrChanged.next(this.studentGeneralInfoArr);
    return [...this.studentGeneralInfoArr];
  }

  // Saving Department
  public saveDepartment(department: Department){
    this.departmentArr.push(department);
    this.departmentArrChanged.next(this.departmentArr);
  }

  // Get All department
  public getAllDepartment(): any{
    this.departmentArrChanged.next(this.departmentArr);
    return [...this.departmentArr]
  }

  // Saving Staff General Info
  public saveStaffGenInfo(staffGeneralInfo: StaffGeneralInfo){
    this.staffDeneralInfoArr.push(staffGeneralInfo);
    this.staffDeneralInfoArrChanged.next(this.staffDeneralInfoArr);
  }

  // getting Staff General Info
  public getStaffGenInfoList(): any{
    this.staffDeneralInfoArrChanged.next(this.staffDeneralInfoArr);
    return [...this.staffDeneralInfoArr];
  }

  // Saving Staff Row Data
  public saveStaffRowData(staffRow: StaffRow){
    this.staffRowArr.push(staffRow);
    this.staffRowArrChanged.next(this.staffRowArr);
  }

  // Getting staff Row data
  public getStaffRowData(): any{
    this.staffRowArrChanged.next(this.staffRowArr);
    return [...this.staffRowArr];
  }

  // Saving Exam Schedule
  public saveExamSchedule(examSchedule: ExamSchedule){
    this.examScheduleArr.push(examSchedule);
    this.examScheduleArrChanged.next(this.examScheduleArr);
  }

  // Getting Exam Schedule
  public getExamScheduleList(): any{
    this.examScheduleArrChanged.next(this.examScheduleArr);
    return [...this.examScheduleArr];
  }

  // Saving Name Of Fee
  public saveNameOfFee(nameOfFee: NameOfFee){
    this.nameOfFeeArr.push(nameOfFee);
    this.nameOfFeeArrChanged.next(this.nameOfFeeArr);
  }

  // Getting Name Of Fee
  public getNameOfFeeList(): any{
    this.nameOfFeeArrChanged.next(this.nameOfFeeArr);
    return [...this.nameOfFeeArr];
  }

  // Saving Student Row Data
  public saveStudentRowData(studentRowData: StudentRowData){
    this.studentRowDataArr.push(studentRowData);
    this.studentRowDataArrChanged.next(this.studentRowDataArr);
  }

  // Getting Student Row Data List
  public getStudentRowDataList(): any{
    this.studentRowDataArrChanged.next(this.studentRowDataArr);
    return [...this.studentRowDataArr];
  }

  // Saving Student Fee Details 
  public saveStudentFee(studentFeeDetails: StudentFeeDetails){
    this.studentFeeDetailsArr.push(studentFeeDetails);
    this.studentFeeDetailsArrChanged.next(this.studentFeeDetailsArr);
  } 

  // Getting Fee Details Arr Changed
  public getStudentFeeDetails(): any{
    this.studentFeeDetailsArrChanged.next(this.studentFeeDetailsArr);
    return [...this.studentFeeDetailsArr];
  }

  // Saving Assignment
  public saveAssignment(assignment: Assignment){
    this.assignmentArr.push(assignment);
    this.assignmentArrChanged.next(this.assignmentArr);
  }

  // Getting List of assignment 
  public getAssignmentList(){
    this.assignmentArrChanged.next(this.assignmentArr);
    return [...this.assignmentArr];
  }

  // Saving all leaves
  public saveLeaves(leave: Leave){
    this.leavesArr.push(leave);
    this.leavesArrChanged.next(this.leavesArr);
  }

  // Getting all leaves
  public getAllLeaves(): any{
    this.leavesArrChanged.next(this.leavesArr);
    return [...this.leavesArr];
  }

  // Save all Exam Result
  public saveExamResult(examResult: ExamResult): any{
    this.examResultArr.push(examResult);
    this.examResultArrChanged.next(this.examResultArr);
  }

  // Getting Exam Result
  public getExamResults(): any{
    this.examResultArrChanged.next(this.examResultArr);
    return [...this.examResultArr];
  }

  // Saving Subjects without Syllabus
  public saveSchoolSubject(schoolSubject: SchoolSubject){
    this.schoolSubjectArr.push(schoolSubject);
    this.schoolSubjectArrChanged.next(this.schoolSubjectArr);
  }

  // Getting List of School Subject without syllabus
  public getSchoolSubjects(): any{
    this.schoolSubjectArrChanged.next(this.schoolSubjectArr);
    return [...this.schoolSubjectArr];
  }

  // Storing Daily time table 
  public saveTimeTable(dailyClass: DailyClass){
    this.dailyClassArr.push(dailyClass);
    this.dailyClassArrChanged.next(this.dailyClassArr);
  }

  // Getting daily class Arr
  public getDailyClassTimeTable(): any{
    this.dailyClassArrChanged.next(this.dailyClassArr);
    return [...this.dailyClassArr];
  }
  

  

  
  

}
