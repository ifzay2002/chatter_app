import React, { useEffect } from 'react';
import UserSidebar from './UserSidebar';
import MessageContainer from './MessageContainer';
import { useDispatch, useSelector } from 'react-redux';
import { initializeSocket, setOnlineUsers } from '../../store/slice/socket/socket.slice';
import { setNewMessage } from "../../store/slice/message/message.slice";


const Home = () => {

  const dispatch = useDispatch();

  const { isAuthenticated, userProfile } = useSelector((state) => state.userReducer);

  const { socket, OnlineUsers } = useSelector((state) => state.socketReducer);


  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(initializeSocket(userProfile?._id));

  }, [isAuthenticated])

  // kn kn se users online hai yaha recieve hon gy r on se krtien hia 

  // useEffect(() => {
  //   if (!socket) return;
  //   socket.on('OnlineUsers', (OnlineUsers) => {
  //     //  console.log(OnlineUsers);
  //     dispatch(setOnlineUsers(OnlineUsers));

  //   });

  useEffect(() => {
    if (!socket) return;

    const handleOnline = (users) => dispatch(setOnlineUsers(users));
    const handleNewMsg = (msg) => dispatch(setNewMessage(msg));

    socket.on('OnlineUsers', handleOnline);
    socket.on('newMessage', handleNewMsg);

    return () => {
      socket.off('OnlineUsers', handleOnline);
      socket.off('newMessage', handleNewMsg);
      // socket.close(); // sirf logout ya app unmount par
    };
  }, [socket]);


  ///messages users

  // socket.on('newMessage', (newMessage) => {
  //   dispatch(setNewMessage(newMessage));
  // });
  //     // clean up
  //     return () => {
  //       socket.close();
  //     };
  //   }, [socket])


  // jb bh socket hamara change ho ga by default tu null hai na ye useffect ki dependency ka bata rahi ho 
  ;

  return (
    <div className='flex'>
      <UserSidebar />
      <MessageContainer />



    </div>
  )
}

export default Home

