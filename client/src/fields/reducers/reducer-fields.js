/**
 * Created by Xingyu on 5/25/2017.
 */
import {SET_FIELDS} from "../actions/fetch-fields.js"
export default function fields(state=[], action={}){
    switch(action.type) {
        case SET_FIELDS:
            console.log("set field!");
            return action.fields;
            break;

        default:
            return state;
    }
};