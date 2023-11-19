import User from "../models/user";
import {decryptReversibleUuid, getDataFromToken} from "../../../utils/tokenUtils";


export async function getUserFromToken(token: string): Promise<User> {
    const data = getDataFromToken(token)
    const uuid = data['uuid'];
    const userId: string = decryptReversibleUuid(uuid);

    return await User.findById(userId).exec();
}

export async function getUserCopyFromToken(token: string) {
    const data = getDataFromToken(token)
    const uuid = data['uuid'];
    const userId: string = decryptReversibleUuid(uuid);

    return await User.findById(userId).lean().exec();
}

export async function createNewUser() {

}