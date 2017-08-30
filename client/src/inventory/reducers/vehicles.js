/**
 * Created by Xingyu on 6/29/2017.
 */
import {SET_VEHICLES, VEHICLE_DELETED, ADD_VEHICLE, UPDATE_VEHICLE} from "../actions/vehicles-action"

export default function vehicles(state=[], action={}){
    switch(action.type) {
        case SET_VEHICLES:

            return action.vehicles;
            break;
        case VEHICLE_DELETED:

            return state.filter(item => item._id !== action.vehicleID);
            break;

        case ADD_VEHICLE:

            return[
                ...state,
                action.vehicle
            ];
            break;
        case UPDATE_VEHICLE:
            console.log(action);
            const index = state.findIndex(i => i._id === action.item._id);
            console.log(index);
            return [
                ...state.slice(0,index),
                action.item,
                ...state.slice(index + 1)
            ];
            

        default:
            return state;
    }
};