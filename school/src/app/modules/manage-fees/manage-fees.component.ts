import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion} from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { StudentService } from 'src/app/services/student.service';
import { HttpClient } from '@angular/common/http'
import { ConfigData } from 'src/app/models/configData';
import { FeeMaster } from '../../models/FeeMaster';
import { ClassSection } from '../../models/classSection';
import { NameOfFee } from 'src/app/models/nameOfFee';

interface Ipost{
  id: string;
  name?: string;
  amount?: string;
  payMode?: string;

}

@Component({
  selector: 'app-manage-fees',
  templateUrl: './manage-fees.component.html',
  styleUrls: ['./manage-fees.component.css']
})
export class ManageFeesComponent implements OnInit {

  dataSource!: MatTableDataSource<FeeMaster>;
  
  column: string[] = ['masterFeeId', 'Class', 'FeeName','Amount', 'InstallmentType',  'actions'];
  dataColumns: string[] = ['index','className','nameOfFee','amountOfFee','dueDate','configValue','actions'];
  panelOpenState = false;
  data: any;
  error: any;
  configId = '';
  classId: any;
  nameOfFeeId: any;
  amount: any;
  schoolId = "1";
  configDataArr: ConfigData[] = [];
  feeMasterArr: FeeMaster[] = [];
  classArr: ClassSection[] = [];
  nameOfFeeArr: NameOfFee[] = [];


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild( MatPaginator, { static: true }) paginator!: MatPaginator;


  constructor(
    private http: HttpClient,
    private student: StudentService,
    private dataExchangeService: DataExchangeService
) {

    this.student = new StudentService(this.http);
    this.data = '';
    this.error = '';
   }

   ngOnInit(): void {
    
    this.classArr = this.dataExchangeService.getClassSection();
    this.getNameOfFeeList();
    this.getConfigData();
    this.getFeeMasterData();
  }
  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Getting Configuration Data
  getConfigData(){
    this.student.getConfigData(this.student.configDataURL,1).subscribe((resData) => {
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      console.log('Config Data => ', this.data);
      JSON.parse(this.data, (key, value) =>{
          if(typeof key === 'string'){
            if(key === 'configList'){
              this.dataExchangeService.configDataArr = [];
              for(let i = 0; i < parsed.configList.length; i++){
                this.dataExchangeService.saveConfigData(new ConfigData(
                  parsed.configList[i].configId,
                  parsed.configList[i].value,
                  parsed.configList[i].status
                ));
              }
              this.configDataArr = this.dataExchangeService.getConfigData();
            }
          }
      });
    },
    err =>{
      this.error = 'An error occurred, Status:' + err.status, + ' Message:' + err.statusText;
      console.log('ErrorRes', this.error);
    });
  }

   // Getting Name Of Fee List
   getNameOfFeeList(){
    this.student.getNameOfFee(this.student.nameOfFeeURL,1).subscribe((resData) => {
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      console.log('Name Of Fee => ', this.data);
      JSON.parse(this.data, (key, value) =>{
        if(typeof key === 'string'){
          if(key === 'nameOfFeeList'){
            this.dataExchangeService.nameOfFeeArr = [];
            for(let i = 0; i < parsed.nameOfFeeList.length; i++){
              this.dataExchangeService.saveNameOfFee(new NameOfFee(
                parsed.nameOfFeeList[i].nameOfFeeId,
                parsed.nameOfFeeList[i].nameOfFee
              ));
            }
          }
          this.nameOfFeeArr = this.dataExchangeService.getNameOfFeeList();
        }
      });
    },
    err =>{
      this.error = 'An error occurred, Status:' + err.status, + ' Message:' + err.statusText;
      console.log('ErrorRes', this.error);
    });
  }

  // Getting Fee Master Data 
  getFeeMasterData(){
    this.student.getFeeMasterData(this.student.feeMasterURL, 1).subscribe((resData) => {
      let parsed = JSON.parse(JSON.stringify(resData));
      this.data = JSON.stringify(resData);
      console.log('Fee Master Data => ', this.data);
      JSON.parse(this.data, (key, value) =>{
        if(typeof key === 'string'){
          if(key === 'masterFeeList'){
            this.dataExchangeService.feeMasterArr = [];
            for(let i = 0; i < parsed.masterFeeList.length; i++){
              this.dataExchangeService.saveFeeMasterData(new FeeMaster(
                (i+1),
                (i+1), // Master Fee ID 
                "",
                parsed.masterFeeList[i].value,
                parsed.masterFeeList[i].classId,
                parsed.masterFeeList[i].className,
                parsed.masterFeeList[i].nameOfFeeId,
                parsed.masterFeeList[i].nameOfFee,
                parsed.masterFeeList[i].amountOfFee,
                "23-03-2021"
              ));
            }
            this.feeMasterArr = this.dataExchangeService.getFeeMasterData();
            this.dataSource = new MatTableDataSource(this.feeMasterArr);
            this.dataSource.sort =  this.sort;
            this.dataSource.paginator = this.paginator;
          }
        }
      });
    },
    err =>{
      this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
      console.log('ErrorRes', this.error);
    });
  }
  // Changing Name Of Fee
  onChangeNameOfFee(event: any){
    this.nameOfFeeId = event.value;
  }
  // Adding fee type
  async addFeeType(){
    const body = {
      nameOfFeeId: this.nameOfFeeId+"",
      amountOfFee: this.amount,
      classId: this.classId,
      configId: this.configId,
      schoolId: this.schoolId
    };
    // this.student.post
    console.log('Body', body);
    this.student.postFeeMasterData(this.student.posrFeeMasterURL, body).subscribe((resData) =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      this.data = JSON.stringify(resData);
      console.log('Response', this.data);
      this.getFeeMasterData();
    },
    err =>{
      this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
      console.log('ErrorRes', this.error);
    });
  }
  // Changing Payment duration mode
  onChangePayType(event: any){
    this.configId = event.value + '';
  }
  // Changing the class
  onChangeClass(event: any){
    this.classId = event.value;
  }

}
