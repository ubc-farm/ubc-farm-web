/**
 * Created by Xingyu on 6/29/2017.
 */
import {SET_SEEDS} from "../actions/seeds-get.js"
import {SEED_DELETED} from "../actions/seeds-delete.js"
import {ADD_SEED} from "../actions/seeds-post.js"
import {UPDATE_SEED} from "../actions/seeds-put"

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
        case UPDATE_SEED:
            const index = state.findIndex(i => i._id === action.item.id);
            //change this when new edits come in
            var updatedSeed = state[index];
            updatedSeed.quantity = action.item.log.value;
            return [
                ...state.slice(0,index),
                updatedSeed,
                ...state.slice(index + 1)
            ];

        default:
            return state;
    }
};