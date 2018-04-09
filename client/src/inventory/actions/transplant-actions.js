/**
 * Created by Xingyu on 7/5/2017.
 */

//FETCH DATA ACTION
export const SET_TRANSPLANTS = 'SET_TRANSPLANTS';

export function setTransplants(transplants){
    console.log(transplants);
    return{
        type: SET_TRANSPLANTS,
        transplants
    }

}

export function fetchTransplants(){
    return dispatch => {
        fetch('/data/transplants')
            .then(res => res.json())
            .then(data => dispatch(setTransplants(data.items)));
    }
}

//POST DATA ACTION
export const ADD_TRANSPLANT = 'ADD_TRANSPLANT';
export const TRANSPLANT_DELETED = 'DELETE_TRANSPLANT';
function handleResponse(response){
    if(response.ok){
        return response.json();
    }else{
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function deleteTransplant(id){
   return dispatch => {
        return fetch(`/data/transplants/${id}`, {
            method: 'delete',
            headers:{
                "Content-Type":"application/json"
            }
        }).then((data) => {
            dispatch({type:TRANSPLANT_DELETED, transPlantId:id});
        }).catch((error)=>{
            
        });
    } 
}
export function AddTransplant(transplant){
    console.log(transplant);
    return{
        type: ADD_TRANSPLANT,
        transplant
    }
}

export function SaveTransplant(data){
    return dispatch => {
        return fetch('/data/transplants', {
            method: 'post',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(AddTransplant(data.transplant)));
    }
}




//PUT action
export const UPDATE_TRANSPLANT = 'UPDATE_TRANSPLANT';

export function updateTransplant(item){
    console.log("seed should update");
    console.log(item);
    return{
        type: UPDATE_TRANSPLANT,
        item
    }
}

export function logTransplant(data){
    console.log(data);
    return dispatch => {
        return fetch('data/transplants', {
            credentials: 'same-origin',
            method: 'put',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(updateTransplant(data.item)));
    }
}