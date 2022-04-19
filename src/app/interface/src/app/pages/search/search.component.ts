import {ActivatedRoute, NavigationExtras, NavigationStart, Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WebRequestService } from 'src/app/web-request.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})


export class SearchComponent implements OnInit {
  appstate$!: Observable<any>;
  
  constructor(private webRequestService: WebRequestService, public router: Router, public route: ActivatedRoute) { }

  //Send Result from Search Query to Library Page to display
  displayResultInLibrary(response: any) {
      
    let objToSend: NavigationExtras = {
          state: {
            data: response
          }
      }

      this.router.navigate(['/library'], objToSend);
  }

  // Function to call GET Request to pass search query
  searchDatabase(title: string) {
    return this.webRequestService.get(`search/${title}`);
  }

  // Get Response from Server and pass it to function to display result on library page.
  searchDatabaseItems(search: string) {
    
    this.searchDatabase(search).subscribe(response => {
        console.log(response);
        this.displayResultInLibrary(response);
    });
  }

  ngOnInit(): void {

  }

}
