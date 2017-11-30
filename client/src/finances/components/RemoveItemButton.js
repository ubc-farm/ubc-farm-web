/**
 * Created by Xingyu on 11/3/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Clear from 'material-ui/svg-icons/content/clear';

class RemoveItemButton extends React.Component{
    render(){
        return(
            <FlatButton
                icon={<Clear color="#000000" />}
                onClick={this.props.onClickHandler(this.props.target)}
            />
        );
    }
}

RemoveItemButton.propTypes = {
    target: PropTypes.object.isRequired,
    onClickHandler: PropTypes.func.isRequired,
};

export default RemoveItemButton;