import React from 'react';
import {Panel,Row,Col} from 'react-bootstrap';
import "./Widgets.css";

class WidgetStructure extends React.Component {

  render() {
      return (
        <Panel className={"WidgetPanel"}>
            <Row className="remove-padding">
                <Col sm={3} lg={5} className={"WidgetIcon " +this.props.color}>
                    <i className={"fa "+this.props.icon} aria-hidden="true"></i>
                </Col>
                <Col sm={9} lg={7} className="WidgetData">
                   <div className='WidgetValue'>{this.props.value}</div>
                   <div className="WidgetLabel">{this.props.label}</div>
                </Col>
            </Row>
        </Panel>
      );
  }
}


class Widgets extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          statistics:{}
      }
  }
  componentWillMount() {
    this.getWidgetData();
  }
  getWidgetData(){
    return fetch('http://dev.4all.com:3050/widgets')
          .then((response) => {return response.json()})
          .then((data) => {this.setState({statistics:data})})
          .catch((err) => {console.log('Fetch Error', err)});
  }
  kFormatter(num) {
    return num > 999 ? (num/1000).toFixed(1) + 'k' : num;
  }
  render() {
      return (
        <Row>
          <Col xs={12} md={6} lg={3}>
            <WidgetStructure
              color={"Blue"}
              icon={"fa-shopping-bag"}
              value={this.state.statistics.newOrders}
              label={"New Orders"}/>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <WidgetStructure
              color={"Orange"}
              icon={"fa-comment-o"}
              value={this.state.statistics.comments}
              label={"Comments"}/>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <WidgetStructure
              color={"Teal"}
              icon={"fa-user"}
              value={this.state.statistics.newUsers}
              label={"New Users"}/>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <WidgetStructure
              color={"Red"}
              icon={"fa-bar-chart"}
              value={this.kFormatter(this.state.statistics.pageViews)}
              label={"Page Views"}/>
          </Col>
        </Row>
      );
  }
}

export default Widgets;
