import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "baseui/button";

import { listFollow } from "../api/user";

const FollowingTab = ({ userId }) => {
  const [following, setFollowing] = useState([])
    const router = useHistory();

  useEffect(() => {
    async function getUsersFollowing() {
        const { data: _following } = await listFollow(userId, 'following')
        setFollowing(_following)
    }
    getUsersFollowing();
  }, [userId])

  function onViewProfile(userId) {
    router.push('/profile/' + userId)
  }

  if(following.length === 0) {
    return(
      <div>
        <p style={{color: 'white'}}>You aren't following anyone, click the Search Tab to follow people</p>
      </div>
    )
  }

  return (
    <div className='card'>
      {following.map((f, i) => (
        <div className='flex justify-between mb-2 pb-2' style={{ borderBottom: "2px solid rgba(0,0,0,0.4)" }}>
          <div className='flex flex-col'>
            <p className='text-lg' style={{ color: "white" }} key={i}>
              {f.name}
            </p>
            <p className='text-xs' style={{ color: "white", opacity: 0.5 }} key={i}>
              {f.location}
            </p>
          </div>
          <Button onClick={() => onViewProfile(f._id)}>View Profile</Button>
        </div>
      ))}
    </div>
  );
};

export { FollowingTab };
