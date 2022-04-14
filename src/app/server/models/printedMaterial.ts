import mongoose from 'mongoose';
import {Document, Model} from 'mongoose';
import { prependListener } from 'process';

export interface printed_material {

    title: String;
    isbn: String;
    type: String;
    authorFname: String;
    authorLname: String;
    authors_email: String;
    publish_date: String;
    description: String;
}

interface UserModel extends Model<printed_material> {
    myStaticMethod(): number;
}


const materialSchema = new mongoose.Schema<printed_material> ({
    title: { type: String, required: false, unique: true },
    isbn: { type: String, required: false, unique: true },
    type: { type: String, required: false },
    authorFname: { type: String, required: false},
    authorLname: { type: String, required: false },
    authors_email: { type: String, required: false },
    publish_date: { type: String, required: false },
    description: { type: String, required: false }
});
materialSchema.static('myStaticMethod', function myStaticMethod() {
    return 42;
});


const PrintedMaterial = mongoose.model<printed_material, UserModel>('PrintedMaterial', materialSchema);
const answer: number  = PrintedMaterial.myStaticMethod();

export {
    PrintedMaterial
}