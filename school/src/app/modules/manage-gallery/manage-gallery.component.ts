import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-gallery',
  templateUrl: './manage-gallery.component.html',
  styleUrls: ['./manage-gallery.component.css']
})
export class ManageGalleryComponent implements OnInit {
  panelOpenState = false;
  selectedFiles: any;

  constructor() { }

  ngOnInit(): void {
  }
  selectFile(event:any) {
    this.selectedFiles = event.target.files;
}

}
