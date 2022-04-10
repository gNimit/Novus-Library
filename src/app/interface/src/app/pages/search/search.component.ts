import { Component, OnInit } from '@angular/core';
import { WebRequestService } from 'src/app/web-request.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private webRequestService: WebRequestService) { }

  searchDatabase(title: string) {
    return this.webRequestService.get(`search/${title}`);
  }

  searchDatabaseItems(search: string) {
    
    let searchQuery = search;
    this.searchDatabase(search).subscribe(response => {});
    console.log('front working....');
  }

  ngOnInit(): void {
  }

}
