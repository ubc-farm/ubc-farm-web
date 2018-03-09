/**
 * Created by Xingyu on 7/4/2017.
 */
export const SEED_DELETED = "SEED_DELETED";
export function deleteSeed(id){
    return dispatch => {
        return fetch(`/data/seeds/${id}`, {
            method: 'delete',
            headers:{
                "Content-Type":"application/json"
            }
        }).then((data) => {
            dispatch(seedDeleted(id));
        }).catch((error)=>{
            
        });
    }
}


function seedDeleted(id){
	return {
		type:SEED_DELETED,
		seedId:id
	}
}