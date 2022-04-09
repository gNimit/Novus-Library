import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import {PrintedMaterial} from '../models/printedMaterial';
let files = ['authors.csv','books.csv','magazines.csv'];

function saveDataToDataBase() {
    

    parseAuthor('authors.csv', 'magazines.csv');
    parseAuthor('authors.csv', 'books.csv')

    let printed_material = {

        title: "",
        isbn: "",
        type: "",
        authors_firstname: "",
        authors_lastname: "",
        authors_email: "",
        publish_date: "",
        description: "",
    }



    function parseMaterial(fileMaterial: string, authorEmail: string) {
        fs.createReadStream(path.resolve('../../assets', fileMaterial))
            .pipe(csv.parse({ delimiter:';', headers: true }))
            .on('error', error => console.error(error))
            .on('data', row => {
                //console.log(row);
                let auth = row.authors.split(",");

                for(let i = 0; i < Object.keys(auth).length; i++) {
                    if (authorEmail === auth[i]) {
                        
                        printed_material.title = row.title;
                        printed_material.isbn = row.isbn;
                        printed_material.authors_email = auth;

                        if (fileMaterial == 'magazines.csv') {
                            printed_material.type = "magazine";
                            printed_material.publish_date = row.publishedAt;
                            printed_material.description = "none";
                        }
                        else {
                            printed_material.type = "book";
                            printed_material.description = row.description;
                            printed_material.publish_date = "none";
                        }
                    }
                }
                
                let printedMaterialData = new PrintedMaterial({
                    title: printed_material.title,
                    isbn: printed_material.isbn,
                    type: printed_material.type,
                    authorFname: printed_material.authors_firstname,
                    authorLname: printed_material.authors_lastname,
                    authors_email: printed_material.authors_email,
                    publish_date: printed_material.publish_date,
                    description: printed_material.description
            
                });
                try {
                    const savedData = printedMaterialData.save();
                    console.log(savedData);
                } catch(err) {
                    console.log(`[ERROR]: Could not save data from csv to database :  ${err}`);
                }

                console.log("-------------------------");
                console.log(printed_material.title);
                console.log(printed_material.isbn);
                console.log(printed_material.type);
                console.log(printed_material.authors_firstname);
                console.log(printed_material.authors_lastname);
                console.log(printed_material.authors_email);
                console.log(printed_material.publish_date);
                console.log(printed_material.description);
                console.log("-------------------------");
                
            })
        
    }


    function parseAuthor(fileAuthor: string, fileMaterial: string) {

        fs.createReadStream(path.resolve('../../assets', fileAuthor))
            .pipe(csv.parse({ delimiter:';', headers: true }))
            .on('error', error => console.error(error))
            .on('data', row => {
                //console.log(row);
                printed_material.authors_email = row.email;
                printed_material.authors_firstname = row.firstname;
                printed_material.authors_lastname = row.lastname;
                parseMaterial(fileMaterial, row.email);
            })
        

    }

}


export {saveDataToDataBase};