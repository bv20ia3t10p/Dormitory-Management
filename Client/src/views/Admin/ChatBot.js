import React, { useEffect, useState } from "react"
import "./ChatBot.css"
import { createNewChat, pingChatbot } from "./ChatBotHelpers"
import {
    IconButton,
    TextField,
    Grid,
    Typography,
    Box,
    Button,
    Skeleton,
    Fab,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import dayjs from "dayjs"
import LiveHelpIcon from "@mui/icons-material/LiveHelp"
import { formatDateStringToVie } from "../../utils/dateLocalizer"
import { useSelector, useDispatch } from "react-redux"
import { storeChat } from "../../redux/funcSlice"
import { selectUserData, selectUserMessages } from "../../redux/funcSlice"

const initCurrentUser = {
    id: -1,
    name: "Guest",
    token: "",
}

const ChatBot = () => {
    //   const [messageSessionList, setMessageSessionList] = useState([]);
    const dispatch = useDispatch()
    const [messageSession, setMessageSession] = useState()
    const [isGettingResponse, setIsGettingResponse] = useState(false)
    const [currentMessage, setCurrentMessage] = useState("")
    const [isChatBotAvailable, setIsChatBotAvailable] = useState(false)
    const [currentUser, setCurrentUser] = useState(initCurrentUser)
    const [chats, setChats] = useState([])
    const [isChatting, setIsChatting] = useState(false)

    const user_data = useSelector(selectUserData)
    const chat_history = useSelector(selectUserMessages)

    useEffect(() => {
        pingChatbot(setIsChatBotAvailable)
        setChats(() => chat_history)
    }, [])
    useEffect(() => {
        setCurrentUser(() => user_data)
    }, [user_data])
    useEffect(() => {
        dispatch(storeChat(chats))
    }, [chats])

    const handleSendChat = (e) => {
        e.preventDefault()
        if (!currentMessage || !currentMessage.length) return
        const lastChatSequence =
            chats && chats.length
                ? chats[chats.length - 1].sequenceInSession
                : 0
        const sequenceInSession = lastChatSequence + 1
        const newChats = [
            {
                type: "user",
                message: currentMessage,
                sequenceInSession,
                timestamp: Math.round(new Date().getTime() / 1000),
            },
            ...chats,
        ]
        setCurrentMessage(() => "")
        setIsGettingResponse(true)
        setChats(() => newChats)
        createNewChat(
            currentUser,
            currentMessage,
            newChats,
            setChats,
            messageSession,
            setMessageSession,
            setIsGettingResponse
        )
    }
    return (
        <>
            <div className='fab-container'>
                <Fab
                    color='info'
                    onClick={() => setIsChatting(() => !isChatting)}
                    aria-label='Chat'
                >
                    <LiveHelpIcon />
                </Fab>
            </div>
            <div
                className={`chatbox__support ${
                    isChatting ? "chatbox--active" : "chatbox--inactive"
                }`}
            >
                <div className='chatbox__header'>
                    <div className='chatbox__image--header'>
                        <img
                            src='https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png'
                            alt='image'
                        />
                    </div>
                    <div className='chatbox__content--header'>
                        <h4 className='chatbox__heading--header'>
                            Hỗ trợ thông minh
                        </h4>
                        <p className='chatbox__description--header'>
                            Xin chào, tôi là trợ lý ảo tôi có thể giúp được gì
                            cho bạn?
                        </p>
                    </div>
                </div>
                <div className='chatbox__messages'>
                    {isGettingResponse && (
                        <div className='messages__item--visitor'>
                            <Skeleton width={"20vw"} height={"8vh"} />
                        </div>
                    )}
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
                                        chat.type !== "bot"
                                            ? " operator"
                                            : " visitor"
                                    }`}
                                >
                                    <Typography variant='caption'>
                                        {formatDateStringToVie(
                                            dayjs(
                                                (chat.timestamp + 7 * 3600) *
                                                    1000
                                            )
                                                .toString()
                                                .replace("GMT", "")
                                        )}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                </div>
                <form onSubmit={handleSendChat} className='chatbox__footer'>
                    <TextField
                        className='input'
                        value={currentMessage}
                        onChange={(e) =>
                            setCurrentMessage(() => e.target.value)
                        }
                        required
                        label={
                            isChatBotAvailable
                                ? "Nhập vào nội dung hỗ trợ"
                                : "Chatbot đang không hoạt động"
                        }
                        variant='outlined'
                        disabled={!isChatBotAvailable}
                    />
                    <Button type='submit' className='chatbox__send--footer'>
                        <SendIcon className='chatbox__send--footer' />
                    </Button>
                </form>
                {/* </div> */}
            </div>
        </>
    )
}

export default ChatBot
