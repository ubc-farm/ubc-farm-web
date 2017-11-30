/**
 * Created by Xingyu on 11/13/2017.
 */
//FETCH DATA ACTION
export const SET_CLIENTS = 'SET_CLIENTS';

export function setClients(clients){
    console.log(clients);
    return{
        type: SET_CLIENTS,
        clients
    }

}

export function fetchClients(){
    console.log("fetch clients");
    return dispatch => {
        fetch('/data/clients')
            .then(res => res.json())
            .then(data => dispatch(setClients(data.items)));
    }
}

//POST DATA ACTION
export const ADD_CLIENT = 'ADD_CLIENT';

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

export function AddClient(client){
    return{
        type: ADD_CLIENT,
        client
    }
}

export function SaveClient(data){
    console.log(data);
    return dispatch => {
        return fetch('/data/clients', {
            method: 'post',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(AddClient(data.client)));
    }
}