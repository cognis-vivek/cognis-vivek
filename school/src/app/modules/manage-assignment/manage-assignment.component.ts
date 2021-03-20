import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion} from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Assignment } from 'src/app/models/assignment';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { StudentService } from 'src/app/services/student.service';
import { HttpClient } from '@angular/common/http';

interface Ipost{
  id: string;
  author?: string;
  title?: string;
  category?: string;
  date?: string;
}
@Component({
  selector: 'app-manage-assignment',
  templateUrl: './manage-assignment.component.html',
  styleUrls: ['./manage-assignment.component.css']
})
export class ManageAssignmentComponent implements OnInit {

  dataSource!: MatTableDataSource<Assignment>;
  posts!: Ipost[];
  column: string[] = ['id', 'author', 'title', 'category', 'date', 'actions'];
  dataColumns: string[] = ['index','className','sectionHouseName','subjectName','assignDateTime','description','assignCompleteDateTime','title','actions'];
  assignmentArr: Assignment[] = [];

  panelOpenState = false;
  data: any;
  error: any;

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
     // This data should be coming from an API using Angular Service
 this.posts = [{
  id: '1',
  author: 'Kamalakanta Parida',
  title: 'First Post',
  category: 'Uncategory',
  date: '30-11-2020 01:01:01'
},
 {
id: '2',
author: 'Kamal Parida',
title: 'Second Post',
category: 'Uncategory',
date: '30-11-2020 01:01:01'
 },
 {
id: '3',
author: 'B. Kumal Parida',
title: 'Thired Post',
category: 'Uncategory',
date: '01-12-2020 01:01:01'
}];
// this.dataSource = new MatTableDataSource(this.posts);
   }

   ngOnInit(): void {
    this.getAssignmentList();
  }
  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Getting List of assignment
  getAssignmentList(){
    this.student.getAllAssignment(this.student.getAllAssignmentURL,1).subscribe((resData) =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      console.log('Assignments', this.data);
      JSON.parse(this.data, (key, value) =>{
        if(typeof key === 'string'){
          if(key === 'assignmentList'){
            this.dataExchangeService.assignmentArr = [];
            for(let i = 0; i < parsed.assignmentList.length; i++){
              this.dataExchangeService.saveAssignment(new Assignment(
                (i+1),
                parsed.assignmentList[i].teacherId,
                parsed.assignmentList[i].classId,
                parsed.assignmentList[i].sectionId,
                parsed.assignmentList[i].assignDateTime,
                parsed.assignmentList[i].assignCompleteDateTime,
                parsed.assignmentList[i].description,
                parsed.assignmentList[i].completionStatus,
                parsed.assignmentList[i].assignmentId,
                parsed.assignmentList[i].subjectId,
                parsed.assignmentList[i].subjectName,
                parsed.assignmentList[i].className,
                parsed.assignmentList[i].sectionHouseName,
                parsed.assignmentList[i].title
              ));
            }

            this.assignmentArr = this.dataExchangeService.getAssignmentList();
            this.dataSource = new MatTableDataSource(this.assignmentArr);
            this.dataSource.sort =  this.sort;
            this.dataSource.paginator = this.paginator;
            console.log('sub', this.assignmentArr[0].subjectName);
          }
        }
      });
    },
    err =>{
      this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
      console.log('ErrorRes', this.error);
    });
  }

}
