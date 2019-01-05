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
  // content: body, id, labels[], subject, starred?, selected?, read?
  let readStatus = content.read ? "read" : "unread"
  let selectedStatus = content.selected ? "selected" : ""
  let starStatus = content.starred ? "fa-star" : "fa-star-o"
  let expandMessage = content.expanded ? <Expand text={content.body}/> : ""

  let tagDisplay = content.labels.map(label => <Tag text={label} />)


  return (
    <div>
      <div className={`row message ${readStatus} ${selectedStatus}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" />
            </div>
            <div className="col-xs-2">
              <i className={`star fa ${starStatus}`}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {tagDisplay}
          <a href="#">{content.subject}</a>
        </div>
      </div>
      {expandMessage}
    </div>
  )
}

function Expand ({text}) {
  return (
    <div class="row message-body">
      <div class="col-xs-11 col-xs-offset-1">
        {text}
      </div>
    </div>
    
  )
}

function Tag ({text}) {
  return (
    <span className="label label-warning">{text}</span>
  )
}

export default Messages