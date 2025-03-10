import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Link,
  useRouteMatch,
} from "react-router-dom";

// Dashboard component that contains nested routes
const Profile = () => {
  // useRouteMatch provides the current URL and path
  let { path, url } = useRouteMatch();

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        <li>
          <Link to={`${url}/ProfileDetails`}>Profile</Link>
        </li>
        <li>
          <Link to={`${url}/ProfileSettings`}>Settings</Link>
        </li>
      </ul>

      {/* Nested routes within the Dashboard component */}
      <Switch>
        {/* Default route that displays a message */}
        <Route exact path={path}>
          <h3>Please select an option.</h3>
        </Route>
        {/* Nested route for Profile */}
        <Route path={`${path}/ProfileDetails`}>
          <Profile />
        </Route>
        {/* Nested route for Settings */}
        <Route path={`${path}/ProfileSettings`}>
          <Settings />
        </Route>
      </Switch>
    </div>
  );
};

export default Profile;
