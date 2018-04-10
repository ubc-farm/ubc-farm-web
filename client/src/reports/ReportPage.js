/**
 * Created by Xingyu on 8/30/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


const styles = {

};

class ReportPage extends React.Component{

    componentDidMount() {
        console.log("reports page finished mounting");
    }

    constructor(props){
        super(props);
        this.state = {

        }
    };

    render(){
        return (
        <div className="pageDiv" style={{margin: '10px'}}>
            <div className="title is-3"> Reports Page </div>
        </div>
        );
    }
}

ReportPage.propTypes = {

};

const mapStateToProps = (state) => {
    return {

    }
};

export default connect(mapStateToProps, {}) (ReportPage);