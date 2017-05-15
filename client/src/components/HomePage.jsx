/*
**Author: Xingyu Tao
**Last Updated: 5-15-2017
**Comments: 
**	homepage presentation component
*/
import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';


const HomePage = () => (
  <Card className="container">
    <CardTitle title="React Application" subtitle="This is the home page." />
  </Card>
);

export default HomePage;