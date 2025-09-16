
// // import { useEffect } from 'react'
// import './App.css'
// // import { useDispatch, useSelector } from 'react-redux'
// // import { loginUserThunk } from './store/slice/user/user.thunk';
// function App() {


//   //   const { isAuthenticated } = useSelector(state => state.userReducer)
//   // console.log(isAuthenticated)

//   // const dispatch = useDispatch();
//   // useEffect(() => {
//   //   dispatch(loginUserThunk());
//   // })
//   return (
//     <>




//     </>
//   )
// }

// export default App

import { useEffect } from 'react';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { getUserProfileThunk } from './store/slice/user/user.thunk';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getUserProfileThunk());
    })();
  }, [])
  return (
    <>
      <Toaster
        position="top-center" reverseOrder={false}
      />



    </>
  )
}

export default App


