import React from 'react';

function Toolbar({toggleCompose, messageList, toggleSelectAll, markSelectedRead, markSelectedUnRead, giveSelectedLabel, removeSelectedLabel}) {

  const unreadCount = messageList.filter(message => message.read === false).length
  const messageCount = messageList.length
  const selectedCount = messageList.filter(message => message.selected === true).length
  let selectionDisplay
  let buttonDisplay

  if (messageCount === selectedCount) {
    selectionDisplay = "fa-check-square-o"
    buttonDisplay = false
  } else if (selectedCount > 0) {
    selectionDisplay = "fa-minus-square-o"
    buttonDisplay = false
  } else {
    selectionDisplay = "fa-square-o"
    buttonDisplay = true
  }
  
  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unreadCount}</span>
          unread messages
        </p>

        <a className="btn btn-danger" href="/#" onClick={toggleCompose}>
          <i className="fa fa-plus"></i>
        </a>

        <button className="btn btn-default" onClick={toggleSelectAll}>
          <i className={`fa ${selectionDisplay}`}></i>
        </button>

        <button className="btn btn-default" onClick={markSelectedRead} disabled={buttonDisplay}>Mark As Read</button>

        <button className="btn btn-default" onClick={markSelectedUnRead} disabled={buttonDisplay}>Mark As Unread</button>

        <select className="form-control label-select" disabled={buttonDisplay} onChange={giveSelectedLabel}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" disabled={buttonDisplay} onChange={removeSelectedLabel}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" disabled={buttonDisplay}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}

export default Toolbar