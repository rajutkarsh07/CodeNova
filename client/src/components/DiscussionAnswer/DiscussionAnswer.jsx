import { React, useState } from "react";
import utkarsh from "../../assets/utkarsh.jpg";
import { BiUpvote, BiDownvote, BiCopy } from "react-icons/bi";
import "./DiscussionAnswer.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DiscussionAnswer = () => {
  const [up, setUp] = useState(0);
  const [down, setDown] = useState(0);

  const copyBoard = () => {
    navigator.clipboard.writeText(this.state.textToCopy);
  };

  const copyClipboard = (event) => {
    e.preventDefault();

    navigator.clipboard.writeText(event.target.textContent);

    toast.success("Data copied!", {
      autoClose: 2000,
    });
  };

  // const copyClipboard = (e, data) => {
  //   e.preventDefault();
  //   console.log("hello");
  //   navigator.clipboard.writeText(data);
  //   toast.success("Data copied!", {
  //     autoClose: 2000,
  //   });
  // };

  return (
    <div className="discussion-answer">
      <div className="discussion-answer-text">
        <p>
          Just add this CSS content into your CSS file. It will automatically
          center the content. Align horizontally to center in CSS:
        </p>
      </div>

      <pre
        className="discussion-chat-question-code"
        onClick={(e) => {
          e.preventDefault();
          navigator.clipboard.writeText(event.target.textContent);
          toast.success("Text copied!", {
            autoClose: 1000,
          });
        }}
      >
        <code>{`#outer {
        display: flex;
        justify-content: center; 
        align-items: center;
 }`}</code>
        <BiCopy className="copy-icon" />
      </pre>

      <div className="discussion-answer-details">
        <div>
          <img src={utkarsh} alt="utkarsh" />
          <p>Utkarsh Raj</p>
        </div>
        <div className="discussion-answer-details-date">
          <p>posted on May 11, 2020 at 21:57</p>
        </div>
      </div>
      <div className="discussion-answer-line"></div>
      <div className="discussion-answer-data">
        <div className="discussion-card-upvote">
          <BiUpvote className="discussion-icon" /> <p>{up}</p>
        </div>
        <div className="discussion-card-downvote">
          <BiDownvote className="discussion-icon" /> <p>{down}</p>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default DiscussionAnswer;