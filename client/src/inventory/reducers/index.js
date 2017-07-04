/**
 * Created by Xingyu on 7/4/2017.
 */
/**
 *COMBINED REDUCER FOR INVENTORY
 **/
import {combineReducers} from 'redux';
import SeedReducer from './seeds';

const inventory = combineReducers({
    seeds: SeedReducer
});

export default inventory;