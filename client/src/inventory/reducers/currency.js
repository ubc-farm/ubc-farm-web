export default function currency(state={currencies:[]}, action={}){
    switch(action.type) {
        case 'SET_CURRENCY':
            return action.data;
            break;

        default:
            return state;
    }
};