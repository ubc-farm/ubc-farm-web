/**
 * Created by Xingyu on 7/24/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';

class FinancesPage extends React.Component{

    // Constructor is responsible for setting up props and setting initial state
    constructor(props){
        // Pass props to the parent component
        super(props);
        // Set initial state
        this.state = {
            // State needed
            activeTab: 'summary',
            fields: [],
            tasks:[],
            value: 'test value',
        };

        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    componentDidMount(){
        //fetch from databases here

    }

    handleMenuClick(e, { name }){
        this.setState({ activeTab: name });
    }

    render(){
        return(
            <div>
                <Tabs>
                    <Tab label="Summary">
                        Summary should appear here
                    </Tab>
                    <Tab label="New Invoice">
                        Invoices here
                    </Tab>
                    <Tab label="New Purchase Order">
                        Purchases here
                    </Tab>
                </Tabs>
            </div>
        )
    }

}

FinancesPage.propTypes = {

};

const mapStateToProps = (state) => {
    return{

    }
};

export default connect(mapStateToProps, {})(FinancesPage);