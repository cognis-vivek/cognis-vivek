export class StudentDetails{
   schoolId: any;
   studentId: any;
   classId: any;
   rollNo: any;
   sectionId: any;

   constructor(
    schoolId: any,
    studentId: any,
    classId: any,
    rollNo: any,
    sectionId: any
   ){
    this.schoolId = schoolId;
    this.studentId = studentId;
    this.classId = classId;
    this.rollNo = rollNo;
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
   public getRollNo(): any{
       return this.rollNo;
   }
   public getSectionId(): any{
       return this.sectionId;
   }


}