import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import { connectMongo } from './dbconnect';
import {PrintedMaterial} from '../models/printedMaterial';
import bodyParser from 'body-parser';
import { saveDataToDataBase } from './csv_parser'

dotenv.config();
connectMongo();
//saveDataToDataBase();
const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());


//CORS HEADERS MIDDLEWARE
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get( '/items',(req: Request, res: Response) => {
    PrintedMaterial.find({})
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
        authors_email: <Object>req.body.authors_email,
        publish_date: <String>req.body.publish_date,
        description: <String>req.body.description

    });
    try {
        const savedData = printedMaterialData.save();
        res.status(200).json(savedData);
        console.log(savedData);
    } catch(err) {
        res.status(400).send(err);
        console.log(`[POST]: POST ERROR ${err}`);
    }

});

app.listen( port, () => {
    console.log(`[server]: server is running at https://localhost:${port}`);
});

