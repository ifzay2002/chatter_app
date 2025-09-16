import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserThunk } from '../../store/slice/user/user.thunk';
import { toast } from 'react-hot-toast';


const SignUp = () => {


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeField, setActiveField] = useState("");

  const { isAuthenticated } = useSelector((state) => state.userReducer)

  const [signupData, setSignUpData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",

  });

  useEffect(() => {
    // console.log(isAuthenticated)
    if (isAuthenticated)
      navigate('/')
  }, [isAuthenticated])

  const handleInputChange = (e) => {

    setSignUpData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    })
    )
  }
  const handleSignUp = async () => {
    if (signupData.password !== signupData.confirmPassword) {
      return toast.error('Password and Confirm Password must be same');
    }
    const response = await dispatch(registerUserThunk(signupData))

    /////Ab navigation hone lagi hai home page pr agr signup ho jata hai to
    if (response?.payload?.success) {
      navigate('/')

    }
  };



  return (
    <div className='flex justify-center items-center p-6 min-h-screen'>


      <div className='max-w-[40rem] w-full flex flex-col gap-5  bg-base-200 p-12 rounded-lg'>

        <h2 className='text-2xl text-red-200 font-bold'>Please Sign Up....!</h2>

        <label className="input validator w-full">
          <FaUser />
          <input
            type="text"
            required
            placeholder="Full Name"
            name='fullName'
            onChange={handleInputChange}
            onFocus={() => setActiveField("fullName")}
            onBlur={() => setActiveField("")}
          />
        </label>
        {activeField === "fullName" && (
          <p className={`text-sm ${/^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/.test(signupData.fullName) ? 'text-green-500' : 'text-red-500'}`}>
            Name must start with a capital letter, spaces allowed
          </p>
        )}
        <label className="input validator w-full">
          <FaUser />
          <input
            type="text"
            required
            placeholder="Username"
            name='username'
            onChange={handleInputChange}
            onFocus={() => setActiveField("username")}
            onBlur={() => setActiveField("")}
          />
        </label>
        {activeField === "username" && (
          <p className={`text-sm ${/^[a-z0-9_]{3,20}$/.test(signupData.username) ? 'text-green-500' : 'text-red-500'}`}>
            Username must be lowercase, can contain numbers/underscore, no spaces
          </p>

        )}
        <label className="input validator w-full">
          <IoKeySharp />
          <input
            type="password"
            required
            placeholder="Password"
            name='password'
            onChange={handleInputChange}
            onFocus={() => setActiveField("password")}
            onBlur={() => setActiveField("")}
          />
        </label>

        {activeField === "password" && (
          <ul className="text-sm mt-1">
            <li className={`${signupData.password.length >= 8 ? 'text-green-500' : 'text-red-500'}`}>
              At least 8 characters
            </li>
            <li className={`${/[A-Z]/.test(signupData.password) ? 'text-green-500' : 'text-red-500'}`}>
              At least one uppercase letter
            </li>
            <li className={`${/[a-z]/.test(signupData.password) ? 'text-green-500' : 'text-red-500'}`}>
              At least one lowercase letter
            </li>
            <li className={`${/[0-9]/.test(signupData.password) ? 'text-green-500' : 'text-red-500'}`}>
              At least one number
            </li>
            <li className={`${/[!@#$%^&*]/.test(signupData.password) ? 'text-green-500' : 'text-red-500'}`}>
              At least one special character (!@#$%^&*)
            </li>
          </ul>
        )}

        <label className="input validator w-full">
          <IoKeySharp />
          <input
            type="password"
            required
            placeholder="Confirm Password"
            name='confirmPassword'
            onChange={handleInputChange}
          />
        </label>
        {signupData.confirmPassword && signupData.confirmPassword !== signupData.password && (
          <p className="text-red-500 text-sm">Must match the password</p>
        )}


        <div className="input-bordered flex items-center gap-5">
          <label htmlFor="male" className='items-center gap-3 flex'>
            <input id='male'
              type="radio"
              name="gender"
              value='male'
              className="radio radio-primary"
              onChange={handleInputChange}
            /> Male
          </label>
          <label htmlFor="female" className='items-center gap-3 flex'>
            <input id='female'
              type="radio"
              name="gender"
              value='female'
              className="radio radio-primary"
              onChange={handleInputChange} />
            Female
          </label>

        </div>
        <button onClick={handleSignUp} className="btn btn-primary">Sign Up</button>


        <p>Already have an account? &nbsp;
          <Link to='/login' className='text-blue-400 underline'>Login</Link>


        </p>

      </div>


    </div>

  )
}

export default SignUp

