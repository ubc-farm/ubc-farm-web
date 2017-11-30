/**
 * Created by Xingyu on 11/24/2017.
 */
import {SET_INVOICE, ADD_INVOICE} from "../actions/invoice-actions"

export default function invoices(state=[], action={}){
    switch(action.type) {
        case SET_INVOICE:

            return action.invoices;
            break;


        case ADD_INVOICE:

            return[
                ...state,
                action.invoice
            ];
            break;

        default:
            return state;
    }
};