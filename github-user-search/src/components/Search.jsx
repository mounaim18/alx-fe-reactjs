// import React, { useState } from "react";
// import "./Search.css";

// // In any component file
// const apiUrl = import.meta.env.VITE_APP_GITHUB_API_URL;
// const SearchBar = ({ setUsers, setLoading, setError }) => {
//   const [query, setQuery] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Search functionality will be implemented later
//     console.log("Search for:", query);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="search-bar">
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Search GitHub users..."
//       />
//       <button type="submit">Search</button>
//     </form>
//   );
// };

// export default SearchBar;

// src/components/Search/Search.jsx

// import React, { useState } from "react";
// import { fetchUserData } from "../services/githubService";
// import "./Search.css";

// const Search = () => {
//   const [username, setUsername] = useState("");
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!username.trim()) return;

//     setLoading(true);
//     setError(null);
//     setUserData(null);

//     try {
//       const data = await fetchUserData(username);
//       setUserData(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="search-container">
//       <form onSubmit={handleSubmit} className="search-form">
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Enter GitHub username"
//           className="search-input"
//         />
//         <button
//           type="submit"
//           className="search-button"
//           disabled={loading || !username.trim()}>
//           {loading ? "Searching..." : "Search"}
//         </button>
//       </form>

//       {loading && (
//         <div className="status-message loading">
//           <p>Loading user data...</p>
//         </div>
//       )}

//       {error && (
//         <div className="status-message error">
//           <p> Looks like we cant find the user</p>
//           <p className="error-detail">{error}</p>
//         </div>
//       )}

//       {userData && (
//         <div className="user-profile">
//           <div className="profile-header">
//             <img
//               src={userData.avatar_url}
//               alt={`${userData.login}'s avatar`}
//               className="avatar"
//             />
//             <div className="profile-info">
//               <h2>{userData.name || userData.login}</h2>
//               {userData.name && <p className="username">@{userData.login}</p>}
//               <p className="bio">{userData.bio || "No bio available"}</p>
//             </div>
//           </div>
//           <div className="profile-stats">
//             <div className="stat">
//               <span className="stat-number">{userData.public_repos}</span>
//               <span className="stat-label">Repositories</span>
//             </div>
//             <div className="stat">
//               <span className="stat-number">{userData.followers}</span>
//               <span className="stat-label">Followers</span>
//             </div>
//             <div className="stat">
//               <span className="stat-number">{userData.following}</span>
//               <span className="stat-label">Following</span>
//             </div>
//           </div>
//           <a
//             href={userData.html_url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="profile-link">
//             View GitHub Profile
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Search;

// src/components/Search/Search.jsx

// import React, { useState } from "react";
// import { searchUsers } from "../services/githubService";
// import "./Search.css";
// import UserCard from "./UserCard";

// const Search = () => {
//   const [searchParams, setSearchParams] = useState({
//     username: "",
//     location: "",
//     minRepos: "",
//   });
//   const [results, setResults] = useState({
//     users: [],
//     totalCount: 0,
//     page: 1,
//     hasMore: false,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSearchParams((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const data = await searchUsers({ ...searchParams, page: 1 });
//       setResults({
//         users: data.users,
//         totalCount: data.totalCount,
//         page: 1,
//         hasMore: data.hasMore,
//       });
//     } catch (err) {
//       setError(err.message);
//       setResults({
//         users: [],
//         totalCount: 0,
//         page: 1,
//         hasMore: false,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMore = async () => {
//     setLoading(true);
//     try {
//       const nextPage = results.page + 1;
//       const data = await searchUsers({ ...searchParams, page: nextPage });
//       setResults((prev) => ({
//         users: [...prev.users, ...data.users],
//         totalCount: data.totalCount,
//         page: nextPage,
//         hasMore: data.hasMore,
//       }));
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       <h1 className="text-3xl font-bold text-gray-800 text-center">
//         GitHub User Search
//       </h1>

