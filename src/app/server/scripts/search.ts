import express, {Express, query, Request, Response} from 'express';
import mongoose from 'mongoose';
import { title } from 'process';
import url from 'url';
import { PrintedMaterial } from '../models/printedMaterial';

const router = express.Router();



router.use((req: Request, res: Response, next) => {
    console.log('Time: ', Date.now());
    next();
})

router.get('/search/:id', (req: Request, res: Response, next) => {
    console.log('working......')  

    let value = req.params.id;
    
    try {

        PrintedMaterial.find({$or: [{title: value }, {isbn: value}, {authors_email: value}]}, (err, data) => {
            
            if(err) {
                console.log(`[Error]: Error while search ${err}`);
            } else {
                console.log(`[Search Successful]: Search Results ${data}`);
                res.send(data);
            }
    
        })

    } catch (error) {
        console.log(error);
    }
});


router.get('/sort/:id', (req: Request, res: Response, next) => {

    let query = req.params.id;
   
    
    PrintedMaterial.find().sort({[query]: 1}).exec(function(err, data) {
        if (err) {
            console.log(`[SORT ERROR]: Error whiel Sorting ${err}`)
        } else {
            console.log(`SORT RESULTS..................................: ${data}`)
            res.send(data);
        }
    });
})

export {router};


