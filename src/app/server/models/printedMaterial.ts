import mongoose from 'mongoose';
import { prependListener } from 'process';

interface printed_material {

    title: String;
    isbn: String;
    type: String;
    authorFname: Object;
    authorLname: Object;
    authors_email: Object;
    publish_date: String;
    description: String;
}

const materialSchema = new mongoose.Schema<printed_material> ({
    title: { type: String, required: false, unique: true },
    isbn: { type: String, required: false, unique: true },
    type: { type: String, required: false },
    authorFname: { type: Object, required: false},
    authorLname: { type: Object, required: false },
    authors_email: { type: Object, required: false },
    publish_date: { type: String, required: false },
    description: { type: String, required: false }
});

const PrintedMaterial = mongoose.model('PrintedMaterial', materialSchema);

export {PrintedMaterial}