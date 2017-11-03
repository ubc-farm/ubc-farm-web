/**
 * Created by Xingyu on 11/3/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class ChnageQuantityField extends React.Component {

    constructor(props){
        super(props);
        this.state={
            quantity: this.props.item.quantity,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    //need to capture event, and value (1st arg is event, 2nd is value)
    handleChange(e,quantity){
        this.setState({
            quantity: quantity,
        });
        this.props.item.quantity = quantity;
        //update subtotal
        this.props.handlePriceQuantityChange();

    }

    render(){
        return(
            <TextField
                id={"quantity" + this.props.item._id}
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
                type="number"
            />
        )
    }
}

ChnageQuantityField.propTypes = {
    item: PropTypes.object.isRequired,
    handlePriceQuantityChange: PropTypes.func.isRequired,
};

export default ChnageQuantityField;
