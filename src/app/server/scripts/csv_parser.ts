import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

let files = ['authors.csv','books.csv','magazines.csv'];

for (let i = 0; i  < 3; i++) {
    parse(files[i]);
}

interface printed_material {

    title: String;
    isbn: String;
    type: String;
    authors: String;
    authors_email: String;
    publish_date: String;
    description: String;
}

function parse(file: string) {

    fs.createReadStream(path.resolve('../../../../assets', file))
        .pipe(csv.parse({ delimiter:';', headers: true }))
        .on('error', error => console.error(error))
        .on('data', row => {
            console.log(row)

        })
        .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));

}