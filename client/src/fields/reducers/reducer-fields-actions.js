/**
 * Created by Xingyu on 5/25/2017.
 */
import {FIELD_DELETED} from "../actions/delete-field.js"

export default function selectedField(state=[], action={}){
    switch(action.type) {
        case "FIELD_SELECTED":
            return action.payload;
            break;
        case FIELD_DELETED:
            console.log("field delete trigger select");
            return state = [];
            break;
        default:
            return state;
    }
}
