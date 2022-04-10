import { Component, OnInit } from '@angular/core';
import { WebRequestService } from 'src/app/web-request.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private webRequestService: WebRequestService) { }

  searchDatabase() {
    return this.webRequestService.get('items');
  }

  searchDatabaseItems(searchValue: string) {
    this.searchDatabase();
  }

  ngOnInit(): void {
  }

}
