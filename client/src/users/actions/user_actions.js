/**
 * Created by Xingyu on 8/30/2017.
 */
/**
 * Created by Xingyu on 7/5/2017.
 */
//FETCH DATA ACTION
export const SET_USERS = 'SET_USERS';

export function setUsers(users){
    return{
        type: SET_USERS,
        users
    }

}

export function fetchUsers(){
    console.log("fetch users");
    return dispatch => {
        fetch('/data/users')
            .then(res => res.json())
            .then(data => dispatch(setUsers(data.items)));
    }
}
