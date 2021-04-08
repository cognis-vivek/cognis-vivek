
import { Address } from "./address";
import { Parent } from "./parent";
import { Role } from "./role";
import { StudentDetails } from "./studentDetails";

export class StudentGeneralInfo{
        index: any;
        userId: any;
        studentPhoneNo: any;
        password: any;
        role: Role | undefined;
        studentId: any; // edited
        regdNo: any; // edited
        firstName: any;
        middleName: any;
        lastName: any;
        gender: any;
        bloodGrp: any;
        religion: any;
        dob: any;
        email: any;
        nationality: any;
        emergencyNo: any;
        address: Address | undefined;
        studentModel: StudentDetails | undefined;
        parent: Parent | undefined;
        constructor(
                index: any,
                userId: any,
                studentPhoneNo: any,
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
                emergencyNo: any,
                address: Address | undefined,
                studentModel: StudentDetails | undefined,
                parent: Parent | undefined
        ){
                this.index = index;
                this.userId= userId;
                this.studentPhoneNo = studentPhoneNo;
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
                this.emergencyNo = emergencyNo;
                this.address = address;
                this.studentModel = studentModel;
                this.parent = parent; 
        }

        // Getters
        public getIndex(): any{
            return this.index;
        }

        public getUserId(): any{
            return this.userId;
        }
        public getStudentPhoneNo(): any{
            return this.studentPhoneNo;
        }
        public getPassword(): any{
            return this.password;
        }
        public getRole(): any{
            return this.role;
        }
        public getStudentId(): any{
            return this.studentId;
        }
        public getRegdNo(): any{
            return this.regdNo;
        }
        public getFirstName(): any{
            return this.firstName;
        }
        public getMiddleName(): any{
            return this.middleName;
        }
        public getLastName(): any{
            return this.lastName;
        }
        public getGender(): any{
            return this.gender;
        }
        public getBloodGrp(): any{
            return this.bloodGrp;
        }
        public getReligion(): any{
            return this.religion;
        }
        public getDob(): any{
            return this.dob;
        }
        public getEmail(): any{
            return this.email;
        }
        public getNationality(): any{
            return this.nationality;
        }
        public getEmergencyNo(): any{
            return this.emergencyNo;
        }
        public getAddress(): any{
            return this.address;
        }
        public getStudentModel(): any{
            return this.studentModel;
        }
        public getParent(): any{
            return this.parent;
        }
}