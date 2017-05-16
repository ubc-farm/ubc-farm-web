/*
**Author: Xingyu Tao
**Last Updated: 5-16-2017
**Comments: 
**	dashboard presentation component 
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';


const Fields = ({ secretData }) => (
  <Card className="container">
    <CardTitle
      title="Fields"
      subtitle="Create, save, edit fields"
    />
  </Card>
);

Fields.propTypes = {
  
};

export default Fields;