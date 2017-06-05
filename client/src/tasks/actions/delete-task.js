/**
 * Created by Xingyu on 6/4/2017.
 */
export const TASK_DELETED = 'TASK_DELETED';

function handleResponse(response){
    if(response.ok){
        console.log("delete task response ok");
        return response.json();
    }else{
        console.log("delete task response error: " + response.json());
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function taskDeleted(taskId){
    return{
        type: TASK_DELETED,
        taskId
    }
}

export function deleteTask(id){
    return dispatch => {
        return fetch(`/data/tasks/${id}`, {
            method: 'delete',
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(taskDeleted(id)));
    }
}

