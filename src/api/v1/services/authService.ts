import User from "../models/user";


export async function registerNewUser(email: string, password: string): Promise<void> {
    const userAlreadyExists = await User.findOne({ email }).lean().exec();

    if (userAlreadyExists) {
        throw 'User already exists';
    }

    const newUser = new User({ email, password: password });
    await newUser.save();
}

export async function loginUser(email: string, password: string) {
}