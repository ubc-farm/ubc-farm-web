/**
 * Created by Xingyu on 6/29/2017.
 */
import {SET_EQUIPMENTS, EQUIPMENT_DELETED, ADD_EQUIPMENT} from "../actions/equipment-actions"

export default function equipments(state=[], action={}){
    switch(action.type) {
        case SET_EQUIPMENTS:

            return action.equipments;
            break;
        case EQUIPMENT_DELETED:

            return state.filter(item => item._id !== action.equipmentID);
            break;

        case ADD_EQUIPMENT:

            return[
                ...state,
                action.equipment
            ];
            break;

        default:
            return state;
    }
};