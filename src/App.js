import AuthContext, { withContext } from "./context/Auth";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Login, Profile } from "./pages";

import "tailwindcss/tailwind.css";
import "./App.css";

function App() {
  return (
    <AuthContext>
      <BrowserRouter>
        <Switch>
          <Route path='/login' render={withContext(Login)} />
          <Route path='/profile/:userId' render={({ match }) => <Profile userId={match.params.userId} />} />
          {/* <Route path='/onboard/:inviteId' render={({ match }) => <Onboard inviteId={match.params.inviteId} />} />

<Route path='/login' render={() => <Login />} />

<Route path='/invite'>
<InviteClient />
</Route>

<Route path='/dashboard/:clientId' render={({ match }) => <Dashboard clientId={match.params.clientId} />} /> */}
        </Switch>
      </BrowserRouter>
    </AuthContext>
  );
}

{
  /* <BrowserRouter>
        <Switch>

          
          <Route path='/onboard/:inviteId' render={({ match }) => <Onboard inviteId={match.params.inviteId} />} />

          <Route path='/login' render={() => <Login />} />

          <Route path='/invite'>
            <InviteClient />
          </Route>

          <Route path='/dashboard/:clientId' render={({ match }) => <Dashboard clientId={match.params.clientId} />} />
          <Route path='/dashboard' render={({ match }) => <Dashboard clientId={null} />} /> */
}

export default App;
