import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import { connectMongo } from './dbconnect';
import {PrintedMaterial} from '../models/printedMaterial';
import bodyParser from 'body-parser';

dotenv.config();

connectMongo();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());

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
        authors: <String>req.body.authors,
        authors_email: <String>req.body.authors_email,
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

