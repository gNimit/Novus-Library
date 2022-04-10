import { Component, OnInit } from '@angular/core';
import { WebRequestService } from 'src/app/web-request.service';

export class printedMaterial {
  constructor(
    public title: string,
    public isbn: string,
    public type: string,
    public authorFname: string,
    public authorLname: string,
    public authors_email: string,
    public publishedAt: string,
    public description: string
  
  ) {}
}


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  items: printedMaterial[] = [];
  constructor(private webRequestService: WebRequestService) { }

  getPrintedMaterial() {
      return this.webRequestService.get('items');
  }

  getNewPrintedMaterial() {

      this.getPrintedMaterial().subscribe(response  => {
            console.log(response);
            this.items = response;

      })  
  }
  
  ngOnInit(): void {
    this.getNewPrintedMaterial();
  }


  
}
