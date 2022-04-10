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

router.get('/:id', (req: Request, res: Response, next) => {
    console.log('working......')  

    let value = req.params.id;
    //let author = req.query.authors_email;
    //let isbn = req.query.isbn;
    
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


export {router};


