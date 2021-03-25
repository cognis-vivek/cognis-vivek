export class StudentDetails{
   schoolId: any;
   studentId: any;
   classId: any;
   regdNo: any;
   sectionId: any;

   constructor(
    schoolId: any,
    studentId: any,
    classId: any,
    regdNo: any,
    sectionId: any
   ){
    this.schoolId = schoolId;
    this.studentId = studentId;
    this.classId = classId;
    this.regdNo = regdNo;
    this.sectionId = sectionId;

   }

   // Getters 
   public getSchoolId(): any{
       return this.schoolId;
   }
   public getStudentId(): any{
       return this.studentId;
   }
   public getClassId(): any{
       return this.classId;
   }
   public getRegNo(): any{
       return this.regdNo;
   }
   public getSectionId(): any{
       return this.sectionId;
   }


}