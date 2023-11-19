import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import {Roles} from "../../../enums/roles";

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
	password: {
		type: String,
		select: false
	},
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
		const hashedPassword = await bcrypt.hash(user.password, 10); // 10 is the number of salt rounds
		user.password = hashedPassword;
	  } catch (error) {
		return next(error);
	  }
	}
	next();
  });


userSchema.methods.comparePassword = async function (candidatePassword: string) {
	const user = this;
	try {
	  const isMatch = await bcrypt.compare(candidatePassword, user.password);
	  return isMatch;
	} catch (error) {
	  throw error;
	}
  };

userSchema.methods.isAdmin = function (): boolean {
	const user = this;
	return user.roles.indexOf(Roles.ADMIN) != -1;
}

const User = model<UserDocument>('User', userSchema);

export default User