/**
 * Created by Xingyu on 6/5/2017.
 */
export const FIELD_TASKS_DELETED = 'FIELD_TASKS_DELETED';

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
        type: FIELD_TASKS_DELETED,
        fieldId
    }
}

export function deleteTaskByField(id){
    return dispatch => {
        return fetch(`/data/fieldtasks/${id}`, {
            method: 'delete',
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(fieldDeleted(id)));
    }
}
