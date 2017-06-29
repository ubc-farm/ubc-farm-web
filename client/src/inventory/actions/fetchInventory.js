/**
 * Created by Xingyu on 6/28/2017.
 */
export const SET_INVENTORY = 'SET_INVENTORY';

export function setInventory(inventoryItems){
    console.log(inventoryItems);
    return{
        type: SET_INVENTORY,
        fields
    }

}

export function fetchInventory(){
    return dispatch => {
        fetch('/data/inventory')
            .then(res => res.json())
            .then(data => dispatch(setInventory(data.inventory)));
    }
}
