/**
 * Created by Xingyu on 8/30/2017.
 */
import {SET_USERS} from "../actions/user_actions"

export default function users(state=[], action={}){
    switch(action.type) {
        case SET_USERS:

            return action.users;
            break;

        default:
            return state;
    }
};