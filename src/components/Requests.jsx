import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
    const requests = useSelector((store)=> store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try {
        const res = axios.post(
            BASE_URL + "/request/review/" + status + "/" + _id,
            {},
            { withCredentials: true }
        );
        dispatch(removeRequest(_id));
        } catch (err) {}
    };

    const fetchRequests = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/requests/received",{withCredentials:true,});
            dispatch(addRequests(res.data.data));
        }catch(err){
            console.error(err);
        }
    };

    useEffect(()=>{
        fetchRequests();
    },[])


    if (!requests) return;

    // if (requests.length === 0)
    // return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

    if (requests.length === 0)
    return (
      <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20190727/pngtree-openwork-round-hole-metal-texture-black-red-background-image_285741.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <h1 className="relative z-10 text-red-600 text-3xl font-bold">
          No Requests Found
        </h1>
      </div>
    );

  return (
    <div
      className="relative min-h-screen bg-cover bg-center py-10"
      style={{
        backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20190727/pngtree-openwork-round-hole-metal-texture-black-red-background-image_285741.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      <div className="relative z-10 text-center my-10">
        <h1 className="text-bold text-red-600 text-3xl mb-6">
          Connection Requests
        </h1>

        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="flex justify-between items-center m-4 p-6 rounded-lg border border-red-600 w-3/4 mx-auto bg-gradient-to-r from-black via-gray-900 to-red-900 text-white"
            >
              <div className="flex items-center">
                <img
                  alt="photo"
                  className="w-20 h-20 rounded-full border-2 border-red-600 object-cover"
                  src={photoUrl}
                />
                <div className="text-left mx-4">
                  <h2 className="font-bold text-xl text-red-500">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && <p>{age + ", " + gender}</p>}
                  <p>{about}</p>
                </div>
              </div>
              <div className="flex gap-3">
            <button
                className="w-28 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => reviewRequest("rejected", request._id)}
            >
                Reject
            </button>
            <button
                className="w-28 bg-gray-800 hover:bg-red-600 text-white font-bold py-2 px-4 rounded border border-red-600"
                onClick={() => reviewRequest("accepted", request._id)}
            >
                Accept
            </button>
            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Requests