/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ currentChat, currentUser, socket, setContacts }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const respMessage = async () => {
      if (currentChat) {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser?._id,
          to: currentChat?._id,
        });
        setMessages(response.data);
      }
    };
    respMessage();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const { data } = await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    console.log("after msg send----->", data);

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
      sender: currentUser._id, // Add sender ID
    });

    // Update local state
    setMessages((prev) => [
      ...prev,
      {
        fromSelf: true,
        message: msg,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  // Fix socket message handling
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (data) => {
        setArrivalMessage({ fromSelf: false, message: data.message });

        setContacts((prev) =>
          prev.map((contact) => {
            if (contact._id === data.sender) {
              return {
                ...contact,
                unreadCount:
                  contact._id === currentChat?._id
                    ? 0
                    : contact.unreadCount + 1,
                lastMessage: {
                  text: data.message,
                  createdAt: new Date().toISOString(),
                },
              };
            }
            return contact;
          })
        );
      });
    }
  }, [currentChat]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({
      behaviour: "smooth",
    });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <section
          id="messageContainer"
          className="flex flex-col items-center justify-between"
        >
          <div
            id="chat-header"
            className="flex items-center justify-between w-full py-3 px-4 border-emerald-600 shadow-2xl shadow-black bg-slate-950"
          >
            <div className="flex items-center gap-5">
              <div id="back-button">
                <button className="text-emerald-600 font-bold text-xl hover:text-emerald-400 active:text-emerald-300 transition-all">
                  <IoArrowBackSharp />
                </button>
              </div>
              <div
                id="user-details"
                className="flex items-center justify-between px-2 gap-3"
              >
                <div id="avatar" className="rounded-full">
                  <img
                    className="h-8 w-8 text-center rounded-full border-2 border-green-500 "
                    src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                    alt={currentChat.username[0].toUpperCase()}
                  />
                </div>
                <div
                  id="username"
                  className="font-semibold text-xs tracking-wider"
                >
                  <h3>{currentChat.username}</h3>
                </div>
              </div>
            </div>

            <div id="logout" className="flex flex-col gap-1 items-center">
              <div className="bg-red-600 hover:bg-red-500 bg-opacity-50 hover:bg-opacity-60 bg-blend-darken w-[22px] h-[22px] rounded-full text-center transition-all cursor-pointer outline-none border-none active:outline-none active:border-none">
                <Logout />
              </div>
              <p className="text-[8px] font-bold tracking-widest">logout</p>
            </div>
          </div>

          <div
            id="messages"
            className="h-[70vh] w-full py-4 px-8 overflow-auto custom-scrollbar"
          >
            <Messages
              messages={messages}
              scrollRef={scrollRef}
              uuidv4={uuidv4}
            />
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </section>
      )}
    </>
  );
};

export default ChatContainer;
