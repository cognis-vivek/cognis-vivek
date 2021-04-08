export class StudentDetails{
   userId: any;
   schoolId: any;
   studentId: any;
   classId: any;
   regdNo: any;
   sectionId: any;

   constructor(
    userId: any,
    schoolId: any,
    studentId: any,
    classId: any,
    regdNo: any,
    sectionId: any
   ){
    this.userId = userId;
    this.schoolId = schoolId;
    this.studentId = studentId;
    this.classId = classId;
    this.regdNo = regdNo;
    this.sectionId = sectionId;

   }

   // Getters 
   public getUserId(): any{
       return this.userId;
   }
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