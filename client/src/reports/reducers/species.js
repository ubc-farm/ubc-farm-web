export default function species(state=[], action={}){
    switch(action.type) {
        case 'SET_SPECIES':
            return action.species;
        default:
            return state;
    }
};