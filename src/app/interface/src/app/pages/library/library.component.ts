import { Component, OnInit } from '@angular/core';
import { WebRequestService } from 'src/app/web-request.service';
import {  ActivatedRoute, NavigationExtras, NavigationStart, Router } from '@angular/router';
import { Observable, observable } from 'rxjs';

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

  currentSatate$!: Observable<any>;
  items: printedMaterial[] = [];
  
  constructor(private webRequestService: WebRequestService, public router: Router, public route: ActivatedRoute) {
    
    let data = this.router.getCurrentNavigation()?.extras.state?.['data'];
     
    if (data) {

        let arrayConvertedData = Object.keys(data)
          .map(function(dataIndex){
            let value = data[dataIndex];
            return value; 
        })

      this.items = arrayConvertedData;
    
    }  else {
          this.getNewPrintedMaterial();
    }

  }

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
    //this.getNewPrintedMaterial();
  }
  
}

