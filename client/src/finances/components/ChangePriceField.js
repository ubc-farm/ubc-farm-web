/**
 * Created by Xingyu on 11/3/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class ChangePriceField extends React.Component {

    constructor(props){
        super(props);
        this.state={
            price: this.props.item.price,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    //need to capture event, and value (1st arg is event, 2nd is value)
    handleChange(e,price){
        this.setState({
            price: price,
        });
        this.props.item.price = price;
        //update subtotal
        this.props.handlePriceQuantityChange();
    }

    render(){
        return(
            <TextField
                id={"unitPrice" + this.props.item._id}
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
                type="number"
            />
        )
    }
}

ChangePriceField.propTypes = {
    item: PropTypes.object.isRequired,
    handlePriceQuantityChange: PropTypes.func.isRequired,
};

export default ChangePriceField;