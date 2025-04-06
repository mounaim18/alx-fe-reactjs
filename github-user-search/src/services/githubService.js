// src/services/githubService.js
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_APP_GITHUB_API_URL || "https://api.github.com";

// Cache with 5 minute expiration
const userCache = new Map();
const CACHE_EXPIRATION = 5 * 60 * 1000;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY
      ? `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
      : undefined,
    Accept: "application/vnd.github.v3+json",
  },
});

const cleanCache = () => {
  const now = Date.now();
  for (const [key, { timestamp }] of userCache) {
    if (now - timestamp > CACHE_EXPIRATION) {
      userCache.delete(key);
    }
  }
};

export const searchUsers = async ({
  username,
  location,
  minRepos,
  page = 1,
  perPage = 10,
}) => {
  cleanCache(); // Remove expired cache entries

  try {
    // Validate input
    if (!username?.trim() && !location?.trim() && !minRepos) {
      throw new Error("Please provide at least one search criteria");
    }

    // Build query
    const queryParts = [];
    if (username) queryParts.push(`${username.trim()} in:login`);
    if (location) queryParts.push(`location:${location.trim()}`);
    if (minRepos) queryParts.push(`repos:>=${Math.max(0, minRepos)}`);
    const query = queryParts.join(" ");

    // Search users
    const {
      data: { items, total_count },
    } = await axiosInstance.get("/search/users", {
      params: { q: query, page, per_page: perPage },
    });

    // Get user details with cache
    const usersWithDetails = await Promise.all(
      items.map(async (user) => {
        try {
          if (userCache.has(user.login)) {
            return userCache.get(user.login).data;
          }

          const { data: userDetails } = await axiosInstance.get(
            `/users/${user.login}`
          );
          const userData = {
            ...user,
            name: userDetails.name || user.login,
            avatar_url: userDetails.avatar_url || "",
            bio: userDetails.bio || "",
            location: userDetails.location || "",
            public_repos: userDetails.public_repos || 0,
            followers: userDetails.followers || 0,
            following: userDetails.following || 0,
            html_url: userDetails.html_url,
          };

          userCache.set(user.login, {
            data: userData,
            timestamp: Date.now(),
          });

          return userData;
        } catch (err) {
          return {
            ...user,
            name: user.login,
            public_repos: 0,
            error: "Failed to load full details",
          };
        }
      })
    );

    return {
      users: usersWithDetails,
      totalCount: total_count,
      page,
      perPage,
      hasMore: page * perPage < total_count,
    };
  } catch (error) {
    let message = "Failed to search users";

    if (error.response) {
      switch (error.response.status) {
        case 403:
          message = "API rate limit exceeded. Please try again later.";
          break;
        case 422:
          message = "Invalid search parameters. Please adjust your criteria.";
          break;
        case 404:
          message = "No users found matching your criteria.";
          break;
        default:
          message = `API error: ${error.response.status}`;
      }
    } else if (error.code === "ECONNABORTED") {
      message = "Request timed out. Please try again.";
    } else if (error.message) {
      message = error.message;
    }

    throw new Error(message);
  }
};
