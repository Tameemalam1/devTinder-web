import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'


const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try{
      const res = await axios.get(BASE_URL + "/feed", {withCredentials: true,});
      dispatch(addFeed(res?.data?.data));
    }catch(err){
      // errror
    }
  };

  useEffect(()=>{
    getFeed();
  },[])


  if (!feed) return;

  return (
  <div
    className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
    style={{
      backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20190727/pngtree-openwork-round-hole-metal-texture-black-red-background-image_285741.jpg')`,
    }}
  >
    {/* Black overlay */}
    <div className="absolute inset-0 bg-black bg-opacity-70"></div>

    {/* Content */}
    <div className="relative z-10 my-10">
      {feed.length > 0 ? (
        <UserCard user={feed[0]} />
      ) : (
        <h1 className="text-white text-3xl font-bold">
          No New Users Found
        </h1>
      )}
    </div>
  </div>
);
};

export default Feed