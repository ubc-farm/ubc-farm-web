/**
 * Created by Xingyu on 7/5/2017.
 */
//FETCH DATA ACTION
export const SET_FERTILIZERS = 'SET_FERTILIZERS';

export function setFertilizers(fertilizers){
    console.log(fertilizers);
    return{
        type: SET_FERTILIZERS,
        fertilizers
    }

}

export function fetchFertilizers(){
    return dispatch => {
        fetch('/data/fertilizers')
            .then(res => res.json())
            .then(data => dispatch(setFertilizers(data.items)));
    }
}

//POST DATA ACTION
export const ADD_FERTILIZER = 'ADD_FERTILIZER';

function handleResponse(response){
    if(response.ok){
        return response.json();
    }else{
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function AddFertilizer(fertilizer){
    return{
        type: ADD_FERTILIZER,
        fertilizer
    }
}

export function SaveFertilizer(data){
    console.log(data);
    return dispatch => {
        return fetch('/data/fertilizers', {
            method: 'post',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(AddFertilizer(data.fertilizer)));
    }
}