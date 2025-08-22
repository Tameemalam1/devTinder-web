import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginFrom, setIsLoginFrom] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () =>{
        try{
            const res = await axios.post( BASE_URL+ "/login", {
                emailId,
                password,
            },{withCredentials: true},)
            dispatch(addUser(res.data));
            return navigate("/feed");
        }catch(err){
            setError(err?.response?.data || "Something went wrong");
        }
    }

    const handleSignUp = async () => {
        try{
            const res = await axios.post( BASE_URL+ "/signup", {
                firstName,
                lastName,
                emailId,
                password,
            },{withCredentials: true},)
            dispatch(addUser(res.data.data));
            return navigate("/profile");
        }catch(err){
            setError(err?.response?.data || "Something went wrong");
        }
    }
    return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative
                 bg-[url('https://img.pikbest.com/wp/202408/bold-and-striking-red-black-abstract-3d-design-with-strong-technology-background-pattern_9777059.jpg!w700wp')]"
    >
      <div className="bg-black/80 backdrop-blur-sm p-8 rounded-xl shadow-lg w-96 text-white">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLoginFrom ? "Please Login" : "Please Sign Up"}
        </h2>

        {!isLoginFrom && (
          <>
            <div className="mb-4">
              <label className="block text-sm mb-1">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 rounded bg-gray-900 border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 rounded bg-gray-900 border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-sm mb-1">Email ID</label>
          <input
            type="text"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="w-full p-2 rounded bg-gray-900 border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-900 border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {error && <p className="text-red-400 mb-2">{error}</p>}

        <button
          onClick={isLoginFrom ? handleLogin : handleSignUp}
          className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
        >
          {isLoginFrom ? "Login" : "Sign Up"}
        </button>

        <p
          onClick={() => setIsLoginFrom((val) => !val)}
          className="mt-4 text-center text-sm text-gray-300 hover:text-red-400 cursor-pointer"
        >
          {isLoginFrom
            ? "New User? Sign Up here"
            : "Existing User? Login Here"}
        </p>
      </div>
    </div>
  );
}

export default Login