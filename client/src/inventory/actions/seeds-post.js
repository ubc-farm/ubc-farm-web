/**
 * Created by Xingyu on 6/29/2017.
 */
export const ADD_SEED = 'ADD_SEED';

function handleResponse(response){
    if(response.ok){
        return response.json();
    }else{
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function AddSeed(seed){
    return{
        type: ADD_SEED,
        seed
    }
}

export function SaveSeed(data){
    return dispatch => {
        return fetch('/data/seeds', {
            method: 'post',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(AddSeed(data.seed)));
    }
}