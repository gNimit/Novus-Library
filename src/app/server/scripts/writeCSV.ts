import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import express, {Express, query, Request, Response} from 'express';
import { PrintedMaterial } from '../models/printedMaterial';

const save = express.Router();

function writeToFile() {
    
    PrintedMaterial.find((err, data) => {
        if (err) {
            console.log(`[ERROR]: There was an error ${err}`);
        
        } else {
            
            csv.writeToPath(path.resolve('../../assets', 'merged.csv'), [data])
            .on('error', err => console.log(err))
            .on('finish', () => {
                
                console.log(data);
                console.log('Done Writing');
            });
        }
    });
}


save.get('/file', (req: Request, res: Response, next) => {
    
    writeToFile();

    res.download('../../assets/merged.csv', (err) => {
        if(err) {
            console.log(`[ERROR]: Error while downloading file ${err}`);
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
 
});

export {save}