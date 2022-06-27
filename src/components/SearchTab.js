import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "baseui/button";
import { Input } from "baseui/input";
import { find } from "../api/user";

const SearchTab = (props) => {
  const [results, setResults] = useState([]);
    const router = useHistory()

  async function onSearch(text) {
    const { data: _results } = await find(text);
    setResults(_results);
  }

  function onViewProfile(id) {
    router.push('/profile/' + id)
  }

  return (
    <div className='card'>
      <div>
        <Input placeholder='Search' onChange={(e) => onSearch(e.target.value)} />
      </div>
      {results.map((f, i) => (
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

export { SearchTab };
