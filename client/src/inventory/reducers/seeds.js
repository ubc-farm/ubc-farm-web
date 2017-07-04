/**
 * Created by Xingyu on 6/29/2017.
 */
import {SET_SEEDS} from "../actions/seeds-get.js"
import {SEED_DELETED} from "../actions/seeds-delete.js"
import {ADD_SEED} from "../actions/seeds-post.js"

export default function seeds(state=[], action={}){
    switch(action.type) {
        case SET_SEEDS:
            console.log("set seed!");
            console.log()
            return action.seeds;
            break;
        case SEED_DELETED:
            console.log("seed delete!");
            return state.filter(item => item._id !== action.seedId);
            break;

        case ADD_SEED:
            console.log("seed added! reducer...");
            return[
                ...state,
                action.seed
            ];
            break;

        default:
            return state;
    }
};