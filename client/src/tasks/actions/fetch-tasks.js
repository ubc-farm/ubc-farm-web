/**
 * Created by Xingyu on 5/26/2017.
 */
export const SET_TASKS = 'SET_TASKS';

export function setTasks(tasks){
    console.log(tasks);
    return{
        type: SET_TASKS,
        tasks
    }

}

export function fetchTasks(){
    return dispatch => {
        fetch('/data/tasks')
            .then(res => res.json())
            .then(data => dispatch(setTasks(data.tasks)));
    }
}
