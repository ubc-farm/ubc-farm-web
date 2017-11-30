/**
 * Created by Xingyu on 11/13/2017.
 */
import {SET_CLIENTS, ADD_CLIENT} from "../actions/client-actions"

export default function clients(state=[], action={}){
    switch(action.type) {
        case SET_CLIENTS:

            return action.clients;
            break;


        case ADD_CLIENT:

            return[
                ...state,
                action.client
            ];
            break;

        default:
            return state;
    }
};