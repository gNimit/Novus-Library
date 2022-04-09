import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = 8000;

app.get('/', (req: Request, res: Response) => {
    res.send('Working....');
});

app.listen( port, () => {
    console.log(`[server]: server is running at https://localhost:${port}`);
});