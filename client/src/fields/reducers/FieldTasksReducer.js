/**
 * Created by Xingyu on 6/5/2017.
 */
import {SET_TASKS_BYFIELD} from "../actions/fetchTaskByField";
import {ADD_TASK} from "../../tasks/actions/save-task";
import {TASK_DELETED} from "../../tasks/actions/delete-task";

export default function fieldTasks(state=[], action={}){
    switch(action.type) {
        case SET_TASKS_BYFIELD:
            console.log("set tasks by field!");
            return action.tasks;
            break;

        case ADD_TASK:
            console.log("TASK added! reducer...");
            return[
                ...state,
                action.task
            ];
            break;

        case TASK_DELETED:
            console.log("field delete!");
            return state.filter(item => item._id !== action.taskId);
            break;


        default:
            return state;
    }
};