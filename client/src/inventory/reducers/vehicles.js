/**
 * Created by Xingyu on 6/29/2017.
 */
import {SET_VEHICLES, VEHICLE_DELETED, ADD_VEHICLE} from "../actions/vehicles-action"

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

        default:
            return state;
    }
};