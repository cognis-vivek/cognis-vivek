import { StudentService } from './../../../services/student.service';
import { Component, OnInit, Inject, Injectable } from '@angular/core';
import {MatDialogRef,MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';




@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  hide = true;
  options: FormGroup;
  colorControl = new FormControl('primary');
  fontSizeControl = new FormControl(16, Validators.min(10));




  constructor(fb: FormBuilder, private service: StudentService,private  dialogRef:  MatDialogRef<StudentCreateComponent>,@Inject(MAT_DIALOG_DATA) public  data:  any) {
    this.options = fb.group({
      color: this.colorControl,
      fontSize: this.fontSizeControl,
    });
   }

  ngOnInit(): void {
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  public  closeMe() {
    this.dialogRef.close();
}
getFontSize() {
  return Math.max(10, this.fontSizeControl.value);
}
register(){}

onSubmit(){}
onDateSelect(selectedDate: any){
  selectedDate.module("cuppaDatepicker",["cuppaDatepickerDirective"])
.controller("cuppaDatepickerController",function($scope: { myDate: Date; myDate2: string; }){
        $scope.myDate = new Date();
        $scope.myDate2 = "04-18-1990 12:15 AM";
});
}

}
