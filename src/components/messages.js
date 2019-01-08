import React from 'react';

function Messages ({messageList = [], toggleExpand, toggleSelect, toggleStarred}){
  let messageDisplay = messageList.map(message => 
    <Message id={message.id} 
      content={message} 
      key={`message ${message.id}`} 
      toggleExpand={toggleExpand} 
      toggleSelect={toggleSelect}
      toggleStarred={toggleStarred}
    />)

  return (
    <div>
      {messageDisplay}
    </div>
  )
}

function Message ({content, toggleExpand, toggleSelect, toggleStarred}) {
  // content: body, id, labels[], subject, starred?, selected?, read?, expanded?
  let readStatus = content.read ? "read" : "unread"
  let selectedStatus = content.selected ? "selected" : ""
  let starStatus = content.starred ? "fa-star" : "fa-star-o"
  
  let expandMessage = content.expanded ? <Expand text={content.body}/> : ""

  let tagDisplay = content.labels.map((label, index) => <Tag text={label} key={`message ${content.id} tag ${index}`}/>)

  return (
    <div>
      <div className={`row message ${readStatus} ${selectedStatus}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" onClick={toggleSelect} id={`checkbox${content.id}`} checked={content.selected}/>
            </div>
            <div className="col-xs-2">
              <i className={`star fa ${starStatus}`} id={`star${content.id}`} onClick={toggleStarred}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {tagDisplay}
          <a href="/#" className={content.id} onClick={toggleExpand}>{content.subject}</a>
        </div>
      </div>
      {expandMessage}
    </div>
  )
}

function Expand ({text}) {
  return (
    <div className="row message-body">
      <div className="col-xs-11 col-xs-offset-1">
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