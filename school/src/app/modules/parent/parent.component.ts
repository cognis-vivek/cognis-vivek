import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface Ipost{
  id: string;
  author?: string;
  title?: string;
  category?: string;
  date?: string;
}

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  dataSource!: MatTableDataSource<Ipost>;
  posts!: Ipost[];
  column: string[] = ['id', 'author', 'title', 'category', 'date', 'actions'];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild( MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor() {
    this.posts = [{
      id: '1',
      author: 'Kamalakanta Parida',
      title: 'First Post',
      category: 'Uncategory',
      date: '30-11-2020 01:01:01'
    },
    {
      id: '2',
      author: 'Kamalakanta Parida',
      title: 'Second Post',
      category: 'Uncategory',
      date: '30-11-2020 01:01:01'
  }];
  this.dataSource = new MatTableDataSource(this.posts);
   }

  ngOnInit(): void {
    this.dataSource.sort =  this.sort;
    this.dataSource.paginator = this.paginator;
  }
  // tslint:disable-next-line: typedef
  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
