import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import express, {Express, query, Request, Response} from 'express';
import { PrintedMaterial } from '../models/printedMaterial';

const save = express.Router();


let writeData = {
    title: String,
    isbn: String,
    type: String,
    authorFname: String,
    authorLname: String,
    authorEmail: String,
    publishDate: String,
    description: String,
}

save.get('/save', (req: Request, res: Response, next) => {
    console.log('working......')  

    PrintedMaterial.find((err, data) => {
        if (err) {
            console.log(`[ERROR]: There was an error ${err}`);
            res.status(500).json({err});
        
        } else {
            res.send(data);
            csv.writeToPath(path.resolve('../../assets', 'merged.csv'), [data])
            .on('error', err => console.log(err))
            .on('finish', () => {
                
                console.log(data);
                console.log('Done Writing');
            });
        }
    });

});

export {save}