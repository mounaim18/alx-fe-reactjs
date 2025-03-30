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

const UserCard = React.memo(({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="p-4 flex-grow">
        <div className="flex items-start space-x-4">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-16 h-16 rounded-full border border-gray-200 flex-shrink-0"
            loading="lazy"
            width="64"
            height="64"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {user.name || user.login}
            </h2>
            {user.name && (
              <p className="text-sm text-gray-500 truncate">@{user.login}</p>
            )}

            <div className="mt-2 space-y-1">
              {user.location && (
                <div className="flex items-center text-sm text-gray-600 truncate">
                  <svg
                    className="h-4 w-4 mr-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="truncate">{user.location}</span>
                </div>
              )}

              <div className="flex items-center text-sm text-gray-600">
                <svg
                  className="h-4 w-4 mr-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {user.public_repos.toLocaleString()} public repositories
              </div>

              {user.blog && (
                <div className="flex items-center text-sm text-gray-600 truncate">
                  <svg
                    className="h-4 w-4 mr-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <a
                    href={
                      user.blog.startsWith("http")
                        ? user.blog
                        : `https://${user.blog}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate">
                    {user.blog}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {user.bio && (
          <p className="mt-3 text-sm text-gray-600 line-clamp-3">{user.bio}</p>
        )}
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex justify-center items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label={`View ${user.login}'s GitHub profile`}>
          View Profile
        </a>
      </div>
    </div>
  );
});

export default UserCard;
