import React, { Component } from 'react';
import {FormGroup,InputGroup,FormControl,Button} from 'react-bootstrap';
import "./Chat.css";

class ChatBody extends Component{
    render(){
        return(
        <div className="panel-body">
            <ul>
             {this.props.children}
            </ul>
        </div>
      )}
}

class Message extends Component{

    render(){
        var image_position= '';
        var text_position='';

        if(this.props.left){
           image_position='pull-left';
           text_position='left'
        }else {
           image_position='pull-right';
           text_position='right';
        }

        return (
           <li className={text_position + " clearfix"}>
              <span className={image_position}>
                <img src={this.props.picture}
                     alt={this.props.username+'\'s picture'}
                     className="img-circle UserPicture" />
              </span>
              <div className="MessageBody">
                  <strong>{this.props.username}</strong>
                  <small>{this.props.time}</small>
                  <p>
                    {this.props.text}
                  </p>
              </div>
          </li>
        )
    }
}

class Chat extends Component {
  constructor(props) {
      super(props);
      this.state = { messages:[], message:""};
      this.handleMessage = this.handleMessage.bind(this);
      this.sendMessage = this.sendMessage.bind(this);
  }
  componentWillMount() {
    this.getMessages();
  }
  getMessages(){
    return fetch('http://dev.4all.com:3050/messages')
          .then((response) => {return response.json()})
          .then((data) => {this.setState({messages:data})})
          .catch((err) => {console.log('Fetch Error', err)});
  }
  handleMessage(event){
     this.setState({message: event.target.value});
  }
  sendMessage(event){
      fetch('http://dev.4all.com:3050/messages',{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                message: this.state.message,
              })
            })
          .then((response) => {
            if(response.status === 201){
              console.log("Message Posted");
            }
            var message = {
                userName:"Eu",
                time: "1 min ago",
                portrait:"img/orange_circle.png",
                message:this.state.message,
                displayPortraitLeft: true
            }

            this.setState({messages:this.state.messages.concat(message)});

          })
          .then((data) => { this.setState({message:""}); })
          .catch((err) => {console.log('Fetch Error', err)});
  }
  render() {
      return (
        <div className="panel panel-default" id="chat_container">
          <div className="panel-heading" id="accordion">
              <i className='fa fa-comments'></i>  Chat
          </div>
          <ChatBody>
            {this.state.messages.map((e,i)=>{
               return  <Message
                            key={i}
                            username={e.userName}
                            picture={e.portrait}
                            time={e.time}
                            left={e.displayPortraitLeft}
                            text={e.message}/>
              })}
          </ChatBody>
          <div className="panel-footer">
            <FormGroup >
                  <InputGroup>
                    <FormControl type="text"
                                  value={this.state.message}
                                  placeholder="Type your message here..."
                                  onChange={this.handleMessage}/>

                      <InputGroup.Button>
                       <Button type="submit"
                         onClick={this.sendMessage}
                         bsStyle="success" >Send</Button>
                     </InputGroup.Button>
                  </InputGroup>
              </FormGroup>
            </div>
  			</div>
      );
  }
}

export default Chat;
