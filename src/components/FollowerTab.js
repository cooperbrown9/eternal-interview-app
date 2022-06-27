import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "baseui/button";

import { listFollow } from "../api/user";

const FollowerTab = ({ userId }) => {
  const [followers, setFollowers] = useState([])
    const router = useHistory();

  useEffect(() => {
    async function getFollowers() {
        const { data: _followers } = await listFollow(userId, 'followers')
        console.log(_followers)
        setFollowers(_followers)
    }
    getFollowers();
  }, [userId])

  function onViewProfile(userId) {
    router.push('/profile/' + userId)
  }

  return (
    <div className='card'>
      {followers.map((f, i) => (
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

export { FollowerTab };
