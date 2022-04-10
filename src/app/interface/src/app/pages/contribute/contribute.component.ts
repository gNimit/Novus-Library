import { Component, OnInit } from '@angular/core';
import { WebRequestService } from 'src/app/web-request.service';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss']
})
export class ContributeComponent implements OnInit {

  constructor(private webRequestService: WebRequestService) { }

  addPrintedMaterial(data: object) {
      return this.webRequestService.post('add', data);
  }

  addNewPrintedMaterial(data: any) {

      console.log(data);
      let name = data.authorName.split(",");
      let Fname, Lname;

      for(const key in name) {
          const fullName = name[key].split(" ");
          Fname += fullName[0];
          Lname += fullName[1];  
      }

      let email = data.authorEmail.split(",")
      
      let PrintedMaterial = {
        title: data.itemTitle,
        isbn: data.itemIsbn,
        type: data.itemType,
        authorFname: Fname,
        authorLname: Lname,
        authors_email: email,
        published_date: data.itemPublishedAt,
        description: data.itemDescription
      }

      console.log(PrintedMaterial);
      
      this.addPrintedMaterial(PrintedMaterial)
      .subscribe({
          next: (response: object) => {
            console.log(`[Data Saved]: ${response}`);
            alert("Data Saved!");
          },
          error: (error) => {
            return console.log(`[Error] : Data not saved ${error}`);
          }
      });
      
      location.reload();
  }


  ngOnInit(): void {
  }

}
