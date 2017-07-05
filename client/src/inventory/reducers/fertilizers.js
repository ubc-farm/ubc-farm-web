/**
 * Created by Xingyu on 6/29/2017.
 */
import {SET_FERTILIZERS, FERTILIZER_DELETED, ADD_FERTILIZER} from "../actions/fertilizer-actions"

export default function transplants(state=[], action={}){
    switch(action.type) {
        case SET_FERTILIZERS:

            return action.fertilizers;
            break;
        case FERTILIZER_DELETED:

            return state.filter(item => item._id !== action.fertilizerID);
            break;

        case ADD_FERTILIZER:

            return[
                ...state,
                action.fertilizer
            ];
            break;

        default:
            return state;
    }
};