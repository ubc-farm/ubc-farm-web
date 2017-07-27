/**
 * Created by Xingyu on 7/27/2017.
 */
//FETCH DATA ACTION
export const SET_SUPPLIERS = 'SET_SUPPLIERS';

export function setSuppliers(suppliers){
    console.log(suppliers);
    return{
        type: SET_SUPPLIERS,
        suppliers
    }

}

export function fetchSuppliers(){
    console.log("fetch suppliers");
    return dispatch => {
        fetch('/data/suppliers')
            .then(res => res.json())
            .then(data => dispatch(setSuppliers(data.items)));
    }
}

//POST DATA ACTION
export const ADD_SUPPLIER = 'ADD_SUPPLIER';

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

export function AddSupplier(supplier){
    return{
        type: ADD_SUPPLIER,
        supplier
    }
}

export function SaveSupplier(data){
    console.log(data);
    return dispatch => {
        return fetch('/data/suppliers', {
            method: 'post',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(AddSupplier(data.supplier)));
    }
}