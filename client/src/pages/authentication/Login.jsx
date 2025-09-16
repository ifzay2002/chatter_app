import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from '../../store/slice/user/user.thunk';


const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeField, setActiveField] = useState("");

  const { isAuthenticated } = useSelector((state) => state.userReducer)


  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  })

  useEffect(() => {
    if (isAuthenticated)
      navigate('/')
  }, [isAuthenticated])


  const handleInputChange = (e) => {
    // console.log(e.target.name)
    // console.log(e.target.value)
    // ------------------------------------1st method--------
    // setLoginData({...loginData, 
    //   [e.target.name]: e.target.value
    // })

    // ------------------------------------2nd method--------
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    })
    )
  }

  const handleLogin = async () => {
    const response = await dispatch(loginUserThunk(loginData));

    /////Ab navigation hone lagi hai home page pr agr login ho jata hai to
    if (response?.payload?.success) {
      navigate('/')

    }
  };


  //  console.log(loginData)
  return (
    <div className='flex justify-center items-center p-6 min-h-screen'>


      <div className='max-w-[40rem] w-full flex flex-col gap-5  bg-base-200 p-12 rounded-lg'>

        <h2 className='text-2xl text-red-200 font-bold'>Please Login....!</h2>

        <label className="input validator w-full">
          <FaUser />
          <input
            type="text"
            required
            placeholder="Username"
            name="username"
            onChange={handleInputChange}
            onFocus={() => setActiveField("username")}
            onBlur={() => setActiveField("")}
          />
        </label>
        {activeField === "username" && (
          <p className={`text-sm ${/^[a-z0-9_]{3,20}$/.test(loginData.username) ? 'text-green-500' : 'text-red-500'}`}>
            Username must be lowercase, can contain numbers/underscore, no spaces
          </p>
        )}
        <label className="input validator w-full">
          <IoKeySharp />
          <input
            type="password"
            required
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
            onFocus={() => setActiveField("password")}
            onBlur={() => setActiveField("")}
          />
        </label>
        {activeField === "password" && (
          <ul className="text-sm mt-1">
            <li className={`${loginData.password.length >= 8 ? 'text-green-500' : 'text-red-500'}`}>
              At least 8 characters
            </li>
            <li className={`${/[A-Z]/.test(loginData.password) ? 'text-green-500' : 'text-red-500'}`}>
              At least one uppercase letter
            </li>
            <li className={`${/[a-z]/.test(loginData.password) ? 'text-green-500' : 'text-red-500'}`}>
              At least one lowercase letter
            </li>
            <li className={`${/[0-9]/.test(loginData.password) ? 'text-green-500' : 'text-red-500'}`}>
              At least one number
            </li>
            <li className={`${/[!@#$%^&*]/.test(loginData.password) ? 'text-green-500' : 'text-red-500'}`}>
              At least one special character (!@#$%^&*)
            </li>
          </ul>
        )}


        <button onClick={handleLogin} className="btn btn-primary">Login</button>
        <p>Don't have an account? &nbsp;
          <Link to='/signup' className='text-blue-400 underline'>Sign Up</Link>


        </p>

      </div>


    </div>

  )
}
export default Login

