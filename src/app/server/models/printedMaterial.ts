import mongoose from 'mongoose';
import { prependListener } from 'process';

interface printed_material {

    title: String;
    isbn: String;
    type: String;
    authorFname: String;
    authorLname: String;
    authors_email: Object;
    publish_date: String;
    description: String;
}

const materialSchema = new mongoose.Schema<printed_material> ({
    title: { type: String, required: true, unique: true },
    isbn: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    authorFname: { type: String, required: true },
    authorLname: { type: String, required: true },
    authors_email: { type: Object, required: true },
    publish_date: { type: String, required: false },
    description: { type: String, required: false }
});

const PrintedMaterial = mongoose.model('PrintedMaterial', materialSchema);

export {PrintedMaterial}