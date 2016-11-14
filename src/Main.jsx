import React, {Component } from 'react';
import {Grid,Row,Col} from 'react-bootstrap';

import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import './Main.css';

class Main extends Component {

  render() {
    return (
      <Grid>
        <Row>
          <Col lg={12}>
            <Dashboard/>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Main;
