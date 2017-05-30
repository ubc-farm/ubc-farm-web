/**
 * Created by Xingyu on 5/25/2017.
 */
import {SET_FIELDS} from "../actions/fetch-fields.js"
import {FIELD_DELETED} from "../actions/delete-field.js"
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

        default:
            return state;
    }
};