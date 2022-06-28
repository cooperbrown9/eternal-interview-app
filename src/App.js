import AuthContext, { withContext } from "./context/Auth";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Login, Profile } from "./pages";

import "tailwindcss/tailwind.css";
import "./App.css";
import { EditAccount } from "./components";

function App() {
  return (
    <AuthContext>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/login'/>}/>
          <Route path='/login' render={withContext(Login)} />
          <Route exact path='/profile/:userId' render={({ match }) => <Profile userId={match.params.userId} />} />
          <Route exact path='/profile/:userId/edit' render={withContext(EditAccount)} />
          {/* <Route path='/profile/:userId/edit' render={({ match }) => <EditAccount userId={match.params.userId} />} /> */}
        </Switch>
      </BrowserRouter>
    </AuthContext>
  );
}

export default App;
