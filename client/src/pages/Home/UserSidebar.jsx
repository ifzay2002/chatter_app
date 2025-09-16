import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { getOtherUserThunk, logoutUserThunk } from '../../store/slice/user/user.thunk';
import { setSelectedUser } from '../../store/slice/user/user.slice';

const UserSidebar = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const { otherUsers, userProfile } = useSelector((state) => state.userReducer);
  // console.error(otherUsers)



const handleKeyDown = (e) => {
  if (e.key === "Enter" && searchValue.trim()) {
    // searchValue se pehla match find karo
    const matchedUser = otherUsers?.find((user) =>
      (user?.username || "").toLowerCase().includes(searchValue.toLowerCase()) ||
      (user?.fullName || "").toLowerCase().includes(searchValue.toLowerCase())
    );

    if (matchedUser) {
      dispatch(setSelectedUser(matchedUser)); // ✅ Enter pe direct chat open
      setSearchValue(""); // input clear
    }
  }
};

  

  const handleLogout = async () => {
    await dispatch(logoutUserThunk())

  }

  useEffect(() => {
    if (!searchValue) {
      setUsers(otherUsers);
    } else {
     setUsers(
  otherUsers.filter((user) => {
    return (
      (user?.username || "").toLowerCase().includes(searchValue.toLowerCase()) ||
      (user?.fullName || "").toLowerCase().includes(searchValue.toLowerCase())
    );
  })
);

    }
  }, [searchValue, otherUsers]);


  useEffect(() => {
    (async () => {
      await dispatch(getOtherUserThunk());
    })()
  }, [])

  return (
    <div className='max-w-[20rem] h-screen w-full bg-gray-900 flex flex-col border-r border-r-white/10'>
      <h1 className='bg-slate-500 rounded-lg  mt-3 mx-3  px-2 py-1 text-[#230865] text-xl font-bold '>CHATTER APP</h1>
      <div className='p-3'>
        <label className="input input-bordered flex items-center gap-2">

          <input onChange={(e) => setSearchValue(e.target.value)}
           onKeyDown = {handleKeyDown}
            type="text"
            className="grow"
            placeholder="Search" />
          <IoSearch />
         
        </label>
      </div>

      <div className='h-full overflow-y-auto px-3 text-sm flex flex-col gap-2'>
        {users?.map((userDetails) => {
          return <User key={userDetails?._id} userDetails={userDetails} />
        })}


      </div>
      <div className='flex items-center justify-between p-3'>
        <div className='flex items-center gap-3'>
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-12 h-12 rounded-full ring-2 ring-offset-2">
              <img src={userProfile?.avatar} />
            </div>
          </div>
          <h2>{userProfile?.username}</h2>
        </div>
        <button onClick={handleLogout} className="btn btn-primary hover:bg-gray-800 text-white font-bold rounded-xl  btn-sm px-4">Logout</button>
      </div>


    </div>
  )
}

export default UserSidebar


