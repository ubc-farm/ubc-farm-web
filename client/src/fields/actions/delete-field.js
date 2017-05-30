/**
 * Created by Xingyu on 5/30/2017.
 */
export const FIELD_DELETED = 'FIELD_DELETED';

function handleResponse(response){
    if(response.ok){
        return response.json();
    }else{
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function fieldDeleted(fieldId){
    return{
        type: FIELD_DELETED,
        fieldId
    }
}

export function deleteField(id){
    return function dispatch() {
        return fetch(`/data/fields/${id}`, {
            method: 'delete',
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
    }
}