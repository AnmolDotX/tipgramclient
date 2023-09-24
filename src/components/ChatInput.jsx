import React, { useEffect, useState } from "react";
import Picker from "emoji-picker-react";
import { IoSendSharp } from "react-icons/io5";
import { LuSmilePlus } from "react-icons/lu";

const ChatInput = ({handleSendMsg}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("")

  // console.log(msg);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleEmojiClick = (event, emojiObject) => {
    // console.log("emojiObject", emojiObject);
    // console.log("event", event);
    setMsg((prevMsg) => prevMsg + event.emoji);
  }

  const sendChat = (e) => {
    e.preventDefault()
    if(msg.length > 0) {
      handleSendMsg(msg);
      setMsg('')
    }
  }

  
  return (
    <section className=' w-full flex items-center py-3 px-2 bg-slate-950 shadow-emerald-600'>
      <div id='button-container'>
        <div id='emoji' className="cursor-pointer text-slate-100 text-xl hover:text-sky-500 active:text-yellow-400 transition-all bg-slate-950 md:py-2 lg:py-[10px] md:px-3 lg:px-4 rounded-s-full">
          <LuSmilePlus onClick={handleEmojiPickerHideShow} />
          {
            showEmojiPicker && <div className="-mt-[500px] absolute transition-all ease-in-out duration-300 "><Picker  emojiStyle="facebook" theme="dark" onEmojiClick={handleEmojiClick}/></div>
          }
        </div>
      </div>
      <form className='grid-cols-4 w-full flex items-center' onSubmit={(e)=>sendChat(e)}>
        <input
          className='col-span-3 text-slate-200 bg-slate-900 w-full md:py-[6px] px-3 lg:py-2 lg:px-5 outline-none border-none active:outline-none active:border-none focus:outline-none focus:border-none'
          onChange={(e)=>setMsg(e.target.value)}
          type='text'
          placeholder='type your message here...'
          value={msg}
        />
        <button type='submit' className='col-span-1 bg-emerald-700 bg-opacity-70 backdrop-filter backdrop-blur-lg md:py-[10px] md:px-3 lg:py-3 lg:px-4 rounded-e-full active:bg-emerald-800'>
          <IoSendSharp />
        </button>
      </form>
    </section>
  );
};

export default ChatInput;
