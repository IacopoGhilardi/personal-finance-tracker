import config from 'config';
import axios from 'axios'
import { response } from 'express';

let access_token = '';

export async function getToken(): Promise<string> {
    
    axios.post("https://ob.nordigen.com/api/v2/token/new/", {
        'secret_key' : config.get('nordigen.secret_key'),
        'secret_id': config.get('nordigen.secret_id')
    })
    .then(response => {
        console.log('response', response.data.access);
        access_token = response.data.access;
    }).catch(error => {
        console.log('error', error);
        
    });
    return "ciao";
}

export async function getInstitutions(): Promise<any> {
    console.log('Access token', access_token);
    
    let response = await axios.get("https://ob.nordigen.com/api/v2/institutions/?country=it", {
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${access_token}`
        }
    })

    return response;
}