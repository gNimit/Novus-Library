import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import {PrintedMaterial} from '../models/printedMaterial';
let files = ['authors.csv','books.csv','magazines.csv'];




function parseCSVFiles() {
    

    parseMaterial('magazines.csv', 'authors.csv');
    parseMaterial('books.csv', 'authors.csv', );
 
    let csvData = {

        title: "",
        isbn: "",
        type: "",
        authorFname: "",
        authorLname: "",
        authorEmail: "",
        publishDate: "",
        description: "",
    }


    function parseAuthor(fileAuthor: string, AuthorsEmail: string) {

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
                            
                            fname[i] = row.firstname;
                            lname[i] = row.lastname;
                            save(fname, lname);            
                    
                        }
                    }
                                
                })          
                
    }

    let save: (arg0: any[], arg1: any[]) => void;
    function parseMaterial(fileMaterial: string, fileAuthor: string) {

        fs.createReadStream(path.resolve('../../assets', fileMaterial))
            .pipe(csv.parse({ delimiter:';', headers: true }))
            .on('error', error => console.error(error))
            .on('data', row => {

                csvData.title = row.title;
                csvData.isbn = row.isbn;
                csvData.authorEmail = row.authors;
                csvData.type = fileMaterial.replace('.csv', '');
                csvData.publishDate = row.publishedAt;
                csvData.description = row.description;
                
                function saveToDB(fname: any, lname: any) {
                    
                    csvData.authorFname = "";
                    csvData.authorLname = "";
                    let value = true;
                    
                    for (let i = 0; i < fname.length; i++ ) {
                        if (fname[i] == null) {
                            value = false;
                        }
                    }

                    if (value == true) {
                        
                        for(let i = 0; i < fname.length; i++) {
                            csvData.authorFname += fname[i] + " ,";
                            csvData.authorLname += lname[i] + " , ";
                        }
                        
                        console.log(csvData);
                        /*
                        let printedMaterialData = new PrintedMaterial({
                            title: <String>csvData.title,
                            isbn: <String>csvData.isbn,
                            type: <String>csvData.type,
                            authorFname: <String>csvData.authorFname,
                            authorLname: <String>csvData.authorLname,
                            authors_email: <String>csvData.authorEmail,
                            publish_date: <String>csvData.publishDate,
                            description: <String>csvData.description
                        
                        });
                        
                        try {
                            const savedData = printedMaterialData.save();
                            console.log(savedData);
                        } catch(err) {
                            console.log(`[ERROR]: Could not save data from csv to database :  ${err}`);
                        }
                      */  
                    
                    }
                }
                save = saveToDB;
                parseAuthor(fileAuthor, row.authors);         
                
            })

    }
/*
    function saveToDB(fname: any, lname: any) {
        
    }
    */
}

export {parseCSVFiles};
