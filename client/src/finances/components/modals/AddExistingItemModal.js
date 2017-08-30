/**
 * Created by Xingyu on 8/1/2017.
 */
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider'
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle';
import { Link, IndexLink } from 'react-router';
import {fetchSeeds} from '../../../inventory/actions/seeds-get';
import {fetchTransplants} from '../../../inventory/actions/transplant-actions';
import {fetchFertilizers} from '../../../inventory/actions/fertilizer-actions';
import {fetchPesticides} from '../../../inventory/actions/pest-actions';
import {fetchEquipments} from '../../../inventory/actions/equipment-actions';
import {fetchVehicles} from '../../../inventory/actions/vehicles-action';
import {fetchHarvested} from '../../../inventory/actions/harvested_actions';
import {fetchSuppliers} from '../../actions/supplier-actions';
import SelectField from 'material-ui/SelectField';
import EquipmentSelector from '../ItemSelectors/EquipmentSelector';
import FertilizerSelector from '../ItemSelectors/FertilizerSelector';
import HarvestedSelector from '../ItemSelectors/HarvestedSelector';
import PesticideSelector from '../ItemSelectors/PesticideSelector';
import SeedSelector from '../ItemSelectors/SeedSelector';
import TransplantSelector from '../ItemSelectors/TransplantSelector';
import VehicleSelector from '../ItemSelectors/VehicleSelector'

const Selectors = [
    SeedSelector,
    TransplantSelector,
    FertilizerSelector,
    PesticideSelector,
    EquipmentSelector,
    VehicleSelector,
    HarvestedSelector
];



/**
 * Modal for adding existing item to Purchase form
 */
class AddExistingItemModal extends Component {
    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        this.state = {
            selectedInventory: 'Equipment',
            selectedInventoryIndex: 4,
            selectedItem: {},
            selectedSupplier: '',
            price: '',
            quantity: '',
            errors: {},
            open: false,
            validated: false,
            loading: false,
            done: false,

        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInventoryChange = this.handleInventoryChange.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleSupplierChange = this.handleSupplierChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    componentDidMount() {
        //fetch from databases here
        this.props.fetchSeeds();
        this.props.fetchTransplants();
        this.props.fetchFertilizers();
        this.props.fetchPesticides();
        this.props.fetchEquipments();
        this.props.fetchVehicles();
        this.props.fetchHarvested();
        this.props.fetchSuppliers();
    }

    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({
            open: false,
            field: '',
            startDate: {},
            endDate: {},
            description: '',
            type: '',
            multiDay: false,
        });
    };

    /**
     * Functions that handle form input changes
     *
     */

    handleInventoryChange(event, index, value){this.setState({selectedInventoryIndex: value});};
    handleSupplierChange(event, index, value){this.setState({selectedSupplier: value});};

    handleItemChange(item){
        console.log(item);
        this.setState({selectedItem: item});
    };

