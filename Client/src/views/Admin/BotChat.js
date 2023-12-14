import React from 'react'
import SidebarAdmin from '../Sidebar/SidebarAdmin';
import './BotChat.css'
const BotChat = () => {
  return (
    <div>
         <SidebarAdmin />
        <div class="container">
            <div class="chatbox">
                <div class="chatbox__support chatbox--active">
                    <div class="chatbox__header">
                        <div class="chatbox__image--header">
                            <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image"/>
                        </div>
                        <div class="chatbox__content--header">
                            <h4 class="chatbox__heading--header">Chat support</h4>
                            <p class="chatbox__description--header">Hi. My name is Sam. How can I help you?</p>
                        </div>
                    </div>
                    <div class="chatbox__messages">
                        <div></div>
                    </div>
                    <div class="chatbox__footer">
                        <input type="text" placeholder="Write a message..."/>
                        <button class="chatbox__send--footer send__button">Send</button>
                    </div>
                </div>
                <div class="chatbox__button">
                    <button><img src="./images/chatbox-icon.svg" /></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BotChat