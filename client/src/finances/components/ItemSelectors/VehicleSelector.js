/**
 * Created by Xingyu on 8/24/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem'

/**
 * Select from Equipment
 */
class VehicleSelector extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedItem: {},
        };
        this.handleUpdateInput = this.handleUpdateInput.bind(this);

    };

    handleUpdateInput(value){
        this.setState({
            selectedItem: value,
        });
    };

    render() {
        return (
            <SelectField
                floatingLabelText="Item"
                hintText="Select an Item"
                fullWidth={true}
                value={this.state.selectedItem}
                onChange={this.handleUpdateInput}
            >
                {
                    this.props.vehicles.map((item) => (
                        <MenuItem value={item._id} primaryText={item.name}/>
                    ))
                }
            </SelectField>
        );
    }
}

VehicleSelector.propTypes = {
    vehicles: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        vehicles: state.vehicles,
    }
};

export default connect(mapStateToProps) (VehicleSelector);