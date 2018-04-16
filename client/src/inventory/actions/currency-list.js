export function getCurrencyList(id){
    return dispatch => {
        return fetch(`http://openexchangerates.org/api/currencies.json`, {
            method: 'get',
            headers:{
                "Content-Type":"application/json"
            }
        }).then((data) => {
            data.json().then(body=>{
                dispatch({type:'SET_CURRENCY',data:body});                
            })

        }).catch((error)=>{
            
        });
    }
}