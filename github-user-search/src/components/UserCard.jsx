// // import React from 'react';
// import "./UserCard.css";

// const UserCard = ({ user }) => {
//   return (
//     <div className="user-card">
//       <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
//       <div className="user-info">
//         <h3>{user.login}</h3>
//         {user.name && <p>{user.name}</p>}
//         <div className="user-stats">
//           {user.followers !== undefined && (
//             <span className="stat">Followers: {user.followers}</span>
//           )}
//           {user.public_repos !== undefined && (
//             <span className="stat">Repos: {user.public_repos}</span>
//           )}
//         </div>
//       </div>
//       <a
//         href={user.html_url}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="profile-link">
//         View Profile
//       </a>
//     </div>
//   );
// };

// export default UserCard;

// src/components/UserCard/UserCard.jsx
// import React from "react";

// const UserCard = ({ user }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//       <div className="p-4">
//         <div className="flex items-start space-x-4">
//           <img
//             src={user.avatar_url}
//             alt={`${user.login}'s avatar`}
//             className="w-16 h-16 rounded-full border border-gray-200"
//           />
//           <div className="flex-1">
//             <h2 className="text-lg font-semibold text-gray-800">
//               {user.name || user.login}
//             </h2>
//             {user.name && (
//               <p className="text-sm text-gray-500">@{user.login}</p>
//             )}

//             <div className="mt-2 space-y-1">
//               {user.location && (
//                 <div className="flex items-center text-sm text-gray-600">
//                   <svg
//                     className="h-4 w-4 mr-1"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                   {user.location}
//                 </div>
//               )}

//               <div className="flex items-center text-sm text-gray-600">
//                 <svg
//                   className="h-4 w-4 mr-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//                 {user.public_repos} public repositories
//               </div>

//               {user.blog && (
//                 <div className="flex items-center text-sm text-gray-600">
//                   <svg
//                     className="h-4 w-4 mr-1"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
//                     />
//                   </svg>
//                   <a
//                     href={user.blog}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:underline">
//                     {user.blog}
//                   </a>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {user.bio && <p className="mt-3 text-sm text-gray-600">{user.bio}</p>}

//         <div className="mt-4 flex justify-end">
//           <a
//             href={user.html_url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//             View Profile
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;

// src/components/UserCard/UserCard.jsx
import React from "react";

// Fallback avatar (optimized SVG)
const FallbackAvatar = () => (
  <svg
    className="w-full h-full text-gray-300"
    fill="currentColor"
    viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
  </svg>
);

const UserCard = React.memo(({ user }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="p-4 flex-grow">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 relative">
            <div className="w-14 h-14 rounded-full border-2 border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center">
              {imgError || !user.avatar_url ? (
                <FallbackAvatar />
              ) : (
                <img
                  src={user.avatar_url}
                  alt={`${user.login}'s avatar`}
                  loading="lazy"
                  width="56"
                  height="56"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {user.error && (
              <span
                className="absolute -bottom-1 -right-1 bg-red-100 text-red-800 text-xs px-1.5 py-0.5 rounded-full border border-white"
                aria-label="Partial data warning">
                !
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-gray-800 truncate">
              {user.name}
              {user.error && <span className="sr-only"> (partial data)</span>}
            </h2>
            <p className="text-sm text-gray-500 truncate">@{user.login}</p>

            <div className="mt-2 space-y-1.5">
              {user.location && (
                <div className="flex items-center text-sm text-gray-600">
                  <svg
                    className="flex-shrink-0 h-4 w-4 text-gray-400 mr-1.5"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="truncate">{user.location}</span>
                </div>
              )}

              <div className="flex items-center text-sm text-gray-600">
                <svg
                  className="flex-shrink-0 h-4 w-4 text-gray-400 mr-1.5"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <span className="font-medium">
                    {user.public_repos.toLocaleString()}
                  </span>{" "}
                  repos
                </span>
              </div>
            </div>
          </div>
        </div>

        {user.bio && (
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">{user.bio}</p>
        )}
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex justify-center items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          aria-label={`View ${user.login}'s GitHub profile`}>
          View Profile
        </a>
      </div>
    </article>
  );
});

export default UserCard;
