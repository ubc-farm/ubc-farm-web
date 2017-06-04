/**
 * Created by Xingyu on 6/3/2017.
 */
export const ADD_TASK = 'ADD_TASK';

function handleResponse(response){
    if(response.ok){
        return response.json();
    }else{
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function AddTask(task){
    return{
        type: ADD_TASK,
        task
    }
}

export function SaveTask(data){
    return dispatch => {
        return fetch('/data/tasks', {
            method: 'post',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(AddTask(data.task)));
    }
}