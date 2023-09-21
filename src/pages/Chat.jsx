import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { contactUsersRoute } from "../utils/APIRoutes";
import Contact from "../components/Contact";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("tipgramUser")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("tipgramUser")));
        setIsLoaded(true)
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    const checkCurrentUser = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const resp = await axios.get(
            `${contactUsersRoute}/${currentUser._id}`
          );
          setContacts(resp?.data);
          // console.log(resp);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    checkCurrentUser();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  // console.log(contacts);
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center gap-4'>
      <div
        id='container'
        className='h-screen w-screen md:h-[85vh] md:w-[85vw] bg-slate-950 text-white bg-opacity-75 backdrop-blur-xl backdrop-filter md:grid md:grid-cols-3 lg:grid-cols-4 rounded-lg'
      >
        <div className='md:col-span-1 md:overflow-hidden'>
          <Contact
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
        </div>
        <div className=' md:col-span-2 lg:col-span-3 hidden md:block'>
          {isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : ( 
            <ChatContainer currentChat={currentChat} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
