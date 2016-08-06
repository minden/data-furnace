import React from 'react';
import { Jumbotron, Grid } from 'react-bootstrap';

const LandingPage = () => {
  return (
    <Grid bsClass="container" >
      <Jumbotron className="text-center" >
        <h1>
          Welcome to <span style={{ color: '#DE4646' }}>
            <i className="fa fa-fire" /> DataFurnace</span>
        </h1>
      </Jumbotron>
    </Grid>
  );
};

export default LandingPage;
