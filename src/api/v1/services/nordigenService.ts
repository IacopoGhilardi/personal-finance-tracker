import config from 'config';
import axios, {AxiosResponse} from 'axios'
import {JwtFromRequestFunction} from "passport-jwt";

export async function getToken(): Promise<AxiosResponse<any, any>> {
    return await axios.post(`${config.get('bank_service.base_url')}/token/new/`, {
        'secret_key': config.get('bank_service.secret_key'),
        'secret_id': config.get('bank_service.secret_id')
    });
}

export async function getInstitutions(access_token: JwtFromRequestFunction): Promise<any> {
    return await axios.get(`${config.get('bank_service.base_url')}/institutions/?country=it`, {
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${access_token}`
        }
    });
}

export async function createUserAgreement(access_token: string, institution: object): Promise<any> {
    let response = await axios.post(`${config.get('bank_service.base_url')}/agreements/enduser`, {
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${access_token}`
        },
        institution_id: institution["id"],
        max_historical_days: institution["max_historical_days"],
        access_valid_for_days: institution["access_valid_for_days"],
        access_scope: ["balances", "details", "transactions"] 
    })

    console.log('Response', response);
    

    return response;
}