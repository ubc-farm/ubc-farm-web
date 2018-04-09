export default function currency(state=[], action={}){
    switch(action.type) {
        case 'SET_SPECIES':
            return action.data;
            break;

        default:
            return state;
    }
};