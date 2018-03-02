/**
 * Created by Xingyu on 7/4/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import PropTypes from 'prop-types';

/**
 * THIS IS A NON-FUNCTIONAL, EMPTY TEMPLATE FOR LISTS
 */
class ExampleList extends Component {
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
            fixedHeader: true,

        };

        this.handleToggle = this.handleToggle.bind(this);

    }
    render(){
        return (
            <div>

            </div>
        )
    }
}

SeedList.propTypes = {
    seeds: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        seeds: state.seeds,
    }
};

export default connect(mapStateToProps)(SeedList);