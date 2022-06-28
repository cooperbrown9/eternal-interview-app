import React, { Component } from "react";
import { AccountModal, ProfileTabs } from "../components";
import { withContext } from "../context/Auth";

import { get, isFollowing as getIsFollowing, follow, unfollow } from "../api/user";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isFollowing: false,
      isMyProfile: false,
      isAccountModalOpen: false,
      user: {},
    };
  }

  async componentDidMount() {
    await this.getUser();

    if (this.props.context.user._id !== this.props.userId) {
      this.getIsFollowing();
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.userId !== this.props.userId) {
      await this.getUser();

      if (this.props.context.user._id !== this.props.userId) {
        this.getIsFollowing();
      }
    }
  }

  getUser = async () => {
    const { userId } = this.props;

    const { data: user } = await get(userId);

    this.setState({ user });
  };

  getIsFollowing = async () => {
    const { user } = this.props.context;
    const { userId } = this.props;

    getIsFollowing(user._id, userId)
      .then(({ data: isFollowing }) => {
        this.setState({ isFollowing });
      })
      .catch((e) => console.log(e));
  };

  onFollow = async () => {
    if (this.state.isLoading) return;

    this.setState({ isLoading: true });

    const { isFollowing } = this.state;
    const { user } = this.props.context;
    const { userId } = this.props;

    try {
      if (isFollowing) {
        await unfollow(user._id, userId);
      } else if (!isFollowing) {
        await follow(user._id, userId);
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ isLoading: false }, async () => {
        await this.getIsFollowing();
      });
    }
  };

  render() {
    const { user, isFollowing, isLoading, isAccountModalOpen } = this.state;
    const loggedInUser = this.props.context.user;
    const { userId } = this.props;

    return (
      <div className='page p-32 pl-64 pr-64' key={userId}>
        <div
          style={{
            position: "absolute",
            right: 32,
            top: 16,
          }}
        >
          <p class='text-sm' style={{ color: "white" }} onClick={() => this.setState({ isAccountModalOpen: !isAccountModalOpen })}>
            {user.name}
          </p>
        </div>
        <div className='flex flex-row justify-between mb-2'>
          <p className='text-4xl font-bold mb-4' style={{ color: "white" }}>
            {user.name}
          </p>

          {loggedInUser?._id !== userId && (
            <div
              className='text-lg'
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: !isLoading ? "rgb(200,0,200)" : "rgba(200,0,200,0.5)",
                color: "white",
                paddingLeft: 32,
                paddingRight: 32,
                borderRadius: 32,
                cursor: "pointer",
              }}
              onClick={this.onFollow}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </div>
          )}
        </div>

        <ProfileTabs userId={userId} />

        <AccountModal user={loggedInUser} isOpen={isAccountModalOpen} onClose={() => this.setState({ isAccountModalOpen: false })} />
      </div>
    );
  }
}

Profile = withContext(Profile);
export { Profile };
