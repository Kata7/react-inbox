import React from 'react';

function Messages ({messageList = []}){
  let messageDisplay = messageList.map(message => <Message id={message.id} content={message}/>)

  return (
    <div>
      {messageDisplay}
    </div>
  )
}

function Message ({content}) {
  
  let readStatus = content.read ? "read" : "unread"
  let starStatus = content.starred ? 'y' : 'n'

  return (
    <div className={`row message ${readStatus}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" />
          </div>
          <div className="col-xs-2">
            <i className="star fa fa-star-o"></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <a href="#">{content.subject}</a>
      </div>
    </div>
  )
}

export default Messages