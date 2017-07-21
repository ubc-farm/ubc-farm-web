/**
 * Created by Xingyu on 7/5/2017.
 */
//FETCH DATA ACTION
export const SET_HARVESTED = 'SET_HARVESTED';

export function setHarvested(harvested){
    console.log(harvested);
    return{
        type: SET_HARVESTED,
        harvested
    }

}

export function fetchHarvested(){
    return dispatch => {
        fetch('/data/harvested')
            .then(res => res.json())
            .then(data => dispatch(setHarvested(data.items)));
    }
}

//POST DATA ACTION
export const ADD_HARVESTED = 'ADD_HARVESTED';

function handleResponse(response){
    if(response.ok){
        return response.json();
    }else{
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function AddHarvested(harvested){
    return{
        type: ADD_HARVESTED,
        harvested
    }
}

export function SaveHarvested(data){
    console.log(data);
    return dispatch => {
        return fetch('/data/harvested', {
            method: 'post',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(AddHarvested(data.harvested)));
    }
}