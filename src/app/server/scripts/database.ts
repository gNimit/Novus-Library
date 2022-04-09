import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express();

router.get( '/database',(req: Request, res: Response) => {
    res.send('Database is working....');
});

router.post('/database', (req: Request, res: Response) => {
    
});

export {router as routes};