
import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';


@Component({
   selector: 'app-subject-teacher',
   templateUrl: './subject-teacher.component.html',
   styleUrls: ['./subject-teacher.component.css'],
  
   animations: [
     trigger('detailExpand', [
       state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden'})),
       state('expanded', style({ height: '*' ,visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
 })
export class SubjectTeacherComponent {

  isTableExpanded = false;

  STUDENTS_DATA = [
    {
      "id": 1,
      "name": "Abby Jaskolski ",
      "age": 21,
      "address": 1.0079,
      "isExpanded": false,
      "subjects": [
        {
          "name": "Bio",
          "type": "Medical",
          "grade": "A"
        },
        {
          "name": "Chemistry",
          "type": "Medical",
          "grade": "A"
        },
        {
          "name": "Physics",
          "type": "Medical",
          "grade": "A"
        }
      ]
    },
    {
      "id": 2,
      "name": "Jabari Fritsch",
      "age": 20,
      "address": 1.0079,
      "isExpanded": false,
      "subjects": [
        {
          "name": "Bio",
          "type": "Medical",
          "grade": "A"
        },
        {
          "name": "Chemistry",
          "type": "Medical",
          "grade": "A"
        },
        {
          "name": "Physics",
          "type": "Medical",
          "grade": "A"
        }
      ]
    },
    {
      "id": 3,
      "name": "Maybell Simonis",
      "age": 21,
      "address": 1.0079,
      "isExpanded": false,
      "subjects": [
        {
          "name": "Bio",
          "type": "Medical",
          "grade": "A"
        },
        {
          "name": "Chemistry",
          "type": "Medical",
          "grade": "A"
        },
        {
          "name": "Physics",
          "type": "Medical",
          "grade": "A"
        }
      ]
    }
  ];


  dataStudentsList = new MatTableDataSource();
  displayedStudentsColumnsList: string[] = ['id', 'name', 'age', 'address', 'actions'];


  ngOnInit() {
    this.dataStudentsList.data = this.STUDENTS_DATA;
  }

  // Toggel Rows
  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;

    this.dataStudentsList.data.forEach((row: any) => {
      row.isExpanded = this.isTableExpanded;
    })
  }

}



// import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatAccordion} from '@angular/material/expansion';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
// import { animate, state, style, transition, trigger } from '@angular/animations';


// interface Ipost{
//   id: string;
//   author?: string;
//   title?: string;
// }

// @Component({
//   selector: 'app-subject-teacher',
//   templateUrl: './subject-teacher.component.html',
//   styleUrls: ['./subject-teacher.component.css'],
  
//   animations: [
//     trigger('detailExpand', [
//       state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden'})),
//       state('expanded', style({ height: '*' ,visibility: 'visible' })),
//       transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
//     ]),
//   ],
// })
// export class SubjectTeacherComponent implements OnInit {

  
//   // @ViewChild(MatPaginator) paginator: MatPaginator;
//   // @ViewChild(MatSort) sort: MatSort;

  

//   dataSource!: MatTableDataSource<Ipost>;
//   posts!: Ipost[];
//   column: string[] = ['id', 'author', 'title', 'actions'];
 
//   isTableExpanded = false;
//   panelOpenState = false;
//   selectedFiles: any;

//   @ViewChild(MatSort, { static: true }) sort!: MatSort;
//   @ViewChild( MatPaginator, { static: true }) paginator!: MatPaginator;
//   isExpansionDetailRow = (index: any, row: any) => row.hasOwnProperty('detailRow');
//   STUDENTS_DATA = [
//     {
//       "id": 1,
//       "name": "Abby Jaskolski ",
//       "age": 21,
//       "address": 1.0079,
//       "isExpanded": false,
//       "subjects": [
//         {
//           "name": "Bio",
//           "type": "Medical",
//           "grade": "A"
//         },
//         {
//           "name": "Chemistry",
//           "type": "Medical",
//           "grade": "A"
//         },
//         {
//           "name": "Physics",
//           "type": "Medical",
//           "grade": "A"
//         }
//       ]
//     },
//     {
//       "id": 2,
//       "name": "Jabari Fritsch",
//       "age": 20,
//       "address": 1.0079,
//       "isExpanded": false,
//       "subjects": [
//         {
//           "name": "Bio",
//           "type": "Medical",
//           "grade": "A"
//         },
//         {
//           "name": "Chemistry",
//           "type": "Medical",
//           "grade": "A"
//         },
//         {
//           "name": "Physics",
//           "type": "Medical",
//           "grade": "A"
//         }
//       ]
//     },
//     {
//       "id": 3,
//       "name": "Maybell Simonis",
//       "age": 21,
//       "address": 1.0079,
//       "isExpanded": false,
//       "subjects": [
//         {
//           "name": "Bio",
//           "type": "Medical",
//           "grade": "A"
//         },
//         {
//           "name": "Chemistry",
//           "type": "Medical",
//           "grade": "A"
//         },
//         {
//           "name": "Physics",
//           "type": "Medical",
//           "grade": "A"
//         }
//       ]
//     }
//   ];


//   dataStudentsList = new MatTableDataSource();
//   displayedStudentsColumnsList: string[] = ['id', 'name', 'age', 'address', 'actions'];
//   // Toggel Rows
//   toggleTableRows() {
//     this.isTableExpanded = !this.isTableExpanded;
//     this.dataStudentsList.data.forEach((row: any) => {
//       row.isExpanded = this.isTableExpanded;
//     });
//   }

//   constructor() { 
//   //   this.posts = [
//   //     {
//   //         id: '1',
//   //         author: 'Amritangshu Mishra',
//   //         title: 'Maths'
//   //     },{
//   //       id: '2',
//   //       author: 'Subit Datta',
//   //       title: 'General Science'
//   //     },{
//   //       id: '3',
//   //       author: 'Karuna Meheta',
//   //       title: 'Maths'
//   //     },{
//   //       id: '4',
//   //       author: 'Purnima Limache',
//   //       title: 'MIL'
//   //     }
//   // ];
//   //   this.dataSource = new MatTableDataSource(this.posts);
//   }

//   // 
//   showDetails(boolData: any){
//       // this.isTableExpanded = true;
//   }

//   ngOnInit(): void {
//     this.dataStudentsList.data = this.STUDENTS_DATA;
//     this.dataSource.sort =  this.sort;
//     this.dataSource.paginator = this.paginator;
//   }
//   applyFilter(event: any){
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//   }


// }



