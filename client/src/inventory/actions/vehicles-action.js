/**
 * Created by Xingyu on 7/5/2017.
 */
//FETCH DATA ACTION
export const SET_VEHICLES = 'SET_VEHICLES';

export function setVehicles(vehicles){
    console.log(vehicles);
    return{
        type: SET_VEHICLES,
        vehicles
    }

}

export function fetchVehicles(){
    console.log("fetch vehicles");
    return dispatch => {
        fetch('/data/vehicles')
            .then(res => res.json())
            .then(data => dispatch(setVehicles(data.items)));
    }
}

//POST DATA ACTION
export const ADD_VEHICLE = 'ADD_VEHICLE';

function handleResponse(response){
    if(response.ok){
        return response.json();
    }else{
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function AddVehicle(vehicle){
    return{
        type: ADD_VEHICLE,
        vehicle
    }
}

export function SaveVehicle(data){
    console.log(data);
    return dispatch => {
        return fetch('/data/vehicles', {
            method: 'post',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(AddVehicle(data.vehicle)));
    }
}