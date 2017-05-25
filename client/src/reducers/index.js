/**
 * Created by Xingyu on 5/25/2017.
 */
import {combineReducers} from 'redux';
import FieldReducer from '../fields/reducers/reducer-fields';
import FieldActionReducer from '../fields/reducers/reducer-fields-actions';

const allReducers = combineReducers({
    fields : FieldReducer,
    selectedField : FieldActionReducer

});

export default allReducers;