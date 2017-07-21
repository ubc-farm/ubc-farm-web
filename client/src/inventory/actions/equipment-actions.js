/**
 * Created by Xingyu on 7/5/2017.
 */
//FETCH DATA ACTION
export const SET_EQUIPMENTS = 'SET_EQUIPMENTS';

export function setEquipments(equipments){
    console.log(equipments);
    return{
        type: SET_EQUIPMENTS,
        equipments
    }

}

export function fetchEquipments(){
    console.log("fetch equipments");
    return dispatch => {
        fetch('/data/equipments')
            .then(res => res.json())
            .then(data => dispatch(setEquipments(data.items)));
    }
}

//POST DATA ACTION
export const ADD_EQUIPMENT = 'ADD_EQUIPMENT';

function handleResponse(response){
    if(response.ok){
        return response.json();
    }else{
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function AddEquipment(equipment){
    return{
        type: ADD_EQUIPMENT,
        equipment
    }
}

export function SaveEquipment(data){
    console.log(data);
    return dispatch => {
        return fetch('/data/equipments', {
            method: 'post',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(AddEquipment(data.equipment)));
    }
}