/**
 * Created by Xingyu on 8/30/2017.
 */
//PUT DATA ACTION
export const UPDATE_SEED = 'UPDATE_SEED';

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

function updateSeed(item){
    
    console.log("seed should update");
    console.log(item);
    return{
        type: UPDATE_SEED,
        item
    }
}

export function logSeed(data){
    console.log(data);
    return dispatch => {
        return fetch('data/seeds', {
            credentials: 'same-origin',
            method: 'put',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then((response)=>{
            if(response.ok){
                dispatch(updateSeed(data));
            }else{
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        }).cath((error)=>{
            console.log("There is an error "+error);
        });
    }
}