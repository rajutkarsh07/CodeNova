import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md ";
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";
import { BsThreeDotsVertical, BsShare, BsBookmark } from "react-icons/bs";
import { GoReport } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import "./DiscussionChat.css";
import DiscussionAnswer from "../../components/DiscussionAnswer/DiscussionAnswer";
import TextField from "@mui/material/TextField";
import utkarsh from "../../assets/utkarsh.jpg";
import axios from "axios";

const DiscussionChat = () => {
  const { slug } = useParams();
  const [open, setOpen] = useState(false);
  const [discussionData, setDiscussionData] = useState({});
  const [messages, setMessages] = useState([]);

  // update this
  const [up, setUp] = useState(0);
  const [down, setDown] = useState(0);
  //
  const openPopup = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  const faltu = () => {
    console.log("");
  };

  // console.log(slug);

  const pageLoad = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/chat/slug`,
        { slug: slug },
        config
      );

      console.log(data.chat[0]);
      setDiscussionData(data.chat[0]);

      const message = await axios.get(
        `http://localhost:5000/api/v1/message/${data.chat[0]._id}`,

        config
      );
      console.log(message);
      setMessages(message.data);
      //   console.log(data[1].content);
      //   setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    pageLoad();
  }, []);

  return (
    <div className="discussion-chat">
      <div className="back-button" onClick={back}>
        <MdArrowBackIos />
      </div>
      <div className="discussion-chat-question">
        <div className="discussion-chat-question-content">
          <h2>{discussionData.chatName ? discussionData.chatName : ""}</h2>
          <p>{discussionData.discription ? discussionData.discription : ""}</p>
          <pre className="discussion-chat-question-code">
            <code>{`${discussionData.code ? discussionData.code : ""}`}</code>
          </pre>
        </div>
        <div className="discussion-chat-question-line"></div>

        <div className="discussion-card-datas">
          <div className="discussion-card-data">
            <div className="discussion-card-upvote" onClick={faltu}>
              <BiUpvote className="discussion-icon" /> <p>{up}</p>
            </div>
            <div className="discussion-card-downvote" onClick={faltu}>
              <BiDownvote className="discussion-icon" /> <p>{down}</p>
            </div>
            <div className="discussion-card-comment">
              <Link
                // to={item ? item.slug : "/"}
                to="/"
                className="discussion-card-comment-link"
              >
                <BiComment className="discussion-icon" />
                <p>4</p>
              </Link>
              <img src={utkarsh} alt="" />
              <img src={utkarsh} alt="" />
              <img src={utkarsh} alt="" />
              <img src={utkarsh} alt="" />
            </div>
          </div>
          {/* {user.data.user.role === "admin" ? (
              <AiTwotoneDelete onClick={handleDelete} />
            ) : (
              ""
            )} */}
          <div className="discussion-card-dropdown" onClick={openPopup}>
            {open ? <RxCross1 /> : <BsThreeDotsVertical />}
            {open && (
              <div className="discussion-dropdown">
                <div>
                  <BsShare /> Share
                </div>
                <div>
                  <BsBookmark /> Bookmark
                </div>
                <div>
                  <GoReport /> Report
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="discussion-answer-self">
        <h3>Your Answer</h3>
        <div>
          <TextField
            id="filled-basic"
            label="Write your answer"
            variant="outlined"
            multiline
            className="discussion-question-input"
          />
          <TextField
            id="filled-multiline-static"
            label="Add code here"
            multiline
            variant="filled"
            className="discussion-question-input"
          />
        </div>
        <Link to="/" className="btn-cta-orange">
          Post Answer
        </Link>
      </div>
      <div className="discussion-chat-comments">
        {messages.length > 0
          ? messages.map((item) => <DiscussionAnswer item={item} />)
          : "Loading..."}

        {/* <DiscussionAnswer />
        <DiscussionAnswer /> */}
      </div>
    </div>
  );
};

export default DiscussionChat;
