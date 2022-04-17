import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const URI = process.env.MONGO_ATLAS_URI;


function connectMongo() {
    mongoose.connect( `${process.env.MONGO_ATLAS_URI}`)
    .then(() => {
        console.log("[Mongoose]: Successfully connected to MongoDB");
    })
    .catch((err) => {
        console.log("[Mongoose]: Error connecting to MongoDb");
        console.log(`[Mongoose]: ${err}`);
    });
}
export { connectMongo };

