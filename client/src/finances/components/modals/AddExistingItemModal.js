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
import EquipmentSelector from '../ItemSelectors/EquipmentSelector'

const styles = {
    toggle: {
        marginBottom: 16,
    },
};

const inventoriesList = [
    {
        text: 'Seeds',
        value: (
            <MenuItem
                primaryText="Seeds"
            />
        ),
    },
    {
        text: 'Transplanting',
        value: (
            <MenuItem
                primaryText="Transplanting"
            />
        ),
    },
    {
        text: 'Fertilizers',
        value: (
            <MenuItem
                primaryText="Fertilizers"
            />
        ),
    },
    {
        text: 'Pest Control',
        value: (
            <MenuItem
                primaryText="Pest Control"
            />
        ),
    },
    {
        text: 'Equipment',
        value: (
            <MenuItem
                primaryText="Equipment"
            />
        ),
    },
    {
        text: 'Vehicles',
        value: (
            <MenuItem
                primaryText="Vehicles"
            />
        ),
    },
    {
        text: 'Harvested Produce',
        value: (
            <MenuItem
                primaryText="Harvested Produce"
            />
        ),
    },
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
            inventoriesMenuData: inventoriesList,
            itemSelectorMenuData: {},
            selectedInventory: 'Equipment',
            selectedItem: {},
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
    };

    componentDidMount() {
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

    handleInventoryChange(chosenRequest,index){
        this.setState({
            selectedInventory: this.props.inventoriesMenuData[index].text,
        });
    };

    handleItemChange(item){
        this.setState({selectedItem: item});
    };


    handleSubmit(e) {
        e.preventDefault();

        //validation
        let errors = {};
        this.setState({errors});

        //if valid, create post request
        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            const {field,
                type,
                description,
                time,
                multiDay,
                startDate,
                endDate} = this.state;

            this.setState({loading: true});

            this.props.SaveTask({field,
                type,
                description,
                time,
                multiDay,
                startDate,
                endDate}).then(
                (response) => {
                    console.log("should catch error here")
                }
            );
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
                            <div className="columns">

                                <div className="column">

                                </div>


                                <div className="column">


                                    <EquipmentSelector/>

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

};

const mapStateToProps = (state) => {
    return {

        }
};

export default connect(mapStateToProps)(AddExistingItemModal);
