import { Schema, model, Types } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface User {
	name: string;
	surname: string;
	email: string;
	password: string;
	fiscal_code: string;
	born_date: string;
	city: string;
	cap: string;
	address: string;
	createdAt: string;
	updatedAt: string;
	preferences: object;
	accounts: Types.Array<object>;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<User>({
	name: String,
	surname: String,
	email: String,
	password: String,
	fiscal_code: String,
	born_date: String,
	city: String,
	cap: String,
	address: String,
	createdAt: String,
	updatedAt: String,
	preferences: Object,
	accounts: Array
});

const User = model<User>('User', userSchema);

export default User