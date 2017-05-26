/**
 * Created by Xingyu on 5/25/2017.
 */
export default function(state=[], action={}){
    switch(action.type) {
        case "FIELD_SELECTED":
            console.log('event fired');
            return action.payload;
            break;
        default:
            return state;
    }
}
