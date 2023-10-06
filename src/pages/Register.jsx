import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import Loader from '../assets/loader.gif'

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-left",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(()=>{
    if(localStorage.getItem("tipgramUser")) {
      navigate("/")
    }
  },[])

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (username.length < 4) {
      toast.error(
        "username should not be less than 4 characters",
        toastOptions
      );
      return false;
    }

    if (email === "") {
      toast.error("please provide the email", toastOptions);
      return false;
    }
    if (password.length < 8) {
      toast.error(
        "password should not be less than 8 characters",
        toastOptions
      );
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("password and confirm password should be same", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    const { username, email, password } = values;
    e.preventDefault();
    try {
      setIsLoading(true)
      if (handleValidation()) {
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
        });
        console.log(data);
        if (data.status == false) {
          toast.error(data.msg, toastOptions);
        } else if (data.status === true) {
          localStorage.setItem("tipgramUser", JSON.stringify(data.user));
          // navigate("/login", {state : {registrationSuccess : true}});
          navigate("/login");
          setIsLoading(false)
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, toastOptions);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleShowPassword = (field) => {
    field === "password"
      ? setShowPassword(!showPassword)
      : setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className='flex items-center justify-center h-screen '>
        <form
          action='#'
          className='bg-slate-950 text-green-200 p-8 rounded-md md:rounded-lg lg:rounded-2xl shadow-md w-[75vw] md:w-[50vw] lg:w-[40vw] backdrop-filter backdrop-blur-lg bg-opacity-70 shadow-black'
          onSubmit={(event) => handleSubmit(event)}
        >
          <h2 className='text-md md:text-xl font-semibold mb-6 text-center text-slate-100'>
            Signup{" "}
            <span className='text-xl md:text-3xl font-extrabold text-gradient tracking-widest'>
              Tipgram
            </span>{" "}
          </h2>

          <div className='mb-2 md:mb-4'>
            <label
              htmlFor='username'
              className='block text-sm font-medium mb-1'
            >
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

          <div className='mb-2 md:mb-4'>
            <label htmlFor='email' className='block text-sm font-medium mb-1'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              className='py-1 md:py-2 px-4 border-2 rounded w-full bg-slate-950 placeholder-slate-400 text-slate-200 border-green-500 focus:border-green-300 focus:outline-none'
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className='mb-2 md:mb-4'>
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
                placeholder='Enter your new password'
                className='py-1 md:py-2 px-4 border-2 rounded w-full bg-slate-950 placeholder-slate-400 text-slate-200 border-green-500 focus:border-green-300 focus:outline-none'
                onChange={(e) => handleChange(e)}
              />
              <button
                type='button'
                onClick={() => handleShowPassword("password")}
                className='hover:text-sky-500 active:text-green-300 transition-all text-base md:text-lg'
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
          </div>

          <div className='mb-2 md:mb-6'>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium mb-1'
            >
              Confirm Password
            </label>
            <div className='flex items-center gap-4'>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id='confirmPassword'
                name='confirmPassword'
                placeholder='Re-type your new password'
                className='py-1 md:py-2 px-4 border-2 rounded w-full bg-slate-950 placeholder-slate-400 text-slate-200 border-green-500 focus:border-green-300 focus:outline-none'
                onChange={(e) => handleChange(e)}
              />
              <button
                type='button'
                onClick={() => handleShowPassword("confirmPassword")}
                className='hover:text-sky-500 active:text-green-300 transition-all text-base md:text-lg'
              >
                {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
          </div>

          <button
            type='submit'
            className='bg-green-900 flex items-center justify-center gap-5 text-white py-2 px-4 mb-3 rounded hover:bg-blue-600 w-full'
          >
            Register {isLoading ? <img className="h-5" src={Loader} alt="...load" /> : ""}
          </button>
          <span className='text-center'>
            Already a user?{" "}
            <Link
              className='text-sky-500 hover:text-sky-200 active:text-sky-700 transition-all cursor-pointer'
              to='/login'
            >
              Login
            </Link>{" "}
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
