/**
 * Created by Xingyu on 11/20/2017.
 */
//FETCH DATA ACTION
export const SET_INVOICE = 'SET_INVOICE';

export function setInvoice(invoices){
    console.log(invoices);
    return{
        type: invoices,
        invoices
    }

}

export function fetchInvoices(){
    console.log("fetch invoices");
    return dispatch => {
        fetch('/data/invoices')
            .then(res => res.json())
            .then(data => dispatch(setInvoice(data.items)));
    }
}

//POST DATA ACTION
export const ADD_INVOICE = 'ADD_INVOICE';

function handleResponse(response){
    console.log(response.json);
    if(response.ok){
        return response.json();
    }else{
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function addInvoice(invoice){
    return{
        type: ADD_INVOICE,
        invoice
    }
}

export function saveInvoice(data){
    console.log(data);
    return dispatch => {
        return fetch('/data/invoices', {
            method: 'post',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(addInvoice(data.invoice)));
    }
}