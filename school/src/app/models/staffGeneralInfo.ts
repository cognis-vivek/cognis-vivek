import { Role } from 'src/app/models/role';
import { Address } from './address';
import { StaffDetails } from './staffDetails';
export class StaffGeneralInfo{
    phoneNo: any;
    password: any;
    role: Role | undefined;
    firstName: any;
    middleName: any;
    lastName: any;
    gender: any;
    bloodGrp: any;
    religion: any;
    dob: any;
    email: any;
    nationality: any;
    qualification: any;
    address: Address | undefined;
    staff: StaffDetails | undefined;

    constructor(
        phoneNo: any,
        password: any,
        role: Role | undefined,
        firstName: any,
        middleName: any,
        lastName: any,
        gender: any,
        bloodGrp: any,
        religion: any,
        dob: any,
        email: any,
        nationality: any,
        qualification: any,
        address: Address | undefined,
        staff: StaffDetails | undefined
    ){
        this.phoneNo = phoneNo;
        this.password = password;
        this.role = role;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.gender = gender;
        this.bloodGrp = bloodGrp;
        this.religion = religion;
        this.dob = dob;
        this.email = email;
        this.nationality = nationality;
        this.qualification = qualification;
        this.address = address;
        this.staff = staff;
    }



}