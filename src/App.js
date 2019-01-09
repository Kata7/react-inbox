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
    this.toggleSelectAll = this.toggleSelectAll.bind(this)
    this.toggleSelect = this.toggleSelect.bind(this)
    this.toggleStarred = this.toggleStarred.bind(this)
    this.markSelectedRead = this.markSelectedRead.bind(this)
    this.markSelectedUnRead = this.markSelectedUnRead.bind(this)
    this.giveSelectedLabel = this.giveSelectedLabel.bind(this)
    this.removeSelectedLabel = this.removeSelectedLabel.bind(this)
    this.deleteSelected = this.deleteSelected.bind(this)
    this.addMessage = this.addMessage.bind(this)


    this.state = {
      compose: false,
      fetched: false,
      messages: []
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
    // id formatted as "subject7"
    let index = Number(e.target.id.slice(7)) - 1
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

  toggleSelectAll() {
    let newState = this.state
    let selectedCount = newState.messages.filter(message => message.selected === true).length

    if (selectedCount > 0) {
      newState.messages.forEach(message => message.selected = false)
    } else {
      newState.messages.forEach(message => message.selected = true)
    }
    this.setState(newState)
  }

  toggleSelect(e) {
    // id formatted as "checkbox8"
    console.log(e.target)
    let index = Number(e.target.id.slice(8)) - 1
    let newState = this.state
    newState.messages[index].selected = !newState.messages[index].selected
    this.setState(newState)
  }

  toggleStarred(e) {
    // id formatted as "star4"
    let index = Number(e.target.id.slice(4)) - 1
    let newState = this.state
    newState.messages[index].starred = !newState.messages[index].starred
    this.setState(newState)
  }

  markSelectedRead() {
    let newState = this.state
    newState.messages.forEach(message => {
      if(message.selected) {
        message.read = true
      }
    })
    this.setState(newState)
  }

  markSelectedUnRead() {
    let newState = this.state
    newState.messages.forEach(message => {
      if(message.selected) {
        message.read = false
      }
    })
    this.setState(newState)
  }

  giveSelectedLabel(e) {
    let newLabel = e.target.value
    let newState = this.state
    newState.messages.forEach(message => {
      if(message.selected && !message.labels.includes(newLabel) && newLabel !== "Apply label") {
        message.labels.push(newLabel)
      }
    })
    this.setState(newState)
    e.target.value = "Apply label"
  }

  removeSelectedLabel(e) {
    let removeLabel = e.target.value
    let newState = this.state
    newState.messages.forEach(message => {
      if(message.selected) {
        let newLabels = message.labels.filter(label => label !== removeLabel)
        message.labels = newLabels
      }
    })
    this.setState(newState)
    e.target.value = "Remove label"
  }

  deleteSelected() {
    let newState = this.state
    newState.messages = newState.messages.filter(message => !message.selected)
    newState.messages.forEach((message, index) => {
      message.id = index + 1
    })
    this.setState(newState)
  }

  addMessage(e) {
    e.preventDefault()
    console.log('yeet')
    let body = document.getElementById('body')
    let subject = document.getElementById('subject')
    let newMessage = {
      body: body.value,
      expanded: false,
      id: this.state.messages.length + 1,
      labels: [],
      read: false,
      selected: false,
      starred: false,
      subject: subject.value
    }
    let newState = this.state
    newState.messages.push(newMessage)
    newState.compose = false
    this.setState(newState)
  }


  render() {

    return (
      <div className="container">
        <h1>{ this.state.fetched ? "done":"loading..."}</h1>
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
