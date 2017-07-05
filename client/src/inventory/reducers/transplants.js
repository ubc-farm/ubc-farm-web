/**
 * Created by Xingyu on 7/5/2017.
 */

import {SET_TRANSPLANTS, TRANSPLANT_DELETED, ADD_TRANSPLANT} from "../actions/transplant-actions"

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

        default:
            return state;
    }
};