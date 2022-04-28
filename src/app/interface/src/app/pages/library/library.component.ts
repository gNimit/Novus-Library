import { Component, OnInit } from '@angular/core';
import { WebRequestService } from 'src/app/web-request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';


export class printedMaterial {
  constructor(
    public title: string,
    public isbn: string,
    public type: string,
    public authorFname: string,
    public authorLname: string,
    public authors_email: string,
    public publish_date: string,
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
  
  // [constructor]: Check if current navigation is from search page and convert data to array. If not get 
  //  data from the database.
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

  // Sort by title option, Highlight option if inactive and pass query to sorting function.
  sortByTitle() {
      
      let query = "title";
      let dropdown_item = document.querySelector('.dropdown-item');
      let value = false;
      
      dropdown_item?.addEventListener('click', function(event) {
          event.stopPropagation();
          
          if (!value) {
              dropdown_item?.classList.toggle('is-active');
          } else {
              dropdown_item?.classList.toggle('');
          }

      });
      
      this.sortPrintedMaterial(query);
  }


  // Sort by Author option, highlight if inactive and pass query to sorting function
  sortByAuthor() {
      let query = "authorFname";
      let dropdown_item = document.querySelector('.dropdown-item');
      let value = false;
      
      dropdown_item?.addEventListener('click', function(event) {
          event.stopPropagation();
          
          if (!value) {
            dropdown_item?.classList.toggle('is-active');
          } else {
            dropdown_item?.classList.toggle('');
          }
      });
      
      this.sortPrintedMaterial(query);;
  }


  // Send GET request to sort all items displayed in library according to query.
  sortPrintedMaterial(query: string) {

    this.webRequestService.get(`sort/${query}`).subscribe(response => {
        console.log(response);
        this.items = response;

    });
  }


  // Function to call GET function and download merged csv file.
  saveToCsv() {
    this.webRequestService.get(`file`);
    window.open('http://ec2-34-238-43-48.compute-1.amazonaws.com/api/file')
  }



  getPrintedMaterial() {
      
      return this.webRequestService.get(`items`);
  }

  // GET request for requesting all documents from database and display in libraray.
  getNewPrintedMaterial() { 

    this.getPrintedMaterial().subscribe(response  => {
      console.log(response);
      this.items = response;
    }) 
  
  }

  reloadPage() {
    this.getNewPrintedMaterial();
  }
  
  ngOnInit(): void {

    // change behaviour of dropdown sort menu from hover to active on click.
    var dropdown = document.querySelector('.dropdown');
  
    dropdown?.addEventListener('click', function(event) {
        event.stopPropagation();
        dropdown?.classList.toggle('is-active');
    });
  }
  
}

