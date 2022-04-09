import { Component, OnInit } from '@angular/core';
import { WebRequestService } from 'src/app/web-request.service';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss']
})
export class ContributeComponent implements OnInit {

  constructor(private webRequestService: WebRequestService) { }

  addPrintedMaterial(title: string) {
      return this.webRequestService.post('add', {title});
  }

  addNewPrintedMaterial() {
      this.addPrintedMaterial('Testing').subscribe((response: any) => {
          console.log(response);
      });
  }


  ngOnInit(): void {
  }

}
