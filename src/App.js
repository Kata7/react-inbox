import React, { Component } from "react";
import "./App.css";
import Toolbar from "./components/toolbar.js"
import Compose from "./components/compose.js"
import Messages from "./components/messages.js"


class App extends Component {
  state = {
    fetched: false
  }

  getData() {
    // pull data from server and save it to state
    if (this.state.fetched === false) {
      console.log("getting data")
      const getUrl = "http://localhost:8082/api/messages"
      fetch(getUrl)
      .then(response => response.json())
      .then((respJson) => {
        this.setState({
            messages: respJson,
            fetched: true
          })
      })
    } else {
      console.log("data is got")
    }
  }

  render() {

    this.getData()

    return (
      <div className="App">
        <h1>{ this.state.fetched ? "done":"loading..."}</h1>
        <Toolbar />
        <Compose />
        <Messages messageList={this.state.messages}/>
      </div>
    );
  }
}

export default App;
