import mongoose from 'mongoose';
import { prependListener } from 'process';

interface printed_material {

    title: String;
    isbn: String;
    type: String;
    authors: String;
    authors_email: String;
    publish_date: String;
    description: String;
}

const materialSchema = new mongoose.Schema<printed_material> ({
    title: { type: String, required: true },
    isbn: { type: String, required: true },
    type: { type: String, required: true },
    authors: { type: String, required: true },
    authors_email: { type: String, required: true },
    publish_date: { type: String, required: false },
    description: { type: String, required: false }
});

const PrintedMaterial = mongoose.model('PrintedMaterial', materialSchema);

export {
    PrintedMaterial    
}