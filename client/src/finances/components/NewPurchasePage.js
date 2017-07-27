/**
 * Created by Xingyu on 7/24/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Divider from 'material-ui/Divider';

class NewPurchasePage extends React.Component {
    componentDidMount(){

    }

    constructor(props){
        super(props);
        this.state={

        };

    }

    render(){
        return(
        <div>
            <div className="columns">
            </div>
            <div id="order_items_table">

            </div>

        </div>

        )
    };
}

NewPurchasePage.propTypes = {

};

const mapStateToProps = (state) => {

};

export default connect(mapStateToProps,{})(NewPurchasePage);

