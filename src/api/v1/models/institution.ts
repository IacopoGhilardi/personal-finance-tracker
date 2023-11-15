import { Schema, model, connect } from 'mongoose';

interface Institution {
  id: string;
  name: string;
  bic: string;
  transaction_total_days: string;
  countries: [];
  logo: string;
}

const institutionSchema = new Schema<Institution>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    bic: String,
    transaction_total_days: String,
    countries: Array,
    logo: String
});

const Institution = model<Institution>('Institution', institutionSchema);