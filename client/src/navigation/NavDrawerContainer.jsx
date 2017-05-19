import React from 'react';
import NavDrawerComponent from './NavDrawerComponent.jsx';


class NavDrawerContainer extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        this.state = {
            activeItem: ''
        };
    }

    /**
     * This method will be executed after initial rendering.
     */
    componentDidMount() {
        this.setState({
            activeItem: this.state.activeItem
        });
    }

    /**
     * Render the component.
     */
    render() {
        return (<NavDrawerComponent secretData={this.state.activeItem} />);
    }

}

export default NavDrawerContainer;