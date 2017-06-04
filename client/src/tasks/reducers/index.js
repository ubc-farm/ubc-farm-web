/**
 * Created by Xingyu on 6/3/2017.
 */
import {ADD_TASK} from "../actions/save-task"
import {SET_TASKS} from "../actions/fetch-tasks"

export default function fields(state=[], action={}){
    switch(action.type) {
        case ADD_TASK:
            console.log("TASK added! reducer...");
            return[
                ...state,
                action.task
            ];
            break;

        case SET_TASKS:
            console.log("set tasks!");
            return action.tasks;
            break;

        default:
            return state;
    }
};