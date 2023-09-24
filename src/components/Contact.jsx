import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";

const Contact = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [selectedCurrentUser, setSelectedCurrentUser] = useState(undefined);

  useEffect(() => {
    // console.log(contacts);
    if (currentUser) {
      setCurrentUserImage(currentUser?.avatarImage);
      setCurrentUserName(currentUser?.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setSelectedCurrentUser(index)
    changeChat(contact)
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <div id='container' className='grid grid-rows-1 h-full'>
          <div
            id='brand'
            className='flex items-center justify-center gap-4 py-8 shadow-2xl shadow-black bg-slate-950 sticky top-0 md:relative z-10 w-full '
          >
            <img
              src={Logo}
              alt='logo'
              className='h-8 shadow-lg p-1 opacity-70 rounded-full pt-2 shadow-emerald-600'
            />
            <h3 className='font-bold tracking-wider text-gradient'>Tipgram</h3>
          </div>

          <div
            id='contacts'
            className='flex flex-col items-center gap-3 bg-slate-800 backdrop-filter backdrop-blur-md bg-opacity-50 pt-5 md:pt-20 pb-10 md:pb-5 custom-scrollbar min-h-full md:overflow-auto'
          >
            {contacts?.map((contact, index) => {
              return (
                <div
                  onClick={()=>changeCurrentChat(index, contact)}
                  id='contact'
                  key={index}
                  className={`${
                    index === selectedCurrentUser
                      ? "selected flex items-center gap-5 min-h-[3.5rem] w-[90%] bg-slate-950 backdrop-filter backdrop-blur-md opacity-95 px-3 border-r-4 border-emerald-600 py-1 rounded-lg shadow-lg shadow-black transition-all cursor-pointer"
                      : "flex items-center gap-5 min-h-[3.5rem] w-[90%] bg-slate-950 backdrop-filter backdrop-blur-md bg-opacity-95 px-2 py-1 rounded-xl shadow-md shadow-black hover:bg-opacity-80 hover:bg-slate-900 active:shadow-lg active:shadow-black transition-all cursor-pointer"
                  }`}
                >
                  <div id='avatar' className="flex items-center justify-center">
                    <img
                      className='h-8 rounded-full border-2 w-8 text-center border-emerald-700'
                      src={`data:image/svg+xml;base64,${contact?.avatarImage}`}
                      alt={`${contact?.username[0]?.toUpperCase()}`}
                    />
                  </div>
                  <div id='username'>
                    <h3 className='text-white font-medium text-xs'>
                      {contact?.username}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div id='currentUser' className="flex items-center py-6 px-5 gap-5 sticky md:relative z-10 bottom-0 bg-slate-950 w-full shadow-lg shadow-black">
            <div id='avatar'>
              <img
              className="h-10 rounded-full border-4 border-green-500 "
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt={`avatar`}
              />
            </div>
            <div id='username' className="flex flex-col items-start">
              <h2>{currentUserName}</h2>
              <div className="text-xs font-thin text-slate-400 flex items-center gap-4"><p>logged in</p> <div className="h-2 w-2 bg-green-500 animate-pulse rounded-full"></div></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
