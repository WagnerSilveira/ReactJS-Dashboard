import React, { Component } from 'react';
import {PageHeader,Grid,Row,Col} from 'react-bootstrap';
import Widgets from './Components/Widgets/Widgets.jsx';
import Charts from './Components/Charts.jsx';
import Chat from './Components/Chat/Chat.jsx';

class Dashboard extends Component {

  render() {
      return (
        <Grid>
            <Row className='remove-padding'>
              <PageHeader>Dashboard</PageHeader>
            </Row>
            <Widgets/>
            <Charts/>
            <Row>
              <Col md={8}>
                <Chat/>
              </Col>
            </Row>
        </Grid>
      );
  }
}

export default Dashboard;
