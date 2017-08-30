/**
 * Created by Xingyu on 6/29/2017.
 */
import {SET_PESTICIDES,PESTICIDE_DELETED,ADD_PESTICIDE, UPDATE_PESTICIDE} from "../actions/pest-actions"

export default function pesticides(state=[], action={}){
    switch(action.type){
        case SET_PESTICIDES:
            console.log("set pesticides!");
            return action.pesticides;
            break;
        case PESTICIDE_DELETED:

            return state.filter(item => item._id !== action.pesticideID);
            break;

        case ADD_PESTICIDE:

            return[
                ...state,
                action.pesticide
            ];
            break;
        case UPDATE_PESTICIDE:
            const index = state.findIndex(i => i._id === action.item._id);
            return [
                ...state.slice(0,index),
                action.item,
                ...state.slice(index + 1)
            ];
            break;

        default:
            return state;
    }
}