import React, { Component } from "react";
import { authenticate } from "../api/auth";

const Context = React.createContext();

export default class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isReady: false,
      user: {}
    };
  }

  async componentDidMount() {
    await this.init();
  }

  async init() {
    try {

        /**
         * If no user is saved locally then they havent logged in before
         * This is a workaround for checking for cookies right now (not something I'd do in prod)
         */
      let _user = localStorage.getItem("user");
      if (!_user) {
        return this.setState({ isAuthenticated: false, isReady: true });
      }

      _user = JSON.parse(_user);
      const { data: user } = await authenticate();

      localStorage.setItem("user", JSON.stringify(user));

      await this.setState({ user, isAuthenticated: true, isReady: true });

      console.log(user);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ isReady: true });
    }
  }

  // Call on login
  async setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
    await this.setState({ user, isAuthenticated: true, isReady: true });
  }

  render() {
    const value = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,

      setUser: (user) => this.setUser(user)
    };

    /**
     * By setting this isReady state var, we can ensure that we check if the user
     * is authenticated BEFORE any components are rendered.
     * In other words, we only render components AFTER we check if the user is authenticated
     */
    return <Context.Provider value={value}>{this.state.isReady ? this.props.children : null}</Context.Provider>;
  }
}

export const Consumer = Context.Consumer;

export function withContext(Component) {
  return function UserManager(props) {
    return <Context.Consumer>{(context) => <Component {...props} context={context} />}</Context.Consumer>;
  };
}
