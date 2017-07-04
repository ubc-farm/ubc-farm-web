/**
 * Created by Xingyu on 7/4/2017.
 */
import {SELECT_INVENTORY} from "../actions/select-inventory"

export default function active_inventory(state=0,action={}){
    switch(action.type) {
        case SELECT_INVENTORY:
            return action.index;
            break;

        default:
            return state;
    }
}