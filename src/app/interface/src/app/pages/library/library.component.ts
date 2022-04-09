import { Component, OnInit } from '@angular/core';
import { WebRequestService } from 'src/app/web-request.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  constructor(private webRequestService: WebRequestService) { }

  PrintedMaterial = {
      title: [],
      isbn: [],
      authorFname: [],
      authorLname: [],
      authorEmail: [],
      type: [],
      date: [],
      description: []
  }
  
  getPrintedMaterial() {
      return this.webRequestService.get('items');
  }

  getNewPrintedMaterial() {
      this.getPrintedMaterial();
  }
  
  ngOnInit(): void {
  }


  
}
