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
    <div className='flex justify-center my-10'>
        <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
                <h2 className="card-title justify-center">{isLoginFrom ? "Please Login" : "Please Sign Up"}</h2>
                <div>
                    {!isLoginFrom && <>
                    <fieldset className="fieldset my-2">
                        <legend className="fieldset-legend">First Name</legend>
                        <input type="text" value={firstName} className="input" onChange={(e) => setFirstName(e.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset my-2">
                        <legend className="fieldset-legend">Last Name</legend>
                        <input type="text" value={lastName} className="input" onChange={(e) => setLastName(e.target.value)} />
                    </fieldset>
                    </>}
                   <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email ID</legend>
                        <input type="text" value={emailId} className="input" onChange={(e) => setEmailId(e.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset my-2">
                        <legend className="fieldset-legend">Password</legend>
                        <input type="password" value={password} className="input" onChange={(e) => setPassword(e.target.value)} />
                    </fieldset>
                </div>
                <p className='text-red-500'>{error}</p>
                <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={isLoginFrom? handleLogin: handleSignUp}>{isLoginFrom? "Login" : "Sign Up"}</button>
                </div>
                <p className='m-auto cursor-pointer py-2 ' onClick={()=>setIsLoginFrom((value) => !value)}>{isLoginFrom ? "New User? SignUp here": "Existing User? Login Here"}</p>
            </div>
        </div>
    </div>
  )
}

export default Login