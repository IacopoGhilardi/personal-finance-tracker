import { Request, Response } from "express";
import * as utility from '../../../utils/utility'
import * as nordigenServices from '../services/nordigenService';
import {getTokenFromBearer, makeErrorResponse, makeSuccessResponse} from "../../../utils/utility";
import {getUserFromToken} from "../services/userService";
import User from "../models/user";


export async function getUserBankToken(req: Request, res: Response) {
    let tokenResponse = await nordigenServices.getToken();

    if (tokenResponse.status == 200) {
        return makeSuccessResponse(res, 200, tokenResponse.data)
    }

    return makeErrorResponse(res, 400, tokenResponse.data.error)
}

export async function getInstitutions(req: Request, res: Response) {
    let access_token = utility.getTokenFromBearer(req.headers.authorization)
    let response = await nordigenServices.getInstitutions(access_token);      

    if (response.status == 200) {
        return makeSuccessResponse(res, 200, response.data);
    }

    return makeErrorResponse(res, 400, response.data.error)
}

export async function me(req: Request, res: Response) {
    const accessToken: string = getTokenFromBearer(req.headers.authorization);

    const user: User = await getUserFromToken(accessToken)

    if (!user) {
        return makeErrorResponse(res, 404, "User not found");
    }
    return makeSuccessResponse(res, 200, user);
}

export async function create(req: Request, res: Response) {
    try {


        const userData: Partial<User> = req.body;
        const newUser = new User(userData);
        const savedUser = await newUser.save();

        return makeSuccessResponse(res, 201, savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        return makeErrorResponse(res, 500, 'Failed to create user');
    }
}

export async function edit(req: Request, res: Response) {
    try {
        const accessToken: string = getTokenFromBearer(req.headers.authorization);
        const editor: User | null = await getUserFromToken(accessToken);

        if (!editor) {
            return makeErrorResponse(res, 401, "User unauthorized")
        }
        //Todo: check if is admin or if is the user himself to editing the profile

        const userToUpdate: Partial<User> = req.body;
        const user = await User.findById(req.body.id).exec();

        if (!user) {
            return makeErrorResponse(res, 404, 'User not found');
        }

        Object.assign(user, userToUpdate);
        const updatedUser = await user.save();
        // const { password, ...userWithoutPassword } = updatedUser.toObject();

        return makeSuccessResponse(res, 200, updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        return makeErrorResponse(res, 500, 'Failed to update user');
    }
}