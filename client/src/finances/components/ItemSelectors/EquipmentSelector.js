/**
 * Created by Xingyu on 8/23/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu'
/**
 * Select from Equipment
 */
class EquipmentSelector extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedItem: {},
        };
        this.handleUpdateInput = this.handleUpdateInput.bind(this);

    };

    handleUpdateInput(event, index, value){
        this.setState({
            selectedItem: value
        });
        this.props.handleItemChange(value);
    };

    render() {
        return (
            <TextField
                select
                floatingLabelText="Item"
                hintText="Select an Item"
                fullWidth={true}
                value={this.state.selectedItem}
                onChange={this.handleUpdateInput}
            >
                {
                    this.props.equipments.map((item) => (
                      <MenuItem key={item._id} value={item} primaryText={item.name}/>
                    ))
                }
            </TextField>
        );
    }
}

EquipmentSelector.propTypes = {
    equipments: PropTypes.array.isRequired,
    handleItemChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        equipments: state.equipments,
    }
};

export default connect(mapStateToProps) (EquipmentSelector);