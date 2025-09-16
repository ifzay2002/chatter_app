import React, { useEffect } from 'react'
import User from './User'
import Message from './Message'

import { useDispatch, useSelector } from 'react-redux';
import { getMessageThunk } from '../../store/slice/message/message.thunk';
import SendMessage from './SendMessage';

const MessageContainer = () => {

  const dispatch = useDispatch();

  const { selectedUser } = useSelector((state) => state.userReducer);


  ///dynamic messages  k leye 
  const { messages } = useSelector((state) => state.messageReducer)
  // console.error(messages);


  useEffect(() => { // receiverId: ye aik key hai jo hm n reciedver id rkhi th iss ley eyaha ye use hi 
    //   if (selectedUser?._id) {
    //     dispatch(getMessageThunk({ receiverId: selectedUser?._id }))
    //   }
    // }, [selectedUser])


    if (selectedUser?._id) {
      dispatch(getMessageThunk({ receiverId: selectedUser?._id }));
    }
    // else {
    // jab user select nahi hai to purane msgs clear
    // dispatch(resetMessages());
    // }
  }, [selectedUser]);

  return (
    <>

      {!selectedUser ? (
        <div className=' w-full flex items-center justify-center flex-col gap-5'>
          <h2 className='text-violet-700 text-[60px]'  >Welcome to CHATTER APP </h2>
          <p className='text-xl text-cyan-500'>Please select a person to continue your chat!!!</p> </div>
      ) : (<div className='h-screen w-full flex flex-col bg-gray-800'>

        <div className='p-3 border-b border-b-white/10'>
          <User userDetails={selectedUser} />
        </div>



        <div className="h-full overflow-y-auto p-3">
          {messages?.map((messageDetails) => {
            return (
              <Message
                key={messageDetails?._id}
                messageDetails={messageDetails}
              />
            );
          })}
        </div>

        <SendMessage />

      </div>)}


    </>
  )
}

export default MessageContainer
