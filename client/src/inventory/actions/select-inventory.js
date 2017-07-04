/**
 * Created by Xingyu on 7/4/2017.
 */
export const SELECT_INVENTORY = 'SELECT_INVENTORY';

export function setInventory(index){
    return{
        type: SELECT_INVENTORY,
        index
    }
}

export function selectInventory(index){
    return dispatch => {
        dispatch(setInventory(index));
    }
}