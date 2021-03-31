import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion} from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { StudentService } from 'src/app/services/student.service';
import { HttpClient } from '@angular/common/http'
import { DatePipe } from '@angular/common';
import { NameOfFee } from 'src/app/models/nameOfFee';
import { type } from 'jquery';
import { StudentFeeDetails } from 'src/app/models/studentFeeDetails';
import { ClassSection } from '../../models/classSection';

interface Ipost{
  id: string;
  studentRegNo?: string;
  feeMaster?: string;
  dateOfPayment?: string;
}


@Component({
  selector: 'app-manage-fees-details',
  templateUrl: './manage-fees-details.component.html',
  styleUrls: ['./manage-fees-details.component.css']
})
export class ManageFeesDetailsComponent implements OnInit {

  dataSource!: MatTableDataSource<StudentFeeDetails>;
  posts!: Ipost[];
  column: string[] = ['id', 'studentRegNo', 'feeMaster', 'dateOfPayment',  'actions'];
  dataColumns: string[] = ['index','regdNo','studentName','className','dueAmount','totalAmount','paymentFinalDate','actions'];

  panelOpenState = false;
  data: any;
  error: any;
  // nameOfFeeArr: NameOfFee[] = [];
  studentFeeDetailsArr: StudentFeeDetails[] = [];
  classSectionArr: ClassSection[] = []; 
  paidAmount: any;
  paymentFinalDate: any;
  schoolId='1';
  studentId: any;
  classId: any;
  // xpandStatus



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
      studentRegNo: '21CS102',
      feeMaster: '1,000',
      dateOfPayment: '04-01-2021',
    },
     {
    id: '2',
    studentRegNo: '21CS104',
    feeMaster: '1,000',
    dateOfPayment: '05-01-2021',
     },
     {
    id: '3',
    studentRegNo: '21CS113',
    feeMaster: '1,000',
    dateOfPayment: '07-04-2021',
    }];
    
   }

   ngOnInit(): void {
    
    this.getStudentFees();
    this.classSectionArr = this.dataExchangeService.getClassSection();
    // this.getNameOfFeeList();
  }
  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Getting Name Of Fee List 
  // getNameOfFeeList(){
  //   this.student.getNameOfFee(this.student.nameOfFeeURL,1).subscribe((resData) =>{
  //     let parsed = JSON.parse(JSON.stringify(resData));
  //     // parsed.childList
  //     this.data = JSON.stringify(resData);
  //     console.log('Name Of Fee => ', this.data);
  //     JSON.parse(this.data, (key, value) =>{
  //       if(typeof key === 'string'){
  //         if(key === 'nameOfFeeList'){
  //           this.dataExchangeService.nameOfFeeArr = [];
  //           for(let i = 0; i < parsed.nameOfFeeList.length; i++){
  //             this.dataExchangeService.saveNameOfFee(new NameOfFee(
  //               parsed.nameOfFeeList[i].nameOfFeeId,
  //               parsed.nameOfFeeList[i].nameOfFee
  //             ));
  //           }
  //         }
  //         this.nameOfFeeArr = this.dataExchangeService.getNameOfFeeList();
  //       }
  //     });
  //   },
  //   err =>{
  //     this.error = 'An error occurred, Status:' + err.status, + ' Message:' + err.statusText;
  //     console.log('ErrorRes', this.error);
  //   });
  // }

  // Changing Name Of Fee
  onChangeNameOfFee(event: any){

  }

  // Changing Class
  onChangeClass(event: any){
    this.classId = event.value;
  }

  // Changing the date
  onDateChanged(event: any){
    const date = event.value;
    this.paymentFinalDate = this.datePipe.transform(date, 'dd-MM-yyyy');
    console.log('Date1', this.paymentFinalDate);
  }

  // Adding Student Fee
  addStudentFee(){
    const body ={
      paidAmount: this.paidAmount,
      paymentFinalDate: this.paymentFinalDate,
      studentId: this.studentId,
      schoolId: this.schoolId,
      classId: this.classId
    }

    console.log('FeeData => ', body);
    this.student.postStudentFee(this.student.addStudentFeeURL,body).subscribe((resData) =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      console.log('Fee Res', this.data);
      this.getStudentFees();
    },
      err =>{
        this.error = 'An error occurred, Status:' + err.status, + ' Message:' + err.statusText;
        console.log('ErrorRes', this.error);
    });
  }

  // onst date = event.value;
  //   this.examDate = this.datePipe.transform(date, 'yyyy-MM-dd');
  //   console.log('Date1', this.examDate);

  // Getting list student fees
  getStudentFees(){
    this.student.getStudentFeeList(this.student.addStudentFeeURL,1).subscribe((resData) =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      console.log('Student fees => ', this.data);
      JSON.parse(this.data, (key,value) =>{
        if(typeof key === 'string'){
          if(key === 'paymentFeeList'){
            this.dataExchangeService.studentFeeDetailsArr = [];
            for(let i = 0; i < parsed.paymentFeeList.length; i++){
              this.dataExchangeService.saveStudentFee(new StudentFeeDetails(
                (i+1),
                parsed.paymentFeeList[i].className,
                parsed.paymentFeeList[i].classId,
                parsed.paymentFeeList[i].totalAmount,
                parsed.paymentFeeList[i].paymentFinalDate,
                parsed.paymentFeeList[i].dueAmount,
                parsed.paymentFeeList[i].studentId,
                parsed.paymentFeeList[i].studentName,
                parsed.paymentFeeList[i].regdNo
              ));
            }
            this.studentFeeDetailsArr = this.dataExchangeService.getStudentFeeDetails();
            this.dataSource = new MatTableDataSource(this.studentFeeDetailsArr);
            this.dataSource.sort =  this.sort;
            this.dataSource.paginator = this.paginator;
          }
        }
      });
    },
      err =>{
        this.error = 'An error occurred, Status:' + err.status, + ' Message:' + err.statusText;
        console.log('ErrorRes', this.error);
      });
  }

}
