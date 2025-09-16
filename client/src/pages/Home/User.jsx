import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../../store/slice/user/user.slice';

const User = ({ userDetails }) => {
  // console.log(userDetails)
  const dispatch = useDispatch();

  // kn sa user select howa 
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { OnlineUsers } = useSelector((state) => state.socketReducer);


  // includes aik method hia r OnlienUsers m aik array hai iss leye hm chk kr rahien h k userdetails ki id uss array m hai agr wo online howa tu ho gy 
  const isUserOnline = OnlineUsers?.includes(userDetails?._id)

  // console.log(selectedUser)

  const handleUserClick = () => {
    dispatch(setSelectedUser(userDetails));
  }

  return (
    <div onClick={handleUserClick}
      className={`flex gap-5 items-center hover:bg-gray-800 py-1 px-2 rounded-lg cursor-pointer  ${userDetails?._id === selectedUser?._id && 'bg-gray-800'}`}>

      <div className={`avatar ${isUserOnline && 'online'}`}>
        <div className="w-12 rounded-full">
          <img src={userDetails?.avatar} />
        </div>
      </div>
      <div>
        <h2 className='line-clamp-1 text-white text-[16px]'>{userDetails?.FullName}</h2>
        <p className='text-gray-400 text-[10px]'>{userDetails?.username}</p>
      </div>
    </div>
  )
}

export default User

