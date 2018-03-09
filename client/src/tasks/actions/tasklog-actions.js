/**
 * Created by Xingyu on 1/05/2018.
 */
//FETCH DATA ACTION
export const SET_TASKLOG = 'SET_TASKLOG';

export function setTaskLog(tasklogs){
    return{
        type: SET_TASKLOG,
        tasklogs
    }

}

export function fetchTaskLogs(){
    console.log("fetch tasklogs");
    return dispatch => {
        fetch('/data/tasklogs')
            .then(res => res.json())
            .then(data => dispatch(setTaskLog(data.items)));
    }
}

//POST DATA ACTION
export const ADD_TASKLOG = 'ADD_TASKLOG';

function handleResponse(response){
    if(response.ok){
        return response.json();
    }else{
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function addTaskLog(tasklog){
    return{
        type: ADD_TASKLOG,
        tasklog
    }
}

export function saveTaskLog(data){
    return dispatch => {
        return fetch('/data/tasklogs', {
            method: 'post',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(addTaskLog(data.tasklog)));
    }
}