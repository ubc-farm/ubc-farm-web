/**
 * Created by Xingyu on 6/29/2017.
 */
import {SET_FERTILIZERS, FERTILIZER_DELETED, ADD_FERTILIZER,UPDATE_FERTILIZER, FERTILIZER_DELETE} from "../actions/fertilizer-actions"

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
        case UPDATE_FERTILIZER:
            const index = state.findIndex(i => i._id === action.item._id);
            return [
                ...state.slice(0,index),
                action.item,
                ...state.slice(index + 1)
            ];
            break;
        case FERTILIZER_DELETE:
            console.log("fertilizer delete!");
            return state.filter(item => item._id !== action.id);
            break;
        default:
            return state;
    }
};