/**
 * Created by Xingyu on 1/05/2018.
 */
import {SET_TASKLOG, ADD_TASKLOG} from "../actions/tasklog-actions"

export default function tasklogs(state=[], action={}){
    switch(action.type) {
        case SET_TASKLOG:

            return action.tasklogs;
            break;


        case ADD_TASKLOG:

            return[
                ...state,
                action.tasklog
            ];
            break;

        default:
            return state;
    }
};