    handleChange(e){
        if(this.state.errors[e.target.name]){
            console.log("handle error fired");
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                [e.target.name]: e.target.value,
                errors,
            });
        }else{
            this.setState({
                [e.target.name]: e.target.value,
            });

        }

    };


    handleSubmit(e) {
        e.preventDefault();

        //validation
        let errors = {};
        this.setState({errors});

        //if valid, create post request
        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            const newItem = {
                selectedInventoryIndex: this.state.selectedInventoryIndex,
                selectedItem: this.state.selectedItem,
                selectedSupplier: this.state.selectedSupplier,
                price: this.state.price,
                quantity: this.state.quantity,

            };

            this.props.addItem(newItem);
            this.setState({done: true, loading: false});
            this.handleClose();
        }
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label={this.state.loading ? '' : "Submit"}
                primary={true}
                disabled={false}
                onTouchTap={this.handleSubmit}
                icon={this.state.loading ? <CircularProgress /> : ''}
            />,
        ];

        const SelectItem = Selectors[this.state.selectedInventoryIndex];

        return (
            <div key={this.state.timestamp}>
                <div>

                    <RaisedButton label="Add existing Item" primary={true} onTouchTap={this.handleOpen} style={{marginRight: "10px"}}/>

                    <Dialog
                        title="Add Existing Item"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        contentStyle={{width:'100%'}}
                    >
                        <form>
                            <SelectField
                                floatingLabelText="Inventory"
                                hintText="Select Inventory"
                                fullWidth={true}
                                value={this.state.selectedInventoryIndex}
                                onChange={this.handleInventoryChange}
                            >
                                <MenuItem value={0} primaryText="Seeds"/>
                                <MenuItem value={1} primaryText="Transplanting" />
                                <MenuItem value={2} primaryText="Fertilizers"  />
                                <MenuItem value={3} primaryText="Pest Control"  />
                                <MenuItem value={4} primaryText="Equipment" />
                                <MenuItem value={5} primaryText="Vehicles" />
                                <MenuItem value={6} primaryText="Harvested Produce" />
                            </SelectField>

                            <div className="columns">

                                <div className="column">

                                    <SelectItem value={this.state.selectedItem} primaryText={this.state.selectedItem.name} handleItemChange={this.handleItemChange}/>

                                </div>


                                <div className="column">

                                    <SelectField
                                        floatingLabelText="Supplier"
                                        hintText="Select a Supplier"
                                        fullWidth={true}
                                        value={this.state.selectedSupplier}
                                        onChange={this.handleSupplierChange}
                                    >
                                        {
                                            this.props.suppliers.map((item) => (
                                                <MenuItem key={item._id} value={item._id} primaryText={item.name}/>
                                            ))
                                        }
                                    </SelectField>
                                </div>

                            </div>

                            <div className="columns">
                                <div className="column">

                                    <TextField
                                        hintText="Enter Unit Price"
                                        floatingLabelText="Unit Price"
                                        type="number"
                                        name="price"
                                        onChange={this.handleChange}
                                        value={this.state.price}
                                        fullWidth={true}
                                        errorText={this.state.errors.price}/>
                                </div>
                                <div className="column">

                                    <TextField
                                        hintText="Enter Quantity"
                                        floatingLabelText="Quantity"
                                        type="number"
                                        name="quantity"
                                        onChange={this.handleChange}
                                        value={this.state.quantity}
                                        fullWidth={true}
                                        errorText={this.state.errors.quantity}/>

                                </div>
                            </div>



                        </form>
                    </Dialog>

                </div>
            </div>

        );
    }
}

AddExistingItemModal.propTypes = {
    seeds: PropTypes.array.isRequired,
    fetchSeeds: PropTypes.func.isRequired,
    transplants: PropTypes.array.isRequired,
    fetchTransplants: PropTypes.func.isRequired,
    fertilizers: PropTypes.array.isRequired,
    fetchFertilizers: PropTypes.func.isRequired,
    pesticides: PropTypes.array.isRequired,
    fetchPesticides: PropTypes.func.isRequired,
    vehicles: PropTypes.array.isRequired,
    fetchVehicles: PropTypes.func.isRequired,
    harvested: PropTypes.array.isRequired,
    fetchHarvested: PropTypes.func.isRequired,
    equipments: PropTypes.array.isRequired,
    fetchEquipments: PropTypes.func.isRequired,

    suppliers: PropTypes.array.isRequired,
    fetchSuppliers: PropTypes.func.isRequired,

    addItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        seeds: state.seeds,
        transplants: state.transplants,
        fertilizers: state.fertilizers,
        pesticides: state.pesticides,
        vehicles: state.vehicles,
        harvested: state.harvested,
        equipments: state.equipments,

        suppliers: state.suppliers,
        }
};

export default connect(mapStateToProps,{fetchSeeds,fetchTransplants,fetchFertilizers,fetchPesticides,fetchEquipments,fetchVehicles,fetchHarvested, fetchSuppliers})(AddExistingItemModal);
