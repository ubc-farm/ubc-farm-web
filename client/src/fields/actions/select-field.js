/**
 * Created by Xingyu on 5/25/2017.
 */
export const selectField = (field) => {
    console.log('you clicked on field: ', field.name);
    return{
        type: 'FIELD_SELECTED',
        payload: field
    }
};