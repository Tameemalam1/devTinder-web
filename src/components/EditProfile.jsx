import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);

    const saveProfile = async () => {
        setError("");
        try{
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                {
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about,
                },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }catch(err){
            setError(err.response.data);
        }
    }

    return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative px-4"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fh260/background/20190727/pngtree-openwork-round-hole-metal-texture-black-red-background-image_285741.jpg')",
      }}
    >
      {/* 🔴 Overlay (light red + black gradient) */}
      <div className="absolute inset-0 bg-black/70 bg-gradient-to-br from-red-800/40 via-black/60 to-red-900/30"></div>

      <div className="relative z-10 bg-black/80 p-8 rounded-xl shadow-lg w-full max-w-5xl flex flex-col md:flex-row gap-8">
        
        {/* ===== Form Section ===== */}
        <div className="flex-1 bg-gray-900/80 p-6 rounded-lg">
          <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
            Edit Profile
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-full p-3 rounded bg-black text-white border border-red-500 focus:ring focus:ring-red-600"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-full p-3 rounded bg-black text-white border border-red-500 focus:ring focus:ring-red-600"
            />
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Profile Photo URL"
              className="w-full p-3 rounded bg-black text-white border border-red-500 focus:ring focus:ring-red-600"
            />
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              className="w-full p-3 rounded bg-black text-white border border-red-500 focus:ring focus:ring-red-600"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 rounded bg-black text-white border border-red-500 focus:ring focus:ring-red-600"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="About you..."
              className="w-full p-3 rounded bg-black text-white border border-red-500 focus:ring focus:ring-red-600"
            />
            <button
              onClick={saveProfile}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
            >
              Save Profile
            </button>
          </div>
        </div>

        {/* ===== UserCard Preview ===== */}
        <div className="flex-1 flex items-center justify-center">
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>

      {/* ===== Toast Notification ===== */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success bg-red-600 text-white font-semibold">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile