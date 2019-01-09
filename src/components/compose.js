import React from 'react';

function Compose({addMessage}) {

  return (
    <form className="form-horizontal well">
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <h4>Compose Message</h4>
        </div>
      </div>

      <div className="form-group">
        <label forhtml="subject" className="col-sm-2 control-label">Subject</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"></input>
        </div>
      </div>

      <div className="form-group">
        <label forhtml="body" className="col-sm-2 control-label">Body</label>
        <div className="col-sm-8">
          <textarea name="body" id="body" className="form-control"></textarea>
        </div>
      </div>

      <div className="form-group">
        <input type="submit" value="Send" className="btn btn-primary" onClick={addMessage}></input>
      </div>
    </form>
  )
}
      
export default Compose