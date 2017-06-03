/**
 * Created by Xingyu on 6/3/2017.
 */
import {ADD_TASK} from "../actions/save-task"

export default function fields(state=[], action={}){
    switch(action.type) {
        case ADD_TASK:
            console.log("TASK added! reducer...");
            return[
                ...state,
                action.task
            ];
            break;

        default:
            return state;
    }
};