import { useState } from "react";
import { StatefulTabs, Tab } from "baseui/tabs-motion";
import { FollowingTab } from "./FollowingTab";
import { FollowerTab } from "./FollowerTab";
import { SearchTab } from "./SearchTab";

const ProfileTabs = ({ userId }) => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <StatefulTabs
      // fill={FILL.fixed}
      onChange={({ activeKey }) => setActiveTab(activeKey)}
      activeKey={activeTab}
      initialState={{ activeKey: "1" }}
      overrides={{
        TabBar: {
          style: { color: "white", padding: "8px", backgroundColor: "red", borderBottom: "2px solid rgb(200,200,200)" },
        },
        TabHighlight: {
          style: { backgroundColor: "purple" },
        },
        TabBorder: {
          style: { backgroundColor: "rgba(180,180,180, 0.5)" },
        },
        TabList: {
          style: { backgroundColor: "rgb(48,48,48)", color: "white" },
        },
        TabContent: {
          style: { paddingLeft: 0, paddingRight: 0, padding: 0, color: "white" },
        },
        TabPanel: {
          style: { paddingLeft: 0, paddingRight: 0, padding: 0, color: "white" },
        },
        Tab: {
          style: {
            color: "purple",
            textColor: "purple",
          },
        },
      }}
    >
      {/* <Tab title='KYC & FATCA' key='1' overrides={{ Tab: { style: { padding: 0 }}}}> */}
      <Tab title='Following' key='1'>
        <FollowingTab userId={userId} />
      </Tab>
      <Tab title='Followers' key='2'>
        <FollowerTab userId={userId} />
      </Tab>
      <Tab title='Search' key='3'>
        <SearchTab userId={userId} />
      </Tab>
    </StatefulTabs>
  );
};

export { ProfileTabs };
