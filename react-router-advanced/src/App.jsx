import "./App.css";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import Profile from "./components/Profile";
import ProfileDetails from "./components/ProfileDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <ProtectedRoute path="/profile/:id" element={<ProfileSettings />} />
      <BrowserRouter router={Router}>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/profile/:id" element={<ProfileDetails />} />
          <Route path="/profile/:id" element={<ProfileSettings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
