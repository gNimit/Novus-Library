import mongoose from 'mongoose';
import { prependListener } from 'process';

interface printed_material {

    title: String;
    isbn: String;
    type: String;
    authorFname: String;
    authorLname: String;
    authors_email: String;
    publish_date: String;
    description: String;
}

interface search_query {
    searhquery: String;
}

interface sort_query {

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



const PrintedMaterial = mongoose.model('PrintedMaterial', materialSchema);


export {
    PrintedMaterial
}