import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface Institution {
  id: string;
  name: string;
  bic: string;
  transaction_total_days: string;
  countries: [];
  logo: string;
}

// 2. Create a Schema corresponding to the document interface.
const institutionSchema = new Schema<Institution>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    bic: String,
    transaction_total_days: String,
    countries: Array,
    logo: String
});

const Institution = model<Institution>('Institution', institutionSchema);