/**
 * Created by Xingyu on 5/26/2017.
 */
export function fetchFields(){
    return dispatch => {
        fetch('/data/fields');
    }
}
