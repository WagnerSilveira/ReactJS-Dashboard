import React, { Component } from 'react';
import {Line as LineChart} from 'react-chartjs';
import {Panel,Row,Col} from 'react-bootstrap';

class Charts extends Component {

  constructor(props) {
      super(props);
      this.state = {
        months:[],
        views:[]
      }
  }
  componentWillMount() {
    this.getStatistics();
  }
  convertChartPattern(data){
        var _months = [];
        var _views = [];
         data.map( result => {
           _months.push(result.month);
           _views.push(result.views);
        });
        this.setState({months: _months,views: _views});
    }
    getStatistics(){
      return fetch('http://dev.4all.com:3050/pageViews')
            .then((response) => {return response.json()})
            .then((data) => {this.convertChartPattern(data);})
            .catch((err) => {console.log('Fetch Error', err)});
    }
    render() {
          var data = {
              labels: this.state.months,
              datasets: [{
                  data: this.state.views,
                  fillColor : "rgba(48, 164, 255, 0.2)",
      					  strokeColor : "rgba(48, 164, 255, 1)",
      				  	pointColor : "rgba(48, 164, 255, 1)",
      					  pointStrokeColor : "#fff",
      					  pointHighlightFill : "#fff",
      					  pointHighlightStroke : "rgba(48, 164, 255, 1)",
              }]
          };
         var options = {
               responsive:true,
               label: "Site Views",
               scales: {
                   xAxes: [{
                       type: 'linear',
                       position: 'bottom'
                   }]
               }
           };

      return (
        <Row>
          <Col lg={12}>
              <Panel header="Site Traffic Overview">
                  <LineChart data={data} options={options} redraw/>
              </Panel>
          </Col>
        </Row>
      );
  }
}

export default Charts;
