/*
 **Author: Xingyu Tao
 **Last Updated: 5-16-2017
 **Comments:
 **	Main map component
 */
import React from 'react';
import PropTypes from 'prop-types';

export class MainMapComponent extends React.Component {

    /**
     * Render the component.
     */
    render() {
        const style = {
            width: '100vw',
            height: '100vh'
        }
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <div style={style}>Map will go here</div>
        )
    }

}

export default GoogleApiComponent({
    apiKey: AIzaSyAuYXAZCC6SUTN_Z9A3gJcfWg6Lm_tGx_4
})(Container);
