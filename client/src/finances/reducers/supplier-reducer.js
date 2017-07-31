/**
 * Created by Xingyu on 7/26/2017.
 */
import {SET_SUPPLIERS, ADD_SUPPLIER} from "../actions/supplier-actions"

export default function suppliers(state=[], action={}){
    switch(action.type) {
        case SET_SUPPLIERS:

            return action.suppliers;
            break;


        case ADD_SUPPLIER:

            return[
                ...state,
                action.supplier
            ];
            break;

        default:
            return state;
    }
};