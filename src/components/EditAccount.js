import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Input } from "baseui/input";
import { StatefulCalendar } from "baseui/datepicker";
import { update } from "../api/user";

const EditAccount = ({ context, match }) => {
  const { user: _user } = context;
  const router = useHistory();

  const [user, setUser] = useState(_user);
  const [isLoading, setIsLoading] = useState(false);

  async function onUpdate() {
    setIsLoading(true);

    try {
      await update(user);
      await context.refreshUser()
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  function onBack() {
    router.push("/profile/" + match.params.userId);
  }

  return (
    <div className='page p-32 pl-64 pr-64'>
      <div
        style={{
          position: "absolute",
          left: 32,
          top: 64,
        }}
      ></div>
      <div className='flex flex-row justify-between mb-2' style={{ maxWidth: "70%" }}>
        <p className='text-4xl font-bold mb-4' style={{ color: "white" }}>
          {user?.name}
        </p>

        <div className='flex flex-row'>
          <p style={styles.actionButton} onClick={onBack}>
            Back
          </p>
          <p className='ml-2 ' style={{ ...styles.actionButton, backgroundColor: "rgb(200,0,200)", opacity: isLoading ? 0.5 : 1 }} onClick={onUpdate}>
            Save
          </p>
        </div>
      </div>
      <div style={{ width: "48vw", height: 4, backgroundColor: "rgb(200,0,200)" }} />

      <div className='flex flex-col mt-8 pr-64'>
        <div className='mb-4'>
          <p className='label'>Name</p>
          <Input value={user?.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
        </div>
        <div>
          <p className='label'>Birthday</p>
          <StatefulCalendar value={new Date(user?.birthday)} initialState={{value: [user?.birthday]}} onChange={({ date }) => setUser({ ...user, birthday: date })} />
        </div>
      </div>
    </div>
  );
};

export { EditAccount };

const styles = {
  actionButton: { color: "white", backgroundColor: "rgb(100,100,100)", padding: 12, borderRadius: 24, cursor: "pointer" },
};
