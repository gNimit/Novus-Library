import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import {PrintedMaterial} from '../models/printedMaterial';

export interface Data {
        
        title?: string,
        isbn?: string,
        type?: string,
        authorFname?: string,
        authorLname?: string,
        authorEmail?: string,
        publishDate?: string,
        description?: string,
}


export class parseCSVFiles  {

    private csvData: Data;

    constructor() {
        this.csvData = {};
    }

    files = ['authors.csv','books.csv','magazines.csv'];

   
    callParsingMethods() : void {

        this.parseMaterial('magazines.csv', 'authors.csv');
        this.parseMaterial('books.csv', 'authors.csv', );
    }
    
    parseAuthor(fileAuthor: string, AuthorsEmail: string, itemTitle: string) : void {

        let authorsEmails = AuthorsEmail.split(",");
        let fname = new Array(authorsEmails.length);
        let lname = new Array(authorsEmails.length);

        fname.fill(null);
        lname.fill(null);

        fs.createReadStream(path.resolve('../../assets', fileAuthor))
                .pipe(csv.parse({ delimiter:';', headers: true }))
                .on('error', error => console.error(error))
                .on('data', row => {

                    
                    for(let i = 0; i < Object.keys(authorsEmails).length; i++) {
                        
                        if (authorsEmails[i] == row.email) {   
                            let value = true;
                            fname[i] = row.firstname;
                            lname[i] = row.lastname;
                            this.saveAuthorToDB(fname, lname, itemTitle);
                            //console.log(this.csvData.title);
                    
                        }
                    }
                                
                })          
                
    }
    
    
    
    parseMaterial(fileMaterial: string, fileAuthor: string) : void {

        //
        fs.createReadStream(path.resolve('../../assets', fileMaterial))
            .pipe(csv.parse({ delimiter:';', headers: true }))
            .on('error', error => console.error(error))
            .on('data', row => {
                
                this.csvData.title = row.title;
                this.csvData.isbn = row.isbn;
                this.csvData.authorFname = "";
                this.csvData.authorLname = "";
                this.csvData.authorEmail = row.authors;
                this.csvData.type = fileMaterial.replace('.csv', '');
                this.csvData.publishDate = row.publishedAt;
                this.csvData.description = row.description;
                this.saveItemToDB();
        
                this.parseAuthor(fileAuthor, row.authors, row.title);           
            })

    }

    saveItemToDB() {
                   
            
        let printedMaterialData = new PrintedMaterial({
                
            title: <String>this.csvData.title,
            isbn: <String>this.csvData.isbn,
            type: <String>this.csvData.type,
            authorFname: <String>this.csvData.authorFname,
            authorLname: <String>this.csvData.authorLname,
            authors_email: <String>this.csvData.authorEmail,
            publish_date: <String>this.csvData.publishDate,
            description: <String>this.csvData.description
            
        });
            
            
        PrintedMaterial.find({title: this.csvData.title}, (err, result) => {
            if (err) {
                console.log(`[ERROR]: ${err}`);  
            
            } else if (Object.keys(result).length != 0) {
                
                console.log("[MongoDB]: Data already saved");
            
            } else {

                const savedData = printedMaterialData.save((err, result) => {
                    if (err) {
                        console.log(`[ERROR]: Could not save data from csv to database :  ${err}`);
                    
                    } else {
                        console.log(`[MongoDB]: Data Saved ${result}`);
                    }
                });
                console.log(savedData);
                
            } 
        });
        
    }
  

    saveAuthorToDB(fname: any, lname: any, itemTitle: any) {
               
        this.csvData.authorFname = "";
        this.csvData.authorLname = "";
        let value = true;
        
        for (let i = 0; i < fname.length; i++ ) {
            if (fname[i] == null) {
                value = false;
            }
        }

        if (value == true) {
            
            for(let i = 0; i < fname.length; i++) {
                this.csvData.authorFname += fname[i];
                this.csvData.authorLname += lname[i];
                
                if (i < fname.length-1) {
                    this.csvData.authorFname += " , ";
                    this.csvData.authorLname += " , "; 
                }
            }
 
            const filter = {title: itemTitle};
            const update = {authorFname: this.csvData.authorFname, authorLname: this.csvData.authorLname};
            
            PrintedMaterial.findOneAndUpdate(filter, update, (err: any, result: any) => {
                
                if (err) {
                    console.log(`[ERROR]: ${err}`);
                
                } else {

                    console.log(`[Data Updated]: ${result}`);
                }
            
            });
                         
        }

    }
}
