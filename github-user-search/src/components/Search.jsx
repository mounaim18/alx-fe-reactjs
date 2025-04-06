// src/components/Search/Search.jsx
import React, { useState, useCallback, useEffect } from "react";
import { searchUsers } from "../../services/githubService";
import UserCard from "../UserCard/UserCard";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: name === "minRepos" ? Math.max(0, parseInt(value) || "") : value,
    }));
  };

  const performSearch = async (page = 1) => {
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
      setResults({ users: [], totalCount: 0, page: 1, hasMore: false });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    performSearch(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={searchParams.username}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="octocat"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={searchParams.location}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="San Francisco"
              />
            </div>

            <div>
              <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700">Min Repositories</label>
              <input
                type="number"
                id="minRepos"
                name="minRepos"
                value={searchParams.minRepos}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="10"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
