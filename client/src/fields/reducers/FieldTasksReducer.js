/**
 * Created by Xingyu on 6/5/2017.
 */
import {SET_TASKS_BYFIELD} from "../actions/fetchTaskByField"

export default function fieldTasks(state=[], action={}){
    switch(action.type) {
        case SET_TASKS_BYFIELD:
            console.log("set tasks by field!");
            return action.tasks;
            break;

        default:
            return state;
    }
};