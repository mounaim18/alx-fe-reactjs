// src/App.jsx
import React, { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import UserList from "./components/UserList";
import { searchUsers } from "./services/githubService";

function App() {
  const [results, setResults] = useState({
    users: [],
    totalCount: 0,
    page: 1,
    hasMore: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMore = async () => {
    if (!results.hasMore || loading) return;

    setLoading(true);
    setError(null);

    try {
      const data = await searchUsers({
        ...results.searchParams,
        page: results.page + 1,
      });

      setResults((prev) => ({
        ...prev,
        users: [...prev.users, ...data.users],
        totalCount: data.totalCount,
        page: data.page,
        hasMore: data.hasMore,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Search setResults={setResults} />
      <UserList
        users={results.users}
        loadMore={loadMore}
        hasMore={results.hasMore}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;
