import "../../../src/chats.css";
const UserChatComponent = () => {
  return (
    <>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        <i className="bi bi-chat-dots comment"></i>
        <i className="bi bi-x-circle cross"></i>
      </label>
      <div className="chat-wrapper">
        <div className="chat-header">
          <h6>Let's Chat - Online</h6>
        </div>
        <div className="chat-form p-2">
          <div className="cht-msg p-2">
            {Array.from({ length: 10 }).map((_, id) => (
              <div key={id}>
                <div className="you ms-5">
                  <div className="client">you:</div>
                  <div>hello this is client</div>
                </div>
                <div className="team mt-1">
                  <div className="support">team:</div>
                  <div>what can we do for you?,sir</div>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-us">
            <textarea
              id="ClientChatMsg"
              placeholder="Your Text Message"
              className="form-control"
            ></textarea>
            <button className="btn btn-success btn-block">send</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserChatComponent;
