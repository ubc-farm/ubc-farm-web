/**
 * Created by Xingyu on 6/5/2017.
 */
export const SET_TASKS_BYFIELD = 'SET_TASKS_BYFIELD';

export function setTasksByField(tasks){
    console.log("getting tasks");
    return{
        type: SET_TASKS_BYFIELD,
        tasks
    }

}

export const fetchTaskByField = (id) => {
    console.log("fetch!!!!!");
    return dispatch => {
        fetch(`/data/fieldtasks/${id}`)
            .then(res => res.json())
            .then(data => dispatch(setTasksByField(data.tasks)));
    }
}
