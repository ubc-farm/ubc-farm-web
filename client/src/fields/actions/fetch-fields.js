/**
 * Created by Xingyu on 5/26/2017.
 */
export const SET_FIELDS = 'SET_FIELDS';

export function setFields(fields){
    console.log(fields);
    return{
        type: SET_FIELDS,
        fields
    }

}

export function fetchFields(){
    return dispatch => {
        fetch('/data/fields')
            .then(res => res.json())
            .then(data => dispatch(setFields(data.fields)));
    }
}
