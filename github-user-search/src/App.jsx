// import React, { useState } from "react";
// import "./App.css";
// import SearchBar from "./components/Search";
// import UserList from "./components/UserList";

// function App() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   return (
//     <div className="app">
//       <h1>GitHub User Search</h1>
//       <SearchBar
//         setUsers={setUsers}
//         setLoading={setLoading}
//         setError={setError}
//       />
//       {loading && <p>Loading...</p>}
//       {error && <p className="error">{error}</p>}
//       <UserList users={users} />
//     </div>
//   );
// }

// export default App;

// src/App.jsx
import React from "react";
import "./App.css";
import Search from "./components/Search";

function App() {
  return (
    <div className="app">
      <Search />
    </div>
  );
}

export default App;
