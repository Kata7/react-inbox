import React from 'react';

function Messages ({messageList = []}){
  let messageDisplay = messageList.map(message => <Message content={message}/>)

  return (
    <div>
      {messageDisplay}
    </div>
  )
}

function Message ({content}) {
  return (
    <div>
      <p>{content.body}</p>
    </div>
  )
}

export default Messages