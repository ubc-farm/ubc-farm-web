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
class TransplantSelector extends Component {

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
                    this.props.transplants.map((item) => (
                        <MenuItem value={item._id} primaryText={item.name}/>
                    ))
                }
            </SelectField>
        );
    }
}

TransplantSelector.propTypes = {
    transplants: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        transplants: state.transplants,
    }
};

export default connect(mapStateToProps) (TransplantSelector);