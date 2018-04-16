/**
 * Created by Xingyu on 5/25/2017.
 */
export const selectField = (field) => {
    return{
        type: 'FIELD_SELECTED',
        payload: field
    }
};