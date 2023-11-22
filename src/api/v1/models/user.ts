import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import {Roles} from "../../../enums/roles";
import logger from "../../../utils/logger";

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
	roles: Types.Array<string>;
	accounts: Types.Array<object>;
}

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
	preferences: Object,
	roles: Array,
	accounts: Array
}, {
	timestamps: true
});

interface UserDocument extends Document, User {
	comparePassword(candidatePassword: string): Promise<boolean>;
	isAdmin(): boolean;
  }

userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
	  try {
		user.password = await bcrypt.hash(user.password, 10);
	  } catch (error) {
		return next(error);
	  }
	}
	next();
  });


userSchema.methods.comparePassword = async function (candidatePassword: string) {
	try {
		return await bcrypt.compare(candidatePassword, this.password);
	} catch (error) {
		logger.info("Error comparing passwords", error);
	  throw error;
	}
 };

userSchema.methods.isAdmin = function (): boolean {
	return this.roles.includes(Roles.ADMIN);
}

const User = model<UserDocument>('User', userSchema);

export default User