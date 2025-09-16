import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk } from '../../store/slice/message/message.thunk';

const SendMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const emojiBtnRef = useRef(null);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && message.trim()) {
      if (!selectedUser?._id) return;
      await dispatch(sendMessageThunk({ receiverId: selectedUser._id, message }));
      setMessage("");
    }
  };

  const handleSendMessage = () => {
    if (!selectedUser?._id || !message.trim()) return;
    dispatch(sendMessageThunk({
      receiverId: selectedUser._id,
      message,
    }));
    setMessage('');
  };

  const onEmojiClick = (emojiObject) => {
    setMessage(prev => prev + emojiObject.emoji);
    if (inputRef.current) {
      inputRef.current.focus();
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  };

  // Close emoji picker if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        emojiBtnRef.current &&
        !emojiBtnRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    }

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <div className='w-full p-3 flex gap-2 items-center relative'>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type here..."
        className="input input-primary input-bordered w-full px-4 py-2 bg-gray-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        ref={emojiBtnRef}
        onClick={() => setShowEmojiPicker(prev => !prev)}
        className='btn btn-outline btn-primary'
      >
        😊
      </button>

      <button
        onClick={handleSendMessage}
        className='btn btn-square btn-outline btn-primary'
      >
        <IoIosSend />
      </button>

      {showEmojiPicker && (
        <div
          ref={emojiPickerRef}
          style={{ position: 'absolute', bottom: '50px', right: '10px', zIndex: 1000 }}
        >
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default SendMessage;

















































// import React, { useState } from 'react'
// import { IoIosSend } from "react-icons/io";
// import { useDispatch, useSelector } from 'react-redux';
// import { sendMessageThunk } from '../../store/slice/message/message.thunk';
// const SendMessage = () => {
//   const dispatch = useDispatch();

//   //  send msg m reciever id deni ho gy r wo kaha se ae gy seleted user se 
//   const { selectedUser } = useSelector((state) => state.userReducer);

//   const [message, setMessage] = useState('');

//   const handleSendMessage = () => {
//     // console.log(message)
//     dispatch(sendMessageThunk(
//       {
//         receiverId: selectedUser?._id,
//         message,

//       }))

//     setMessage(''); // send ke baad input clear ho jayega

//     //  e.preventDefault();

//   }


//   return (
//     <div className='w-full p-3 flex gap-2 '>
//       <input type="text" placeholder="Type here..." className="input input-primary w-full px-4 py-2 bg-gray-700 rounded-2xl text-white  focus:outline-none focus: ring-2 focus:ring-blue-500"
//         value={message}
//         onChange={(e) =>
//           setMessage(e.target.value)
//         }
//       />

//       <button onClick={handleSendMessage} className='btn btn-square btn-outline btn-primary '>
//         <IoIosSend />
//       </button>
//     </div>
//   )
// }

// export default SendMessage




// import React, { useState } from 'react'
// import { IoIosSend } from "react-icons/io";
// import { useDispatch, useSelector } from 'react-redux';
// import { sendMessageThunk } from '../../store/slice/message/message.thunk';

// const SendMessage = () => {
//   const dispatch = useDispatch();
//   const { selectedUser } = useSelector((state) => state.userReducer);
//   const [message, setMessage] = useState('');

//   const handleKeyDown = async (e) => {
//     if (e.key === "Enter" && message.trim()) {
//       if (!selectedUser?._id) return;
//       await dispatch(sendMessageThunk({ receiverId: selectedUser._id, message }));
//       setMessage("");
//     }
//   };

//   const handleSendMessage = () => {
//     if (!selectedUser?._id || !message.trim()) return;
//     dispatch(sendMessageThunk({
//       receiverId: selectedUser._id,
//       message,
//     }));
//     setMessage('');
//   };

//   return (
//     <div className='w-full p-3 flex gap-2 '>
//       <input
//         type="text"
//         placeholder="Type here..."
//         className="input input-primary input-bordered w-full px-4 py-2 bg-gray-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         onKeyDown={handleKeyDown}
//       />
//       <button onClick={handleSendMessage} className='btn btn-square btn-outline btn-primary '>
//         <IoIosSend />
//       </button>
//     </div>
//   );
// }

// export default SendMessage;