//       {/* Search Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow-md">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//           <div>
//             <label
//               htmlFor="username"
//               className="block text-sm font-medium text-gray-700 mb-1">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={searchParams.username}
//               onChange={handleInputChange}
//               placeholder="e.g. octocat"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="location"
//               className="block text-sm font-medium text-gray-700 mb-1">
//               Location
//             </label>
//             <input
//               type="text"
//               id="location"
//               name="location"
//               value={searchParams.location}
//               onChange={handleInputChange}
//               placeholder="e.g. San Francisco"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="minRepos"
//               className="block text-sm font-medium text-gray-700 mb-1">
//               Min Repositories
//             </label>
//             <input
//               type="number"
//               id="minRepos"
//               name="minRepos"
//               value={searchParams.minRepos}
//               onChange={handleInputChange}
//               placeholder="e.g. 10"
//               min="0"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={
//               loading ||
//               (!searchParams.username &&
//                 !searchParams.location &&
//                 !searchParams.minRepos)
//             }
//             className={`px-4 py-2 rounded-md text-white font-medium ${
//               loading ||
//               (!searchParams.username &&
//                 !searchParams.location &&
//                 !searchParams.minRepos)
//                 ? "bg-blue-300 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}>
//             {loading ? "Searching..." : "Search"}
//           </button>
//         </div>
//       </form>

//       {/* Results Section */}
//       <div className="space-y-4">
//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 p-4">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg
//                   className="h-5 w-5 text-red-500"
//                   viewBox="0 0 20 20"
//                   fill="currentColor">
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {results.totalCount > 0 && (
//           <div className="bg-white p-4 rounded-lg shadow">
//             <p className="text-gray-600 mb-2">
//               Found {results.totalCount} users
//             </p>
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {results.users.map((user) => (
//             <UserCard key={user.id} user={user} />
//           ))}
//         </div>

//         {loading && (
//           <div className="flex justify-center py-4">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//           </div>
//         )}

//         {results.hasMore && !loading && (
//           <div className="flex justify-center">
//             <button
//               onClick={loadMore}
//               className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-md">
//               Load More
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Search;

// src/components/Search/Search.jsx
import React, { useState, useCallback, useEffect } from "react";
import { searchUsers } from "../services/githubService";
import UserCard from "./UserCard";

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    username: "",
    location: "",
    minRepos: "",
  });
  const [results, setResults] = useState({
    users: [],
    totalCount: 0,
    page: 1,
    hasMore: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Memoized input change handler
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Memoized search function
  const performSearch = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError(null);

      try {
        const data = await searchUsers({ ...searchParams, page });
        setResults((prev) => ({
          users: page === 1 ? data.users : [...prev.users, ...data.users],
          totalCount: data.totalCount,
          page,
          hasMore: data.hasMore,
        }));
      } catch (err) {
        setError(err.message);
        if (page === 1) {
          setResults({
            users: [],
            totalCount: 0,
            page: 1,
            hasMore: false,
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [searchParams]
  );

  // Form submission handler
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      performSearch(1);
    },
    [performSearch]
  );

  // Load more handler
  const loadMore = useCallback(() => {
    performSearch(results.page + 1);
  }, [performSearch, results.page]);

  // Keyboard accessibility for form submission
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !loading) {
        handleSubmit(e);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleSubmit, loading]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        GitHub User Search
      </h1>

      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={searchParams.username}
              onChange={handleInputChange}
              placeholder="e.g. octocat"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="GitHub username to search for"
            />
          </div>

          {/* Location Field */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={searchParams.location}
              onChange={handleInputChange}
              placeholder="e.g. San Francisco"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Filter by user location"
            />
          </div>

          {/* Min Repos Field */}
          <div>
            <label
              htmlFor="minRepos"
              className="block text-sm font-medium text-gray-700 mb-1">
              Min Repositories
            </label>
            <input
              type="number"
              id="minRepos"
              name="minRepos"
              value={searchParams.minRepos}
              onChange={handleInputChange}
              placeholder="e.g. 10"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Minimum number of repositories"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={
              loading ||
              (!searchParams.username &&
                !searchParams.location &&
                !searchParams.minRepos)
            }
            className={`px-4 py-2 rounded-md text-white font-medium ${
              loading ||
              (!searchParams.username &&
                !searchParams.location &&
                !searchParams.minRepos)
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            aria-label="Search GitHub users">
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </form>

      {/* Results Section */}
      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4" role="alert">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {results.totalCount > 0 && (
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 mb-2">
              Found {results.totalCount.toLocaleString()} users
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.users.map((user) => (
            <UserCard key={`${user.id}-${user.updated_at}`} user={user} />
          ))}
        </div>

        {loading && results.users.length > 0 && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {results.hasMore && !loading && (
          <div className="flex justify-center">
            <button
              onClick={loadMore}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-md"
              aria-label="Load more users">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Search);
