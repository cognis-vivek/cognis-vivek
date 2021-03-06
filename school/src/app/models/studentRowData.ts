export class StudentRowData{
    index: any;
    studentUserId: any; // c
    studentId: any;
    regdNo: any;
    firstName: any;
    middleName: any;
    lastName: any;
    dob: any;
    email: any;
    religion: any;
    nationality: any;
    gender: any;
    bloodGrp: any;
    studentPhoneNo: any;
    emergencyNo: any;
    addressUserId: any; // c
    address1: any;
    address2: any;
    district: any;
    city: any;
    postalcode: any;
    location: any;
    state: any;
    country: any;
    parentUserID: any; // c
    guardianName: any; // c
    guardianPhoneNo: any; // c
    fatherName: any;
    motherName: any;
    fatherPhoneNO: any;
    motherPhoneNO: any;
    classId: any;
    className: any;
    sectionId: any;
    sectionHouseName: any;

    constructor(
        index: any,
        studentUserId: any,
        studentId: any,
        regdNo: any,
        firstName: any,
        middleName: any,
        lastName: any,
        dob: any,
        email: any,
        religion: any,
        nationality: any,
        gender: any,
        bloodGrp: any,
        studentPhoneNo: any,
        emergencyNo: any,
        addressUserId: any, //c 
        address1: any,
        address2: any,
        district: any,
        city: any,
        postalcode: any,
        location: any,
        state: any,
        country: any,
        parentUserID: any, // c
        guardianName: any, // c
        guardianPhoneNo: any, // c
        fatherName: any,
        motherName: any,
        fatherPhoneNO: any,
        motherPhoneNO: any,
        classId: any,
        className: any,
        sectionId: any,
        sectionHouseName: any
    ){
        this.index = index;
        this.studentUserId = studentUserId;
        this.studentId = studentId;
        this.regdNo = regdNo;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.dob = dob;
        this.email = email;
        this.religion = religion;
        this.nationality = nationality;
        this.gender = gender;
        this.bloodGrp = bloodGrp;
        this.emergencyNo = emergencyNo;
        this.studentPhoneNo = studentPhoneNo;
        this.addressUserId = addressUserId;
        this.address1 = address1;
        this.address2 = address2;
        this.district = district;
        this.city = city;
        this.postalcode = postalcode;
        this.location = location;
        this.state = state;
        this.country = country;
        this.parentUserID = parentUserID;
        this.guardianName = guardianName;
        this.guardianPhoneNo = guardianPhoneNo;
        this.fatherName = fatherName;
        this.motherName = motherName;
        this.fatherPhoneNO = fatherPhoneNO;
        this.motherPhoneNO = motherPhoneNO;
        this.classId = classId;
        this.className = className;
        this.sectionId = sectionId;
        this.sectionHouseName = sectionHouseName;
   }
    

}