import React from "react";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { IoArrowBackSharp } from 'react-icons/io5'

const ChatContainer = ({ currentChat }) => {
  const handleSendMsg = async (msg) => {
    
  }
  return (
    <>
      {currentChat && (
        <section
          id='messageContainer'
          className='flex flex-col items-center justify-between min-h-full'
        >
          <div
            id='chat-header'
            className='flex items-center justify-between w-full py-3 px-4 border-emerald-600 shadow-2xl shadow-black bg-slate-950'
          >

            <div className="flex items-center gap-5">
            <div id="back-button">
              <button className="text-emerald-600 font-bold text-xl hover:text-emerald-400 active:text-emerald-300 transition-all">
                <IoArrowBackSharp/>
              </button>
            </div>
            <div
              id='user-details'
              className='flex items-center justify-between px-2 gap-3'
            >
              <div id='avatar' className='rounded-full'>
                <img
                  className='h-8 w-8 text-center rounded-full border-2 border-green-500 '
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt={currentChat.username[0].toUpperCase()}
                />
              </div>
              <div
                id='username'
                className='font-semibold text-xs tracking-wider'
              >
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            </div>

            <div id='logout' className='flex flex-col gap-1 items-center'>
              <div className='bg-red-600 hover:bg-red-500 bg-opacity-50 hover:bg-opacity-60 bg-blend-darken w-[22px] h-[22px] rounded-full text-center transition-all cursor-pointer outline-none border-none active:outline-none active:border-none'>
                <Logout />
              </div>
              <p className='text-[8px] font-bold tracking-widest'>logout</p>
            </div>
          </div>

          <div id="messages" className="h-[70vh] w-full">
          <Messages/>
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </section>
      )}
    </>
  );
};

export default ChatContainer;
