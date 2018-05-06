/**
 * Created by Xingyu on 5/25/2017.
 */
import {combineReducers} from 'redux';
import FieldReducer from '../fields/reducers/reducer-fields';
import FieldActionReducer from '../fields/reducers/reducer-fields-actions';
import TaskReducer from '../tasks/reducers/';
import species from '../reports/reducers/species';
import FieldTaskReducer from '../fields/reducers/FieldTasksReducer';
import SeedReducer from '../inventory/reducers/seeds'
import ActiveInventoryReducer from '../inventory/reducers/active_inventory'
import TransplantReducer from '../inventory/reducers/transplants'
import FertilizerReducer from '../inventory/reducers/fertilizers'
import EquipmentReducer from '../inventory/reducers/equipment'
import VehilcleReducer from '../inventory/reducers/vehicles'
import HarvestedReducer from '../inventory/reducers/harvested'
import PesticideReducer from '../inventory/reducers/pest-control'
import SupplierReducer from '../finances/reducers/supplier-reducer'
import UserReducer from '../users/reducers/user_reducer'
import currency from '../inventory/reducers/currency'

const allReducers = combineReducers({
    fields : FieldReducer,
    selectedField : FieldActionReducer,
    tasks : TaskReducer,
    fieldTasks : FieldTaskReducer,
    seeds: SeedReducer,
    active_inventory: ActiveInventoryReducer,
    transplants: TransplantReducer,
    fertilizers: FertilizerReducer,
    pesticides: PesticideReducer,
    equipments: EquipmentReducer,
    vehicles: VehilcleReducer,
    harvested: HarvestedReducer,
    suppliers: SupplierReducer,
    users: UserReducer,
    species,
    currency
});

export default allReducers;