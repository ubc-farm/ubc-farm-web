/**
 * Created by Xingyu on 8/23/2017.
 */
import {SET_PURCHASE, ADD_PURCHASE} from "../actions/purchase-actions"

export default function purchases(state=[], action={}){
    switch(action.type) {
        case SET_PURCHASE:

            return action.purchases;
            break;


        case ADD_PURCHASE:

            return[
                ...state,
                action.purchase
            ];
            break;

        default:
            return state;
    }
};