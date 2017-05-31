/**
 * Created by Xingyu on 5/30/2017.
 */
export const FIELD_DELETED = 'FIELD_DELETED';

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
        type: FIELD_DELETED,
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

