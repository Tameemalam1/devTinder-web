import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try{
      const res = axios.post(BASE_URL + "/request/send/" + status + "/" + userId,{},{withCredentials:true})
      dispatch(removeUserFromFeed(userId))
    }catch(err){
      console.log(err);
    }
  };

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  return (
    <div className="card bg-gradient-to-b from-gray-900 to-red-900 border border-red-700/40 shadow-2xl w-[28rem] rounded-xl overflow-hidden">
      {/* Profile Image */}
      <figure className="h-80 w-full">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="h-full w-full object-cover"
        />
      </figure>

      {/* User Info */}
      <div className="card-body text-center">
        <h2 className="card-title text-red-400 tracking-wide text-xl">
          {firstName + " " + lastName}
        </h2>

        {age && gender && (
          <p className="text-gray-300 text-sm">{age + " • " + gender}</p>
        )}
        <p className="text-gray-400 italic mt-2">{about}</p>

        {/* Actions */}
        <div className="card-actions justify-center mt-6 space-x-4">
          <button
            className="btn bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600 px-6"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn bg-red-600 hover:bg-red-700 text-white px-6"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
  
};
export default UserCard;