/**
 * Created by Xingyu on 5/29/2017.
 */
function handleResponse(response){
    if(response.ok){
        return response.json();
    }else{
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

export function deleteField(data){
    return function dispatch() {
        return fetch('/data/fields', {
            method: 'delete',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse);
    }
};