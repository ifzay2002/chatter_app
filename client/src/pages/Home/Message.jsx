// import React, { useEffect, useRef } from 'react'
// import { useSelector } from 'react-redux'

// const Message = ({ messageDetails }) => {

//   const messageRef = useRef(null);

//   const { userProfile, selectedUser } = useSelector((state) => state.userReducer)

//   const isSender = userProfile?._id === messageDetails?.senderId
//   // console.log(userProfile?._id, messageDetails?.senderId)
//   // console.log(messageDetails.message)


//   useEffect(() => {
//     if (messageRef.current) {
//       messageRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, []);

//   return (
//     <>
//       <div ref={messageRef}
//         className={`chat ${isSender ? 'chat-end' : 'chat-start'}`}>
//         <div className="chat-image avatar">
//           <div className="w-10 rounded-full">
//             <img
//               alt="Tailwind CSS chat bubble component"
//               src={isSender ? userProfile?.avatar : selectedUser?.avatar}
//             />
//           </div>
//         </div>

//         <div className={`chat-bubble rounded-lg text-sm px-3 py-2 max-w-xs ${isSender ? 'bg-green-600 text-white font-semibold' : 'bg-gray-600 text-white font-semibold'}`}>

//           <p> {messageDetails?.message}</p>
//           <time className="text-[10px] text-gray-900  self-end mt-1">12:45</time>

//         </div>
//         {/* <div className="chat-footer opacity-40">Delivered</div> */}
//       </div>


//     </>
//   )
// }

// export default Message





import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

// Emoji regex (modern Unicode emoji detection)
const emojiRegex = /\p{Emoji}/u;

const splitMessageByEmoji = (text) => {
  const parts = [];
  let buffer = '';

  for (const char of text) {
    if (char.match(emojiRegex)) {
      if (buffer.length > 0) {
        parts.push({ text: buffer, isEmoji: false });
        buffer = '';
      }
      parts.push({ text: char, isEmoji: true });
    } else {
      buffer += char;
    }
  }

  if (buffer.length > 0) {
    parts.push({ text: buffer, isEmoji: false });
  }

  return parts;
};

const Message = ({ messageDetails }) => {
  const messageRef = useRef(null);
  const { userProfile, selectedUser } = useSelector((state) => state.userReducer);

  const isSender = userProfile?._id === messageDetails?.senderId;

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const parts = splitMessageByEmoji(messageDetails?.message ?? '');

  // ✅ Format time from createdAt
// ✅ Format time from createdAt (in 12-hour format with AM/PM)
const formattedTime = messageDetails?.createdAt
  ? new Date(messageDetails.createdAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // 👈 shows 10:12 PM instead of 22:12
    })
  : '';


  return (
    <div ref={messageRef} className={`chat ${isSender ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Avatar"
            src={isSender ? userProfile?.avatar : selectedUser?.avatar}
          />
        </div>
      </div>

      <div
        className={`chat-bubble rounded-lg text-sm px-3 py-2 max-w-xs ${isSender ? 'bg-green-600 text-white font-semibold' : 'bg-gray-600 text-white font-semibold'}`}
        style={{ lineHeight: '1.3' }}
      >
        <p style={{ margin: 0, display: 'inline' }}>
          {parts.map((part, i) =>
            part.isEmoji ? (
              <span key={i} style={{ fontSize: '2rem', lineHeight: '1' }}>
                {part.text}
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            )
          )}
        </p>

        {/* ✅ Show dynamic time */}
        {formattedTime && (
          <time className="text-[10px] text-gray-300 self-end mt-1 block text-right">
            {formattedTime}
          </time>
        )}
      </div>
    </div>
  );
};

export default Message;
