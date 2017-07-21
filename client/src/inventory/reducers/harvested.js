/**
 * Created by Xingyu on 6/29/2017.
 */
import {SET_HARVESTED, HARVEST_DELETED, ADD_HARVESTED} from "../actions/harvested_actions"

export default function vehicles(state=[], action={}){
    switch(action.type) {
        case SET_HARVESTED:

            return action.harvested;
            break;
        case HARVEST_DELETED:

            return state.filter(item => item._id !== action.harvestedID);
            break;

        case ADD_HARVESTED:

            return[
                ...state,
                action.harvested
            ];
            break;

        default:
            return state;
    }
};