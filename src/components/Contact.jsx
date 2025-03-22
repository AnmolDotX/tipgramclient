/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import { markAsRead } from "../utils/APIRoutes";

const Contact = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [selectedCurrentUser, setSelectedCurrentUser] = useState(undefined);
  const [userAvatarError, setUserAvatarError] = useState(false);
  const [currentUserAvatarError, setCurrentUserAvatarError] = useState(false);
  const [sortedContacts, setSortedContacts] = useState([]);

  useEffect(() => {
    const sorted = [...contacts].sort((a, b) => {
      const aTime = a.lastMessage?.createdAt || 0;
      const bTime = b.lastMessage?.createdAt || 0;
      return new Date(bTime) - new Date(aTime);
    });
    setSortedContacts(sorted);
  }, [contacts]);

  useEffect(() => {
    // console.log(contacts);
    if (currentUser) {
      setCurrentUserImage(currentUser?.avatarImage);
      setCurrentUserName(currentUser?.username);
    }
  }, [currentUser]);

  const changeCurrentChat = async (index, contact) => {
    const response = await axios.post(`${markAsRead}`, {
      from: contact._id,
      to: currentUser._id,
    });

    if (!response || response.status !== 200) {
      toast.error(response?.data?.msg ?? "Error while marking as read");
      return;
    }

    const updatedContacts = [...contacts].map((c) =>
      c._id === contact._id ? { ...c, unreadCount: 0 } : c
    );
    setSelectedCurrentUser(index);
    setSortedContacts(updatedContacts);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && (
        <div id="container" className="grid grid-rows-1 h-full">
          <div
            id="brand"
            className="flex items-center justify-center gap-4 py-8 shadow-2xl shadow-black bg-slate-950 sticky top-0 md:relative z-10 w-full "
          >
            <img
              src={Logo}
              alt="logo"
              className="h-8 shadow-lg p-1 opacity-70 rounded-full pt-2 shadow-emerald-600"
            />
            <h3 className="font-bold tracking-wider text-gradient">Tipgram</h3>
          </div>

          <div
            id="contacts"
            className="flex flex-col items-center gap-3 bg-slate-800 backdrop-filter backdrop-blur-md bg-opacity-50 pt-5 md:pt-20 pb-10 md:pb-5 custom-scrollbar min-h-full md:overflow-auto"
          >
            {sortedContacts?.map((contact, index) => {
              return (
                <div
                  onClick={() => changeCurrentChat(index, contact)}
                  id="contact"
                  key={index}
                  className={`${
                    index === selectedCurrentUser
                      ? "selected flex items-center gap-5 min-h-[3.5rem] w-[90%] bg-slate-950 backdrop-filter backdrop-blur-md opacity-95 px-3 border-r-4 border-emerald-600 py-1 rounded-lg shadow-lg shadow-black transition-all cursor-pointer"
                      : "flex items-center gap-5 min-h-[3.5rem] w-[90%] bg-slate-950 backdrop-filter backdrop-blur-md bg-opacity-95 px-2 py-1 rounded-xl shadow-md shadow-black hover:bg-opacity-80 hover:bg-slate-900 active:shadow-lg active:shadow-black transition-all cursor-pointer"
                  }`}
                >
                  <div id="avatar" className="flex items-center justify-center">
                    {userAvatarError || !contact?.avatarImage ? (
                      <span className="h-8 w-8 border-2 border-emerald-700 rounded-full text-center flex items-center justify-center">
                        {contact?.username?.charAt(0)?.toUpperCase()}
                      </span>
                    ) : (
                      <img
                        className="h-8 rounded-full border-2 w-8 text-center border-emerald-700"
                        src={`data:image/svg+xml;base64,${contact?.avatarImage}`}
                        alt={`${contact?.username[0]?.toUpperCase()}`}
                        onError={() => setUserAvatarError(true)}
                      />
                    )}
                  </div>
                  <div id="username">
                    <h3 className="text-white font-medium text-xs">
                      {contact?.username}
                    </h3>
                  </div>

                  {contact.unreadCount > 0 && (
                    <div className="unread-badge">{contact.unreadCount}</div>
                  )}
                  <div className="last-message">
                    {contact.lastMessage?.text && (
                      <p>{contact.lastMessage.text.substring(0, 20)}...</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div
            id="currentUser"
            className="flex items-center py-6 px-5 gap-5 sticky md:relative z-10 bottom-0 bg-slate-950 w-full shadow-lg shadow-black"
          >
            <div id="avatar">
              {currentUserAvatarError ? (
                <span className="h-8 w-8 border-2 border-emerald-700 rounded-full text-center flex items-center justify-center aspect-square">
                  {currentUserName?.charAt(0)?.toUpperCase()}
                </span>
              ) : (
                <img
                  className="h-10 rounded-full border-4 border-green-500 "
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt={`avatar`}
                  onError={() => setCurrentUserAvatarError(true)}
                />
              )}
            </div>
            <div id="username" className="flex flex-col items-start">
              <h2>{currentUserName}</h2>
              <div className="text-xs font-thin text-slate-400 flex items-center gap-4">
                <p>logged in</p>{" "}
                <div className="h-2 w-2 bg-green-500 animate-pulse rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
