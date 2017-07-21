/**
 * Created by Xingyu on 7/5/2017.
 */

//FETCH DATA ACTION
export const SET_PESTICIDES = 'SET_PESTICIDES';

export function setPesticides(pesticides){
    console.log("set Pesticides!");
    return{
        type: SET_PESTICIDES,
        pesticides
    }

}

export function fetchPesticides(){
    console.log("fetchPesticides called");
    return dispatch => {
        fetch('/data/pesticides')
            .then(res => res.json())
            .then(data => dispatch(setPesticides(data.items)));
    }
}

//POST DATA ACTION
export const ADD_PESTICIDE = 'ADD_PESTICIDE';

function handleResponse(response){
    if(response.ok){
        return response.json();
    }else{
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function AddPesticide(pesticide){
    return{
        type: ADD_PESTICIDE,
        pesticide
    }
}

export function SavePesticide(data){
    console.log(data);
    return dispatch => {
        return fetch('/data/pesticides', {
            method: 'post',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(AddPesticide(data.pesticide)));
    }
}