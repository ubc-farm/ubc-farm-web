/**
 * Created by Xingyu on 6/5/2017.
 */
export const SET_TASKS_BYFIELD = 'SET_TASKS_BYFIELD';

export function setTasksByField(tasks){
    console.log(tasks);
    return{
        type: SET_TASKS_BYFIELD,
        tasks
    }

}

export function fetchTaskByField(id){
    return dispatch => {
        fetch(`/data/fieldtasks/${id}`)
            .then(res => res.json())
            .then(data => dispatch(setTasksByField(data.tasks)));
    }
}
