import express, {Express, Request, Response, Router, query} from 'express';
import dotenv from 'dotenv';
import { connectMongo } from './dbconnect';
import {PrintedMaterial} from '../models/printedMaterial';
import bodyParser from 'body-parser';
import { router } from './search'; 
import { save } from './writeCSV';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


connectMongo();

//parseCSVFiles();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//CORS HEADERS MIDDLEWARE
app.use(function(req: Request, res: Response, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get( '/items',(req: Request, res: Response, next) => {
    
    PrintedMaterial.find()
    .then((items) => {
        res.send(items);
    })
    .catch(err => res.status(400).json(`[GET]: GET ERROR: ${err}`));

});


app.post('/add', (req: Request, res: Response) => {
    
    let printedMaterialData = new PrintedMaterial({
        title: <String>req.body.title,
        isbn: <String>req.body.isbn,
        type: <String>req.body.type,
        authorFname: <String>req.body.authorFname,
        authorLname: <String>req.body.authorLname,
        authors_email: <String>req.body.authors_email,
        publish_date: <String>req.body.publish_date,
        description: <String>req.body.description

    });
    try {
        const savedData = printedMaterialData.save();
        res.status(200).json(savedData);
        console.log(`[MongoDB]: Data Saved! ${printedMaterialData}`);
    } catch(err) {
        res.status(400).send(err);
        console.log(`[POST]: POST ERROR ${err}`);
    }

});

app.use('', router);
app.use('', save);

app.listen( port, () => {
    console.log(`[server]: server is running at https://localhost:${port}`);
});

