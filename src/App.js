import React, { Component } from "react";
import "./App.css";
import Toolbar from "./components/toolbar.js"
import Compose from "./components/compose.js"
import Messages from "./components/messages.js"


class App extends Component {

  constructor(props) {
    super(props)
    this.toggleExpand = this.toggleExpand.bind(this)
    this.toggleCompose = this.toggleCompose.bind(this)
    this.toggleSelect = this.toggleSelect.bind(this)
    this.toggleStarred = this.toggleStarred.bind(this)

    this.state = {
      fetched: false,
      messages: [],
      compose: false
    }
  }


  getData() {
    // pull data from server and save it to state
    if (this.state.fetched === false) {
      console.log("getting data")
      const getUrl = "http://localhost:8082/api/messages"
      fetch(getUrl)
      .then(response => response.json())
      .then((respJson) => {

        for (let message in respJson) {
          let currentMessage= respJson[message]
          currentMessage['selected'] = currentMessage['selected'] || false
          currentMessage['expanded'] = currentMessage['expanded'] || false
        }
        this.setState({
            messages: respJson,
            fetched: true
          })
      })
    } else {
      console.log("data is got")
    }
  }

  
  componentDidMount() {
    this.getData()
  }

  toggleExpand(e) {
    e.preventDefault()
    let index = e.target.className - 1
    let newState = this.state
    newState.messages[index].expanded = !newState.messages[index].expanded
    newState.messages[index].read = true
    this.setState(newState)
  }

  toggleCompose(e) {
    e.preventDefault()
    let newState = this.state
    newState.compose = !newState.compose
    this.setState(newState)
  }

  toggleSelect(e) {
    // id formatted as "checkbox8"
    let index = e.target.id[8] - 1
    let newState = this.state
    newState.messages[index].selected = !newState.messages[index].selected
    this.setState(newState)
  }

  toggleStarred(e) {
    // id formatted as "star4"
    let index = e.target.id[4] - 1
    let newState = this.state
    newState.messages[index].starred = !newState.messages[index].starred
    this.setState(newState)
  }


  render() {

    return (
      <div className="container">
        <h1>{ this.state.fetched ? "done":"loading..."}</h1>
        <Toolbar 
          messageList={this.state.messages} 
          toggleCompose={this.toggleCompose}
        />
        {this.state.compose ? 
          <Compose 
            status={this.state.compose}/>
            :""}
        <Messages 
          messageList={this.state.messages} 
          toggleExpand={this.toggleExpand}
          toggleSelect={this.toggleSelect}
          toggleStarred={this.toggleStarred}
        />
      </div>
    );
  }
}

export default App;
