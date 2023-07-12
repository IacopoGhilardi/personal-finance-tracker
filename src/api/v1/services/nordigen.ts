import config from 'config';
import axios, { AxiosResponse } from 'axios'
import { response } from 'express';

export async function getToken(): Promise<AxiosResponse<any, any>> {
    
    let response = await axios.post(`${config.get('nordigen.base_url')}/token/new/`, {
        'secret_key' : config.get('nordigen.secret_key'),
        'secret_id': config.get('nordigen.secret_id')
    })

    return response;
}

export async function getInstitutions(access_token: string): Promise<any> {
    
    let response = await axios.get(`${config.get('nordigen.base_url')}/institutions/?country=it`, {
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${access_token}`
        }
    })

    return response;
}

export async function createUserAgreement(access_token: string): Promise<any> {
    let response = await axios.post(`${config.get('nordigen.base_url')}/agreements/enduser`, {
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${access_token}`
        },
        institution_id: "REVOLUT_REVOGB21",
        max_historical_days: "180",
        access_valid_for_days: "30",
        access_scope: ["balances", "details", "transactions"] 
    })

    console.log('Response', response);
    

    return response;
}