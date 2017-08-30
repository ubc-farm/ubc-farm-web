/**
 * Created by Xingyu on 7/5/2017.
 */

import {SET_TRANSPLANTS, TRANSPLANT_DELETED, ADD_TRANSPLANT, UPDATE_TRANSPLANT} from "../actions/transplant-actions"

export default function transplants(state=[], action={}){
    switch(action.type) {
        case SET_TRANSPLANTS:

            return action.transplants;
            break;
        case TRANSPLANT_DELETED:

            return state.filter(item => item._id !== action.seedId);
            break;

        case ADD_TRANSPLANT:

            return[
                ...state,
                action.transplant
            ];
            break;
        case UPDATE_TRANSPLANT:
            console.log(action);
            const index = state.findIndex(i => i._id === action.item._id);
            console.log(index);
            return [
                ...state.slice(0,index),
                action.item,
                ...state.slice(index + 1)
            ];

        default:
            return state;
    }
};