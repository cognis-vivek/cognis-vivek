import { Component, OnInit, ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../../services/student.service';
import { DataExchangeService } from '../../services/data-exchange.service';
import { Section } from 'src/app/models/section';


interface Ipost{
  id: string;
  author?: string;
  title?: string;
  category?: string;
  date?: string;
}

@Component({
  selector: 'app-manage-section',
  templateUrl: './manage-section.component.html',
  styleUrls: ['./manage-section.component.css']
})
export class ManageSectionComponent implements OnInit {

  dataSource!: MatTableDataSource<Section>;
  posts!: Ipost[];
  column: string[] = ['id', 'author', 'title', 'category', 'date', 'actions'];
  displayedColumns: string[] = ['sectionId', 'sectionHouseName','actions'];

  panelOpenState = false;
  data: any;
  error: any;
  sectionName = '';
  sectionArr: Section[] = [];

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
//  this.posts = [{
//   id: '1',
//   author: 'Kamalakanta Parida',
//   title: 'First Post',
//   category: 'Uncategory',
//   date: '30-11-2020 01:01:01'
// },
//  {
// id: '2',
// author: 'Kamal Parida',
// title: 'Second Post',
// category: 'Uncategory',
// date: '30-11-2020 01:01:01'
//  },
//  {
// id: '3',
// author: 'B. Kumal Parida',
// title: 'Thired Post',
// category: 'Uncategory',
// date: '01-12-2020 01:01:01'
// }];
// this.dataSource = new MatTableDataSource(this.posts);
}

  ngOnInit(): void {
    // this.dataSource.sort =  this.sort;
    // this.dataSource.paginator = this.paginator;
    this.getAllSectionCall();
  }
  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  // Getting all the sections
  getAllSectionCall(){
    this.student.getSections(this.student.sectionURLGet,1).subscribe(resData =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      JSON.parse(this.data, (key, value) =>{
          if(typeof key === 'string'){
            if(key.toString() === 'sectionList'){
              this.dataExchangeService.sectionArr = [];
              for(let i = 0; i<parsed.sectionList.length; i++){
                this.dataExchangeService.saveSection(new Section(
                  parsed.sectionList[i].sectionId,
                  parsed.sectionList[i].sectionHouseName
                ));
              }
              this.sectionArr = this.dataExchangeService.getAllSections();
              // this.posts = this.sectionArr;
              this.dataSource = new MatTableDataSource(this.sectionArr);
              this.dataSource.sort =  this.sort;
              this.dataSource.paginator = this.paginator;
              console.log('All Sections', this.sectionArr);
            }
              
          }
      });
      // console.log('Data', this.data);
    },
    err =>{
      this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
      console.log('Error', this.error);
    });
  }

  // Adding Section
  async addSection(){
    const body= {
      sectionHouseName: this.sectionName,
      schoolId: 1
    };
    this.student.postSection(this.student.sectionURLPost, body).subscribe(resData =>{
      let parsed = JSON.parse(JSON.stringify(resData));
      // parsed.childList
      this.data = JSON.stringify(resData);
      console.log('Res', this.data);
    },
    err =>{
      this.error = 'An error occurred,  Status:' + err.status, + ' Message:' + err.statusText;
      console.log('ErrorRes', this.error);
    });
    this.getAllSectionCall();
  }

}
