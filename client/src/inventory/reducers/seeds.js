/**
 * Created by Xingyu on 6/29/2017.
 */
import {SET_SEEDS} from "../actions/fetch-fields.js"
import {SEED_DELETED} from "../actions/delete-field.js"
import {ADD_SEED} from "../actions/save-field.js"

export default function seeds(state=[], action={}){
    switch(action.type) {
        case SET_SEEDS:
            console.log("set field!");
            return action.seeds;
            break;
        case SEED_DELETED:
            console.log("field delete!");
            return state.filter(item => item._id !== action.seedId);
            break;

        case ADD_SEED:
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