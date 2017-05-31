/**
 * Created by Xingyu on 5/25/2017.
 */
import {SET_FIELDS} from "../actions/fetch-fields.js"
import {FIELD_DELETED} from "../actions/delete-field.js"
import {ADD_FIELD} from "../actions/save-field.js"

export default function fields(state=[], action={}){
    switch(action.type) {
        case SET_FIELDS:
            console.log("set field!");
            return action.fields;
            break;
        case FIELD_DELETED:
            console.log("field delete!");
            return state.filter(item => item._id !== action.fieldId);
            break;

        case ADD_FIELD:
            console.log("field added! reducer...");
            return[
                ...state,
                action.field
            ];
            break;

        default:
            return state;
    }
};