import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import loader from "../assets/loader.gif";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";

const SetAvatar = () => {
  const api = `/api/45678945/`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-left",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const data = [];
  const fetchData = async () => {
    for (let i = 0; i < 5; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an Avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("tipgramUser"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data?.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage?.setItem("tipgramUser", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar, Please! try again", toastOptions);
      }
    }
  };

  useEffect(() => {
    try {
      setIsLoading(true);

      fetchData();

      const checkUser = async () => {
        if (!localStorage.getItem("tipgramUser")) {
          navigate("/login");
        }
      };
      checkUser();
    } catch (error) {
      console.log(error.message, error.response.statusText);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-sm md:text-base lg:text-lg animate-pulse mb-10 text-yellow-400 tracking-widest">
            Content Loading . . .
          </h1>
          <img
            src={loader}
            alt="loader"
            className=" max-h-28 md:max-h-36 lg:max-h-40 shadow-green-400 shadow-2xl drop-shadow-xl p-2 rounded-full"
          />
        </div>
      ) : avatars && avatars.length > 0 ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <div id="title_container">
            <h1 className="text-xl md:text-3xl lg:text-5xl font-extrabold tracking-widest mb-5 md:mb-10 lg:mb-16 text-gradient">
              TipGram
            </h1>
            <h2 className="text-xs md:text-sm lg:text-base text-yellow-400 tracking-wider font-light md:font-normal lg:font-medium lg:tracking-widest mb-4 animate-pulse">
              Pick an avatar as your profile picture
            </h2>
          </div>
          <div id="avatars" className="flex gap-3 items-center">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar h-10 w-10 md:h-14 md:w-[56px] lg:h-[72px] lg:w-[72px] cursor-pointer hover:opacity-70 transition-all ${
                  selectedAvatar === index
                    ? "selected rounded-full p-1 border-2 md:border-3 lg:border-4 border-green-500 opacity-100 transition-all"
                    : "opacity-50"
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt={`avatar ${avatar}`}
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="text-xs md:text-lg  text-green-600 bg-slate-950 rounded-md py-2 px-3 md:py-[10px] md:px-4 lg:py-3 lg:px-5 mt-3 md:mt-5 md:rounded-xl   hover:bg-slate-900 hover:text-green-400 shadow-lg shadow-green-300 md:shadow-xl md:shadow-green-400 active:text-white"
            onClick={() => setProfilePicture()}
          >
            Set Avatar
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <span className="text-sm md:text-base lg:text-lg text-yellow-400">
            NO Avatars found
          </span>
          <button
            className="bg-green-800 text-green-400 hover:bg-green-600 hover:text-green-300 text-sm md:text-base lg:text-lg mt-3 md:mt-5 md:rounded-xl py-2 px-3 md:py-[10px] md:px-4 lg:py-3 lg:px-5"
            onClick={() => navigate(0)}
          >
            Retry
          </button>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default SetAvatar;
