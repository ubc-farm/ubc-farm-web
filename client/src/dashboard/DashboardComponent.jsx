/*
**Author: Xingyu Tao
**Last Updated: 5-15-2017
**Comments: 
**	dashboard presentation component 
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';


const DashboardComponent = ({ secretData }) => (
  <Card className="container">
    <CardTitle
      title="Dashboard"
      subtitle="You should get access to this page only after authentication."
    />

    {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}
  </Card>
);

DashboardComponent.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default DashboardComponent;