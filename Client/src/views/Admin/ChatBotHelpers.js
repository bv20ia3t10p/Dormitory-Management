export const chatbotUrl = "http://localhost:5000"
// export const chatbotUrl = "https://iampkn2.pythonanywhere.com"
export const pingChatbot = async (setIsChatBotAvailable) => {
    await fetch(chatbotUrl)
        .then((e) => {
            if (e.ok) return e
            else throw new Error("Ping failed")
        })
        .then(() => setIsChatBotAvailable(true))
        .catch(() => setIsChatBotAvailable(() => false))
}

export const createNewChat = async (
    user,
    message,
    chats,
    setChats,
    session,
    setCurrentSession,
    setIsGetttingResponse
) => {
    // Create new session of not exists
    if (!session) {
        await fetch(chatbotUrl + "/sessions/new/" + user.id)
            .then((e) => {
                if (e.ok) return e.json()
                else throw new Error("Session couldn't be created")
            })
            .then(async (e) => {
                setCurrentSession(() => e.sessionId)
                session = e.sessionId
                await createChat(
                    message,
                    session,
                    chats,
                    setChats,
                    setIsGetttingResponse
                )
            })
            .catch((e) => {
                alert(e)
                setIsGetttingResponse(false)
            })
    } else {
        await createChat(
            message,
            session,
            chats,
            setChats,
            setIsGetttingResponse
        )
    }
    // Failed to create// Get sessions
}

const createChat = async (
    message,
    session,
    chats,
    setChats,
    setIsGettingResponse
) => {
    var formdata = new FormData()
    formdata.append("msg", message)
    await fetch(chatbotUrl + "/sessions/" + session, {
        method: "POST",
        body: formdata,
    })
        .then((e) => {
            if (e.ok) return e.json()
            else throw new Error("Failed to chat")
        })
        .then((e) => {
            setChats([e.bot, ...chats])
            setIsGettingResponse(() => false)
        })
        .catch((e) => {
            console.log(e)
            setIsGettingResponse(() => false)
        })
}

const getCurrentUser = () => {}
