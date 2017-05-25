/**
 * Created by Xingyu on 5/25/2017.
 */
export default function(state=null, action){
    switch(action.type) {
        case "FIELD_SELECTED":
            console.log('event fired');
            return action.payload;
            break;

    }
    return state;
}
