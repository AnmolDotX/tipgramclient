import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginRoute } from "../utils/APIRoutes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const toastOptions = {
    position: "bottom-left",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  // const {registrationSuccess} = location.state || {};

  // if(registrationSuccess) {
  //   toast.success("You are successfully registered, Login to proceed", {
  //     position : "top-center",
  //     autoClose : 5000,
  //     pauseOnHover : true,
  //     draggable : true,
  //     theme : "dark"
  //   })
  // }

  useEffect(()=>{
    if(localStorage.getItem("tipgramUser")) {
      navigate("/")
    }
  },[])

  const handleValidation = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("username is required", toastOptions);
      return false;
    }
    if (password === "") {
      toast.error("password is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (handleValidation()) {
        const { username, password } = values;
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });
        if (data.status == false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          // localStorage.setItem("tipgramUser", JSON.stringify(data.user));
          localStorage.setItem("tipgramUser", JSON.stringify(data.user));
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <form
          action='#'
          className='bg-slate-950 text-green-200 p-8 rounded-md md:rounded-lg lg:rounded-2xl shadow-md w-[75vw] md:w-[50vw] lg:w-[40vw] backdrop-filter backdrop-blur-lg bg-opacity-70 shadow-black'
          onSubmit={(event) => handleSubmit(event)}
        >
          <h2 className='text-md md:text-xl font-semibold mb-6 text-center text-slate-100'>
            Login{" "}
            <span className='text-xl md:text-3xl font-extrabold text-gradient tracking-widest'>
              Tipgram
            </span>{" "}
          </h2>

          <div className='mb-2 md:mb-4'>
            <label htmlFor='email' className='block text-sm font-medium mb-1'>
              Username
            </label>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='Enter your username'
              className='py-1 md:py-2 px-4 border-2 rounded w-full bg-slate-950 placeholder-slate-400 text-slate-200 border-green-500 focus:border-green-300 focus:outline-none'
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className='mb-2 md:mb-6'>
            <label
              htmlFor='password'
              className='block text-sm font-medium mb-1'
            >
              Password
            </label>
            <div className='flex items-center gap-4'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                name='password'
                placeholder='Enter your password'
                className='py-1 md:py-2 px-4 border-2 rounded w-full bg-slate-950 placeholder-slate-400 text-slate-200 border-green-500 focus:border-green-300 focus:outline-none'
                onChange={(e) => handleChange(e)}
              />
              <button
                type='button'
                onClick={() => handleShowPassword()}
                className='hover:text-sky-500 active:text-green-300 transition-all text-base md:text-lg'
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
          </div>

          <button
            type='submit'
            className='bg-green-900 text-white py-2 px-4 mb-3 rounded hover:bg-blue-600 w-full'
          >
            Login
          </button>
          <span className='text-center'>
            New user?{" "}
            <Link
              className='text-sky-500 hover:text-sky-200 active:text-sky-700 transition-all cursor-pointer'
              to='/register'
            >
              Register
            </Link>{" "}
          </span>

          {/* button for testing navigate function */}
          {/* <button onClick={()=>navigate("/")} className="p-2 bg-red-500 text-white" type="button">chat page</button> */}
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
