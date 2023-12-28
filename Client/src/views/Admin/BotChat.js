import React, { useEffect, useState } from "react";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import "./BotChat.css";
import { createNewChat, pingChatbot } from "./ChatBotHelpers";
import {
  IconButton,
  TextField,
  Grid,
  Typography,
  Box,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { max } from "moment";
import { FitScreen } from "@mui/icons-material";
import dayjs from "dayjs";

const initCurrentUser = {
  id: 2,
  name: "Test",
  token: "",
};

const BotChat = () => {
  const [messageSessionList, setMessageSessionList] = useState([]);
  const [messageSession, setMessageSession] = useState();
  const [incomingMessage, setIncomingMessage] = useState("");
  const [isGettingRespponse, setIsGettingRespose] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isChatBotAvailable, setIsChatBotAvailable] = useState(false);
  const [currentUser, setCurrentUser] = useState(initCurrentUser);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    pingChatbot(setIsChatBotAvailable);
  }, []);
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!currentMessage || !currentMessage.length) return;
    const lastChatSequence =
      chats && chats.length ? chats[chats.length - 1].sequenceInSession : 0;
    const sequenceInSession = lastChatSequence + 1;
    const newChats = [
      {
        type: "user",
        message: currentMessage,
        sequenceInSession,
        timestamp: Math.round(new Date().getTime() / 1000),
      },
      ...chats,
    ];
    setChats(() => newChats);
    createNewChat(
      currentUser,
      currentMessage,
      newChats,
      setChats,
      messageSession,
      setMessageSession,
      setIsGettingRespose
    );
  };
  return (
    <div>
      {/* <SidebarAdmin /> */}
      <div className="container">
        <div className="chatbox">
          <div className="chatbox__support chatbox--active">
            <div className="chatbox__header">
              <div className="chatbox__image--header">
                <img
                  src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png"
                  alt="image"
                />
              </div>
              <div className="chatbox__content--header">
                <h4 className="chatbox__heading--header">Chat support</h4>
                <p className="chatbox__description--header">
                  Hi. My name is Sam. How can I help you?
                </p>
              </div>
            </div>
            <div className="chatbox__messages">
              {chats &&
                chats.map((chat, index) => (
                  <div key={index}>
                    <div
                      className={`messages__item ${
                        chat.type !== "bot"
                          ? "messages__item--operator"
                          : "messages__item--visitor"
                      }`}
                    >
                      {chat.message}
                    </div>
                    <div
                      className={`chatTimestamp ${
                        chat.type !== "bot" ? " operator" : " visitor"
                      }`}
                    >
                      <Typography variant="caption">
                        {dayjs((chat.timestamp + 7 * 3600) * 1000)
                          .toString()
                          .replace("GMT", "")}
                      </Typography>
                    </div>
                  </div>
                ))}
            </div>
            <form onSubmit={handleSendChat} className="chatbox__footer">
              <TextField
                className="input"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(() => e.target.value)}
                required
                label={
                  isChatBotAvailable
                    ? "Enter a chat message"
                    : "Chatbot isn't currently available"
                }
                variant="outlined"
                disabled={!isChatBotAvailable}
              />
              <Button type="submit" className="chatbox__send--footer">
                <SendIcon className="chatbox__send--footer" />
              </Button>
            </form>
            {/* </div> */}
          </div>
          <div className="chatbox__button">
            <button>
              <img src="./images/chatbox-icon.svg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotChat;
