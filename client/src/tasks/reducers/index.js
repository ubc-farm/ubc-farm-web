/**
 * Created by Xingyu on 6/3/2017.
 */
import {ADD_TASK} from "../actions/save-task"
import {SET_TASKS} from "../actions/fetch-tasks"
import {TASK_DELETED} from "../actions/delete-task"
import {FIELD_TASKS_DELETED} from "../../fields/actions/deleteTaskByField"

export default function tasks(state=[], action={}){
    switch(action.type) {
        case ADD_TASK:
            console.log("TASK added! reducer...");
            return[
                ...state,
                action.task
            ];
            break;

        case FIELD_TASKS_DELETED:
            console.log("field tasks delete!");
            return state.filter(item => item.field !== action.fieldId);
            break;

        case SET_TASKS:
            console.log("set tasks!");
            return action.tasks;
            break;

        case TASK_DELETED:
            console.log("field delete!");
            return state.filter(item => item._id !== action.taskId);
            break;

        default:
            return state;
    }
};