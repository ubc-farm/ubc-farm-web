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
class SeedSelector extends Component {

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
            <SelectField
                floatingLabelText="Item"
                hintText="Select an Item"
                fullWidth={true}
                value={this.state.selectedItem}
                onChange={this.handleUpdateInput}
            >
                {
                    this.props.seeds.map((item) => (
                        <MenuItem key={item._id} value={item} primaryText={item.name}/>
                    ))
                }
            </SelectField>
        );
    }
}

SeedSelector.propTypes = {
    seeds: PropTypes.array.isRequired,
    handleItemChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        seeds: state.seeds,
    }
};

export default connect(mapStateToProps) (SeedSelector);