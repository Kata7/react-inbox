import React, { Component } from "react";
import "./App.css";
import Toolbar from "./components/toolbar.js"
import Compose from "./components/compose.js"
import Messages from "./components/messages.js"


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      compose: false,
      fetched: false,
      messages: []
    }
  }


  getData() {
    if (this.state.fetched === false) {
      const getUrl = "http://localhost:8082/api/messages"
      fetch(getUrl)
        .then(response => response.json())
        .then((respJson) => {
          for (let message in respJson) {
            let currentMessage = respJson[message]
            currentMessage["selected"] = false
            currentMessage["expanded"] = false
          }
          this.setState({
            messages: respJson,
            fetched: true,
          })
        })
    } else {
      console.log("data is got")
    }
  }


  componentDidMount() {
    this.getData()
  }

  toggleExpand = (e, id) => {
    e.preventDefault()
    let newState = this.state
    newState.messages.forEach(message => {
      if(message.id === id){
        message.expanded = !message.expanded
        message.read = true
        let data = {
          "messageIds": [id],
          "command": "read",
          "read": true
        }
        this.patch(data)
      }
    })
    this.setState(newState)
  }

  toggleCompose = (e) => {
    e.preventDefault()
    let newState = this.state
    newState.compose = !newState.compose
    this.setState(newState)
  }

  toggleSelectAll = () => {
    let newState = this.state
    let selectedCount = newState.messages.filter(message => message.selected === true).length

    if (selectedCount > 0) {
      newState.messages.forEach(message => message.selected = false)
    } else {
      newState.messages.forEach(message => message.selected = true)
    }
    this.setState(newState)
  }

  toggleSelect = (id) => {
    let newState = this.state
    newState.messages.forEach(message => {
      if(message.id === id){
        message.selected = !message.selected
      }
    })
    this.setState(newState)
  }

  toggleStarred = (id) => {
    let newState = this.state
    newState.messages.forEach(message => {
      if(message.id === id){
        message.starred = !message.starred
      }
    })
    let data = {
      "messageIds" : [id],
      "command": "star"
    }
    this.patch(data)
    this.setState(newState)
  }

  markSelectedRead = () => {
    let newState = this.state
    let messageArray = newState.messages.filter(message => message.selected).map(message => message.id)
    newState.messages.forEach(message => {
      if (message.selected) {
        message.read = true
      }
    })
    let data = {
      "messageIds": messageArray,
      "command": "read",
      "read": true
    }
    this.patch(data)
    this.setState(newState)
  }

  markSelectedUnRead = () => {
    let newState = this.state
    let messageArray = newState.messages.filter(message => message.selected).map(message => message.id)
    newState.messages.forEach(message => {
      if (message.selected) {
        message.read = false
      }
    })
    let data = {
      "messageIds": messageArray,
      "command": "read",
      "read": false
    }
    this.patch(data)
    this.setState(newState)
  }

  giveSelectedLabel = (e) => {
    let newLabel = e.target.value
    let newState = this.state
    newState.messages.forEach(message => {
      if (message.selected && !message.labels.includes(newLabel) && newLabel !== "Apply label") {
        message.labels.push(newLabel)
      }
    })
    let messageArray = newState.messages.filter(message => message.selected).map(message => message.id)
    let data ={
      "messageIds": messageArray,
      "command": "addLabel",
      "label": newLabel
    }
    this.patch(data)
    this.setState(newState)
    e.target.value = "Apply label"
  }

  removeSelectedLabel = (e) => {
    let removeLabel = e.target.value
    let newState = this.state
    newState.messages.forEach(message => {
      if (message.selected) {
        let newLabels = message.labels.filter(label => label !== removeLabel)
        message.labels = newLabels
      }
    })

    let messageArray = newState.messages.filter(message => message.selected).map(message => message.id)
    let data = {
      "messageIds": messageArray,
      "command": "removeLabel",
      "label": removeLabel
    }
    this.patch(data)
    this.setState(newState)
    e.target.value = "Remove label"
  }

  deleteSelected = () => {
    let newState = this.state
    let messageArray = newState.messages.filter(message => message.selected).map(message => message.id)
    newState.messages = newState.messages.filter(message => !message.selected)
    let data = {
      "messageIds": messageArray,
      "command": "delete"
    }
    this.patch(data)
    this.setState(newState)
  }

  addMessage = (e) => {
    e.preventDefault()
    let newState = this.state
    let body = document.getElementById('body')
    let subject = document.getElementById('subject')


    let maxID = 1
    newState.messages.forEach(message => {
      if (message.id > maxID) {
        maxID = message.id
      }
    })
    maxID += 1

    let newMessage = {
      body: body.value,
      expanded: false,
      id: maxID,
      labels: [],
      read: false,
      selected: false,
      starred: false,
      subject: subject.value
    }
    newState.messages.push(newMessage)
    newState.compose = false

    const url = 'http://localhost:8082/api/messages';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(newMessage),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {
        console.log('Success:', JSON.stringify(response))
      })
      .catch(error => console.error('Error:', error))

    this.setState(newState)
  }

  patch = (data) => {
    const url = 'http://localhost:8082/api/messages';
    // var data = {
    //   "messageIds": messageArray,
    //   "command": "removeLabel",
    //   "label": removeLabel
    // }

    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
  }


  render() {

    return (
      <div className="container">
        <Toolbar
          messageList={this.state.messages}
          toggleCompose={this.toggleCompose}
          toggleSelectAll={this.toggleSelectAll}
          markSelectedRead={this.markSelectedRead}
          markSelectedUnRead={this.markSelectedUnRead}
          giveSelectedLabel={this.giveSelectedLabel}
          removeSelectedLabel={this.removeSelectedLabel}
          deleteSelected={this.deleteSelected}
        />
        {this.state.compose ?
          <Compose
            addMessage={this.addMessage}
          />
          : ""}
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
