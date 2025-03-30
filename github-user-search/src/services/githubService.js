// import axios from "axios";

// const GITHUB_API_URL = "https://api.github.com";

// export const searchUsers = async (query) => {
//   try {
//     const response = await axios.get(`${GITHUB_API_URL}/search/users`, {
//       params: { q: query },
//     });
//     return response.data.items;
//   } catch (error) {
//     console.error("Error searching users:", error);
//     throw error;
//   }
// };

// // Add more API functions as needed
// src/services/githubService.js

// import axios from "axios";

// const API_URL =
//   import.meta.env.VITE_APP_GITHUB_API_URL || "https://api.github.com";

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY
//       ? `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
//       : undefined,
//     Accept: "application/vnd.github.v3+json",
//   },
// });

// export const searchUsers = async (query) => {
//   try {
//     const response = await axiosInstance.get("/search/users", {
//       params: { q: query },
//     });
//     return response.data.items;
//   } catch (error) {
//     console.error("Error searching users:", error);
//     throw error;
//   }
// };

// export const getUserDetails = async (username) => {
//   try {
//     const response = await axiosInstance.get(`/users/${username}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user details:", error);
//     throw error;
//   }
// };

// src/services/githubService.js
// import axios from "axios";

// const API_BASE_URL = "https://api.github.com";

// export const fetchUserData = async (username) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/users/${username}`);
//     return response.data;
//   } catch (error) {
//     if (error.response && error.response.status === 404) {
//       throw new Error("User not found");
//     }
//     throw new Error("Failed to fetch user data");
//   }
// };

// src/services/githubService.js
import axios from "axios";

const API_BASE_URL = "https://api.github.com";

export const searchUsers = async ({
  username,
  location,
  minRepos,
  page = 1,
  perPage = 10,
}) => {
  try {
    // Construct query string based on provided filters
    let query = username ? `${username} in:login` : "";
    if (location) query += ` location:${location}`;
    if (minRepos) query += ` repos:>${minRepos}`;

    const response = await axios.get(`${API_BASE_URL}/search/users`, {
      params: {
        q: query,
        page,
        per_page: perPage,
      },
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    // Fetch additional details for each user (since search API returns limited data)
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        const userDetails = await axios.get(
          `${API_BASE_URL}/users/${user.login}`
        );
        return {
          ...user,
          ...userDetails.data,
        };
      })
    );

    return {
      users: usersWithDetails,
      totalCount: response.data.total_count,
      page,
      perPage,
      hasMore: page * perPage < response.data.total_count,
    };
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};
