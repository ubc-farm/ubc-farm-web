/**
 * Created by Xingyu on 8/23/2017.
 */
//FETCH DATA ACTION
export const SET_PURCHASE = 'SET_PURCHASE';

export function setPurchase(purchases){
    console.log(purchases);
    return{
        type: SET_PURCHASE,
        purchases
    }

}

export function fetchPurchases(){
    console.log("fetch purhcase s");
    return dispatch => {
        fetch('/data/purchases')
            .then(res => res.json())
            .then(data => dispatch(setPurchase(data.items)));
    }
}

//POST DATA ACTION
export const ADD_PURCHASE = 'ADD_PURCHASE';

function handleResponse(response){
    console.log(response.json);
    if(response.ok){
        return response.json();
    }else{
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function AddPurchase(purchase){
    return{
        type: ADD_PURCHASE,
        purchase
    }
}

export function SavePurchase(data){
    console.log(data);
    return dispatch => {
        return fetch('/data/purchases', {
            method: 'post',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(AddPurchase(data.purchase)));
    }
}