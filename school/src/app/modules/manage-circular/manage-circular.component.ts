import { Component, OnInit, ViewChild } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../../services/student.service';
import { DataExchangeService } from '../../services/data-exchange.service';
import { Circular } from 'src/app/models/circular';
import { MatTableDataSource } from '@angular/material/table';
import {MatAccordion} from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// export interface Task {
//   name: string;
//   completed: boolean;
//   color: ThemePalette;
//   subtasks?: Task[];
// }

@Component({
  selector: 'app-manage-circular',
  templateUrl: './manage-circular.component.html',
  styleUrls: ['./manage-circular.component.css']
})
export class ManageCircularComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild( MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = ['messageId', 'messageSubject','messageBody','date','actions'];
  dataSource!: MatTableDataSource<Circular>;

  // task: Task = {
  //   name: 'Select All',
  //   completed: false,
  //   color: 'primary',
  //   subtasks: [
  //     {name: 'Select All', completed: false, color: 'primary'},
  //     {name: 'A', completed: false, color: 'primary'},
  //     {name: 'B', completed: false, color: 'primary'},
  //     {name: 'C', completed: false, color: 'primary'}
  //   ]
  // };
  // checked = false;
  // checkedB = false;
  // checkedC = false;
  // checkedD = false;
  allComplete: boolean = false;
  msgSubject: any;
  msgBody: any;
  data: any;
  error: any;
  circularArr: Circular[] = [];
  request = 0;
  updatedIndex = 0;
  step = 0;


  sMessageSubject = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]);
  sMessageBody = new FormControl('', [Validators.required]);

  constructor(private http: HttpClient,
    private student: StudentService,
    private dataExchangeService: DataExchangeService
    ) {
    this.student = new StudentService(this.http);
    this.data = '';
    this.error = ''; 
  }

  ngOnInit(): void {
    this.getCircularList();
  }

  // updateAllComplete() {
  //   this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  // }

  // someComplete(): boolean {
  //   if (this.task.subtasks == null) {
  //     return false;
  //   }
  //   return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  // }

  // setAll(completed: boolean) {
  //   this.allComplete = completed;
  //   if (this.task.subtasks == null) {
  //     return;
  //   }
  //   this.task.subtasks.forEach(t => t.completed = completed);
  // }

  panelOpenState = false;

  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Getting All Circular
  getCircularList(){
    this.student.getCircular(this.student.circularURL, 1).subscribe((resData) =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      console.log("row",this.data);
      JSON.parse(this.data, (key, value) =>{
        if(typeof key === 'string'){
          if(key.toString() === 'messageList'){
              this.dataExchangeService.circularArr = [];
              for(let i = 0; i < parsed.messageList.length; i++){
                this.dataExchangeService.saveCircular(new Circular(
                  parsed.messageList[i].messageId,
                  parsed.messageList[i].messageSubject,
                  parsed.messageList[i].messageBody,
                  parsed.messageList[i].date
                ));
              }
              this.circularArr = this.dataExchangeService.getAllCircular();
              console.log('circular', this.circularArr);
              this.dataSource = new MatTableDataSource(this.circularArr);
              this.dataSource.sort =  this.sort;
              this.dataSource.paginator = this.paginator;
          }
        }
      });  
    },
    err =>{
      this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
      console.log('Error', this.error);
    });
  }

  // Adding Message Subject Error
  getMessageSubjectError(){
    if (this.sMessageSubject.hasError('required')) {
      return 'You must enter subject';
    }
    return this.sMessageSubject.hasError('sMessageSubject') ? 'Not valid subject name' : '';
  }

  // Adding Message Body Error
  getMessageBodyError(){
    if (this.sMessageBody.hasError('required')) {
      return 'You must enter Message details';
    }
    return this.sMessageBody.hasError('sMessageBody') ? 'Not valid message' : '';
  }

  // Setting Step
  setStep(index: number){
    this.step = index;
  }
  nextStep(){
    this.step++;
  }

  prevStep(){
    this.step--;
  //  let total = this.step - this.step/this.step;
  }

  // Adding Circular
  addCircular(){
     if(!this.sMessageSubject.valid && !this.sMessageBody.valid){
        console.log("Please enter both the value");
     }else{
      if(this.request !== 1){
        const body ={
          userId: 2,
          messageSubject: this.sMessageSubject.value,
          messageBody: this.sMessageBody.value
        };
        console.log('body1', body);
        this.student.postCircular(this.student.circularURL, body).subscribe((resData) =>{
          let parsed = JSON.parse(JSON.stringify(resData));
          // parsed.childList
          this.data = JSON.stringify(resData);
          console.log("message", this.data);
          this.getCircularList();
        },
        err =>{
          this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
          console.log('Error', this.error);
        });
     }else{
      const body ={
        userId: 2,
        messageId: this.circularArr[this.updatedIndex].messageId,
        messageSubject: this.sMessageSubject.value,
        messageBody: this.sMessageBody.value
      };
      console.log('body 2', body);
      this.student.postCircular(this.student.updateCircularUrl, body).subscribe((resData) =>{
        let parsed = JSON.parse(JSON.stringify(resData));
        // parsed.childList
        this.data = JSON.stringify(resData);
        console.log("message", this.data);
        this.getCircularList();
      },
      err =>{
        this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
        console.log('Error', this.error);
      });
     }
     }
  }


  updateMessage(index: any){
    for(let i = 0; i < this.circularArr.length; i++){
      if(index === this.circularArr[i].messageId){
        this.updatedIndex = i;
        this.request = 1;
        this.setStep(0);
        break;
      }
    }
    this.sMessageSubject.setValue(this.circularArr[this.updatedIndex].messageSubject);
    console.log('Subject',this.circularArr[this.updatedIndex].messageSubject);
    this.sMessageBody.setValue(this.circularArr[this.updatedIndex].messageBody);
  }
}
