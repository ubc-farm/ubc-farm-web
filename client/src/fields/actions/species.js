/**
 * Created by Xingyu on 5/30/2017.
 */
export const GET_SPECIES = 'GET_SPECIES';



function handleResponse(response){
    if(response.ok){
        console.log("delete field response ok");
        return response.json();
    }else{
        console.log("delete field response error: " + response.json());
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function fieldDeleted(fieldId){
    return{
        type: GET_SPECIES,
        fieldId
    }
}

export function deleteField(id){
    return dispatch => {
        return fetch(`/data/fields/${id}`, {
            method: 'delete',
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(fieldDeleted(id)));
    }
}

