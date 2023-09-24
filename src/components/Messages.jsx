import React from 'react'

const Messages = ({messages, scrollRef, uuidv4}) => {
  // console.log(messages);
  return (
    <div className='min-h-full flex flex-col justify-end gap-3'>
      {
        messages.map((message)=>{
          return (
            <div key={uuidv4()} ref={scrollRef} className={` ${message.fromSelf ? `sended flex justify-end items-center` : `recieved flex justify-start items-center`}`}>
              <div id="content" className={`max-w-[40%] break-words text-sm md:text-base px-4 py-2 bg-opacity-50 backdrop-filter backdrop-blur-md ${message.fromSelf ? `bg-slate-700 rounded-s-xl rounded-tr-xl` : `bg-emerald-800  rounded-e-xl rounded-tl-xl`}`}>
                <p>{message.message}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Messages