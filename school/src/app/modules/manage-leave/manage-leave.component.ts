import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion} from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { StudentService } from 'src/app/services/student.service';
import { HttpClient } from '@angular/common/http';
import { Leave } from 'src/app/models/leave';
import { Subject } from 'rxjs';

interface Ipost{
  id: string;
  author?: string;
  title?: string;
  category?: string;
  date?: string;
}

@Component({
  selector: 'app-manage-leave',
  templateUrl: './manage-leave.component.html',
  styleUrls: ['./manage-leave.component.css']
})
export class ManageLeaveComponent implements OnInit {

  dataSource!: MatTableDataSource<Leave>;
  posts!: Ipost[];
  column: string[] = ['id', 'author', 'title', 'category', 'date', 'actions'];
  dataColumns: string[] = ['index','userId','name','startDate','endDate','totalDays','reason','leaveStatus','typeOfLeave','actions'];
  panelOpenState = false;
  data: any;
  error: any;
  leaveArr: Leave[] = [];
  leaveArrChanged = new Subject<Leave[]>();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild( MatPaginator, { static: true }) paginator!: MatPaginator;

    constructor(
      private http: HttpClient,
      private dataExchangeService: DataExchangeService,
      private student: StudentService,
    ) {

    this.student = new StudentService(this.http);
    this.data = '';
    this.error = '';
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

  ngOnInit(){
    this.getListOfUsersLeave();
  }
  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Getting list of user - leaves
  getListOfUsersLeave(){
    this.student.getAllLeaves(this.student.getAllLeavesURL,1).subscribe((resData)=>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed data
      this.data = JSON.stringify(resData);
      console.log('Res', parsed);
      JSON.parse(this.data, (key, value) =>{
        if(typeof key === 'string'){
          if(key.toString() === 'leaveList'){
            this.dataExchangeService.leavesArr = [];
            this.dataExchangeService.saveLeaves(new Leave(
              (1),
              parsed.leaveList[0].adminStaffId,
              parsed.leaveList[0].classTeacherId,
              parsed.leaveList[0].userId,
              parsed.leaveList[0].typeOfLeavesId,
              parsed.leaveList[0].name,
              parsed.leaveList[0].startDate,
              parsed.leaveList[0].endDate,
              parsed.leaveList[0].totalDays,
              parsed.leaveList[0].reason,
              parsed.leaveList[0].leaveStatus,
              parsed.leaveList[0].typeOfLeave,
              parsed.leaveList[0].leavesId
            ));
            // for(let i=0;i<parsed.leaveList.lenth;i++){
            //   this.dataExchangeService.saveLeaves(new Leave(
            //     (i+1),
            //     parsed.leaveList[i].adminStaffId,
            //     parsed.leaveList[i].classTeacherId,
            //     parsed.leaveList[i].userId,
            //     parsed.leaveList[i].typeOfLeavesId,
            //     parsed.leaveList[i].name,
            //     parsed.leaveList[i].startDate,
            //     parsed.leaveList[i].endDate,
            //     parsed.leaveList[i].totalDays,
            //     parsed.leaveList[i].reason,
            //     parsed.leaveList[i].leaveStatus,
            //     parsed.leaveList[i].typeOfLeave,
            //     parsed.leaveList[i].leavesId
            //   ));
            // }
          }
            this.leaveArr = this.dataExchangeService.getAllLeaves();
            this.dataSource = new MatTableDataSource(this.leaveArr);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            console.log('leaves', this.leaveArr);
        }
      });
    },
    err =>{
      this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
      console.log('ErrorRes', this.error);
    });
  }

}
