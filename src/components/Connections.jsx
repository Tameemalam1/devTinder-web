import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
        const res = await axios.get(BASE_URL + "/user/connections", {
            withCredentials: true,
        });
        dispatch(addConnections(res.data.data));
        } catch (err) {
        // Handle Error Case
        }
    };

    useEffect(()=>{
        fetchConnections();
    },[])

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20190727/pngtree-openwork-round-hole-metal-texture-black-red-background-image_285741.jpg')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 text-center py-10">
        <h1 className="text-3xl font-bold text-red-500 mb-6">Connections</h1>

        {!connections || connections.length === 0 ? (
          <h1 className="text-xl text-white">No Connections found</h1>
        ) : (
          <div className="space-y-6">
            {connections.map((connection) => {
              const { _id, firstName, lastName, photoUrl, age, gender, about } =
                connection;

              return (
                <div
                  key={_id}
                  className="flex items-center m-4 p-6 rounded-lg shadow-lg w-2/3 mx-auto 
                  bg-gradient-to-r from-black via-gray-900 to-red-800 
                  border border-red-600"
                >
                  <div>
                    <img
                      alt="profile"
                      className="w-20 h-20 rounded-full object-cover border-2 border-red-500"
                      src={photoUrl}
                    />
                  </div>
                  <div className="text-left mx-4 text-white">
                    <h2 className="font-bold text-xl text-red-400">
                      {firstName + " " + lastName}
                    </h2>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    <p className="text-gray-300">{about}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections